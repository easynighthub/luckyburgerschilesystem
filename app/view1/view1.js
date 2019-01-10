'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', [function($scope) {
  const firestore = firebase.firestore();
  const settings = {/* your settings... */ timestampsInSnapshots: true};
  firestore.settings(settings);



  firestore.collection("clients").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log(doc.id);
       // console.log(`${doc.id} => ${doc.data()}`);
    });
});

}]);