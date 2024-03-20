from django.urls import path, include

urlpatterns = [
    path('', include('src.user.urls')),
    path('', include('src.task.urls')),
]
