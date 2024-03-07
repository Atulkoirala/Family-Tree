from django.contrib.auth.models import Group
from .models import NewUser
from rest_framework import generics
from .serializers import *
from rest_framework import serializers
from rest_framework.views import APIView
from rest_framework import status
from .serializers import *
import uuid
from rest_framework.generics import CreateAPIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import Group
from rest_framework import permissions
from django.db import IntegrityError
from rest_framework.exceptions import ValidationError , AuthenticationFailed
from rest_framework import exceptions
import jwt, datetime
from jwt.exceptions import DecodeError
from django.http import HttpResponse
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth.forms import PasswordResetForm
from django.utils.translation import gettext as _
from django.contrib.auth.views import PasswordResetView, PasswordResetConfirmView, PasswordResetDoneView
from django.http import JsonResponse
from rest_framework.response import Response
from django.utils.http import urlsafe_base64_decode
from django.views.decorators.csrf import csrf_protect
from django.utils.encoding import force_str
from datetime import datetime, timedelta
from django.contrib.auth.hashers import check_password
from myapp.permissions import*





class CustomPasswordResetAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        
        # Check if the email is associated with a user
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'message': 'No user found with this email.'}, status=400)
        
        # Generate the password reset token
        token = default_token_generator.make_token(user)

        # Calculate the expiration time (1 hour from now)
        exp = datetime.now() + timedelta(hours=1)
        
        # Build the password reset URL
        reset_url = f'http://localhost:3000/home/reset/{user.id}-{exp.timestamp()}/{token}/'
        
        # Send the password reset email
        subject = 'Password Reset'
        message = f'Click the link below to reset your password:\n\n{reset_url}'
        send_mail(subject, message, 'family0tree0@gmail.com', [email])
        
        return Response({'message': 'Password reset email sent.'})



class PasswordResetConfirmAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        group = kwargs.get('uidb64')
        uid, exp = group.split('-')
        token = kwargs.get('token')
        password = request.data.get('password')
        current_timestamp = timezone.now().timestamp()
        
        # Decode the user ID
        try:
            # uid = urlsafe_base64_decode(uidb64).decode()
            uid = int(uid)
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return Response({'message': 'Invalid user ID.'}, status=400)
        
        exp_float = float(exp)

        # Check if the token has expired
        if current_timestamp > exp_float:
            return Response({'message': 'Token has expired.'}, status=400)

        # Validate the password reset token
        if not default_token_generator.check_token(user, token):
            return Response({'message': 'Invalid token.'}, status=400)
        
        # Set the new password
        user.set_password(password)
        user.save()
        
        return Response({'message': 'Password reset successful.'})
    


# class CustomPasswordResetDoneAPIView(APIView):
#     permission_classes = [AllowAny]

#     def get(self, request, *args, **kwargs):
#         # Return a JSON response indicating password reset is done
#         # Example:
#         return Response({'message': 'Password reset done.'})



class CustomPasswordChangeAPIView(APIView):
    permission_classes = [AuthorizationAll]

    def post(self, request, *args, **kwargs):
        token = self.request.META.get('HTTP_AUTHORIZATION')

        if token:
            try:
                # Extract the token from the authorization header
                token = token.split(' ')[1]
                validated_token = JWTAuthentication().get_validated_token(token)
                user = JWTAuthentication().get_user(validated_token)
                if user:
                    # Filter the user using the appropriate field and value
                    user = NewUser.objects.filter(username=user).first()
                    if user:
                        current_password = request.data.get('current_password')
                        new_password = request.data.get('new_password')

                        # Check if the current password matches the user's password
                        if not check_password(current_password, user.password):
                            return Response({'error': 'Current password is incorrect.'}, status=status.HTTP_400_BAD_REQUEST)

                        # Set the new password
                        user.set_password(new_password)
                        user.save()

                        return Response({'message': 'Password changed successfully.'}, status=status.HTTP_200_OK)
                    else:
                        return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
                
                return Response({'error': 'Invalid token.'}, status=status.HTTP_401_UNAUTHORIZED)
            
            except InvalidToken:
                return Response({'error': 'Invalid token.'}, status=status.HTTP_401_UNAUTHORIZED)
        
        return Response({'error': f'Authorization token not provided. {token}'}, status=status.HTTP_401_UNAUTHORIZED)



# old_password
# new_password1
# new_password2


class AuthTesterView(APIView):
    # permission_classes = [AuthorizationAll]

    def get(self,request):
        try:
            token = request.headers.get('Authorization')
            if token:
                token_split = token.split(' ')[1]
                validated_token = JWTAuthentication().get_validated_token(token_split)
                user = JWTAuthentication().get_user(validated_token)
                if user:
                    serializer = AuthTesterSerializer(user)
                    return Response(serializer.data)
            return Response({"error":"Invalid token"},status = status.HTTP_401_UNAUTHORIZED)
        except InvalidToken:
            return Response({"error":"Invalid token"},status = status.HTTP_401_UNAUTHORIZED)
        except User.DoesNotExist:
            return Response({"error":"User DoesNotExist"},status = status.HTTP_404_NOT_FOUND)






class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        token['role'] = user.role
        # ...

        return token
    
    def validate(self, attrs):
        data = super().validate(attrs)
        user = self.user
        if user and user.is_active:
            # Add custom claims for non-superuser
            if not user.is_superuser:
                token = self.get_token(user)
                data['username'] = user.username
                data['email'] = user.email
                token['role'] = user.role

                # ...

        return data


# NewUser

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer




class UserView(APIView):
    serializer_class = RegistrationSerializers

    def post(self, request):
        token = request.data.get('token')

        # try:
        #     if (token == 12345):

        #     else:

        # except ValueError:
        #     return Response({'error': 'Invalid UUID.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            try:
                # Try to convert token to a UUID
                aaa = uuid.UUID(token)
            except ValueError:
                # If token is not a valid UUID, try converting it to an integer
                aaa = int(token)
        except ValueError:
            return Response({'error': 'Invalid UUID.'}, status=status.HTTP_400_BAD_REQUEST)


        try:
            user_verify = UserVerify.objects.get(token_ed=aaa)
            parent = user_verify.user  # Retrieve the associated NewUser instance
            group = 2
            role = "Editor"

        except UserVerify.DoesNotExist:
            try:
                user_verify = UserVerify.objects.get(token_wa=aaa)
                parent = user_verify.user  # Retrieve the associated NewUser instance
                group = 3
                role = "Watcher"

            except UserVerify.DoesNotExist:
                try:
                    user_verify = (aaa == 12345)
                    parent = None
                    group = 1
                    role = "Manager"

                except UserVerify.DoesNotExist:
                    return Response({'error': 'Token does not match.'}, status=status.HTTP_400_BAD_REQUEST)

        data = request.data.copy()
        data['parent'] = parent # Assign the ID of the parent NewUser instance for serialization
        data['groups'] = group
        data['role'] = role

        serializer = self.serializer_class(data=data, context={'parent': parent, 'groups': group, 'role': role})
        try:
            serializer.is_valid(raise_exception=True)
            user = serializer.save()
            user.is_active = True
            user.save()
            # return Response({'error': group}, status=status.HTTP_400_BAD_REQUEST)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except serializers.ValidationError as e:
            return Response({'error': e.detail}, status=status.HTTP_400_BAD_REQUEST)
        except IntegrityError:
            return Response({'error': 'Duplicate key value violates unique constraint.'}, status=status.HTTP_400_BAD_REQUEST)



class ActivateAccountView(APIView):
    def get(self, request, uidb64, token):
        try:
            uid = force_text(urlsafe_base64_decode(uidb64))
            user = NewUser.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, NewUser.DoesNotExist):
            user = None

        if user and default_token_generator.check_token(user, token):
            user.is_active = True
            user.save()
            return Response({'message': 'Account activated successfully'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Invalid activation link'}, status=status.HTTP_400_BAD_REQUEST)




class BlacklistTokenUpdateView(APIView):
    permission_classes = [IsAuthenticated]
    # authentication_classes = ()

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)



class LoginView(APIView):

    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        user = NewUser.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed("User Not Found!")

        if not user.check_password(password):
            raise AuthenticationFailed("Incorrect Password")

        payload = {
            'id': user.id,
            'email': user.username,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, 'secret', algorithm='HS256')

        response = HttpResponse()
        response.set_cookie(key='jwt', value=token, httponly=True)
        response.data = {
            'jwt': token,
        }
        return response





class UserWatch(APIView):
    permission_classes = [AuthorizationAll]

    def get(self, request):
        try:
            # Get the token from the Authorization header
            auth_header = request.headers.get('Authorization')
            if auth_header:
                # Extract the token from the header
                token = auth_header.split(' ')[1]
                # Verify the token
                validated_token = JWTAuthentication().get_validated_token(token)
                user = JWTAuthentication().get_user(validated_token)
                if user:
                    # Retrieve user details from the database using the user_id
                    serializer = RegistrationSerializers(user)
                    return Response(serializer.data)
            return Response({"error": "Invalid token"}, status=status.HTTP_401_UNAUTHORIZED)
        except InvalidToken:
            return Response({"error": "Invalid token"}, status=status.HTTP_401_UNAUTHORIZED)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)



class LogoutView(APIView):
    authentication_classes = [JWTAuthentication]

    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message': 'Logout Success'
        }
        return response


# class TokenRetrieveApiView(generics.RetrieveAPIView):
#     queryset = UserVerify.objects.filter()
#     serializer_class = UserVerifySerializer
#     lookup_field = 'id'
#     permission_classes = [IsAuthenticated]
    # permission_classes = [AuthorizationAll]


class TokenRetrieveApiView(APIView):
    permission_classes = [AuthorizationAll]

    def get(self, request):
        try:
            # Get the token from the Authorization header
            auth_header = request.headers.get('Authorization')
            if auth_header:
                # Extract the token from the header
                token = auth_header.split(' ')[1]
                # Verify the token
                validated_token = JWTAuthentication().get_validated_token(token)
                user = JWTAuthentication().get_user(validated_token)
                if user:
                    # Retrieve the UserVerify object for the user
                    user_verify = UserVerify.objects.filter(user=user).first()
                    if user_verify:
                        # Serialize the UserVerify object
                        serializer = UserVerifySerializer(user_verify)
                        return Response(serializer.data)
                    else:
                        return Response({"error": "UserVerify object not found"}, status=status.HTTP_404_NOT_FOUND)
            return Response({"error": "Invalid token"}, status=status.HTTP_401_UNAUTHORIZED)
        except InvalidToken:
            return Response({"error": "Invalid token"}, status=status.HTTP_401_UNAUTHORIZED)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)






# class WatcherRegistrationAPIView(APIView):
#     serializer_class = WatcherSerializer
#     permission_classes = [permissions.AllowAny]

#     def post(self, request):
#         watoken = request.data.get('token')

#         try:
#             aaa = uuid.UUID(watoken)
#         except ValueError:
#             return Response({'error': 'Invalid UUID format.'}, status=status.HTTP_400_BAD_REQUEST)
        
#         try:
#             new_user = NewUser.objects.get(token=aaa)
#         except NewUser.DoesNotExist:
#             return Response({'error': 'Watcher token does not match any NewUser token.'}, status=status.HTTP_400_BAD_REQUEST)

#         data = request.data.copy()  # create a copy of the request data
#         data['parent'] = new_user.id  # set parent field value to new_user id
#         serializer = self.serializer_class(data=data, context={'parent': new_user})
#         try:
#             serializer.is_valid(raise_exception=True)
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         except serializers.ValidationError as e:
#             return Response({'error': e.detail}, status=status.HTTP_400_BAD_REQUEST)
#         except IntegrityError as e:
#             return Response({'error': 'Duplicate key value violates unique constraint.'}, status=status.HTTP_400_BAD_REQUEST)





# class UserView(generics.GenericAPIView):
#     serializer_class = RegistrationSerializers

#     def post(self, request):
#         serializer = self.get_serializer(data=request.data)
#         if serializer.is_valid():
#             user = serializer.save()

#             user_verify = UserVerify.objects.filter(user=user).first()
#             if user_verify:
#                 if str(user.token) == str(user_verify.token_ed):
#                     editor_group, _ = Group.objects.get_or_create(name='Editor')
#                     user.groups.set([editor_group])
#                 elif str(user.token) == str(user_verify.token_wa):
#                     watcher_group, _ = Group.objects.get_or_create(name='Watcher')
#                     user.groups.set([watcher_group])
#                 elif not user.token:
#                     manager_group, _ = Group.objects.get_or_create(name='Manager')
#                     user.groups.set([manager_group])
#                 else:
#                     raise ValidationError("Invalid token. User creation aborted.")

#             return "Hello"
#             # Response({
#             #     "RequestId": str(uuid.uuid4()),
#             #     "Message": "User Created Successfully",
#             #     "User": serializer.data
#             # }, status=status.HTTP_201_CREATED)

#         return Response({"Errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

