(function() {
    'use strict';
    var controllerId = 'hostelProfileCtrl';
    angular.module('app').controller(controllerId, ['common', 'listingsFactory', profile]);

    function profile(common, listingsFactory) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var vm = this;
        vm.userName = 'USER NAME';
        vm.hostels = [];
        vm.displayHostel = displayHostel;

        activate();

        function activate() {
            common.activateController([], controllerId)
                .then(function() { log('Activated Profile View'); });

            getManagedHostels();
        }

        function displayHostel(hostelId) {
            vm.hostels.forEach(function(hostel) {
                console.log(hostelId);
                if (hostelId == hostel.hostelId) {
                    vm.hostel = hostel;
                    console.log(vm.hostel);
                }
            });
        };

        function getManagedHostels() {
            listingsFactory.getAllManagedHostels()
                .then(function(response) {
                    vm.hostels = response.data;
                    vm.hostel = vm.hostels[0];
                    console.log(vm.hostel);
                })
        }
    }
})();
