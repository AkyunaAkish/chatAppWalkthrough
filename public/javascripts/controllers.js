app.controller('MainController', function($scope, $http){
  $http.get('/test').then(function(response){
    $scope.message = response.data;
  })


  var socket = io();

  socket.on('messageFeed', function (data) {
    $scope.chatMessages = data;

    // use $scope.apply in order to make sure the view is updated
    // because this event was fired outside of Angular's digest
    $scope.$apply();
  })


})
