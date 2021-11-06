from django.urls import path, include
from . import views

urlpatterns = [
    path('lists/', views.ListCreate.as_view()),
    path('list-items/', views.ListItemCreate.as_view()),
    path('users/', views.UserList.as_view()),
    path('user-details/', views.UserDetail.as_view()),
    path('auth', include('rest_framework.urls')),
]
