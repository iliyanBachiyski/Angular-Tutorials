/**
 * Created by admin on 06.07.2017
 */
var app = angular.module('weatherApp');

app.controller('fivedayscontroller', ['$scope', '$routeParams', '$log', 'WeatherService', function ($scope, $routeParams, $log, WeatherService) {

    var self = this;
    $scope.cityInput = $routeParams.city;
    $scope.weatherArray = [];

}]);