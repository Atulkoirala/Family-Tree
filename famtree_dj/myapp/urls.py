from django.urls import path
from .views import *


urlpatterns = [
        path('fam/',FamilyDetailsListView.as_view()),
        path('fam/<int:id>/',FamilyDetailsUpdateView.as_view()),

        path('bcreate/',BoyCreateView.as_view()),
        path('gcreate/',GirlCreateView.as_view()),


        path('bdelete/<int:id>/',BoyDView.as_view()),
        path('gdelete/<int:id>/',GirlDView.as_view()),

        path('bupdate/<int:id>/',BoyUView.as_view()),
        path('gupdate/<int:id>/',GirlUView.as_view()),

        path('boys/',BoyListView.as_view()),
        path('girls/',GirlListView.as_view()),

        path('boy/<int:id>/',BoyRetrieveView.as_view()),
        path('girl/<int:id>/',GirlRetrieveView.as_view()),

        path('b/<int:pk>/',BoyChildrenView.as_view()),
        path('g/<int:pk>/',GirlChildrenView.as_view()),
]