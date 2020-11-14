
var addUserModal = angular.module('myApp.addUserModalModal', ['ngRoute', 'ui.bootstrap']);

addUserModal.controller('AddUserModalCtrl', function ($scope, $uibModalInstance) {

    $scope.newUser = {};

    $scope.addUser = function(){
        if(!userService.users) userService.users = [];
        userService.users.push($scope.newUser)
    }


    $scope.close = function () {
        close();
    };

    function  close(){
        $uibModalInstance.close();
    }

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});