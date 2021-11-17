import django.contrib.auth.models
from django.shortcuts import render

from .models import List, ListItem
from .serializers import ListSerializer, ListItemSerializer, UserSerializer, NewListSerializer
from rest_framework import generics, status, permissions
from django.contrib.auth.models import User
from .permissions import IsOwner, IsListOwner
from rest_framework.views import APIView
from rest_framework.response import Response


class SingleListView(generics.RetrieveUpdateDestroyAPIView):
    queryset = List.objects.all()
    serializer_class = ListSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwner]


class ListView(generics.ListAPIView):
    serializer_class = ListSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwner]

    def get_queryset(self, *args, **kwargs):
        if type(self.request.user) is not django.contrib.auth.models.AnonymousUser:
            return List.objects.all().filter(owner=self.request.user)
        else:
            return List.objects.none()


class ListCreate(APIView):
    serializer_class = NewListSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def post(self, request, *args, **kwargs):
        serializer = NewListSerializer(data=request.data, context={'user': request.user})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
