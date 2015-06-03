// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova'])

  .run(function ($ionicPlatform, $http, $cordovaPush, $rootScope) {
    var iosConfig = {
      "badge": true,
      "sound": true,
      "alert": true,
    };
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
      $cordovaPush.register(iosConfig).then(function (deviceToken) {
        // Success -- send deviceToken to server, and store for future use
        console.log("deviceToken: " + deviceToken)
        alert(deviceToken);
      }, function (err) {
        alert("Registration error: " + err)
      });

      $rootScope.$on('$cordovaPush:notificationReceived', function (event, notification) {
        if (notification.alert) {
          alert(notification.alert);
          navigator.notification.alert(notification.alert);
        }

        if (notification.sound) {
          var snd = new Media(event.sound);
          snd.play();
        }

        if (notification.badge) {
          $cordovaPush.setBadgeNumber(notification.badge).then(function (result) {
            // Success!
          }, function (err) {
            // An error occurred. Show a message to the user
          });
        }
      });

      // WARNING! dangerous to unregister (results in loss of tokenID)
      $cordovaPush.unregister(options).then(function (result) {
        // Success!
      }, function (err) {
        // Error
      });
    });
  })
