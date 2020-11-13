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
def testPost(request):
    if(request.method == "OPTIONS"): 
        response = JsonResponse({})
        response["Access-Control-Allow-Methods"] = "POST, GET, OPTIONS"
        response["Access-Control-Allow-Origin"] = "http://13.79.21.196:8080"
        response["Access-Control-Allow-Headers"] = "origin, x-requested-with, content-type"
        response["Access-Control-Allow-Origin"] = "*"
        return response
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    #content = body['content']
    print(body)
    response = JsonResponse(json_util.dumps({"test: 12"}), safe = False)
    response["Access-Control-Allow-Origin"] = "*"
    return response

@csrf_exempt 
def testGet(request):
    testVal = request.GET.get("testVal")
    response = JsonResponse(json_util.dumps({"test": testVal}), safe = False)
    response["Access-Control-Allow-Origin"] = "*"
    return response

