/**
 * Created by admin on 16.06.2017.
 */
var app = angular.module('weatherApp');

app.controller('weathercontroller',['$scope', 'WeatherService', 'weaherData', function ($scope, WeatherService, weaherData) {

    var self = this;
    //TODO: Check if in arrays has object with same name, drop it and push it with new values
    $scope.weatherInfo = [];
    $scope.weatherInfoByCurrentLocation = {};

    if(weaherData.name) {
        $scope.weatherInfoByCurrentLocation = weaherData;
    }

    $scope.getByCity = function (city) {
        WeatherService.getWeatherByCity(city)
            .then(function (result) {
                if(result.name) {
                    $scope.weatherInfo.push(result);
                }
            });
    };

    $scope.getByCurrentPosition = function () {
        WeatherService.getWeatherByCurrentPosition()
            .then(function (result) {
                if(result.name) {
                    $scope.weatherInfo.push(result);
                }
            });
    };

}]);