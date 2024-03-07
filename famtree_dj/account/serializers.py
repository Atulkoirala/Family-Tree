from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import *
from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from django.utils.translation import gettext as _
import random
from django.core.mail import send_mail
from django.conf import settings
from django.utils.encoding import smart_str, force_str, smart_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode




User = get_user_model()



class RegistrationSerializers(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    parentName = serializers.CharField(source='parent.username', read_only=True)
    # token = serializers.UUIDField(required=True)

    class Meta:
        model = NewUser
        fields = ('id','email', 'username', 'password', 'first_name', 'last_name', 'token' ,'pic','parentName','parent','groups','role')
        extra_kwargs = {
            'password': {'write_only': True},
            'id': {'read_only': True},
            'role': {'read_only': True},
            'parent': {'read_only': True},
            'parentName': {'read_only': True},
            # 'parent_editor': {'read_only': True},
            'groups': {'read_only': True},
            'status': {'read_only': True},
            }

    def create(self, validated_data):
        user = NewUser.objects.create_user(
            email=validated_data['email'],
            username=validated_data['username'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            token=validated_data.get('token',''),
            pic = validated_data['pic'],
            parent=self.context['parent'],
            # parent_editor=self.context['parent_editor'],
            role=self.context['role'],
        )
        user.groups.set([self.context['groups']])
        return user


        # # Send activation email
        # current_site = get_current_site(self.context['request'])
        # mail_subject = 'Activate your account'
        # message = render_to_string('activation_email.html', {
        #     'user': user,
        #     'domain': current_site.domain,
        #     'uid': urlsafe_base64_encode(force_bytes(user.pk)).decode(),
        #     'token': default_token_generator.make_token(user),
        # })
        # email = EmailMessage(mail_subject, message, to=[user.email])
        # email.send()

        # return user



# class PasswordResetSerializer(serializers.Serializer):
#     email = serializers.EmailField()

#     def validate_email(self, value):
#         User = get_user_model()
#         if not User.objects.filter(email=value).exists():
#             raise serializers.ValidationError(_('Email address does not exist.'))
#         return value

#     def save(self):
#         email = self.validated_data['email']
#         User = get_user_model()
#         user = User.objects.get(email=email)

#         # Generate password reset token
#         token_generator = default_token_generator
#         uid = urlsafe_base64_encode(force_bytes(user.pk))
#         token = token_generator.make_token(user)

#         # Generate OTP
#         otp = str(random.randint(100000, 999999))

#         otp_expiration = datetime.now() + timedelta(minutes=5)

#         # Save the OTP and expiration time to the user (you can use a user profile or user model field)
#         user.otp = otp
#         user.otp_expiration = otp_expiration
#         user.save()

#         # Send password reset email with OTP
#         subject = 'Password Reset OTP'
#         message = f'Your OTP for password reset is: {otp} You need to enter this {email} address too.'
#         from_email = settings.EMAIL_HOST_USER
#         recipient_list = [email]
#         send_mail(subject, message, from_email, recipient_list)

#         return user


# class AutoPasswordChangeSerializer(serializers.Serializer):
#     otp = serializers.CharField()
#     email = serializers.EmailField()

#     def validate_email(self, value):
#         if not User.objects.filter(email=value).exists():
#             raise serializers.ValidationError('The entered email address does not exist. Please enter the email sent from us.')
#         return value

#     def validate_otp(self, value):
#         user = self.context['user']

#         if not user.otp:
#             raise serializers.ValidationError('OTP has not been generated for this user.')

#         # Check if OTP has expired
#         if user.otp_expiration < datetime.now():
#             raise serializers.ValidationError('OTP has expired.')

#         # Check if OTP is valid
#         if value != user.otp:
#                     # Send an alert email to the user
#             subject = 'Security Alert'
#             message = 'Someone trying to accesss your Account as user has requested to reset password. We have alerted you as user otp is invalid if possible change your password.'
#             from_email = settings.EMAIL_HOST_USER
#             recipient_list = [user.email]
#             send_mail(subject, message, from_email, recipient_list)

#             raise serializers.ValidationError('Invalid OTP.')

#         return value

#     def save(self):
#         user = self.context['user']

#         # Generate a new password
#         new_password = User.objects.make_random_password()

#         # Set the new password
#         user.set_password(new_password)
#         user.save()

#         # Send the updated password to the user's email
#         subject = 'Password Change Successful'
#         message = f'Your password has been automatically changed. Your new password is: {new_password}'
#         from_email = settings.EMAIL_HOST_USER
#         recipient_list = [user.email]
#         send_mail(subject, message, from_email, recipient_list)

#         return user


class AuthTesterSerializer(serializers.ModelSerializer):
    class Meta:
            model = NewUser
            fields = ('id','username','first_name','pic','groups','role')
            extra_kwargs = {
                'id': {'read_only': True},
                'role': {'read_only': True},
                'groups': {'read_only': True},
                'pic': {'read_only': True},
                'first_name': {'read_only': True},
                }

    
class UserVerifySerializer(serializers.ModelSerializer):
    class Meta:
        model = UserVerify
        fields = '__all__'
        read_only_fields = ['id']