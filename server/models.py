from django.db import models
from django.contrib.auth.models import User


class List(models.Model):
    name = models.CharField(max_length=300, null=False, blank=False)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=False, related_name='server')


class ListItem(models.Model):
    contents = models.CharField(max_length=300, null=False, blank=False)
    list = models.ForeignKey(List, on_delete=models.CASCADE, null=False, blank=False, related_name='items')
    done = models.BooleanField(null=False, blank=False)
