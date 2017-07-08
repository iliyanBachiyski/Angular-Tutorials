/**
 * Created by admin on 06.07.2017
 */
var app = angular.module('weatherApp');

app.controller('hourlycontroller', ['$scope', '$routeParams', '$log', 'WeatherService', function ($scope, $routeParams, $log, WeatherService) {

    var self = this;
    $scope.cityInput = $routeParams.city;
    $scope.weatherArray = [];

    if ($scope.cityInput) {
        WeatherService.getHourlyWeatherInformation($scope.cityInput)
            .then(function (result) {
                if (result.hourly_forecast) {
                    $scope.weatherArray = result.hourly_forecast;
                    var obj = $scope.weatherArray[0].FCTTIME;
                    $scope.dayOfWeek = obj.weekday_name + ',' + obj.mon_padded + '-' + obj.mon_abbrev + '-' + obj.year;
                } else {
                    alert('Cannot fetch information for ' + $scope.cityInput);
                }
            });
    } else {
        alert('Empty city Input!');
    }
}]);