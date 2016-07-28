myApp.config(function($stateProvider, $urlRouterProvider, $controllerProvider){
      
    
    // For any unmatched url, send to /route1
    $urlRouterProvider.otherwise("index")
    
    $stateProvider
      .state('app', {
          url: "/",
          templateUrl: "layout",
          controller: 'LayoutController',
          resolve: {
            loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                  return $ocLazyLoad.load('app/pages/layout/LayoutController.js');
            }]
          }
      })
        .state('app.main', {
            url: "index",
            templateUrl: "app.main",
            controller: 'MainController',
            resolve: {
              loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load('app/pages/main/MainController.js');
              }]
            }
        })
        .state('app.devices', {
            url: "devices",
            templateUrl: "app.devices",
            controller: 'DevicesController',
            resolve: {
              loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load(['app/pages/devices/DevicesController.js',
                      'app/components/device/deviceDirective.js']);
              }]
            }
        })
        .state('app.device', {
            url: "device",
            templateUrl: "app.device",
            controller: 'DeviceController',
            resolve: {
              loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load('app/pages/device/DeviceController.js');
              }]
            }
        })
        .state('app.charts', {
            url: "charts",
            templateUrl: "app.charts",
            controller: 'ChartsController',
            resolve: {
              loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load('app/pages/charts/ChartsController.js');
              }]
            }
        })
        .state('app.rooms', {
            url: "rooms",
            templateUrl: "app.rooms",
            controller: 'RoomsController',
            resolve: {
              loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load(['app/pages/rooms/RoomsController.js',
                      'app/components/room/roomDirective.js']);
              }]
            }
        })
        .state('app.room', {
            url: "room",
            templateUrl: "app.room",
            params: {room : {},},
            controller: 'RoomController',
            resolve: {
              loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load('app/pages/room/RoomController.js');
              }]
            }
        })
        .state('app.simulation', {
            url: "simulation",
            templateUrl: "app.simulation",
            controller: 'SimulationController',
            resolve: {
              loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load('app/pages/simulation/SimulationController.js');
              }]
            }
        })
        .state('app.profile', {
            url: "profile",
            templateUrl: "app.profile",
            controller: 'ProfileController',
            resolve: {
              loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load(['app/pages/profile/ProfileController.js']);
              }]
            }
        })
        
      .state('login', {
          url: "/login",
          templateUrl: "login",
          controller: "LoginController",
          resolve: {
            loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                  return $ocLazyLoad.load('app/pages/login/LoginController.js');
            }]
          }
      })
      .state('signup', {
          url: "/signup",
          templateUrl: "signup",
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