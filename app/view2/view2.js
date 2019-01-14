'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope','$firebaseArray',function($scope,$firebaseArray) {

  $(dashboard).removeClass("active");
  $(clientes).addClass("active");




  $scope.clientes = []

  var TraerClientes = firebase.database().ref().child('clients');
  var TraerClientesER = $firebaseArray(TraerClientes);
  TraerClientesER.$loaded().then(function () {
    $scope.clientes = TraerClientesER;
    console.log($scope.clientes);

    //     document.getElementById('BarraCargando').style.display = 'none';
});

  console.log(userLogin);



}]);