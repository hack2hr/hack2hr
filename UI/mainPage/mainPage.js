'use strict';

var mainPage = angular.module('myApp.mainPage', ['ngRoute']);

mainPage.controller('MainPageCtrl', function ($scope, mainService, trendService, $rootScope) {

    /* * * * * * * * * * * * * define globals * * * * * * * * */

    var dynamicColors = function() {
        var r = Math.floor(Math.random() * 255);
        var g = Math.floor(Math.random() * 255);
        var b = Math.floor(Math.random() * 255);
        return "rgb(" + r + "," + g + "," + b + ")";
    };

    var months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    var barChart = null;
    var years = [];

    /* * * * * * * * * * * * * define scope * * * * * * * * * */

    $scope.categorySelect = null;
    $scope.activeTab = null;

    $scope.categories = [{ id:1,
        categoryName: "Численность трудовых ресурсов", subCategories:[
            {categoryName: "трудоспособное население в трудоспособном возрасте"},
            {categoryName: "иностранные трудовые мигранты"},
            {categoryName: "лица старше трудоспособного возраста"},
            {categoryName: "подростки"}]
    },{id:2,
        categoryName: " Среднегодовая численность занятых в экономике", subCategories:[
            {categoryName: "А – Сельское, лесное хозяйство, охота, рыболовство и рыбоводство"},
            {categoryName: "В – Добыча полезных ископаемых", },
            {categoryName: "С – Обрабатывающие производства" },
            {categoryName: "D – Обеспечение электрическое энергией, газом и паром, кондиционирование воздуха"}]
    },{

    },{

    },{

    },{

    }];



    $scope.userCategories = [{

    },{

    },{

    },{

    }];


    $scope.isLoading = true;

    $scope.categorySelected = function(category){
        categorySelected(category);
    }

    $scope.drawChart = function(subCategory){
        drawChart(subCategory);
    }

    $scope.redirectToManage = function(category){
        $rootScope.category = category;
    }

    /* * * * * * * * * * * * call onload * * * * * * * * * * * * * */

    // TODO Do we need this?)))
    getTestRequest();
    getTrends();

    $scope.years = [];
    setYears();


    categorySelected($scope.categories[0]);
    drawChart($scope.categories[0].subCategories[0]);
    $scope.categories[0].subCategories[0].isChecked = true


    /* * * * * * * * * * * * * chart * * * * * * * * * * * * * * */

    function setData(){
        var data = [];
        angular.forEach($scope.years, function (year){
            data.push( (Math.random() * 10).toFixed(2) )
        })
        return data;
    }

    function setDataSet(subCategory){
        var dataset = [];
        var data = {type: 'line',fill:false, backdropColor:dynamicColors(), label: subCategory.categoryName, data: setData(subCategory) };
        dataset.push(data);
        return dataset;
    }

    function drawChart(subCategory){
        if(barChart!=null) barChart.destroy();
        var chartData = {
            labels: $scope.years,
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

    /* * * * * * * * * * * * trends calculation * * * * * * * * * */
    function getTrends() {
        trendService.people.getAll().then(function(result) {
            console.log(result);
        }, function (error) {
            console.error('Error loading getTrends on mainPage: ', error);
        });
    }


    /* * * * * * * * * * * * * helpers * * * * * * * * * * * * * */
    
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
    }
    //$scope.years = ['2020', '2021', '2022', '2023', '2024', '2025', '2026']

    function categorySelected(category){
        $scope.categorySelect = category
        $scope.activeTab = category.id;
        //drawChart(category.subCategories[0]);
        //category.subCategories[0].isChecked= true
    }

    function getTestRequest() {
        var title = { "title":"TEST" };
        mainService.getTestRequest(title).then(function (response) {
            $scope.testData = response;
            $scope.isLoading = false;
        },function(){
            $scope.isLoading = false;
        });
        /*mainService.getTestRequest(title).then(function (response) {
            $scope.testData = response;
            $scope.isLoading = false;
        },function(){
            $scope.isLoading = false;
        });*/
    }


    /*

        var chartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                type: 'line',
                label: 'Dataset 1',

                borderWidth: 2,
                fill: false,
                data: [
                    1,2,3,4,5
                ]
            },{
                type: 'bar',
                label: 'Dataset 3',

                data: [
                    1,2,3,4,5
                ]
            }]

        };

            var ctx = document.getElementById('canvas').getContext('2d');
            var myMixedChart = new Chart(ctx, {
                type: 'bar',
                data: chartData,
                options: {
                    responsive: true,
                    title: {
                        display: true,
                        text: 'Chart.js Combo Bar Line Chart'
                    },
                    tooltips: {
                        mode: 'index',
                        intersect: true
                    }
                }
            });



        var chartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                type: 'line',
                label: 'Dataset 1',
                borderColor: "122FFF",
                borderWidth: 2,
                fill: false,
                data: [
                    1,2,3,4,5
                ]
            }, {
                type: 'bar',
                label: 'Dataset 2',
                backgroundColor: "FFF",
                data: [
                    1,2,3,4,5
                ],
                borderColor: 'white',
                borderWidth: 2
            }, {
                type: 'bar',
                label: 'Dataset 3',

                data: [
                    1,2,3,4,5
                ]
            }]

        };

            var ctx = document.getElementById('canvas1').getContext('2d');
            var myMixedChart = new Chart(ctx, {
                type: 'bar',
                data: chartData,
                options: {
                    responsive: true,
                    title: {
                        display: true,
                        text: 'Chart.js Combo Bar Line Chart'
                    },
                    tooltips: {
                        mode: 'index',
                        intersect: true
                    }
                }
            });


        var config = {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [
                        486.5,
                        501.5,
                        139.3,
                        162,
                        263.7,
                    ],
                    backgroundColor: [
                        "#F7464A",
                        "#46BFBD",
                        "#FDB45C",
                        "#949FB1",
                        "#4D5360",
                    ],
                    label: 'Expenditures'
                }],
                labels: [
                    "Hospitals: $486.5 billion",
                    "Physicians & Professional Services: $501.5 billion",
                    "Long Term Care: $139.3 billion",
                    "Prescription Drugs: $162 billion",
                    "Other Expenditures: $263.7 billion"
                ]
            },
            options: {
                responsive: true,
                legend: {
                    position: 'bottom',
                },
                title: {
                    display: false,
                    text: 'Chart.js Doughnut Chart'
                },
                animation: {
                    animateScale: true,
                    animateRotate: true
                },
                tooltips: {
                    callbacks: {
                        label: function(tooltipItem, data) {
                            var dataset = data.datasets[tooltipItem.datasetIndex];
                            var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
                                return previousValue + currentValue;
                            });
                            var currentValue = dataset.data[tooltipItem.index];
                            var percentage = Math.floor(((currentValue/total) * 100)+0.5);
                            return percentage + "%";
                        }
                    }
                }
            }
        };


        var ctx = document.getElementById("canvas2").getContext("2d");
        var myDoughnut = new Chart(ctx, config); {

        }
        var ctx = document.getElementById('canvas3').getContext('2d');

        var config2 = {
            type: 'pie',
            data: {
                datasets: [{
                    data: [
                        486.5,
                        501.5,
                        139.3,
                        162,
                        263.7,
                    ],
                    backgroundColor: [
                        "#F7464A",
                        "#46BFBD",
                        "#FDB45C",
                        "#949FB1",
                        "#4D5360",
                    ],
                    label: 'Expenditures'
                }],
                labels: [
                    "Hospitals: $486.5 billion",
                    "Physicians & Professional Services: $501.5 billion",
                    "Long Term Care: $139.3 billion",
                    "Prescription Drugs: $162 billion",
                    "Other Expenditures: $263.7 billion"
                ]
            },
            options: {
                responsive: true,
                legend: {
                    position: 'bottom',
                },
                title: {
                    display: false,
                    text: 'Chart.js Doughnut Chart'
                },
                animation: {
                    animateScale: true,
                    animateRotate: true
                },
                tooltips: {
                    callbacks: {
                        label: function(tooltipItem, data) {
                            var dataset = data.datasets[tooltipItem.datasetIndex];
                            var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
                                return previousValue + currentValue;
                            });
                            var currentValue = dataset.data[tooltipItem.index];
                            var percentage = Math.floor(((currentValue/total) * 100)+0.5);
                            return percentage + "%";
                        }
                    }
                }
            }
        };

        // And for a doughnut chart
        var myDoughnutChart = new Chart(ctx, config2);



        var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var color = Chart.helpers.color;
        var horizontalBarChartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'Dataset 1',

                borderColor: "RED",
                borderWidth: 1,
                data: [
                    1,2,3,4
                ]
            }, {
                label: 'Dataset 2',

                borderColor: "BLUE",
                data: [
                   1,2,3,4
                ]
            }]

        };

        window.onload = function() {
            var ctx = document.getElementById('canvas4').getContext('2d');
            window.myHorizontalBar = new Chart(ctx, {
                type: 'horizontalBar',
                data: horizontalBarChartData,
                options: {
                    // Elements options apply to all of the options unless overridden in a dataset
                    // In this case, we are setting the border of each horizontal bar to be 2px wide
                    elements: {
                        rectangle: {
                            borderWidth: 2,
                        }
                    },
                    responsive: true,
                    legend: {
                        position: 'right',
                    },
                    title: {
                        display: true,
                        text: 'Chart.js Horizontal Bar Chart'
                    }
                }
            });

        };*/


});