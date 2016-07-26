(function() {
    'use strict';

    angular
        .module('app')
        .controller('ReservationsController', ReservationsController);

    ReservationsController.$inject = ['toastr', '$state', 'reservationsFactory'];

    /* @ngInject */
    function ReservationsController(toastr, $state, reservationsFactory) {
        var vm = this;
        vm.title = 'ReservationsController';
        vm.goToReservation = goToReservation;

        activate();

        ////////////////

        function activate() {
            getReservations();
        }

        function getReservations() {
            reservationsFactory.getReservations()
                .then(function(response) {
                    vm.reservations = response;
                    console.log(response);
                })
        }

        function goToReservation(id) {
            $state.go('travelerRes', { id: id})
        }
    }
})();