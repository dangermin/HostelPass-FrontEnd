(function() {
    'use strict';

    angular
        .module('app', [
            'ngRoute',
            'ngAnimate', // animations
            'ngSanitize', // sanitizes html bindings (ex: sidebar.js)
            'ui.bootstrap',
            'ui.router',
            'uiRouterStyles',
            'angular-click-outside',
            'LocalStorageModule',
            'toastr',
            'common', // common functions, logger, spinner
            'common.bootstrap' // bootstrap dialog wrapper functions

        ])
        .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $httpProvider) {
            $httpProvider.interceptors.push('authInterceptor');
            $urlRouterProvider.otherwise('');

            $stateProvider
                .state('app', {
                    url: '/app',
                    templateUrl: '/js/layout/shell.html',

                })
                .state('app.dashboard', {
                    url: '/dashboard',
                    templateUrl: '/templates/dashboard.html',
                    controller: 'dashboardCtrl as dashboard',
                    data: {
                        css: ['../hidden/styles.css', '../hidden/bootstrap.css', '../hidden/bootstrap-theme.min.css', '../hidden/bootstrap-theme.css.map',
                            '../hidden/ie10mobile.css', '../hidden/font-awesome.css', '../hidden/toastr.css', '../hidden/customtheme.css', '../hidden/bootstrap.css.map',
                            '../hidden/font-awesome.min.css', '../hidden/traveler.css'
                        ]
                    }
                })
                .state('app.payments', {
                    url: '/payments',
                    templateUrl: '/js/payments/payments.html',
                    controller: 'paymentsCtrl as payments',
                    data: {
                        css: ['../hidden/styles.css', '../hidden/bootstrap.css', '../hidden/bootstrap-theme.min.css', '../hidden/bootstrap-theme.css.map',
                            '../hidden/ie10mobile.css', '../hidden/font-awesome.css', '../hidden/toastr.css', '../hidden/customtheme.css', '../hidden/bootstrap.css.map',
                            '../hidden/font-awesome.min.css', '../hidden/traveler.css'
                        ]
                    }
                })
                .state('app.messages', {
                    url: '/messages',
                    templateUrl: '/js/messages/messages.html',
                    controller: 'messagesCtrl as messages',
                    data: {
                        css: ['../hidden/styles.css', '../hidden/bootstrap.css', '../hidden/bootstrap-theme.min.css', '../hidden/bootstrap-theme.css.map',
                            '../hidden/ie10mobile.css', '../hidden/font-awesome.css', '../hidden/toastr.css', '../hidden/customtheme.css', '../hidden/bootstrap.css.map',
                            '../hidden/font-awesome.min.css', '../hidden/traveler.css'
                        ]
                    }
                })
                .state('app.hostels', {
                    url: '/hostels',
                    templateUrl: '/js/hostels/hostels.html',
                    controller: 'hostelsCtrl as hostels',
                    data: {
                        css: ['../hidden/styles.css', '../hidden/bootstrap.css', '../hidden/bootstrap-theme.min.css', '../hidden/bootstrap-theme.css.map',
                            '../hidden/ie10mobile.css', '../hidden/font-awesome.css', '../hidden/toastr.css', '../hidden/customtheme.css', '../hidden/bootstrap.css.map',
                            '../hidden/font-awesome.min.css', '../hidden/traveler.css'
                        ]
                    }
                })
                .state('app.profile', {
                    url: '/profile',
                    templateUrl: '/js/profile/profile.html',
                    controller: 'hostelProfileCtrl as hostelProfile',
                    data: {
                        css: ['../hidden/styles.css', '../hidden/bootstrap.css', '../hidden/bootstrap-theme.min.css', '../hidden/bootstrap-theme.css.map',
                            '../hidden/ie10mobile.css', '../hidden/font-awesome.css', '../hidden/customtheme.css', '../hidden/bootstrap.css.map',
                            '../hidden/font-awesome.min.css'
                        ]
                    }
                })
                .state('travelerDash', {
                    url: '/travelerDash',
                    templateUrl: '/templates/travelerDash.html',
                    controller: 'travelerDashController as travelerDash',
                    data: {
                        css: '../hidden/traveler.css'
                    }
                })
                .state('listings', {
                    url: '/listings?city?checkin?checkout?numGuest',
                    templateUrl: '/templates/listings.html',
                    controller: 'listingsController as listings',
                    data: {
                        css: '../hidden/traveler.css'
                    }
                })
                .state('landing', {
                    url: '',
                    templateUrl: '/templates/landing.html',
                    controller: 'LandingController as landing',
                    data: {
                        css: ['../hidden/landing.style.css', '../hidden/bootstrap.css', '../hidden/bootstrap-theme.css', '../hidden/font-awesome.css']
                    }
                })
                .state('reservations', {
                    url: '/reservations',
                    templateUrl: '/js/reservations/reservations.html',
                    controller: 'ReservationsController as reservations',
                    data: {
                        css: ['../hidden/reservations.css', '../hidden/bootstrap.css', '../hidden/bootstrap-theme.css', '../hidden/font-awesome.css']                    }
                })
                .state('travelerRes', {
                    url: '/reservation?id',
                    templateUrl: '/js/travelerRes/travelerRes.html',
                    controller: 'TravelerResController as travelerRes',
                    data: {
                        css: '../hidden/travelerRes.css'
                    }
                });

        }])
        .value('apiUrl', 'http://localhost:59822/api/');
})();
