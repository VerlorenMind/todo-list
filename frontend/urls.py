from django.urls import path, re_path
from . import views


urlpatterns = [
    path('', views.index),
    path('login', views.index),
    path('profile', views.index),
    re_path(r'^list/[0-9]+$', views.index),
]
