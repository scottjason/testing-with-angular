beforeEach(module('app.core'))

beforeEach(inject(function($rootScope, $compile, $templateCache, authDirective) {
  scope = $rootScope.$new()
  $templateCache.put(authDirective[0].templateUrl, '')

  element = angular.element("<auth user='user'></auth>")
  $compile(element)(scope)
  scope.user = {}
  scope.user.auth = {}
  scope.$digest()
  // note the call to isolateScope() is after the digest
  $scope = element.isolateScope()
}))

it('isAuthenticated() should return false due to expired token', inject(function() {
  scope.user.auth.expiresAt = Date.now() + 8.64e+7 // 24 hours from now  
  expect($scope.isAuthenticated()).toEqual(true)
}))

it('isAuthenticated() should return true due to an unexpired token', inject(function() {
  $scope = element.isolateScope()
  $scope.user.auth.expiresAt = Date.now()
  expect($scope.isAuthenticated()).toEqual(false)
}))

it('onSubmit() should return true due to valid crendens', inject(function() {
  $scope.user.email = 'scottleejason@gmail.com'
  $scope.user.password = 'avalidpasswordstring'
  expect($scope.onSubmit()).toEqual(true)
}))

it('onSubmit() should return false due to invalid crendens', inject(function() {
  $scope.user.email = 'invalid-email@gmail'
  $scope.user.password = 'avalidpasswordstring'
  expect($scope.onSubmit()).toEqual(false)
}))

it('onSubmit() should return an error message that is a string of length > zero when credens are invalid', inject(function() {
  $scope.user.email = 'invalid-email@gmail'
  $scope.user.password = 'avalidpasswordstring'
  $scope.onSubmit()
  expect($scope.errMessage).toBeTruthy()
}))

it('onSubmit() should return an error message that is a string of length zero when credens are valid', inject(function() {
  $scope.user.email = 'scottleejason@gmail.com'
  $scope.user.password = 'avalidpasswordstring'
  $scope.onSubmit()
  expect($scope.errMessage).toBeFalsy()
}))
