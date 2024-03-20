# src/user/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models

def upload_to(instance, filename):
    return f'profile_pictures/{instance.username}/{filename}'

class BaseUser(AbstractUser):
    username = models.CharField(unique=True, max_length=150)
    display_name = models.CharField(max_length=255, blank=True, null=True)
    date_of_birth = models.DateField(null=True, blank=True)
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)
    active_profile = models.ForeignKey('self', null=True, blank=True, on_delete=models.SET_NULL, related_name='%(app_label)s_%(class)s_active_profile')
    is_private_profile = models.BooleanField(default=True)
    sort_option = models.CharField(max_length=20, default='created_at')
