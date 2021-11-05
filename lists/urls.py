from django.urls import path
from . import views

urlpatterns = [
    path('api/lists/', views.ListCreate.as_view()),
]
