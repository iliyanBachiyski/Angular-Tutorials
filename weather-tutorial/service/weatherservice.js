/**
 * Created by admin on 16.06.2017.
 */

var application = angular.module('weatherApp');

application.service('WeatherService',['$http', '$log', function ($http, $log) {
    var API_KEY = '********';
    var URL_WITH_CITY_PARAM = 'http://api.openweathermap.org/data/2.5/weather?q=';
    var self = this;
    var currentPosition = {};

    self.getCurrentPosition = function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                currentPosition = {lat: position.coords.latitude, lng: position.coords.longitude};
            });
        }
        return currentPosition;
    };

    self.getWeatherByCity = function (city) {
        return $http.get(URL_WITH_CITY_PARAM + city + API_KEY)
            .then(function (result) {
                if(result.status === 200) {
                    return result.data;
                } else {
                    return [];
                }
            }, function (error) {
                $log.info('Error: ' + error.data.message);
                return [];
            })
    };

    self.getWeatherByCurrentPossition = function () {

    };


}]);