'use strict';

var app = angular.module('angularApp', ['ui.router', 'satellizer']);
app.config(function($stateProvider, $urlRouterProvider) {
    
    $stateProvider

        .state('landing', {
            url: '/',
            templateUrl: '/html/landingpage.html',
            controller: 'landingCtrl',
            resolve: {
                devices: function(landingService) {
                    return landingService.getAll()
                        .then(devices => {
                            return devices
                        });
                }
            }
        })
        .state('home', {
            url: '/home:devicetype',
            templateUrl: '/html/home.html',
            controller: 'homeCtrl'
        })
        .state('loggedin', {
            url: '/',
            templateUrl: '/html/home.html',
            controller: 'mainCtrl'
        })
        .state('newlisting', {
            url: '/listing/new',
            templateUrl: '/html/newlisting.html',
            controller: 'newItemCtrl'
        })
        .state('listingdetail', {
            url: '/listings/:id',
            templateUrl: '/html/listingdetail.html',
            controller: 'listingsDetailCtrl'
        })
        .state('login', {
            url: '/login/',
            templateUrl: '/html/login.html',
            controller: 'loginCtrl'
        })
        
        .state('register', {
            url: '/newuser/',
            templateUrl: '/html/register.html',
            controller: 'registerCtrl'
        })
        .state('settings', {
            url: '/admin/settings',
            templateUrl: '/html/settings.html',
            controller: 'settingsCtrl',
            resolve: {
                userLoggedIn: function(userService) {
                    return userService.admin()
                        .then(user => {
                            return user
                        });
                }
            }
        })
        .state('users', {
            url: '/admin/users',
            templateUrl: '/html/manageUsers.html',
            controller: 'manageUsersCtrl',
            resolve: {
                userList: function(userService) {
                    return userService.getAll()
                        .then(users => {
                            return users
                        });
                }
            }
        })

        .state('dashboard', {
            url: '/admin/dashboard',
            templateUrl: '/html/dashboard.html',
            controller: 'dashboardCtrl',
            resolve: {
                userLoggedIn: function(userService) {
                    return userService.admin()
                        .then(user => {
                            return user
                        });
                }
            }
        })
        .state('orders', {
            url: '/admin/orders',
            templateUrl: '/html/orders.html',
            controller: 'ordersCtrl'
        })
        .state('devices', {
            url: '/admin/devices',
            templateUrl: '/html/devices.html',
            controller: 'devicesCtrl',
            resolve: {
                devices: function(landingService) {
                    return landingService.getAll()
                        .then(devices => {
                            return devices
                        });
                }
            }
        })
        .state('inbox', {
            url: '/admin/inbox',
            templateUrl: '/html/inbox.html',
            controller: 'inboxCtrl'
        })
        .state('details', {
            url: '/details/:id',
            templateUrl: '/html/details.html',
            controller: 'detailsCtlr'
        })
        .state('profile', {
            url: '/profile/',
            templateUrl: '/html/profile.html',
            controller: 'profileCtlr',
            resolve: {
                userLoggedIn: function(userService) {
                    return userService.getProfile()
                        .then(user => {
                            return user
                        });
                }
            }
        })
        
    
    $urlRouterProvider.otherwise('/');

})
