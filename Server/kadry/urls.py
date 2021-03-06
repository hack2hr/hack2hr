"""kadry URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from kadryapp import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index),
    path('testPost', views.testPost),
    path('testGet', views.testGet),
    path('testAddMongo/', views.testAddMongo),
    path('testPyMongo/', views.testPyMongo),
    path('api/people/all/', views.apiPeopleAll),
    path('api/people/one/', views.apiPeopleOne),
    path('api/people/update/', views.apiPeopleUpdate),
    path('api/staff/all/', views.apiStaffAll),
    path('api/staff/one/', views.apiStaffOne),
    path('api/staff/add/', views.apiStaffAdd),
    path('api/staff/update/', views.apiStaffUpdate),
    path('api/staff/delete/', views.apiStaffDelete),
    path('api/people/download/', views.apiPeopleDownload),
    path('api/people/predict/', views.apiPeoplePredict),
]
