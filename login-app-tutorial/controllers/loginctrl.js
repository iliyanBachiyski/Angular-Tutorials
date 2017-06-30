var app = angular.module('loginApp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider){
	$routeProvider
	.when('/',{
		templateUrl: 'templates/login.html'
	})
	.when('/home',{
		templateUrl: 'templates/home.html',
		//When match '/home' URL we need to check flag. If user credentials are valid we redirect to '/home' else redirect to 'login' 
		resolve: {
			'check' : function($rootScope, $location) {
				if(!$rootScope.isLogged) {
					$location.path('/');
				}
			}
		}
	})
	.when('/persons',{
		templateUrl : 'templates/persons.html',
		resolve: {
			'check' : function($rootScope, $location) {
				if(!$rootScope.isLogged) {
					$location.path('/');
				}
			}
		}
	})
	.otherwise({
		redirectTo : '/'
	});
}]);

app.controller('loginCtrl', ['$scope', '$rootScope', '$location',function($scope,$rootScope,$location){

	$rootScope.isLogged = false;
	 
	$scope.submit = function() {
		//Here we need to authenticated user(This is dummy check only for example)
		if($scope.username == 'admin' && $scope.password == 'admin') {
			//If user successfully authenticated set flaг to 'true' and put username to $rootScope
			$rootScope.loggedUser = $scope.username;
			$rootScope.isLogged = true;
			$location.path('/home');
		} else {
			//If user credentials is invalid show alert message
			alert('Wrong Credentials!');
		}
	};
}]);

app.controller('homeController', ['$scope', '$rootScope', function($scope,$rootScope){
	$scope.username = $rootScope.loggedUser;
}]);

app.controller('requestController',['$scope', '$http' ,function($scope,$http){
	//Use '$http' directive for make GET request and fetch some data. After that we will display in our p'ersons.html' template
	$scope.persons = [];
	$http.get('http://127.0.0.1:8080/data.json')
	.then(function(response){
		$scope.persons = response.data.values;
	});
}]);