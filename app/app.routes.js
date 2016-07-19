myApp.config(function($stateProvider, $urlRouterProvider, $controllerProvider){
      
    
    // For any unmatched url, send to /route1
    $urlRouterProvider.otherwise("index")
    
    $stateProvider
      .state('app', {
          url: "/",
          templateUrl: "app/pages/layout/layout.html",
          controller: 'LayoutController',
          resolve: {
            loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                  return $ocLazyLoad.load('app/pages/layout/LayoutController.js');
            }]
          }
      })
        .state('app.main', {
            url: "index",
            templateUrl: "app/pages/main/app.main.html",
            controller: 'MainController',
            resolve: {
              loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load('app/pages/main/MainController.js');
              }]
            }
        })
        .state('app.devices', {
            url: "devices",
            templateUrl: "app/pages/devices/app.devices.html",
            controller: 'DevicesController',
            resolve: {
              loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load('app/pages/devices/DevicesController.js');
              }]
            }
        })
        .state('app.device', {
            url: "device",
            templateUrl: "app/pages/device/app.device.html",
            controller: 'DeviceController',
            resolve: {
              loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load(['app/pages/device/DeviceController.js',
                      'app/components/device/deviceDirective.js']);
              }]
            }
        })
        .state('app.charts', {
            url: "charts",
            templateUrl: "app/pages/charts/app.charts.html",
            controller: 'ChartsController',
            resolve: {
              loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load('app/pages/charts/ChartsController.js');
              }]
            }
        })
        .state('app.rooms', {
            url: "rooms",
            templateUrl: "app/pages/rooms/app.rooms.html",
            controller: 'RoomsController',
            resolve: {
              loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load('app/pages/rooms/RoomsController.js');
              }]
            }
        })
        .state('app.room', {
            url: "room",
            templateUrl: "app/pages/room/app.room.html",
            controller: 'RoomController',
            resolve: {
              loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load('app/pages/room/RoomController.js');
              }]
            }
        })
        .state('app.simulation', {
            url: "simulation",
            templateUrl: "app/pages/simulation/app.simulation.html",
            controller: 'SimulationController',
            resolve: {
              loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load('app/pages/simulation/SimulationController.js');
              }]
            }
        })
        .state('app.profile', {
            url: "profile",
            templateUrl: "app/pages/profile/app.profile.html",
            controller: 'ProfileController',
            resolve: {
              loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load(['app/pages/profile/ProfileController.js']);
              }]
            }
        })
        
      .state('login', {
          url: "/login",
          templateUrl: "app/pages/login/login.html",
          controller: "LoginController",
          resolve: {
            loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                  return $ocLazyLoad.load('app/pages/login/LoginController.js');
            }]
          }
      })
      .state('signup', {
          url: "/signup",
          templateUrl: "app/pages/signup/signup.html",
          controller: "SignupController",
          resolve: {
            loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                  return $ocLazyLoad.load('app/pages/signup/SignupController.js');
            }]
          }
      })
      //   .state('route2.list', {
      //       url: "/list",
      //       templateUrl: "route2.list.html",
      //       controller: function($scope){
      //         $scope.things = ["A", "Set", "Of", "Things"];
      //       }
      //   })
  })