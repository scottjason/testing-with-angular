'use strict'

angular.module('app.core')
  .directive('auth', auth)

function auth() {

  var directive = {
    restrict: 'AE',
    controller: controller,
    scope: {
      user: '='
    },
    templateUrl: 'views/templates/auth.tpl.html'
  }

  return directive

  controller.$inject = ['$scope']

  function controller($scope) {

    $scope.isLoginView = true

    // todo: update to call server and verify jwt token
    $scope.isAuthenticated = function() {
      return typeof $scope.user.auth === 'object' && $scope.user.auth.expiresAt > Date.now()
    }

    $scope.toggle = function() {
      $scope.isLoginView = !$scope.isLoginView
    }

    $scope.onSubmit = function() {
      if (isValidEmail() && isValidPassword()) {
        $scope.errMessage = ''
        console.log('make api call')
        return true
      } else {
        $scope.errMessage = 'invalid credentials'
        return false
      }
    }

    function isValidEmail() {
      var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return typeof $scope.user.email === 'string' && regex.test($scope.user.email)
    }

    function isValidPassword() {
      return typeof $scope.user.password === 'string' && $scope.user.password.length > 5
    }
  }
}
