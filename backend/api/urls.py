from django.shortcuts import render
from django.contrib.auth.models import User
from django.urls import path, include
from .views import UserList,NoteList, NoteDelete
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('users/register/', UserList.as_view(), name='user-list'),
    path('token/', TokenObtainPairView.as_view(), name='get_token'),
    path('token/refresh/', TokenRefreshView.as_view(), name='refresh_token'),
    # path('api/token/verify/', TokenVerifyView.as_view(), name='verify_token'),  # Uncomment if you want to verify tokens
    path("api-auth/", include("rest_framework.urls")),#
    path('notes/', NoteList.as_view(), name='note-list'),
    path('notes/delete/<int:pk>/', NoteDelete.as_view(), name='note-delete'),
]