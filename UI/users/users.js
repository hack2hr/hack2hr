'use strict';

var users = angular.module('myApp.users', ['ngRoute']);

users.controller('UsersCtrl', function ($scope, userService) {
    uploadUsers();

    function uploadUsers() {
        userService.getAllUsers().then(function (response) {
            $scope.users = response;
        }, function(error) {
            console.error(error);
        });
    }


    $scope.deleteUser = function(user){
        var id = { _id: user._id }
        userService.deleteUser(id);
    }

    $scope.editUser = function(user){
        userService.editUserModal(user);
    }

    $scope.addUserModal = function(){
        userService.addUserModal().then(function(result) {
            if (result) {
                uploadUsers();
            }
        }, function(error) {
            console.error('UsersCtrl     addUserModal: ', error);
        })
    }

});