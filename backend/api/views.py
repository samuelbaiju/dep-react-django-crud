from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics, permissions
from .serializers import UserSerializer,NoteSerializer  # Adjust the import based on your project structure
# from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note  # Ensure you import your models if needed

# Create your views here.

class UserList(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]  # Allow any user to create an account

class NoteList(generics.ListCreateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]  # Only authenticated users can access this view

    def perform_create(self, serializer):
        if serializer.is_valid():
            # Save the note with the currently authenticated user
            serializer.save(user=self.request.user)
        else:
            # If the serializer is not valid, raise an error
            raise serializer.ValidationError(serializer.errors)
          # Automatically set the user to the currently authenticated user
    def get_queryset(self):
        # Return notes for the currently authenticated user
        return self.queryset.filter(user=self.request.user)


class NoteDelete(generics.RetrieveUpdateDestroyAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]  # Only authenticated users can access this view

    def get_queryset(self):
        # Return notes for the currently authenticated user
        return self.queryset.filter(user=self.request.user)