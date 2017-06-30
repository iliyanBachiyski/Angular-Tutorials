/**
 * Created by admin on 16.06.2017.
 */

var application = angular.module('weatherApp');

application.service('WeatherService',['$http', '$log', function ($http, $log) {
    var API_KEY = '&appid=********';
    var URL = 'http://api.openweathermap.org/data/2.5/weather';
    var CITY_PARAM_EXTENSION = '?q=';
    var COORDINATES_PARAM_EXTENSION = '?lat=lat_param&lon=lon_param';
    var self = this;
    var currentPosition = {};

    self.getCurrentPosition = function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                currentPosition = {lat: position.coords.latitude, lng: position.coords.longitude};
            });
        }
    };

    self.getWeatherByCity = function (city) {
        return $http.get(URL + CITY_PARAM_EXTENSION + city + API_KEY)
            .then(function (result) {
                if(result.status === 200) {
                    return result.data;
                } else {
                    return {};
                }
            }, function (error) {
                $log.info('Error: ' + error.data.message);
                return {};
            })
    };

    self.getWeatherByCurrentPosition = function () {
        self.getCurrentPosition();
        if(currentPosition) {
            var latitude = currentPosition.lat;
            var longitude = currentPosition.lng;
            var coordinatesURL = COORDINATES_PARAM_EXTENSION
                .replace('lat_param', latitude)
                .replace('lon_param', longitude);
            return $http.get(URL + coordinatesURL + API_KEY)
                .then(function (result) {
                    if(result.status === 200) {
                        return result.data;
                    } else {
                        return {};
                    }
                }, function (error) {
                    $log.info('Error: ' + error.data.message);
                    return {};
                })
        } else {
            $log.info('Cannot fetch current position');
            return [];
        }
    };


}]);