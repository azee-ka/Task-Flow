from django.urls import path
from . import views

urlpatterns = [
    path('get-tasks/', views.get_tasks, name='get-tasks'),
    path('create-task/', views.create_task, name='create-task'),
]
