(function () {
    'use strict';

    var serviceId = 'dashboardService';
    angular
        .module('app')
        .factory(serviceId, ['$http', 'apiUrl', 'common', '$q', dashboardService]);

    function dashboardService($http, apiUrl, common, $q) {

        var service = {
            getHostels: getHostels,
        };

        return service;

        function getHostels() {
            var defer = $q.defer();
            $http({
                method: 'GET',
                url: apiUrl
            }).then(function(response) {
                defer.resolve(response.data);
            }, function (err) {
                defer.reject(err)
            });
            return defer.promise;
        }
    }
})();