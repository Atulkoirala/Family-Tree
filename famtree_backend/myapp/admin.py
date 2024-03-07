from django.contrib import admin
from .models import *
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
# from .models import User

admin.site.register(Family_Details)

@admin.register(Boy)
class BoyAdmin(admin.ModelAdmin):
    list_display = ['Name','SurName','ids', 'value', 'Gender']
    search_fields = ['ids', 'value', 'Diffrent_Family', 'Gender','Name']
    list_filter = ['Diffrent_Family', 'Gender']
    ordering = ['ids','value']


@admin.register(Girl)
class GirlAdmin(admin.ModelAdmin):
    list_display = ['Name','SurName','ids', 'value', 'Gender']
    search_fields = ['ids', 'value', 'Diffrent_Family', 'Gender','Name']
    list_filter = ['Diffrent_Family', 'Gender']
    ordering = ['ids','value']
