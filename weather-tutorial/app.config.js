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
                'check' : function ($rootScope,$location) {
                    if(checkForLoggedUser($rootScope)) {
                        $location.path('/home');
                    }
                },
                registeredUsers: function (UserService) {
                    return UserService.getRegisteredUsers();
                }
            }
        })
        .when('/register', {
            templateUrl: 'template/register.html',
            controller: 'registercontroller',
            controllerAs: 'registerCtrl',
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
                    if(!checkForLoggedUser($rootScope)) {
                        $location.path('/');
                    }
                },
                weatherData: function (WeatherService) {
                    return WeatherService.getWeatherByCurrentPosition();
                }
            }
        })
        .when('/fivedays/:city',{
            templateUrl: 'template/fivedays.html',
            controller: 'fivedayscontroller'
        })
        .when('/tendays/:city',{
            templateUrl: 'template/tendays.html',
            controller: 'tendayscontroller',
            controllerAs: 'tenCtrl'
        })
        .when('/hourly/:city',{
            templateUrl: 'template/hourly.html',
            controller: 'hourlycontroller',
            controllerAs: 'hourlyCtrl'
        })
        .otherwise({
            redirectTo : '/'
        });

    function checkForLoggedUser($rootScope) {
        if($rootScope) {
            return $rootScope.hasLoggedUser;
        }
    }
}]);