/**
 * Created by admin on 16.06.2017.
 */

var application = angular.module('weatherApp', ['ngRoute']);

application.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/',{
            templateUrl: 'template/login.html',
            controller: 'logincontroller',
            controllerAs: 'loginCtrl',
            resolve: {
                registeredUsers: function (UserService) {
                    return UserService.getRegisteredUsers();
                }
            }
        })
        .when('/home',{
            templateUrl: 'template/home.html',
            controller: 'weathercontroller',
            controllerAs: 'weatherCtrl',
            resolve: {
                'check' : function ($rootScope,$location) {
                    if(!$rootScope.hasLoggedUser) {
                        $location.path('/');
                    }
                },
                weaherData: function (WeatherService) {
                    return WeatherService.getWeatherByCurrentPosition();
                }
            }
        })
        .when('/register',{
            templateUrl: 'template/register.html',
            controller: 'registercontroller',
            controllerAs: 'registerCtrl',
            resolve: {
                registeredUsers: function (UserService) {
                    return UserService.getRegisteredUsers();
                }
            }
        })
        .otherwise({
            redirectTo : '/'
        });
}]);