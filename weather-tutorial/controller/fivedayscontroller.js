/**
 * Created by admin on 06.07.2017
 */
var app = angular.module('weatherApp');

app.controller('fivedayscontroller', ['$scope', '$routeParams', '$log', 'WeatherService', function ($scope, $routeParams, $log, WeatherService) {

    var self = this;
    $scope.cityInput = $routeParams.city;
    $scope.weatherArray = [];

    if ($scope.cityInput) {
        WeatherService.getFiveDaysWeatherByCity($scope.cityInput)
            .then(function (response) {
                if (response.length > 0) {
                    $scope.weatherArray = response;
                } else {
                    $log.info('Error: in fivedayscontroller');
                    alert('Cannot fetch information for ' + $scope.cityInput);
                }
            })
    }
    
    self.formatTime = function (utcSeconds ) {
        var data = new Date(0); // The 0 there is the key, which sets the date to the epoch
        data.setUTCSeconds(utcSeconds);
        return data;
    }

}]);