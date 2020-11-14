
var editUser = angular.module('myApp.editUserModalModal', ['ngRoute', 'ui.bootstrap']);

editUser.controller('EditUserModalCtrl', function ($scope, $uibModalInstance, user, userService) {

    $scope.newUser = JSON.parse(JSON.stringify(user));

    $scope.editUser = function(){
        // userService.users[userService.users.map(function(e){return e.id}).indexOf($scope.newUser.id)] = $scope.newUser; //todo edit user

        // $uibModalInstance.close();
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