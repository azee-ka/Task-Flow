from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login_view, name='login'),
    path('register/', views.register_view, name='register'),
    path('profile/get-user-info/', views.get_user_info, name='get-user-info'),
    
    path('update-user-profile/', views.update_user_profile, name='update-user-profile'),

    path('update-profile-picture/', views.update_user_profile_picture, name='update-user-profile'),
    path('remove-profile-picture/', views.remove_user_profile_picture, name='remove-user-profile'),

    path('toggle-profile-visibility/', views.toggle_profile_visibility, name='toggle_profile_visibility'),
    path('get-profile-visibility/', views.get_profile_visibility, name='get_profile_visibility'),

]
