from django.contrib import admin
from .models import BaseUser

@admin.register(BaseUser)
class BaseUserAdmin(admin.ModelAdmin):
    search_fields = ['username', 'email']  # Add any fields you want to search by
