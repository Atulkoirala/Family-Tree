from rest_framework.permissions import BasePermission
import jwt
from rest_framework.permissions import BasePermission
from jwt.exceptions import InvalidTokenError
from account.models import *
import json
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework_simplejwt.tokens import UntypedToken
from rest_framework.permissions import BasePermission
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken



# class AuthorizationNot(BasePermission):
#     def has_permission(self, request, view):
#         token = request.META.get('HTTP_AUTHORIZATION')  # Retrieve token from Authorization header
#         if token:
#             try:
#                 # Extract the token from the header
#                 if token.startswith('Bearer '):
#                     token = token[7:]  # Remove 'Bearer ' prefix

#                 # Verify and decode the token
#                 raw_token = UntypedToken(token)
#                 raw_token.set_jti_claim(None)  # Disable token expiration check

#                 # Validate the token and get the payload
#                 validated_token = raw_token.get_validated_token()
#                 user_id = validated_token['id']
#                 user = NewUser.objects.filter(id=user_id).first()

#                 return user.groups.filter(name__in=['Manager', 'Editor']).exists()
#             except (InvalidToken, TokenError):
#                 return False
#         return False
    

class Man_Edi(BasePermission):
    def has_permission(self, request, view):
        user = request.user
        return request.user.groups.filter(name='Manager').exists() or request.user.groups.filter(name='Editor').exists()
    


class IsManager(BasePermission):
    def has_permission(self, request, view):
        return request.user.groups.filter(name='Manager').exists()

class IsEditor(BasePermission):
    def has_permission(self, request, view):
        return request.user.groups.filter(name='Editor').exists()





class AuthorizationNot(BasePermission):
    def has_permission(self, request, view):
        token = request.META.get('HTTP_AUTHORIZATION')
        if token:
            try:
                # Extract the token from the authorization header
                token = token.split(' ')[1]
                validated_token = JWTAuthentication().get_validated_token(token)
                user = JWTAuthentication().get_user(validated_token)
                if user:
                    # Retrieve user details from the database using the user_id
                    return user.groups.filter(name__in=['Manager', 'Editor']).exists()
            except (InvalidToken, KeyError):
                return False
        return False


class AuthorizationAll(BasePermission):
    def has_permission(self, request, view):
        token = request.META.get('HTTP_AUTHORIZATION')
        if token:
            try:
                token = token.split(' ')[1]
                validated_token = JWTAuthentication().get_validated_token(token)
                user = JWTAuthentication().get_user(validated_token)
                if user:
                    # Retrieve user details from the database using the user_id
                    return user.groups.filter(name__in=['Manager','Editor','Watcher']).exists()
            except (jwt.DecodeError, jwt.InvalidTokenError):
                return False
        return False



class AuthorizationOnly(BasePermission):
    def has_permission(self, request, view):
        token = request.META.get('HTTP_AUTHORIZATION')
        if token:
            try:
                token = token.split(' ')[1]
                validated_token = JWTAuthentication().get_validated_token(token)
                user = JWTAuthentication().get_user(validated_token)
                if user:
                    # Retrieve user details from the database using the user_id
            
                    return user.groups.filter(name__in=['Manager']).exists()
            except (jwt.DecodeError, jwt.InvalidTokenError):
                return False
        return False