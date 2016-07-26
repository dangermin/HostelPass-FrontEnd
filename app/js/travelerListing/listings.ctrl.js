(function() {
    'use strict';

    angular
        .module('app')
        .controller('listingsController', listingsController);

    listingsController.$inject = ['$stateParams', 'listingsFactory', 'toastr', '$state'];

    /* @ngInject */
    function listingsController($stateParams, listingsFactory, toastr, $state) {
        var vm = this;
        vm.hostels = [];
        var imageAddress = "../../css/images/house";
        var tempImageAddress = '';

        $('.selectpicker').selectpicker();

        //Modal Vars
        vm.address = '';
        vm.city = '';
        vm.description = '';
        vm.hostelName = '';
        vm.image = '';
        vm.price = '';
        vm.state = '';
        vm.zipCode = '';

        vm.getInfo = function(hostel) {
            vm.address = hostel.address;
            vm.city = hostel.city;
            vm.description = hostel.description;
            vm.hostelName = hostel.hostelName;
            vm.image = hostel.image;
            vm.price = hostel.price;
            vm.state = hostel.state;
            vm.zipCode = hostel.zipCode;
            vm.id = hostel.hostelId;
        };


        vm.city = $stateParams.city;
        vm.checkin = $stateParams.checkin;
        vm.checkout = $stateParams.checkout;
        vm.numGuest = $stateParams.numGuest;

        vm.getListingsByCity = getListingsByCity;
        vm.getAllManagedHostels = getAllManagedHostels;
        vm.createReservation = createReservation;
        //CALENDAR VARS
        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date();
        afterTomorrow.setDate(tomorrow.getDate() + 1);

        vm.title = 'listingsController';
        vm.popup1 = { opened: false };
        vm.popup2 = { opened: false };
        vm.inlineOptions = {
            customClass: getDayClass,
            minDate: tomorrow,
            showWeeks: true
        };
        // vm.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        // vm.format = vm.formats[2];
        vm.altInputFormats = ['M!/d!/yyyy'];
        vm.dateOptions = {
            formatYear: 'yy',
            showWeeks: false,
            // dateDisabled: disabled,
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1
        };
        vm.events = [{
            date: tomorrow,
            status: 'full'
        }, {
            date: afterTomorrow,
            status: 'partially'
        }];

    

        //CALENDAR FUNCTIONS
        vm.today = function() {
            vm.df = new Date();
            vm.dt = afterTomorrow;
        };

        vm.clear = function() {
            vm.dt = null;
        };

        vm.toggleMin = function() {
            vm.inlineOptions.minDate = vm.inlineOptions.minDate ? null : new Date();
            vm.dateOptions.minDate = vm.inlineOptions.minDate;
        };

        vm.open1 = function() {
            vm.popup1.opened = true;
        };

        vm.open2 = function() {
            vm.popup2.opened = true;
        };

        vm.setDate = function(year, month, day) {
            vm.dt = new Date(year, month, day);
        };

        //CALENDAR TASKS
        vm.today();
        vm.toggleMin();

        // function disabled(data) {
        //     var date = data.date,
        //         mode = data.mode;
        //                     console.log(data);
        //                     console.log(data.date);
        //     console.log(data.date.getDay());
        //     return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);


        // }

        function getDayClass(data) {
            var date = data.date,
                mode = data.mode;
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

                for (var i = 0; i < vm.events.length; i++) {
                    var currentDay = new Date(vm.events[i].date).setHours(0, 0, 0, 0);

                    if (dayToCheck === currentDay) {
                        return vm.events[i].status;
                    }
                }
            }

            return '';
        }

        function getListingsByCity() {
            // console.log($stateParams.city);
            listingsFactory.getListingsByCity($stateParams.city)
                .then(function(response) {
                    vm.hostels = response.data;
                    if(vm.hostels.length > 0)
                    {

                        for(var i = 0; i < vm.hostels.length ; i++)
                        {
                            var randomNum = Math.floor(Math.random() * 4 + 1);
                            tempImageAddress = imageAddress + randomNum + ".jpg";
                            vm.hostels[i].image = tempImageAddress;
                            console.log(tempImageAddress);                      
                            // vm.hostels[0].image = 
                        }
                    }
                    console.log(response.data);
                }, function(err) {
                    toastr.warning(err);
                });
        }

        function getAllManagedHostels() {
            listingsFactory.getAllManagedHostels()
                .then(function(response) {
                    vm.hostels = response.data;
                    console.log(vm.hostels);
                }, function(err) {
                    toastr.warning("You darn fucked up!");
                });
        }

        function createReservation() {
            if (vm.numGuest == 0 || !vm.numGuest) {
                vm.numGuest = 1;
            };
            var reservation = {
                hostelId : vm.id,
                checkIn : vm.df,
                checkOut : vm.dt,
                guestNum : vm.numGuest
            }
            console.log(reservation);
            listingsFactory.createReservation(reservation)
                .then(function(response) {
                     $state.go('travelerRes', { id: response.reservationId});
                }) 
        }

    }
})();
