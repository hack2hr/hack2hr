<h1 align="center">БТР Nova</h1>


## Ссылки
<h3><a href="http://13.79.21.196/#/main">Демо версия web сайта</a></h2>
<h3><a href="http://13.79.21.196:8080/api">Демо API</a></h2>
<h3><a href="https://www.canva.com/design/DAENbcz9wtg/L5HMZ6JowNa1aPIEelSkXw/view?utm_content=DAENbcz9wtg&utm_campaign=designshare&utm_medium=link&utm_source=publishpresent">Презентация проекта </a> </h3>

## О проекте
Проект является репозиторием команды "Кострома Nova" для <a href="https://leadersofdigital.ru/cabinet/63011">кейса по хакатону </a>  на цифровом прорыве 
<br>В рамках проекта планируется создать информационную систему (Веб-сайт) 

## Цель информационной системы
Повысить качество управления трудовыми ресурсами региона за счет создания информационной системы управления балансом трудовых ресурсов.

## Решение будет содержать следующие инструменты
 * система планирования балансов трудовых ресурсов
 * подсистема визуализации витрин, описывающие отдельные сегменты рынка труда (информирования населения о профессиях, пользующихся спросом на региональном рынке труда)
 * подсистемы мониторинга:
  1. Прогнозирование ситуаций на рынке труда отдельных отраслей региона, а так же прогнозирование ключевых факторов определяющих ситуацию на рынке труда
  2. Визуализировать ситуацию в отдельных отраслей
  3. Мониторинг сформированности баланса трудовых ресурсов с указанием проблемных трендов балансов 
  4. Автоматический сбор отдельных показателей в режиме реального времени 

## Технологии, с помощью которых происходит создание подсистемы

SERVER: Python 3.9 + Django 

UI: BOOTSTRAP4 + Angular JS + Charts.js

BD: Mongo DB

Модели будут реализованы на python с использованием библиотек: scipy, status models, sk learn

## Описание серверной части
Серверная часть реализована с помощью Django фрейворка, используется база данных MongoDB 
Пример зависимостей на views.py
<pre> 
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
import openpyxl
client = MongoClient('localhost', 27017) #подключение к локальной дб
</pre>
Пример POST Api. 
<pre>
@csrf_exempt
def testPost(request):
    if(request.method == "OPTIONS"): 
        response = JsonResponse({})
        response["Access-Control-Allow-Methods"] = "POST, GET, OPTIONS"
        response["Access-Control-Allow-Origin"] = "http://13.79.21.196:8080"
        response["Access-Control-Allow-Headers"] = "origin, x-requested-with, content-type, x-ijt"
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
</pre>
1. Были открыты корс для работы и тестирвоания с наших локальных клиентов
2. Для ангуляр приложения разрешили в options запросе некоторые headers
3. @csrf_exempt - csrf токен выключен
...
## Запуск SERVER
python manage.py runserver <IP ADDRESS>:8080

## Описание клиентской части
На клиенской стороне реализовано приложение AngularJS с использованием библотеки для стилистики веб приложений Bootstrap4, 
для построения графиков используется плагин Charts.js
Модули AngularJS приложения
<pre>
var myApp = angular.module('myApp', ['ngRoute', 'ui.bootstrap', 'ui.select', 'myApp.services', 'myApp.confirmationModal','myApp.loginPage',
        'myApp.infoModal',  'myApp.mainPage', 'myApp.manage', 'myApp.users', 'myApp.addUserModalModal', 'myApp.editUserModalModal']);
</pre>
Пример сервиса приложения, который используется для отображения данных, вызгрузки отчета и сохранение пользовательских данных
<pre>
services.factory('trendService', function($http, $q) {
    var service = {};
    service.people = {
        getAll: function () {
            return request($http, $q, 'get', '/api/people/all/', 'getAllPeople', 'trendService')
                .then(function(result) {
                    return JSON.parse(result);
                });
        }
    }
    service.production = {
        getAll: function () {
            return request($http, $q, 'get', '/api/production/all/', 'getAllProduction', 'trendService')
                .then(function(result) {
                    return JSON.parse(result);
                });
        }
    }
    service.downloadReport = function() {
        var deferred = $q.defer();
        $http.get(ipAdress + "/api/people/download/").success(function (response) {
            deferred.resolve(response);
        }).error(function () {
            deferred.reject('Error in addUser in downloadReport function');
        });
        return deferred.promise;
    }
    service.addPeopleManage = function(data) {
        var deferred = $q.defer();
        $http.post(ipAdress + "/api/people/add/", data).success(function (response) {
            deferred.resolve(response);
        }).error(function () {
            deferred.reject('Error in addUser in addUserModalService function');
        });
        return deferred.promise;
    }
    return service;
});
</pre>
...
## Запуск UI
python -m http.server --directory ".\hack2hr\UI" 80
