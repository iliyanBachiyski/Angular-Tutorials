/**
 * Created by admin on 16.06.2017.
 */
var app = angular.module('weatherApp');

app.controller('weathercontroller',['$scope','$rootScope','$location', '$log', 'WeatherService', 'weatherData',
    function ($scope, $rootScope,$location, $log, WeatherService, weatherData) {

    var self = this;
    $scope.recentSearchesNamesList = [];
    $scope.currentWeatherInformation = {};
    $scope.weatherInfoByCurrentLocation = {};
    $scope.showRecentSearches = false;

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
                } else {
                    alert('Cannot fetch current position');
                }
            });
    };

    $scope.logout = function () {
        $rootScope.hasLoggedUser = false;
        $location.path('/');
    };

}]);