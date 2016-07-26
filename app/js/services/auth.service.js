(function() {
    'use strict';

    angular
        .module('app')
        .factory('authService', authService);

    authService.$inject = ['$http', '$q', 'localStorageService', '$location', 'apiUrl'];

    function authService($http, $q, localStorageService, $location, apiUrl) {
        var state = {
            isLoggedIn: false
        };
        var service = {
            state: state,
            register: register,
            login: login,
            logout: logout,
            init: init
        };
        return service;
        //content

        /////////////

        function register(registration) {
            var defer = $q.defer();

            $http.post(apiUrl + 'accounts/create', registration)
                .then(
                    function(response) {
                        
                        defer.resolve(response);
                    },
                    function(err) {
                        defer.reject(err.data.message);
                    }
                );

            return defer.promise;
        }

        function login(username,password) {
            logout();

            var defer = $q.defer();

            var data = 'grant_type=password&username=' + username + '&password=' + password;

            $http.post(apiUrl + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                .then(
                    function(response) {
                        localStorageService.set('authorizationData', response.data);

                        /*if (response.data.hostelOwner == "True") {
                            console.log(response.data.hostelOwner);
                            $location.path('#/app/dashboard');
                        }
                        else {
                            $location.path('#/travelerDash');
                        }*/
                        defer.resolve(response.data);
                        

                    },
                    function(err) {
                        defer.reject(err);
                    }
                );
            return defer.promise;
        }

        function logout() {
            localStorageService.remove('authorizationData');

            state.isLoggedIn = false;
            $location.path('')
            //$location.path('#/login');
        }

        function init() {
            var authData = localStorageService.get('authorizationData');

            if (authData) {
                state.isLoggedIn = true;
                if (authData.hostelOwner) {
                    $location.path('#/app/dashboard');
                }
                else {
                    $location.path('#/travelerDash');
                }
                //$location.path('#/posts');
            }
        }
    }
})();
