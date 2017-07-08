/**
 * Created by admin on 16.06.2017.
 */
var app = angular.module('weatherApp');

app.controller('weathercontroller',['$scope','$rootScope','$location', '$log', '$timeout', 'WeatherService', 'weatherData',
    function ($scope, $rootScope,$location, $log, $timeout, WeatherService, weatherData) {

    var self = this;
    $scope.recentSearchesNamesList = [];
    $scope.currentWeatherInformation = {};
    $scope.weatherInfoByCurrentLocation = {};
    $scope.showRecentSearchesFlag = false;

    if(weatherData.name) {
        $scope.weatherInfoByCurrentLocation = weatherData;
    }

    $scope.getByCity = function (city) {
        if(city) {
            WeatherService.getWeatherByCity(city)
                .then(function (result) {
                    if (result.name) {
                        $scope.recentSearchesNamesList.forEach(function (name,index) {
                            if(name === result.name) {
                                $scope.recentSearchesNamesList.splice(index,1);
                            }
                        });
                        $scope.recentSearchesNamesList.unshift(result.name);
                        $scope.currentWeatherInformation = result;
                    } else {
                        alert('Cannot fetch information for ' + city);
                    }
                });
        } else {
            alert('Empty city Input!');
        }

    };

    $scope.getByCurrentPosition = function () {
        WeatherService.getWeatherByCurrentPosition()
            .then(function (result) {
                if(result.name) {
                    $scope.weatherInfoByCurrentLocation = result;
                    $scope.recentSearchesNamesList.unshift(result.name);
                } else {
                    alert('Cannot fetch current position');
                }
            });
    };

    $scope.logout = function () {
        $rootScope.hasLoggedUser = false;
        $location.path('/');
    };

    //set $timeout to refresh data for current position every 10 minutes
    var timeout = $timeout(function () {
        $scope.getByCurrentPosition();
    },60000*10);

    //when $scope destroyed we need to cancel $timeout to protect yourself from memory leaks
    $scope.$on('$destroy', function () {
        $timeout.cancel(timeout);
    });

    //Use for scroll to recent search area when click button and scroll to page-top when the area are hiding
    $scope.showRecentSearches = function () {
        $scope.showRecentSearchesFlag = !$scope.showRecentSearchesFlag;
        var element = document.getElementById('home');
        if($scope.showRecentSearchesFlag) {
            event.preventDefault();
            $('html,body,div').animate({scrollTop: element.getBoundingClientRect().bottom}, 1000);
        } else {
            event.preventDefault();
            $('html,body,div').animate({scrollTop: element.getBoundingClientRect().top}, 1000);
        }
    };
}]);