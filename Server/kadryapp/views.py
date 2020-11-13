from django.shortcuts import render
from .models import Coll
import statsmodels
import json
from django.http.response import JsonResponse
from bson import json_util
from django.views.decorators.csrf import csrf_exempt

# query = Coll.objects.filter(ids="1").values()
    #query = Coll.objects.filter(id="1").values()
    #print(query)
    # usercX = request.GET.get("var") ?var=qewwqe
    # title = request.POST.get("title")

def index(request):
    response = JsonResponse(json_util.dumps({"test":123 }), safe = False)
    response["Access-Control-Allow-Origin"] = "*"
    return response

@csrf_exempt
def postRequest(request):
    print(request.POST)
    title = request.POST.get("title")
    response = JsonResponse(json_util.dumps({"test":title }), safe = False)
    response["Access-Control-Allow-Origin"] = "*"
    return response


