from django.contrib import admin
from .models import NewUser, UserVerify


@admin.register(NewUser)
class NewUserAdmin(admin.ModelAdmin):
    list_display = ['email', 'username', 'first_name', 'last_name', 'is_staff', 'is_active','role']
    search_fields = ['email', 'username', 'first_name', 'last_name']
    readonly_fields = ('parent', 'token')
    ordering = ['-id']
    list_filter = ['is_staff', 'is_active','groups','role']
    
 
@admin.register(UserVerify)
class UserVerifyAdmin(admin.ModelAdmin):
    list_display = ['user', 'token_ed', 'token_wa']
    search_fields = ['user__email', 'user__username']
    ordering = ['-id']