'use strict';

var manage = angular.module('myApp.manage', ['ngRoute']);

manage.controller('ManageCtrl', function ($scope, $rootScope, $window) {

    $scope.category = $rootScope.category;

    if(!$scope.category) $window.location.hash = "#/main";

    $scope.activeTab = null;

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

    function setData(){
        var data = [];
        angular.forEach($scope.years, function (year){
            data.push( (Math.random() * 10).toFixed(2) )
        })
        return data;
    }

    function setDataSet(subCategory){
        var dataset = [];
        var data = {type: 'line', backgroundColor:"rgb(0,190,255)", label: "test", data: setData(subCategory) };        dataset.push(data);
        return dataset;
    }

    $scope.years = [null, '2020', '2021', '2022', '2023', '2024', '2025', '2026']
    var years = ['2020', '2021', '2022', '2023', '2024', '2025', '2026']


    $scope.drawChart = function(subCategory){
        drawChart(subCategory);
    }

    var barChart = null;

    drawChart(null);
    function drawChart(subCategory){
        if(barChart!=null) barChart.destroy();
        var chartData = {
            labels: years,
            datasets:  setDataSet(subCategory)
        };

        var ctx = document.getElementById('canvas').getContext('2d');
        barChart = new Chart(ctx, {
            type: 'line',
            data: chartData,
            options: {

                title: {
                    position:'left',
                    display: true,
                    text: 'Отросль'
                },
                //tooltips: {
                //    mode: 'index',
                //    intersect: true
                //}
            }
        });
    }

});