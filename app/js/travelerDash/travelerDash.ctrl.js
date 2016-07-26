(function() {
    'use strict';

    angular
        .module('app')
        .controller('travelerDashController', travelerDashController);

    travelerDashController.$inject = ['$state'];

    /* @ngInject */
    function travelerDashController($state) {
        var vm = this;
        $('.selectpicker').selectpicker();

        vm.search = function() {
            /* listings({city: travelerDash.city, checkin: travelerDash.df, checkout: travelerDash.dt, numGuest: travelerDash.numGuest }) */

            console.log(vm);
            $state.go('listings', { city: vm.city, checkin: moment(vm.df).format('MM-DD-YYYY'), checkout: moment(vm.dt).format('MM-DD-YYYY'), numGuest: vm.numGuest });
        };

        //CALENDAR VARS
        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date();
        afterTomorrow.setDate(tomorrow.getDate() + 1);

        vm.title = 'travelerDashController';
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

        vm.hostels = [{

            "HostelName": "Sexy Hostel",
            "Address": "123 EZ st",
            "City": "SD",
            "State": "CA",
            "ZipCode": 92264,
            "Image": "..\\img\\a.jpg",
            "Description": "It is good"

        }, {

            "HostelName": "Great Hostel",
            "Address": "123 EZ st",
            "City": "SD",
            "State": "CA",
            "ZipCode": 92264,
            "Image": "..\\img\\a.jpg",
            "Description": "This hostel is amazing"

        }, {

            "HostelName": "Hostile Hostel",
            "Address": "123 EZ st",
            "City": "SD",
            "State": "CA",
            "ZipCode": 92264,
            "Image": "..\\img\\a.jpg",
            "Description": "It is good"

        }, {

            "HostelName": "Hostel",
            "Address": "123 EZ st",
            "City": "SD",
            "State": "CA",
            "ZipCode": 92264,
            "Image": "..\\img\\a.jpg",
            "Description": "It is good"

        }, {

            "HostelName": "Good God, Man",
            "Address": "123 EZ st",
            "City": "SD",
            "State": "CA",
            "ZipCode": 92264,
            "Image": "..\\img\\a.jpg",
            "Description": "It is good"

        }, ];


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

    }
})();
