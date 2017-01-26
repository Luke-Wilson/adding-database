angular.module('my-app.messages', [])
.controller('messageController', ($scope, Messages) => {
  $scope.messages = [];

  //function to get all messages from Messages service
  $scope.getMessages = () => {
    Messages.getMessages()
    .then(data => {
      $scope.messages = data;
    })
  }

  //get messages on initial load
  $scope.getMessages();

  //function to send a message via Messages service to DB
  $scope.sendMessage = (text) => {
    Messages.sendMessage(text)
    .then(data => {
      $scope.test = data;
      $scope.getMessages();
    });
  };
})