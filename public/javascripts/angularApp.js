var app = angular.module('flapperNews', ['ui.router']);

app.factory('results', [function(){
  // service body
  var r = {
  	results : []
  };
  return r;
}]);

app.controller('ResultsCtrl', [
'$scope',
'$stateParams',
'results',
function($scope, $stateParams, results){
	$scope.result = results.results[$stateParams.id];

	$scope.addComment = function(){
	  if($scope.body === '') { return; }
	  $scope.result.comments.push({
	    body: $scope.body,
	    author: 'user',
	    upvotes: 0
	  });
	  $scope.body = '';
	};
}]);

app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl'
    })
    .state('results', {
  	  url: '/results/{id}',
  	  templateUrl: '/results.html',
  	  controller: 'ResultsCtrl'
	});

  $urlRouterProvider.otherwise('home');
}]);

app.controller('MainCtrl', [
'$scope',
'results',
function($scope, results){
  
  /*
  $scope.results = [
  { title : 'JUDGE 1', upvotes : 2 },
  {title :  'JUDGE 2', upvotes : 3 },
  {title :  'JUDGE 3', upvotes : 2 },
  {title :  'JUDGE 4', upvotes : 5 }
  ];
  */
  $scope.results = results.results;

  $scope.addPost = function(){
  	if(!$scope.title || $scope.title === '') { return ;}
  	$scope.results.push({
  		title: $scope.title, 
  		link: $scope.link,
  		upvotes: 0,
  		comments: [
    		{author: 'Joe', body: 'Cool post!', upvotes: 0},
    		{author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
  		]
  	});
  	$scope.title = '';
  	$scope.link = '';
  };

  $scope.incrementUpvotes = function(result) {
  	result.upvotes += 1;
  };

}]);	

/*
angular.module('flapperNews', [])

.controller('MainJudgeCtrl', [
	'$scope', 
	function($scope, $http) {
		$http.get('http://localhost:7474/db/data/cypher').
		success(function(data) {
			$scope.judges = data;
		});
	}]);

	*/
app.controller('SearchCtrl', ['$scope', '$http', function($scope, $http) {

var r = $http;
var txUrl = "http://localhost:7474/db/data/transaction/commit";
var data = [];
function cypher(query,params,cb) {
   data = r.post({uri:txUrl,
          json:{statements:[{statement:query,parameters:params}]}},
         function(err,res) { cb(err,res.body)})
}

}]);