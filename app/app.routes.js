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