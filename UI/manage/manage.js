'use strict';

var manage = angular.module('myApp.manage', ['ngRoute']);

manage.controller('ManageCtrl', function ($scope, $rootScope, $window, infoService, modelService) {

    $scope.category = $rootScope.category;
    $scope.currentYear = new Date().getFullYear();
    $scope.q1 = 0;
    $scope.q2 = 0;
    $scope.q3 = 0;
    $scope.q4 = 0;


    if(!$scope.category || !$rootScope.category) $window.location.hash = "#/main";
    setDefaultQuartals();
    function setDefaultQuartals(){
        if($scope.category.years){
            var yearVal = $scope.category.years[$scope.currentYear];
            $scope.q1=$scope.q2=$scope.q3=$scope.q4 = Number(yearVal/4).toFixed(1); //4 quart in year
        }
    }

    $scope.years = {};

    $scope.selectYear = function(year){
        $scope.currentYear = year;
    }

    $scope.models = [
        {title:"Линейная регрессия", name: 'linear'},
        {title:"С использованием экспоненты", name: 'exponential'},
        {title:"Логарифмическая", name: 'logarithmic'},
        {title:"Нормативная", name: 'default'}
    ];

    $scope.functions = [
        {title: 'hh', name: 'hh.ru'}
    ];

    var dynamicColors = function() {
        var r = Math.floor(Math.random() * 255);
        var g = Math.floor(Math.random() * 255);
        var b = Math.floor(Math.random() * 255);
        return "rgb(" + r + "," + g + "," + b + ")";
    };

    function setDataSet(year){
        var dataset = [];
        var data = {type: 'line', backgroundColor:"rgb(0,190,255)", label: $scope.category.name, data: $scope.years[year] };
        dataset.push(data);
        return dataset;
    }
    $scope.yearsGraph = []
    var years = [];

    setYears();
    function setYears(){
        var currentYear = new Date().getFullYear();
        var beforeDate = currentYear;
        var afterDate = currentYear;
        $scope.yearsGraph.push(afterDate);
        years.push(afterDate);
        for(var i=0; i < 6; i++){
            beforeDate--;
            afterDate++;
            $scope.yearsGraph.push(afterDate);
            $scope.yearsGraph.unshift(beforeDate);
            years.push(afterDate);
            years.unshift(beforeDate);
        }

        $scope.yearsGraph.forEach(function(year) {
            $scope.years[year] = Object.keys($scope.category.years)
                .filter(function(catYear) {
                    return catYear <= $scope.currentYear;
                })
                .map(function(catYear) {
                    return $scope.category.years[catYear];
                })
        })
    }

    $scope.drawChart = function(){
        drawChart();
    }

    var barChart = null;

    function drawChart(year){
        if(barChart!=null) barChart.destroy();
        var chartData = {
            labels: years,
            datasets: setDataSet(year)
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
    $scope.q1Predict = null;
    $scope.q2Predict = null;
    $scope.q3Predict = null;
    $scope.q4Predict = null;

    $scope.subCategories = $rootScope.subCategories;
    $scope.model = {selected: $scope.models[0]};
    $scope.func = {selected: $scope.functions[0]};

    var firstEnter = true;
    $scope.getPredictionByModel = function() {
        if($scope.model &&  $scope.model.selected  &&  $scope.model.selected.title) {
            // $scope.q1Predict = Math.floor(Math.random() * 1050) + 50;
            // $scope.q2Predict = Math.floor(Math.random() * 15) + 50;
            // $scope.q3Predict = Math.floor(Math.random() * 100);
            // $scope.q4Predict = Math.floor(Math.random()) + 50;
            var selectedSubCategories = Object.keys($scope.subCategories).filter(function(sub) {
                return $scope.subCategories[sub].isSelected;
            });

            modelService.predict({
                year: $scope.currentYear,
                yearsRange: 6,
                model: $scope.model.selected.name,
                dataY: $scope.category.id,
                dataX: selectedSubCategories
            }).then(function(prediction) {
                prediction.map(function(year) {
                    var total = year.reduce(function(sum, value) {
                        return sum + value
                    }, 0);
                });
                darwChart($scope.currentYear);
            }, function(error) {
                console.error('Error in predicting model: ', error);
            })


            if(!firstEnter) infoService.infoFunction("По модели '" + $scope.model.selected.title + "' получены показатели Квартала 1: <b>"+$scope.q1Predict
                +"</b>. Квартала 2: <b>" + $scope.q2Predict+"</b>. Квартала 3: <b>"+$scope.q3Predict+"</b>. Квартала 4: <b>"+$scope.q4Predict+".", "Автоматический расчет");
            firstEnter = false;
        }
    }
    $scope.getPredictionByModel();


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