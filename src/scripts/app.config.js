'use strict'

angular.module('app.core')
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('landing', {
        url: '/',
        controller: 'MainCtrl',
        templateUrl: 'views/layouts/landing.layout.html'
      })
    $urlRouterProvider.otherwise('/')
  })
