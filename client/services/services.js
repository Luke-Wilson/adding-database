angular.module('my-app.services', [])
.factory('Messages', ($http) => {
  return {
    //sends a message to server
    sendMessage: (text) => {
      var data = {text: text};
      return $http({
        method: 'POST',
        url: '/api/messages',
        data: data
      })
      .then(resp => {
        return resp.data;
      });
    },

    //gets all messages from server
    getMessages: () => {
      return $http({
        method: 'GET',
        url: '/api/messages'
      })
      .then(resp => {
        return resp.data;
      });
    }
  };
});
