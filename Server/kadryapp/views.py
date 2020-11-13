from django.shortcuts import render
from .models import Coll
import statsmodels
import json
from django.http.response import JsonResponse
from bson import json_util

def index(request):
    
   # query = Coll.objects.filter(ids="1").values()
    query = Coll.objects.filter(_id.$oid="1").values()
    print(query)
    response = JsonResponse(json_util.dumps({"test":list(query)}), safe = False)
    response["Access-Control-Allow-Origin"] = "*"
    return response
