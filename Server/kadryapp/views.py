from django.shortcuts import render
from .models import Test
import statsmodels
import json
from django.http.response import JsonResponse

def index(request):
   
    query = Test.objects.all().values()[0]
    print(query)

    return JsonResponse(query)
