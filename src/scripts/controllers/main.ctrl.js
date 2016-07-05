'use strict'

angular.module('app.core')
  .controller('MainCtrl', MainCtrl)

MainCtrl.$inject = ['$scope']

function MainCtrl($scope) {
  
  $scope.user = {}
}
