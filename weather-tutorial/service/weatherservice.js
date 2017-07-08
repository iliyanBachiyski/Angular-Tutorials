/**
 * Created by admin on 16.06.2017.
 */

var application = angular.module('weatherApp');

application.service('WeatherService',['$http', '$log', function ($http, $log) {
    var OPENWEATHER_API_KEY = '&appid=********';
    var WUNDERGROUND_API_KEY = '********';
    var HOURLY_URL = 'http://api.wunderground.com/api/' + WUNDERGROUND_API_KEY + '/hourly/q/{country_code}/{city}.json';
    var URL = 'http://api.openweathermap.org/data/2.5/';
    var CURRENT_WEATHER_URL = URL + 'weather';
    var FIVE_DAYS_FORECAST_URL = URL + 'forecast';
    var DAYS_FORECAST_CNT = '&cnt=10';
    var CITY_PARAM_EXTENSION = '?q={city_param}&units=metric';
    var COORDINATES_PARAM_EXTENSION = '?lat=lat_param&lon=lon_param&units=metric';
    var TEN_DAY_FORECAST_URL = 'http://api.wunderground.com/api/'+WUNDERGROUND_API_KEY+'/forecast10day/q/{country_code}/{city}.json';
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
        return $http.get(CURRENT_WEATHER_URL + CITY_PARAM_EXTENSION.replace('{city_param}',city) + OPENWEATHER_API_KEY)
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

    self.getTenDaysWeatherByCity = function (city) {
        return self.getCountryCode(city)
            .then(function (countryCode) {
                if (countryCode) {
                    var URL = TEN_DAY_FORECAST_URL
                        .replace('{country_code}', countryCode)
                        .replace('{city}', city);
                    return $http.get(URL)
                        .then(function (result) {
                            if (result.status === 200) {
                                return result.data.forecast.simpleforecast.forecastday;
                            } else {
                                return [];
                            }
                        }, function (error) {
                            $log.info('Error: ');
                            return [];
                        })
                }
            });
    };

    self.getHourlyWeatherInformation = function (city) {
        return self.getCountryCode(city)
            .then(function (result) {
                var countryCode = result;
                if(countryCode) {
                    var URL = HOURLY_URL
                        .replace('{country_code}',countryCode)
                        .replace('{city}', city);
                    return $http.get(URL)
                        .then(function (result) {
                            if(result.status === 200) {
                                return result.data;
                            } else {
                                return [];
                            }
                        }, function (error) {
                            $log.info('Error: ');
                            return [];
                        })
                } else {
                    return null;
                }
            });
    };

    self.getCountryCode = function (city) {
        return $http.get(CURRENT_WEATHER_URL + CITY_PARAM_EXTENSION.replace('{city_param}', city) + OPENWEATHER_API_KEY)
            .then(function (result) {
                if (result.status === 200) {
                    return result.data.sys.country;
                } else {
                    return null;
                }
            }, function (error) {
                $log.info('Error: ' + error.data.message);
                return null;
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
            return $http.get(CURRENT_WEATHER_URL + coordinatesURL + OPENWEATHER_API_KEY)
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