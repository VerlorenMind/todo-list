from django.shortcuts import render

from .models import List
from .serializers import ListSerializer
from rest_framework import generics


class ListCreate(generics.ListCreateAPIView):
    queryset = List.objects.all()
    serializer_class = ListSerializer