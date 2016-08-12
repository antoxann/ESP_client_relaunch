myApp.config(function($stateProvider, $urlRouterProvider, $controllerProvider) {
      
    $urlRouterProvider.otherwise("index")
    
    $stateProvider
      .state('app', {
          url: "/",
          templateUrl: "layout",
          controller: 'LayoutController',
          resolve: {
            authenticate: authenticate
          }
      })
        .state('app.main', {
            url: "index",
            templateUrl: "app.main",
            controller: 'MainController',
            resolve: {
              authenticate: authenticate
            }
        })
        .state('app.devices', {
            url: "devices",
            templateUrl: "app.devices",
            controller: 'DevicesController',
            resolve: {
              authenticate: authenticate
            }
        })
        .state('app.device', {
            url: "device",
            templateUrl: "app.device",
            params: {device : {}},
            controller: 'DeviceController',
            resolve: {
              authenticate: authenticate
            }
        })
        .state('app.charts', {
            url: "charts",
            templateUrl: "app.charts",
            controller: 'ChartsController',
            resolve: {
              authenticate: authenticate
            }
        })
        .state('app.rooms', {
            url: "rooms",
            templateUrl: "app.rooms",
            controller: 'RoomsController',
            resolve: {
              authenticate: authenticate
            }
        })
        .state('app.room', {
            url: "room",
            templateUrl: "app.room",
            params: {room : {},},
            controller: 'RoomController',
            resolve: {
              authenticate: authenticate
            }
        })
        .state('app.simulation', {
            url: "simulation",
            templateUrl: "app.simulation",
            controller: 'SimulationController',
            resolve: {
              authenticate: authenticate
            }
        })
        .state('app.profile', {
            url: "profile",
            templateUrl: "app.profile",
            controller: 'ProfileController',
            resolve: {
              authenticate: authenticate
            }
        })
        
      .state('login', {
          url: "/login",
          templateUrl: "login",
          controller: "LoginController"
      })
      .state('signup', {
          url: "/signup",
          templateUrl: "signup",
          controller: "SignupController"
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