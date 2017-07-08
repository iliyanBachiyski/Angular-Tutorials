/**
 * Created by admin on 07.07.2017.
 */
(function () {

    var module = angular.module('weatherApp');

    module.component('weathermenu', {
        templateUrl: '../template/menu.template.html',
        controller: MenuController,
        controllerAs: 'menuCtrl',
        bindings: {
            city: "@"
        }
    });

    function MenuController($location) {

        var self = this;

        self.menuItemsList = [{name:'Current',href:'home'},{name:'Hourly',href:'hourly'},
            {name:'5-Days(Hourly)',href:'fivedays'}, {name:'10-Days',href:'tendays'}
        ];

        self.goToAnotherPage = function (href) {
            if(href === 'home') {
                if($location.path() !== '/home') {
                    $location.path('/' + href);
                }
            } else {
                if (self.city) {
                    $location.path('/' + href + '/' + self.city);
                }
                else {
                    alert('Please Input City!');
                }
            }
        };
    }
}());