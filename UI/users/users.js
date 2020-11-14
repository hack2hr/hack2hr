'use strict';

var users = angular.module('myApp.users', ['ngRoute']);

users.controller('UsersCtrl', function ($scope, userService) {

    $scope.users = userService.users;

    $scope.editUser = function(user){
        userService.editUserModal(user);
    }

    $scope.addUserModal = function(){
        userService.addUserModal();
    }

});