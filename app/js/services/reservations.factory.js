(function() {
    'use strict';

    angular
        .module('app')
        .factory('reservationsFactory', reservationsFactory);

    reservationsFactory.$inject = ['$q', '$http', 'apiUrl'];

    /* @ngInject */
    function reservationsFactory($q, $http, apiUrl) {
        var service = {
            getReservation: getReservation,
            getReservations: getReservations,
            postMessage: postMessage,
            cancelReservation: cancelReservation
        };
        return service;

        ////////////////

        function getReservation(id) {
        	var defer = $q.defer();
        	$http({
        		method: 'GET',
        		url: apiUrl + 'reservations/' + id,
        	}).then(function(response){
        		defer.resolve(response.data);
        	}, function(err) {
        		defer.reject(err);
        	})
            return defer.promise;
        }

        function getReservations() {
            var defer = $q.defer();
            $http({
                method: 'GET',
                url: apiUrl + 'reservations'
            }).then(function(response){
                defer.resolve(response.data)
            }, function(err) {
                defer.reject(err);
            })
            return defer.promise;
        }

        function postMessage(message) {
            var defer = $q.defer();
            $http({
                method: 'POST',
                url: apiUrl + 'messages',
                data: message
            }).then(function(response) {
                defer.resolve(response.data)
            },function(err) {
                defer.reject(err);
            })
            return defer.promise;
        }

        function cancelReservation(id) {
            $http({
                method: 'DELETE',
                url: apiUrl + 'reservations' + id
            }).then(function(response) {
                defer.resolve(response)
            },function(err){
                defer.reject(err)
            })
            return defer.promise;
        }
    }
})();