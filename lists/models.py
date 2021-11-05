from django.db import models


class List(models.Model):
    contents = models.CharField(max_length=300)
    done = models.BooleanField()
