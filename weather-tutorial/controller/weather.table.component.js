/**
 * Created by admin on 06.07.2017.
 */
(function () {

    var module = angular.module('weatherApp');

    module.component('weathertable', {
        templateUrl: '../template/weather.table.template.html',
        controller: WeatherController,
        controllerAs: 'ctrl',
        bindings : {
            weather: "="
        }
    });

    function WeatherController() {
        //For now use empty controller
    }
}());