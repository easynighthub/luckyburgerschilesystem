'use strict';

angular.module('myApp.nuevaOrden', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/nuevaOrden', {
            templateUrl: 'nuevaOrden/nuevaOrden.html',
            controller: 'NuevaOrdenCtrl'
        });
    }])

    .controller('NuevaOrdenCtrl', ['$scope', '$firebaseArray', function ($scope, $firebaseArray) {

        $(dashboard).addClass("active");
        $(clientes).removeClass("active");


        $scope.pedido = [];
        traerClientes();

        function traerClientes() {
            var buscarClientes = db.ref().child('clients');
            var buscarClientesER = $firebaseArray(buscarClientes);
            buscarClientesER.$loaded().then(function () {
                console.log(buscarClientesER);
                $scope.clientes = buscarClientesER;
                $scope.simulateQuery = false;
                $scope.isDisabled = false;
                $scope.repos = loadAll();
                $scope.querySearch = querySearch;
                $scope.selectedItemChange = selectedItemChange;
                $scope.searchTextChange = searchTextChange;
                $scope.newState = newState;

                function querySearch(query) {
                    if (!query) return;
                    var results = query ? $scope.repos.filter(createFilterFor(query)) : $scope.repos,
                        deferred;
                    if ($scope.simulateQuery) {
                        deferred = $q.defer();
                        $timeout(function () { deferred.resolve(results); }, Math.random() * 1000, false);
                        return deferred.promise;
                    } else {
                        return results;
                    }
                }

                function searchTextChange(text) {
                    console.log (text)
                    if (text == ''){

                        $scope.nombre = '';
                        $scope.apellido= '';
                        $scope.correo= '';
                        $scope.direccion= '';
                    }
                    console.log('Text changed to ' + text);
                }

                function selectedItemChange(item) {
                    console.log('Item changed to ' + JSON.stringify(item));
                    $scope.pedido.userId = item.$id;

                    $scope.nombre = item.nombre;
                    $scope.apellido= item.apellido;
                    $scope.correo= item.correo;
                    $scope.direccion= item.value;




                }

                /**
                 * Build `components` list of key/value pairs
                 */
                function loadAll() {
                    var repos = $scope.clientes;
                    return repos.map(function (repo) {
                        repo.value = repo.telefono.toString();

                        return repo;
                    });
                }

                /**
                 * Create filter function for a query string
                 */
                function createFilterFor(query) {
                    console.log(query);
                    console.log("ho");
                    var lowercaseQuery = query;
                     var lowercaseQuery = angular.lowercase(query);

                    return function filterFn(item) {
                 return (item.value.indexOf(lowercaseQuery) === 0);
                    };

                }

                function newState(searchText){
                    console.log(searchText);

                    $('#md-autocomplete-wrap').removeClass("md-menu-showing");
                }



            });

        }






    }]);