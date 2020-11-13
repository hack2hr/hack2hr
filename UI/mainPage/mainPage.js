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

    };


});