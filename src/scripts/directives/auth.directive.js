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

  controller.$inject = ['$scope', 'Api']

  function controller($scope, Api) {

    $scope.isLoginView = true

    // todo: update to call server and verify jwt token
    $scope.isAuthenticated = function() {
      return typeof $scope.user.auth === 'object' && $scope.user.auth.expiresAt > Date.now()
    }

    $scope.toggle = function() {
      $scope.isLoginView = !$scope.isLoginView
    }

    $scope.onSubmit = function() {
      console.log($scope.user)
      if (isValidEmail() && isValidPassword()) {
        $scope.errMessage = ''
        $scope.isLoginView ? login() : signup()
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

    function login() {
      Api.post('/login', $scope.user).then(function(res) {
        if (res.status === 200) {
          $scope.user = res.data.user
          console.log('Login Success', $scope.user)
        } else {
          $scope.errMessage = res.data.message
        }
      }, onError)
    }

    function signup() {
      Api.post('/signup', $scope.user).then(function(res) {
        if (res.status === 200) {
          $scope.user = res.data.user
          console.log('Signup Success', $scope.user)
        } else {
          $scope.errMessage = res.data.message
        }
      }, onError)
    }

    function onError(err) {
      console.log(err)
    }
  }
}
