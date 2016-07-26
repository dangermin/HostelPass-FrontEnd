(function() {
	'use strict';

	angular
	  .module('app')
	  .factory('listingsFactory', listingsFactory);

	listingsFactory.$inject = ['$http', '$q', 'apiUrl'];

	function listingsFactory($http, $q, apiUrl ) {
		//content
		var service = {
			getListingsByCity : getListingsByCity,
			getAllManagedHostels: getAllManagedHostels,
			createReservation: createReservation
		}
		return service;

		function getListingsByCity(city) {
			var defer = $q.defer();
			$http({
				method: 'GET',
				url: apiUrl + 'hostels/search/' +city
			}).then(function( response) {
				defer.resolve(response);
			},function(err) {
				defer.reject(err);
			})
			return defer.promise;
		}
		function getAllManagedHostels() {
			var defer = $q.defer();
			$http({
				method: 'GET',
				url: apiUrl + 'hostels'
			}).then(function(response) {
				defer.resolve(response);
			},function(err) {
				defer.reject(err)
			})
			return defer.promise;
		}

		function createReservation(reservation) {
			var defer = $q.defer();
			$http({
				method: 'POST',
				url: apiUrl + 'reservations',
				data: reservation
			}).then(function(response) {
				defer.resolve(response.data)
			}, function(err) {
				defer.reject(err)
			})
			return defer.promise;
		}
	}
})();