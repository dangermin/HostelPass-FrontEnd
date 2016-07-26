(function () {
    'use strict';
    var controllerId = 'dashboardCtrl';
    angular.module('app').controller(controllerId, ['common', 'dashboardService', dashboard]);

    function dashboard(common, dashboardService) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var vm = this;
        vm.news = {
            title: 'Hot Towel Angular',
            description: 'YOU HAVE SO MANY BOOKINGS.'
        };
        vm.title = 'Dashboard';

        activate();

        function activate() {
            var promises = [getHostels(),]
            common.activateController(promises, controllerId)
                .then(function () { log('Activated Dashboard View'); });
        }

        function getHostels() {
            return dashboardService.getHostels().then(function (data) {
                return vm.hostels = data;
            });
        }
    }
})();