from django.shortcuts import render

import statsmodels
import json
from django.http.response import JsonResponse
from django.http.response import HttpResponse
from bson import json_util
from django.views.decorators.csrf import csrf_exempt
from pymongo import MongoClient
from bson.objectid import ObjectId
import pprint
client = MongoClient('localhost', 27017)
db = client['KadryTest']


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
    jsonValue = json.loads(body_unicode)
    #content = body['content']
    print(jsonValue)
    response = JsonResponse(json_util.dumps({"test": jsonValue["title"]}), safe = False)
    #jsonValue["title"] get json value
    response["Access-Control-Allow-Origin"] = "*"
    return response

@csrf_exempt 
def testGet(request):
    testVal = request.GET.get("testVal")
    response = JsonResponse(json_util.dumps({"test": testVal}), safe = False)
    response["Access-Control-Allow-Origin"] = "*"
    return response

@csrf_exempt 
def testAddMongo(request):
    data = {
        "year": "2000",
        "totalyear": "1000",
        "data": {
            "q1": {
                "totalq1": "800",
                "workAble": "200",
                "migrants": "200",
                "other": {
                    "old": "200",
                    "young": "200"
                }
            },
            "q2": {
                "totalq2": "800",
                "workAble": "200",
                "migrants": "200",
                "other": {
                    "old": "200",
                    "young": "200"
                }
            },
            "q3": {
                "totalq3": "800",
                "workAble": "200",
                "migrants": "200",
                "other": {
                    "old": "200",
                    "young": "200"
                }
            },
            "q4": {
                "totalq4": "800",
                "workAble": "200",
                "migrants": "200",
                "other": {
                    "old": "200",
                    "young": "200"
                }
            }        
        }
    }
    
    collection = db['People']
    doc_id = collection.insert_one(data).inserted_id
    document = collection.find_one({'_id': ObjectId(doc_id)})
    response = JsonResponse(json_util.dumps(document), safe = False)
    return response

@csrf_exempt 
def testPyMongo(request):
    from Server.core.models import Model
   
    collection = db['People']
    test = []
    for doc in collection.find():
        test.append(doc)
    
    
        
    response = JsonResponse(json_util.dumps(test), safe = False)
    return response

