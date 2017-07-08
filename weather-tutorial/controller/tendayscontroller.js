/**
 * Created by admin on 06.07.2017
 */
var app = angular.module('weatherApp');

app.controller('tendayscontroller', ['$scope', '$routeParams', '$log', 'WeatherService', function ($scope, $routeParams, $log, WeatherService) {

    var self = this;
    $scope.cityInput = $routeParams.city;
    $scope.weatherArray = [];
    $scope.location;
    if ($scope.cityInput) {
        WeatherService.getTenDaysWeatherByCity($scope.cityInput)
            .then(function (result) {
                if (result) {
                    $scope.weatherArray = result;
                    //$scope.location = result.city.name + ',' + result.city.country;
                } else {
                    alert('Cannot fetch information for ' + $scope.cityInput);
                }
            });
    } else {
        alert('Empty city Input!');
    }

}]);