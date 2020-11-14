'use strict';

var manage = angular.module('myApp.manage', ['ngRoute']);

manage.controller('ManageCtrl', function ($scope, $rootScope, $window) {

    $scope.category = $rootScope.category;

    if(!$scope.category) $window.location.hash = "#/main";

    $scope.activeTab = "All";

    $scope.selectYear = function(year){
        $scope.activeTab = year;
    }

    $scope.models = [
        {modelName:"Линейная регрессия"},
        {modelName:"С использованием экспоненты"},
        {modelName:"Другое"}]

    var dynamicColors = function() {
        var r = Math.floor(Math.random() * 255);
        var g = Math.floor(Math.random() * 255);
        var b = Math.floor(Math.random() * 255);
        return "rgb(" + r + "," + g + "," + b + ")";
    };

    function setData(subCategory) {
        return Object.values($scope.category.years).map(function(year) {
            return year.toFixed(2);
        });
    }

    function setDataSet(){
        var dataset = [];
        var data = {type: 'line', backgroundColor:"rgb(0,190,255)", label: $scope.category.name, data: setData() };        dataset.push(data);
        return dataset;
    }
    $scope.years = []
    var years = [];

    setYears();
    function setYears(){
        var currentYear = new Date().getFullYear();
        var beforeDate = currentYear;
        var afterDate = currentYear;
        $scope.years.push(afterDate);
        years.push(afterDate);
        for(var i=0; i < 6; i++){
            beforeDate--;
            afterDate++;
            $scope.years.push(afterDate);
            $scope.years.unshift(beforeDate);
            years.push(afterDate);
            years.unshift(beforeDate);
        }
        $scope.years.unshift("All");
    }

    $scope.drawChart = function(){
        drawChart();
    }

    var barChart = null;

    drawChart();
    function drawChart(){
        if(barChart!=null) barChart.destroy();
        var chartData = {
            labels: years,
            datasets:  setDataSet()
        };

        var ctx = document.getElementById('canvas').getContext('2d');
        ctx.height = 500;
        barChart = new Chart(ctx, {
            type: 'line',
            data: chartData,
            options: {
                responsive: true,
                title: {
                    position:'left',
                    display: true,
                    text: 'Отрасль'
                },
                //tooltips: {
                //    mode: 'index',
                //    intersect: true
                //}
            }
        });
    }

    $scope.subCategories = $rootScope.subCategories;

    $scope.q1 = 0;
    $scope.q2 = 0;
    $scope.q3 = 0;
    $scope.q4 = 0;
    $scope.isAccepted = false;
    $scope.isAuto = false;

    $scope.addPeopleManage = function(){
        $scope.isAnySelected = false;
        angular.forEach($scope.subCategories, function (subCat) {
            if (subCat.isSelected) {
                $scope.isAnySelected = true;
            }
        });
        if(q1 && q2 && q3 && q4 && $scope.isAnySelected) {
            var year = new Date().getFullYear();
            var peopleData = null;
            var q1 = [];
            var q2 = [];
            var q3 = [];
            var q4 = [];
            angular.forEach($scope.subCategories, function (subCat) {
                if (subCat.isSelected) {
                    q1.push({tota: q1});
                    q2.push({subCat: q2});
                    q3.push({subCat: q3});
                    q4.push({subCat: q4});
                }
            });
            peopleData.year = year;
            peopleData.totalyear = q1 + q2 + q3 + q4;
            peopleData.data = {
                q1: q1,
                q2: q2,
                q3: q3,
                q4: q4
            };
            peopleData.accepted = $scope.isAccepted;
            peopleData.auto = $scope.isAuto;
            peopleData.madeby = "Ivanov";

            trendService.addPeopleManage(peopleData).then(function () {

            }, function (error) {
                console.log(error)
            });
        } else {
            $scope.addError = true;
            setTimeout(function (){
                $scope.addError = false;
                tryDigest();
            }, 1000)
        }
    }

    function tryDigest() {
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    }
});