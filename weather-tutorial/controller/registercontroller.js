/**
 * Created by admin on 16.06.2017.
 */

var application = angular.module('weatherApp');

application.controller('registercontroller',['$scope', '$location','UserService', 'registeredUsers', function ($scope, $location,UserService, registeredUsers) {
    var self = this;

    self.register = function () {
        var username = $scope.username;
        var password = $scope.password;
        var obj = {username:username,password:password};

        if(registeredUsers) {
            if(UserService.isUserContains(obj)) {
                alert('User Already Exist!')
            } else {
                UserService.registerUser(obj);
                $location.path('/');
            }
        } else {
            UserService.registerUser(obj);
            $location.path('/');
        }
    };

}]);
