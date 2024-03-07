from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from myapp.views import *
from account.views import *
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from djoser import views as djoser_views
from rest_framework.permissions import AllowAny
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.contrib.auth.views import *
from django.contrib.auth import views as auth_views



urlpatterns = [
    # app urls and admin url
    path('auth/password_reset/', CustomPasswordResetAPIView.as_view(), name='password_reset'),
    # path('auth/password_reset/done/', CustomPasswordResetDoneAPIView.as_view(), name='password_reset_done'),
    path('auth/reset/<uidb64>/<token>/', PasswordResetConfirmAPIView.as_view(), name='api_password_reset_confirm'),
    path('auth/password_change/', CustomPasswordChangeAPIView.as_view(), name='api_password_change'),


    # path('auth/password_change/',auth_views.PasswordChangeView.as_view(), name='password_change')

    # path('auth/', include('django.contrib.auth.urls')),
    path('admod/', admin.site.urls),
    path('media/', include('myapp.urls')),
    
    # Djoser
    # path('auth/', include(('djoser.urls', 'djoser'), namespace='djoser')),
    # path('authj/',include('djoser.urls.jwt')),
    # path('auths/', include('djoser.social.urls')),


    # Account urls   
    # path('manager/', ManagerListCreateView.as_view(), name='manager-list'),
    # path('manager/<int:pk>/', ManagerDetailView.as_view(), name='manager-detail'),
    # path('editor/', EditorListCreateView.as_view(), name='editor-list'),
    # path('editor/<int:pk>/', EditorDetailView.as_view(), name='editor-detail'),
    # path('watcher/', WatcherListCreateView.as_view(), name='watcher-list'),
    # path('watcher/<int:pk>/', WatcherDetailView.as_view(), name='watcher-detail'),
    # path('user-details/', UserDetailsListCreateView.as_view(), name='user-details-list'),
    # path('user-details/<int:pk>/', UserDetailsDetailView.as_view(), name='user-details-detail'),


    # path('auth/reset/password/',  PasswordResetView.as_view(), name='password_reset'),
    # path('auth/reset/password/confirm/',  AutoPasswordChangeView.as_view(), name='auto_reset'),
    path('auth/register/', UserView.as_view()),
    path('auth/login/', LoginView.as_view()),
    path('auth/usr/', UserWatch.as_view()),
    path('auth/logout/', LogoutView.as_view()),
    path('auth/usr/token/',TokenRetrieveApiView.as_view()),
    path('auth/usr/check/',AuthTesterView.as_view()),



    path('auth/token/', MyTokenObtainPairView.as_view()),
    path('auth/logout/', BlacklistTokenUpdateView.as_view()),
    # path('auth/logout/', TokenBlacklistView.as_view()),
    path('auth/token/verify/', TokenVerifyView.as_view()),
    path('auth/token/refresh/', TokenRefreshView.as_view()),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)