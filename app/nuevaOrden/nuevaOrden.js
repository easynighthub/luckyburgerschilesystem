'use strict';

angular.module('myApp.nuevaOrden', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/nuevaOrden', {
    templateUrl: 'nuevaOrden/nuevaOrden.html',
    controller: 'NuevaOrdenCtrl'
  });
}])

.controller('NuevaOrdenCtrl', ['$scope','$firebaseArray',function($scope,$firebaseArray) {

  $(dashboard).addClass("active");
  $(clientes).removeClass("active");


  traerHabitaciones();

  function traerHabitaciones() {
    var buscarHabitaciones = db.ref().child('clients');
    var buscarHabitacionesER = $firebaseArray(buscarHabitaciones);
    buscarHabitacionesER.$loaded().then(function () {
        console.log(buscarHabitacionesER);
        $scope.habitaciones = buscarHabitacionesER;
        $scope.simulateQuery = false;
        $scope.isDisabled    = false;
        $scope.repos         = loadAll();
        $scope.querySearch   = querySearch;
        $scope.selectedItemChange = selectedItemChange;
        $scope.searchTextChange   = searchTextChange;
        function querySearch (query) {
            var results = query ? $scope.repos.filter( createFilterFor(query) ) : $scope.repos,
                deferred;
            if ($scope.simulateQuery) {
                deferred = $q.defer();
                $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
                return deferred.promise;
            } else {
                return results;
            }
        }

        function searchTextChange(text) {
            $log.info('Text changed to ' + text);
        }

        function selectedItemChange(item) {
            $log.info('Item changed to ' + JSON.stringify(item));
            $scope.reserva.habitacionId = item;

        }

        /**
         * Build `components` list of key/value pairs
         */
        function loadAll() {
            var repos = $scope.habitaciones;
            return repos.map( function (repo) {
                repo.value = repo.nombre.toLowerCase();
                return repo;
            });
        }

        /**
         * Create filter function for a query string
         */
        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);

            return function filterFn(item) {
                return (item.value.indexOf(lowercaseQuery) === 0);
            };

        }



    });

}






}]);