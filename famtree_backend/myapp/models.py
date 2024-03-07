from django.db import models
from django.db.models.base import ModelState
from django.db.models.deletion import CASCADE
from django.db.models.fields import CharField
from django.utils import timezone
from django.core.exceptions import ValidationError
from django.contrib.postgres.fields import ArrayField
import os
from mptt.models import MPTTModel , TreeForeignKey ,TreeManager
from django.core.exceptions import ValidationError
from django.db import models
import datetime
from django.core.files.base import ContentFile
from urllib.request import urlopen
from django.conf import settings
from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType





def validate_date_format(value):
    try:
        # Convert the value to a string with the expected format
        date_str = value.strftime('%Y-%m-%d')
        
        # Attempt to parse the value as a date with the expected format
        datetime.datetime.strptime(date_str, '%Y-%m-%d').date()
    except ValueError:
        # If the value cannot be parsed, raise a validation error
        raise ValidationError('Invalid date format. Date must be in the format YYYY-MM-DD.')



# class ImageURLField(models.ImageField):
#     def to_python(self, value):
#         if value and not hasattr(value, 'file'):
#             try:
#                 image_url = value
#                 response = urlopen(image_url)
#                 file_name = image_url.split('/')[-1]
#                 image_file = ContentFile(response.read(), name=file_name)
#                 return super().to_python(image_file)
#             except Exception as e:
#                 pass
#         return super().to_python(value)





class Family_Details(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    Name = models.CharField(max_length=50)

    def __str__(self):
        return self.Name

    def save(self, *args, **kwargs):
        created = not self.pk  # Check if the object is being created or updated

        super().save(*args, **kwargs)

        if created:
            # Create groups for Editor and Watcher
            editor_group, _ = Group.objects.get_or_create(name='Editor')
            watcher_group, _ = Group.objects.get_or_create(name='Watcher')

            # Grant permissions to the groups
            content_type = ContentType.objects.get_for_model(Family_Details)
            permissions = Permission.objects.filter(content_type=content_type)

            editor_group.permissions.set(permissions)
            watcher_group.permissions.set(permissions)

            # Assign groups to the user
            self.user.groups.add(editor_group, watcher_group)

    


class Boy(MPTTModel):
    A=(
        ('Alive','Alive'),
        ('Death','Death'),
    )
    B=(
        ('Yes','Yes'),
        ('No','No'),
    )
    C=(
        ('Married','Married'),
        ('UnMarried','UnMarried'),
        ('Divorce','Divorce'),
    )
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    ids = models.IntegerField(blank=False, help_text="Same Value for same Branch(Brother and Sister with their Husband and Wife)")
    value = models.FloatField(blank=False, help_text="Same Value for same Group (Husband and Wife)")
    image = models.ImageField(upload_to='Boy', blank=False, help_text="Please Upload Person's Photo")
    Name = models.CharField(max_length=50, blank=False, help_text="Enter your First Name")
    SurName = models.CharField(max_length=50, blank=False, help_text="Enter your Second Name")
    Gender = models.CharField(max_length=10, blank=False, default="Male")
    Diffrent_Family = models.CharField(choices=B, blank=False, help_text="Is your Surname and family Name same")
    Born_Place = models.CharField(max_length=75, blank=False, help_text="Your Born Address")
    Date_Of_Birth = models.DateField(blank=False, help_text="Your Born Date", validators=[validate_date_format])
    Status = models.CharField(choices=A, blank=False)
    Date_Of_Death = models.DateField(blank=True, null=True, help_text="Only if Person is Dead",validators=[validate_date_format])
    parent = TreeForeignKey('self', on_delete=models.CASCADE, blank=True, null=True, related_name='Father')
    Mother = models.ForeignKey('Girl', on_delete=models.CASCADE, null=True, blank=True, related_name='momy')
    Marrital_Status = models.CharField(choices=C, blank=False)
    Wife = models.ManyToManyField('Girl', blank=True, related_name='wife')

    class MPTTMeta:
        order_insertion_by = ['Name']

    def __str__(self):
        return self.Name
    
    def save(self, *args, **kwargs):
        created = not self.pk  # Check if the object is being created or updated

        super().save(*args, **kwargs)

        if created:
            # Create groups for Editor and Watcher
            editor_group, _ = Group.objects.get_or_create(name='Editor')
            watcher_group, _ = Group.objects.get_or_create(name='Watcher')

            # Grant permissions to the groups
            content_type = ContentType.objects.get_for_model(Boy)
            permissions = Permission.objects.filter(content_type=content_type)

            editor_group.permissions.set(permissions)
            watcher_group.permissions.set(permissions)

            # Assign groups to the user
            self.user.groups.add(editor_group, watcher_group)




class Girl(MPTTModel):
    A=(
        ('Alive','Alive'),
        ('Death','Death'),
    )
    B=(
        ('Yes','Yes'),
        ('No','No'),
    )
    C=(
        ('Married','Married'),
        ('UnMarried','UnMarried'),
        ('Divorce','Divorce'),
    )
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    ids = models.IntegerField(blank=False,help_text = "Same Value for same Branch(Brother and Sister with their Husband and Wife)")
    value = models.FloatField(blank=False,help_text = "Same Value for same Group (Husband and Wife)")
    image = models.ImageField(upload_to='Girl',blank=False,help_text = "Please Upload Person's Photo")
    Name = models.CharField(max_length=50,blank=False,help_text = "Enter your First Name")
    SurName = ArrayField(models.CharField(max_length=75,blank=False,help_text = "For married girls write both Surname using (,)"))
    Gender = models.CharField(max_length=10,blank=False,default="Female",editable=False)
    Diffrent_Family = models.CharField(choices=B,blank=False,help_text = "When is your Surname and family Name same")
    Born_Place = models.CharField(max_length=75,blank=False,help_text = "Your Born Address")
    Date_Of_Birth = models.DateField(blank=False,help_text = "Your Born Date",validators=[validate_date_format])
    Status = models.CharField(choices=A,blank=False)
    Date_Of_Death = models.DateField(blank=True,null=True,help_text = "Only if Person is Dead",validators=[validate_date_format])
    parent = TreeForeignKey('self', on_delete=models.CASCADE,blank=True,null=True,related_name='mother')
    Father = models.ForeignKey(Boy, on_delete=models.CASCADE, null=True, blank=True, related_name='dady')
    # Father = models.OneToOneField(Boy,related_name='dady',blank=True,null=True,on_delete=models.CASCADE, unique=False)
    Marrital_Status = models.CharField(choices=C,blank=False)
    Husband = models.ManyToManyField(Boy,blank=True,related_name='husband')

    class MPTTMeta:
        order_insertion_by = ['Name']

    def __str__(self):
        return self.Name

    def save(self, *args, **kwargs):
        created = not self.pk  # Check if the object is being created or updated

        super().save(*args, **kwargs)

        if created:
            # Create groups for Editor and Watcher
            editor_group, _ = Group.objects.get_or_create(name='Editor')
            watcher_group, _ = Group.objects.get_or_create(name='Watcher')

            # Grant permissions to the groups
            content_type = ContentType.objects.get_for_model(Girl)
            permissions = Permission.objects.filter(content_type=content_type)

            editor_group.permissions.set(permissions)
            watcher_group.permissions.set(permissions)

            # Assign groups to the user
            self.user.groups.add(editor_group, watcher_group)



