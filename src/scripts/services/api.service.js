'use strict'

angular.module('app.core')
  .service('Api', Api)

Api.$inject = ['$http']

function Api($http) {

  function get(url) {
    var request = $http({
      method: 'GET',
      url: url
    })
    return (request.then(successHandler, errorHandler))
  }

  function post(url, data) {
    var request = $http({
      method: 'POST',
      data: data,
      url: url
    })
    return (request.then(successHandler, errorHandler))
  }

  function successHandler(response) {
    return (response)
  }

  function errorHandler(response) {
    return (response)
  }

  return {
    get: get,
    post: post
  }
}
