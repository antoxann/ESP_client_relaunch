myApp.config(function($stateProvider, $urlRouterProvider, $controllerProvider) {
      
    $urlRouterProvider.otherwise("index")
    
    $stateProvider
      .state('app', {
          url: "/",
          templateUrl: "layout",
          controller: 'LayoutController',
          resolve: {
            authenticate: authenticate,
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
              authenticate: authenticate,
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
              authenticate: authenticate,
              loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load(['app/pages/devices/DevicesController.js',
                      'app/components/device/deviceDirective.js']);
              }]
            }
        })
        .state('app.device', {
            url: "device",
            templateUrl: "app.device",
            params: {device : {}},
            controller: 'DeviceController',
            resolve: {
              authenticate: authenticate,
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
              authenticate: authenticate,
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
              authenticate: authenticate,
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
              authenticate: authenticate,
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
              authenticate: authenticate,
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
              authenticate: authenticate,
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

      function authenticate ($q, AuthService) {
        if (AuthService.isLoggedIn()) {
          return $q.when()
        } else {
          $timeout(function() {
            $state.go('login')
          })
          return $q.reject()
        }
      }
  })