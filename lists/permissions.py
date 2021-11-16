from rest_framework import permissions
from .models import List


class IsOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.owner == request.user


class IsListOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        parent_list = List.objects.get(id=obj.list)
        return parent_list.owner == request.user
