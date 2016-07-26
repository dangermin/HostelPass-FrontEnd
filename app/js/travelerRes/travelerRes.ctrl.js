(function() {
    'use strict';

    angular
        .module('app')
        .controller('TravelerResController', TravelerResController);

    TravelerResController.$inject = ['reservationsFactory', 'toastr', '$stateParams'];

    /* @ngInject */
    function TravelerResController(reservationsFactory, toastr, $stateParams) {
        var vm = this;
        vm.title = 'TravelerResController';
        vm.getReservation = getReservation;
        vm.postMessage = postMessage;
        vm.cancelReservation = cancelReservation;
        vm.messages = [];

        activate();

        ////////////////

        function activate() {
            getReservation();
        }

        function getReservation() {
            reservationsFactory.getReservation($stateParams.id)
                .then(function(response) {
                    vm.reservation = {
                        checkIn : response.checkIn,
                        checkOut : response.checkOut,
                        confirmedStatus: response.confirmedStatus,
                        createdDate: response.createdDate,
                        guestNum: response.guestNum,
                        totalCost: response.totalCost,
                        totalPaid: response.totalPaid,
                    };
                    vm.messages = response.messages;
                    vm.payments = response.payments;
                    vm.hostel = response.hostel;
                    console.log(vm.reservation);
                }, function(err) {
                    toastr.warning(err.data);
                })
        };

        function cancelReservation() {
            reservationsFactory.cancelReservation($stateParams.id)
                .then(function(response) {
                    toastr.sucess("Reservation sucessfully cancelled");
                }, function(err) {
                    toastr.warning(err);
                })
        }

        function postMessage(text) {
            var message = {
                reservationId : $stateParams.id,
                text: text
            }
            reservationsFactory.postMessage(message).
                then(function(response) {
                    vm.messages.push(response.data);
                },function(err) {
                    toastr.warning(err.data);
                })
        }


    }
})();