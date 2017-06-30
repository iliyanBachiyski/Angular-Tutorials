/**
 * Created by admin on 16.06.2017.
 */
var app = angular.module('weatherApp');

app.controller('logincontroller',['$scope','$rootScope', '$location','UserService', 'registeredUsers', function ($scope,$rootScope,$location,UserService,registeredUsers) {

    var self = this;
    $rootScope.hasLoggedUser = false;
    $scope.position = {};

    self.login = function () {
        if(registeredUsers.length == 0) {
            alert('Wrong Credentials!');
        } else {
            if(UserService.isValidCredentials($scope.username,$scope.password)) {
                $rootScope.hasLoggedUser = true;
                $location.path('/home');
            } else {
                alert('Wrong Credentials!');
            }
        }

    };

    self.register = function () {
        $location.path('/register');
    };
}]);
