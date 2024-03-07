# from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated,IsAdminUser,AllowAny
from django.contrib.auth.models import Permission
from django.db.models import query
from django.shortcuts import render
from rest_framework import generics
from .serializers import *
from .models import *
from rest_framework import filters
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from account.models import *
from django.db.models import Q
# from myapp.permissions import IsGroupAMember
from .permissions import*
import jwt
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import BasePermission
from django.core.management.utils import get_random_secret_key




#>>>>>>>>>> Create <<<<<<<<<<<<

class FamilyDetailsListView(generics.ListCreateAPIView):
    serializer_class = FamilyDetailsSerializer
    permission_classes = [AuthorizationAll]

    def get_queryset(self):
        user = self.request.user

        if isinstance(user, NewUser) and user.is_superuser:
            return Family_Details.objects.all()
        else:
            token = self.request.META.get('HTTP_AUTHORIZATION')
            if token:
                try:
                    # Extract the token from the authorization header
                    token = token.split(' ')[1]
                    validated_token = JWTAuthentication().get_validated_token(token)
                    user = JWTAuthentication().get_user(validated_token)
                    if user:
                        return Family_Details.objects.filter(user=user) | Family_Details.objects.filter(user=user.parent)
                    return Response({"error": "Invalid token"}, status=status.HTTP_401_UNAUTHORIZED)
                except InvalidToken:
                    return Response({"error": "Invalid token"}, status=status.HTTP_401_UNAUTHORIZED)
            else:
                return Family_Details.objects.none()


#>>>>>>>>>> Update <<<<<<<<<<<<


class FamilyDetailsUpdateView(generics.UpdateAPIView):
    queryset = Family_Details.objects.all()
    serializer_class = FamilyDetailsSerializer
    lookup_field = 'id'
    permission_classes = [AuthorizationNot]

    def get_queryset(self):
        user = self.request.user

        if isinstance(user, NewUser) and user.is_superuser:
            return Family_Details.objects.all()
        else:
            token = self.request.META.get('HTTP_AUTHORIZATION')
            if token:
                try:
                    # Extract the token from the authorization header
                    token = token.split(' ')[1]
                    validated_token = JWTAuthentication().get_validated_token(token)
                    user = JWTAuthentication().get_user(validated_token)
                    if user:
                        return Family_Details.objects.filter(user=user)
                    return Response({"error": "Invalid token"}, status=status.HTTP_401_UNAUTHORIZED)
                except InvalidToken:
                        return Response({"error": "Invalid token"}, status=status.HTTP_401_UNAUTHORIZED)
            else:
                return Family_Details.objects.none()




#>>>>>>>>>> Create <<<<<<<<<<<<




class BoyCreateView(generics.CreateAPIView):
    serializer_class = BoySerializers
    permission_classes = [AuthorizationNot]

    def get_queryset(self):
        user = self.request.user

        if isinstance(user, NewUser) and user.is_superuser:
            return Boy.objects.all()
        else:
            token = self.request.META.get('HTTP_AUTHORIZATION')
            if token:
                try:
                    # Extract the token from the authorization header
                    token = token.split(' ')[1]
                    validated_token = JWTAuthentication().get_validated_token(token)
                    user = JWTAuthentication().get_user(validated_token)
                    if user:
                                # Retrieve user details from the database using the user_id
                        # serializer = FamilyDetailsSerializer(user)
                        # return Response(serializer.data)
                        return Boy.objects.filter(user=user) | Boy.objects.filter(user=user.parent)
                    return Response({"error": "Invalid token"}, status=status.HTTP_401_UNAUTHORIZED)
                except InvalidToken:
                        return Response({"error": "Invalid token"}, status=status.HTTP_401_UNAUTHORIZED)
            else:
                return Boy.objects.none()

class GirlCreateView(generics.CreateAPIView):
    serializer_class = GirlSerializers
    permission_classes = [AuthorizationNot]

    def get_queryset(self):
        user = self.request.user

        if isinstance(user, NewUser) and user.is_superuser:
            return Girl.objects.all()
        else:
            token = self.request.META.get('HTTP_AUTHORIZATION')
            if token:
                try:
                    # Extract the token from the authorization header
                    token = token.split(' ')[1]
                    validated_token = JWTAuthentication().get_validated_token(token)
                    user = JWTAuthentication().get_user(validated_token)
                    if user:
                        return Girl.objects.filter(user=user) | Girl.objects.filter(user=user.parent)
                    return Response({"error": "Invalid token"}, status=status.HTTP_401_UNAUTHORIZED)
                except InvalidToken:
                        return Response({"error": "Invalid token"}, status=status.HTTP_401_UNAUTHORIZED)
            else:
                return Girl.objects.none()





#>>>>>>>>>> Delete <<<<<<<<<<<<






class BoyDView(generics.DestroyAPIView):
    queryset = Boy.objects.all()
    lookup_field = 'id'
    serializer_class = BoySerializers
    permission_classes = [AuthorizationOnly]

    def get_queryset(self):
        user = self.request.user

        if isinstance(user, NewUser) and user.is_superuser:
            return Boy.objects.all()
        else:
            token = self.request.META.get('HTTP_AUTHORIZATION')
            if token:
                try:
                    # Extract the token from the authorization header
                    token = token.split(' ')[1]
                    validated_token = JWTAuthentication().get_validated_token(token)
                    user = JWTAuthentication().get_user(validated_token)
                    if user:
                        return Boy.objects.filter(user=user)
                    return Response({"error": "Invalid token"}, status=status.HTTP_401_UNAUTHORIZED)
                except InvalidToken:
                        return Response({"error": "Invalid token"}, status=status.HTTP_401_UNAUTHORIZED)
            else:
                return Boy.objects.none()

class GirlDView(generics.DestroyAPIView):
    queryset = Girl.objects.all()
    serializer_class = GirlSerializers
    lookup_field = 'id'
    permission_classes = [AuthorizationOnly]

    def get_queryset(self):
        user = self.request.user

        if isinstance(user, NewUser) and user.is_superuser:
            return Girl.objects.all()
        else:
            token = self.request.META.get('HTTP_AUTHORIZATION')
            if token:
                try:
                    # Extract the token from the authorization header
                    token = token.split(' ')[1]
                    validated_token = JWTAuthentication().get_validated_token(token)
                    user = JWTAuthentication().get_user(validated_token)
                    if user:
                        return Girl.objects.filter(user=user)
                    return Response({"error": "Invalid token"}, status=status.HTTP_401_UNAUTHORIZED)
                except InvalidToken:
                        return Response({"error": "Invalid token"}, status=status.HTTP_401_UNAUTHORIZED)
            else:
                return Girl.objects.none()






#>>>>>>>>>> Update <<<<<<<<<<<<





class BoyUView(generics.UpdateAPIView):
    queryset = Boy.objects.all()
    serializer_class = BoySerializers
    lookup_field = 'id'
    serializer_class = BoySerializers
    permission_classes = [AuthorizationNot]

    def get_queryset(self):
        user = self.request.user

        if isinstance(user, NewUser) and user.is_superuser:
            return Boy.objects.all()
        else:
            token = self.request.META.get('HTTP_AUTHORIZATION')
            if token:
                try:
                    # Extract the token from the authorization header
                    token = token.split(' ')[1]
                    validated_token = JWTAuthentication().get_validated_token(token)
                    user = JWTAuthentication().get_user(validated_token)
                    if user:
                        return Boy.objects.filter(user=user) | Boy.objects.filter(user=user.parent)
                    return Response({"error": "Invalid token"}, status=status.HTTP_401_UNAUTHORIZED)
                except InvalidToken:
                        return Response({"error": "Invalid token"}, status=status.HTTP_401_UNAUTHORIZED)
            else:
                return Boy.objects.none()

class GirlUView(generics.UpdateAPIView):
    queryset = Girl.objects.all()
    serializer_class = GirlSerializers
    lookup_field = 'id'
    permission_classes = [AuthorizationNot]

    def get_queryset(self):
        user = self.request.user

        if isinstance(user, NewUser) and user.is_superuser:
            return Girl.objects.all()
        else:
            token = self.request.META.get('HTTP_AUTHORIZATION')
            if token:
                try:
                    # Extract the token from the authorization header
                    token = token.split(' ')[1]
                    validated_token = JWTAuthentication().get_validated_token(token)
                    user = JWTAuthentication().get_user(validated_token)
                    if user:
                        return Girl.objects.filter(user=user) | Girl.objects.filter(user=user.parent)
                    return Response({"error": "Invalid token"}, status=status.HTTP_401_UNAUTHORIZED)
                except InvalidToken:
                        return Response({"error": "Invalid token"}, status=status.HTTP_401_UNAUTHORIZED)
            else:
                return Girl.objects.none()






#>>>>>>>>>> List <<<<<<<<<<<<







class BoyListView(generics.ListAPIView):
    queryset = Boy.objects.all()
    serializer_class = BoySerializers
    search_fields = ['value','Name','id'] 
    filter_backends = (filters.SearchFilter,)
    permission_classes = [AuthorizationAll]

    def get_queryset(self):
        user = self.request.user

        if isinstance(user, NewUser) and user.is_superuser:
            return Boy.objects.all()
        else:
            token = self.request.META.get('HTTP_AUTHORIZATION')
            if token:
                try:
                    # Extract the token from the authorization header
                    token = token.split(' ')[1]
                    validated_token = JWTAuthentication().get_validated_token(token)
                    user = JWTAuthentication().get_user(validated_token)
                    if user:
                        return Boy.objects.filter(user=user) | Boy.objects.filter(user=user.parent)
                    return Response({"error": "Invalid token"}, status=status.HTTP_401_UNAUTHORIZED)
                except InvalidToken:
                        return Response({"error": "Invalid token"}, status=status.HTTP_401_UNAUTHORIZED)
            else:
                return Boy.objects.none()

class GirlListView(generics.ListAPIView):
    queryset = Girl.objects.all()
    serializer_class = GirlSerializers
    search_fields = ['value','Name','id'] 
    filter_backends = (filters.SearchFilter,)
    permission_classes = [AuthorizationAll]

    def get_queryset(self):
        user = self.request.user

        if isinstance(user, NewUser) and user.is_superuser:
            return Girl.objects.all()
        else:
            token = self.request.META.get('HTTP_AUTHORIZATION')
            if token:
                try:
                    # Extract the token from the authorization header
                    token = token.split(' ')[1]
                    validated_token = JWTAuthentication().get_validated_token(token)
                    user = JWTAuthentication().get_user(validated_token)
                    if user:
                        return Girl.objects.filter(user=user) | Girl.objects.filter(user=user.parent)
                    return Response({"error": "Invalid token"}, status=status.HTTP_401_UNAUTHORIZED)
                except InvalidToken:
                        return Response({"error": "Invalid token"}, status=status.HTTP_401_UNAUTHORIZED)
            else:
                return Girl.objects.none()







#>>>>>>>>>> Single List <<<<<<<<<<<<





class BoyRetrieveView(generics.RetrieveAPIView):
    queryset = Boy.objects.filter()
    serializer_class = BoySerializers
    lookup_field = 'id'
    permission_classes = [AuthorizationAll]

    def get_queryset(self):
        user = self.request.user

        if isinstance(user, NewUser) and user.is_superuser:
            return Boy.objects.all()
        else:
            token = self.request.META.get('HTTP_AUTHORIZATION')
            if token:
                try:
                    # Extract the token from the authorization header
                    token = token.split(' ')[1]
                    validated_token = JWTAuthentication().get_validated_token(token)
                    user = JWTAuthentication().get_user(validated_token)
                    if user:
                        return Boy.objects.filter(user=user) | Boy.objects.filter(user=user.parent)
                    return Response({"error": "Invalid token"}, status=status.HTTP_401_UNAUTHORIZED)
                except InvalidToken:
                        return Response({"error": "Invalid token"}, status=status.HTTP_401_UNAUTHORIZED)
            else:
                return Boy.objects.none()


class GirlRetrieveView(generics.RetrieveAPIView):
    queryset = Girl.objects.filter()
    serializer_class = GirlSerializers
    lookup_field = 'id'
    permission_classes = [AuthorizationAll]

    def get_queryset(self):
        user = self.request.user

        if isinstance(user, NewUser) and user.is_superuser:
            return Girl.objects.all()
        else:
            token = self.request.META.get('HTTP_AUTHORIZATION')
            if token:
                try:
                    # Extract the token from the authorization header
                    token = token.split(' ')[1]
                    validated_token = JWTAuthentication().get_validated_token(token)
                    user = JWTAuthentication().get_user(validated_token)
                    if user:
                        return Girl.objects.filter(user=user) | Girl.objects.filter(user=user.parent)
                    return Response({"error": "Invalid token"}, status=status.HTTP_401_UNAUTHORIZED)
                except InvalidToken:
                        return Response({"error": "Invalid token"}, status=status.HTTP_401_UNAUTHORIZED)
            else:
                return Girl.objects.none()






#>>>>>>>>>> Children List <<<<<<<<<<<<





class BoyChildrenView(generics.RetrieveAPIView):
    queryset = Boy.objects.all()
    serializer_class = BoySerializers
    permission_classes = [AuthorizationAll]

    def get_queryset(self):
        user = self.request.user

        if isinstance(user, NewUser) and user.is_superuser:
            return Boy.objects.all()
        else:
            token = self.request.META.get('HTTP_AUTHORIZATION')
            if token:
                try:
                    # Extract the token from the authorization header
                    token = token.split(' ')[1]
                    validated_token = JWTAuthentication().get_validated_token(token)
                    user = JWTAuthentication().get_user(validated_token)
                    if user:
                                # Retrieve user details from the database using the user_id
                        # serializer = FamilyDetailsSerializer(user)
                        # return Response(serializer.data)
                        return Boy.objects.filter(user=user) | Boy.objects.filter(user=user.parent)
                    return Response({"error": "Invalid token"}, status=status.HTTP_401_UNAUTHORIZED)
                except InvalidToken:
                        return Response({"error": "Invalid token"}, status=status.HTTP_401_UNAUTHORIZED)
            else:
                return Boy.objects.none()

    def get(self, request, *args, **kwargs):
        boy = self.get_object()
        children = boy.get_children()
        data = []
        for child in children:
            # Create a dictionary containing only the required fields
            child_data = {'Name': child.Name, 'id': child.id, 'ids': child.ids,'dif':child.Diffrent_Family}
            # Add the dictionary to the list
            data.append(child_data)
        return Response(data)


class GirlChildrenView(generics.RetrieveAPIView):
    queryset = Girl.objects.all()
    serializer_class = GirlSerializers
    permission_classes = [AuthorizationAll]

    def get_queryset(self):
        user = self.request.user

        if isinstance(user, NewUser) and user.is_superuser:
            return Girl.objects.all()
        else:
            token = self.request.META.get('HTTP_AUTHORIZATION')
            if token:
                try:
                    # Extract the token from the authorization header
                    token = token.split(' ')[1]
                    validated_token = JWTAuthentication().get_validated_token(token)
                    user = JWTAuthentication().get_user(validated_token)
                    if user:
                                # Retrieve user details from the database using the user_id
                        # serializer = FamilyDetailsSerializer(user)
                        # return Response(serializer.data)
                        return Girl.objects.filter(user=user) | Girl.objects.filter(user=user.parent)
                    return Response({"error": "Invalid token"}, status=status.HTTP_401_UNAUTHORIZED)
                except InvalidToken:
                        return Response({"error": "Invalid token"}, status=status.HTTP_401_UNAUTHORIZED)
            else:
                return Girl.objects.none()

    def get(self, request, *args, **kwargs):
        girl = self.get_object()
        children = girl.get_children()
        data = []
        for child in children:
            # Create a dictionary containing only the required fields
            child_data = {'Name': child.Name, 'id': child.id, 'ids': child.ids,'dif':child.Diffrent_Family}
            # Add the dictionary to the list
            data.append(child_data)
        return Response(data)

