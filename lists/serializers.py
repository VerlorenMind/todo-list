from rest_framework import serializers
from .models import List, ListItem
from django.contrib.auth.models import User


class ListItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListItem
        fields = ['id', 'contents', 'done', 'list']


class ListSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    items = ListItemSerializer(many=True, required=False)

    class Meta:
        model = List
        fields = ['id', 'name', 'owner', 'items']


class UserSerializer(serializers.ModelSerializer):
    lists = serializers.PrimaryKeyRelatedField(many=True, queryset=List.objects.all())

    class Meta:
        model = User
        fields = ['id', 'username', 'lists']
