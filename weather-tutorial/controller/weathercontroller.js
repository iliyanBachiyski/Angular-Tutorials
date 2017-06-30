/**
 * Created by admin on 16.06.2017.
 */
var app = angular.module('weatherApp');

app.controller('weathercontroller',['$scope', 'WeatherService', 'weaherData', function ($scope, WeatherService, weaherData) {

    var self = this;
    if(weaherData) {
        $scope.weatherInfo = weaherData
    } else {
        $scope.weatherInfo = [];
    }

    $scope.getByCity = function (city) {
        WeatherService.getWeatherByCity(city)
            .then(function (result) {
                $scope.weatherInfo.push(result);
            });
    };

    $scope.getByCurrentPosition = function () {
        $scope.weatherInfo = WeatherService.getWeatherByCurrentPossition();
    };

}]);