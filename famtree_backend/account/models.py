import string
import random
import uuid
from django.contrib.auth import get_user_model
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager, Permission, Group
from django.contrib.auth.signals import user_logged_in, user_logged_out
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.conf import settings
from mptt.models import MPTTModel, TreeForeignKey, TreeManager
from django.contrib.auth.signals import user_logged_in, user_logged_out
from django.dispatch import receiver
from django.core.exceptions import ValidationError
from django.contrib.contenttypes.models import ContentType



class CustomAccountManager(BaseUserManager):
    def create_superuser(self, email, username, first_name, password, **other_fields):
        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_active', True)

        if other_fields.get('is_staff') is not True:
            raise ValueError('Superuser must be assigned to is_staff=True.')
        if other_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must be assigned to is_superuser=True.')

        return self.create_user(email, username, first_name, password, **other_fields)

    def create_user(self, email, username, first_name, password, **other_fields):
        if not email:
            raise ValueError(_('You must provide an email address'))

        if not username:
            raise ValueError(_('Users must have a username'))

        email = self.normalize_email(email)
        user = self.model(email=email, username=username, first_name=first_name, **other_fields)
        user.set_password(password)
        user.save()
        return user


class NewUser(MPTTModel, AbstractBaseUser, PermissionsMixin):
    A=(
        ('Manager','Manager'),
        ('Editor','Editor'),
        ('Watcher','Watcher'),
    )
    email = models.EmailField(_('email address'), unique=True)
    username = models.CharField(max_length=150, unique=True)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    start_date = models.DateTimeField(default=timezone.now)
    last_login = models.DateTimeField(blank=True, null=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    pic = models.ImageField(upload_to='manager_profile_pics', blank=False, null=False)
    
    role = models.CharField(choices=A, blank=True, null=True)

    parent = TreeForeignKey('self', on_delete=models.CASCADE, blank=True, null=True, related_name='watchers')
    # parent_editor = models.ForeignKey('self', on_delete=models.CASCADE, blank=True, null=True, related_name='editors')
    
    # watcher = models.ForeignKey('self', on_delete=models.CASCADE, blank=True, null=True, related_name='watchers')
    # editor = models.ForeignKey('self', on_delete=models.CASCADE, blank=True, null=True, related_name='editors')

    # familyName = models.CharField(max_length=50, blank=True, null=True)

    token = models.CharField(max_length=100, blank=True, null=True)

    objects = CustomAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name',]


    # def verify_user(self):
    #     user_verify = UserVerify.objects.filter(user=self).first()

    #     if self.token == 12345:
    #         viewer_group, _ = Group.objects.get_or_create(name='Manager')
    #         self.groups.add(viewer_group)
    #     else:
    #         if user_verify:
    #             if str(self.token) == str(user_verify.token_ed):
    #                 viewer_group, _ = Group.objects.get_or_create(name='Editor')
    #                 self.groups.add(viewer_group)
    #             elif str(self.token) == str(user_verify.token_wa):
    #                 viewer_group, _ = Group.objects.get_or_create(name='Watcher')
    #                 self.groups.add(viewer_group)


    def update_last_login(self):
        """
        Updates the last_login field to the current date and time.
        """
        self.last_login = timezone.now()
        self.save()

    groups = models.ManyToManyField(
        Group,
        verbose_name=_('groups'),
        blank=True,
        help_text=_('The groups this user belongs to.'),
        related_name='newuser_set',  # add this line
        related_query_name='newuser',
    )

    user_permissions = models.ManyToManyField(
        Permission,
        verbose_name=_('user permissions'),
        blank=True,
        help_text=_('Specific permissions for this user.'),
        related_name='newuser_set',  # add this line
        related_query_name='newuser',
    )

    def __str__(self):
        return self.username


class UserVerify(models.Model):
    user = models.ForeignKey(NewUser, on_delete=models.CASCADE)
    token_ed = models.UUIDField(default=uuid.uuid4, editable=False, blank=False)
    token_wa = models.UUIDField(default=uuid.uuid4, editable=False, blank=False)

    @classmethod
    def create_verify(cls, user):
        return cls.objects.create(user=user)

    @receiver(user_logged_in)
    def generate_token_on_login(sender, user, request, **kwargs):
        verify_instance, created = UserVerify.objects.get_or_create(user=user)
        verify_instance.token_wa = uuid.uuid4()
        verify_instance.token_ed = uuid.uuid4()
        verify_instance.save()
        # user.verify_user()
        user.save()

    @receiver(user_logged_out)
    def delete_token_on_logout(sender, user, request, **kwargs):
        verify_instance = UserVerify.objects.filter(user=user).first()
        if verify_instance:
            verify_instance.delete()
        user.token_wa = None
        user.token_ed = None
        # user.verify_user()
        user.save()

    def __str__(self):
        return f"{self.user}"


class UserVerifyManager(models.Manager):
    def create(self, **kwargs):
        user = kwargs.get('user')
        if user and (user.groups.filter(name='Watcher').exists() or user.groups.filter(name='Editor').exists()):
            return None  # Return None to indicate that the creation should be skipped
        
        return super().create(**kwargs)