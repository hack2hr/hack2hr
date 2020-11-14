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

    $scope.categories = [{
        id: 'people',
        title: "Численность трудовых ресурсов",
        subCategories: {
            workAble: { name: 'Трудоспособное население в трудоспособном возрасте', years: {} },
            migrants: { name: 'Иностранные трудовые мигранты', years: {} },
            'other.old': { name: 'Лица старше трудоспособного возраста', years: {} },
            'other.young': { name: 'Подростки', years: {} }
        }
    }];

    // {
    //     id: 'production',
    //     title: "Среднегодовая численность занятых в экономике",
    //     subCategories: {
    //         a: { name: 'А – Сельское, лесное хозяйство, охота, рыболовство и рыбоводство', years: {} },
    //         b: { name: 'В – Добыча полезных ископаемых', years: {} },
    //         c: { name: 'С – Обрабатывающие производства', years: {} },
    //         d: { name: 'D – Обеспечение электрическое энергией, газом и паром, кондиционирование воздуха', years: {} }
    //     }
    // }



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

    $scope.redirectToManage = function(selectedSubName, category){
        $rootScope.category = category;
        $rootScope.subCategories = JSON.parse(JSON.stringify($scope.categorySelect.subCategories));
        delete $rootScope.subCategories[selectedSubName];
    }

    /* * * * * * * * * * * * call onload * * * * * * * * * * * * * */

    // getTestRequest();
    $scope.years = [];
    setYears();

    getTrends()
        .then(setTrends)
        .then(function() {
            categorySelected($scope.categories[0]);
            drawChart($scope.categorySelect.subCategories.workAble);
            $scope.categorySelect.subCategories.workAble.isChecked = true;
            tryDigest();
            $scope.isLoading = false;
        });

    function tryDigest() {
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    }

    /* * * * * * * * * * * * * chart * * * * * * * * * * * * * * */

    function setDataByLabels(labels){
        var data = [];
        angular.forEach(labels, function (label){
            data.push(((Math.random() * 10)+1).toFixed(2))
        })
        return data;
    }

    function setDataSet(subCategory){
        var dataset = [];
        var data = {
            type: 'line',
            fill: false,
            backdropColor: dynamicColors(),
            label: subCategory.name,
            data: Object.values(subCategory.years).map(function(value) {
                return Number(value).toFixed(2);
            })
        };
        dataset.push(data);
        return dataset;
    }

    function colorsSet(labels){
        var colors = [];
        angular.forEach(labels, function (label){
            colors.push(dynamicColors())
        })
        return colors;
    }

    function setDefaultDataSetPrograssBar(progressLabels){
        var data = [] ;
        angular.forEach(progressLabels, function (label){
            data.push({label: label, backgroundColor: dynamicColors(), data: ((Math.random() * 10)+1).toFixed(2) });
        })
        return data;
    }

    function drawChart(subCategory){
        if(barChart!=null) barChart.destroy();
        var chartData = {
            labels: $scope.years,
            datasets: setDataSet(subCategory)
        };

        var ctx = document.getElementById('canvas').getContext('2d');
        barChart = new Chart(ctx, {
            type: 'line',
            data: chartData,
            options: {
                title: {
                    position:'left',
                    display: true,
                    text: 'Ресурсы'
                },
                //tooltips: {
                //    mode: 'index',
                //    intersect: true
                //}
            }
        });
    }

    var progressLabels = ['Неутверждено категорий', 'Утверждено категорий', 'Незаполненных категорий']
    drawHor();
     function drawHor(){
        var horizontalBarData = {
            labels: "1",
            datasets: setDefaultDataSetPrograssBar(progressLabels)
        };
        var ctx = document.getElementById('canvasVert').getContext('2d');
        var myHorizontalBar = new Chart(ctx, {
            type: 'horizontalBar',
            data: horizontalBarData,
            options: {
                // Elements options apply to all of the options unless overridden in a dataset
                // In this case, we are setting the border of each horizontal bar to be 2px wide
                elements: {
                    rectangle: {
                        borderWidth: 2,
                    }
                },
                indexAxis: 'y',
                responsive: true,
                legend: {
                    position: 'right',
                },
                title: {
                    display: true,
                    text: 'Прогресс по категориям'
                }
            }
        });
    }

    var categoryPercent = ['Сельское хозяйство', 'Полезные ископаемые', 'Строительство']
    drawCategoryProgress();
    function drawCategoryProgress(){
        var pieData = {
            labels:categoryPercent,
            datasets: [{label:"Data", data:setDataByLabels(categoryPercent),backgroundColor:colorsSet(categoryPercent)}]
        };
        var ctx = document.getElementById('canvasPercents').getContext('2d');
        var myHorizontalBar = new Chart(ctx, {
            type: 'doughnut',
            data: pieData,
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
                    text: 'Доля по категориям'
                }
            }
        });
    }

    /* * * * * * * * * * * * trends calculation * * * * * * * * * */
    function getTrends() {
        return Promise.all(
            $scope.categories.map(function(trend) {
                return trendService[trend.id].getAll();
            })
        );
    }

    function setTrends(uploadedTrends) {
        var QUATER_AMOUNT = 4;

        uploadedTrends.forEach(function(categoryTrend, index) {
            categoryTrend.forEach(function(trend) {
                var params = JSON.parse(JSON.stringify($scope.categories[index].subCategories));
                Object.keys(params).forEach(function(param) {
                    //var total = Object.keys(trend.data).reduce(function(sum, quater) {
                    //    return sum + parseParam(param.split('.'), trend.data[quater]);
                    //}, 0);

                    $scope.categories[index].subCategories[param].years[trend.year] = trend.totalyear ;// / QUATER_AMOUNT;
                });
            });
        });

        return Promise.resolve();
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

    function categorySelected(category){
        $scope.categorySelect = category;
        $scope.activeTab = category.id;
    }

    function parseParam(path, data) {
        if (path.length == 1) {
            return parseFloat(data[path[0]]);
        }
        return parseParam(path.slice(1), data[path[0]])
    }

    // function getTestRequest() {
    //     var title = { "title":"TEST" };
    //     mainService.getTestRequest(title).then(function (response) {
    //         $scope.testData = response;
    //         $scope.isLoading = false;
    //     },function(){
    //         $scope.isLoading = false;
    //     });
    //     /*mainService.getTestRequest(title).then(function (response) {
    //         $scope.testData = response;
    //         $scope.isLoading = false;
    //     },function(){
    //         $scope.isLoading = false;
    //     });*/
    // }


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