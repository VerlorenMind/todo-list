import rest_framework.authtoken.views
from django.urls import re_path, path, include
from . import views

urlpatterns = [
    path('lists/', views.ListView.as_view()),
    path('lists/create/', views.ListCreate.as_view()),
    re_path(r'^lists/(?P<pk>[0-9]+)/$', views.SingleListView.as_view()),
    path('list-items/', views.ListItemCreate.as_view()),
    path('users/', views.UserList.as_view()),
    path('user-details/', views.UserDetail.as_view()),
    path('api-auth/', include('rest_framework.urls')),
    path('token-auth/', rest_framework.authtoken.views.obtain_auth_token)
]
