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


class NewListItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListItem
        fields = ['id', 'contents', 'done']


class NewListSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    items = NewListItemSerializer(many=True, required=False)

    class Meta:
        model = List
        fields = ['id', 'name', 'owner', 'items']

    def create(self, validated_data):
        new_list = List(name=validated_data['name'])
        items = validated_data.pop('items')
        user = self.context['request'].user
        for item in items:
            ListItem(**item, list=new_list.id)
            pass


class UserSerializer(serializers.ModelSerializer):
    lists = serializers.PrimaryKeyRelatedField(many=True, queryset=List.objects.all())

    class Meta:
        model = User
        fields = ['id', 'username', 'server']
