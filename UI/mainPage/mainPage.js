'use strict';

var mainPage = angular.module('myApp.mainPage', ['ngRoute']);

mainPage.controller('MainPageCtrl', function ($scope, mainService) {

    getTestRequest();
    $scope.isLoading = true;

    function getTestRequest() {
        mainService.getTestRequest().then(function (response) {
            $scope.testData = response;
            $scope.isLoading = false;
        },function(){
            $scope.isLoading = false;
        });
    }

});