myApp.config(['$stateProvider', '$urlRouterProvider', '$controllerProvider', function($stateProvider, $urlRouterProvider, $controllerProvider) {
      
    $urlRouterProvider.otherwise("login")
    
    $stateProvider
      .state('app', {
          url: "/",
          templateUrl: "layout",
          controller: 'LayoutController'
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
          controller: "LoginController",
          resolve: {
            loggedin: loggedin
          }
      })
      .state('signup', {
          url: "/signup",
          templateUrl: "signup",
          controller: "SignupController"
      })

      function authenticate ($q, AuthService, $state, $timeout) {
        if (AuthService.isLoggedIn()) {
          return $q.when();
        } else {
          $timeout(function() {
            $state.go('login')
          })
          return $q.reject()
        }
      }

      function loggedin ($q, AuthService, $state, $timeout) {
        if (AuthService.isLoggedIn()) {
            $timeout(function() {
              $state.go('app.main')
            })
          return $q.reject()
        } else {
            return $q.when();
        }
      }
  }])