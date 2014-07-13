var app = angular.module('app', ['ngRoute']);

app.config(function ($routeProvider, $locationProvider) {
	
	//configure the routing rules here
	$routeProvider.when('/api/:month', {
		controller: 'mainCtrl'

	//routing DOESN'T work without html5Mode
	$locationProvider.html5Mode(true);
	});
};

app.controller('mainCtrl', function($rootScope,$scope,$routeParams, $route){
	var month;

	$rootScope.$on('$routeChangeSuccess', function () {
            console.log($routeParams.id);
            console.log($routeParams.type)
            month = $routeParams.id;
        });

	//$scope.data = {};

	$http.get('/api/'+month)
		.success(function(data){
			//$scope.flights = data;
			console.log(data);
		})
		.error(function(data){
			console.log('error: '+data);
		});
});