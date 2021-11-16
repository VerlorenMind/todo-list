from django.shortcuts import render

from .models import List, ListItem
from .serializers import ListSerializer, ListItemSerializer, UserSerializer
from rest_framework import generics, status, permissions
from django.contrib.auth.models import User
from .permissions import IsOwner, IsListOwner


class SingleList(generics.RetrieveUpdateDestroyAPIView):
    queryset = List.objects.all()
    serializer_class = ListSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwner]


class ListCreate(generics.ListCreateAPIView):
    serializer_class = ListSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwner]

    def get_queryset(self, *args, **kwargs):
        return List.objects.all().filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class ListItemCreate(generics.ListCreateAPIView):
    serializer_class = ListItemSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsListOwner]

    def get_queryset(self, *args, **kwargs):
        owned_lists = List.objects.all().filter(owner=self.request.user).values_list('id', flat=True)
        owned_items = ListItem.objects.all().filter(list__in=owned_lists)
        return owned_items


class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
