(function () {
    'use strict';
    var controllerId = 'hostelsCtrl';
    angular.module('app').controller(controllerId, ['common', hostels]);

    function hostels(common) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var vm = this;
        vm.title = 'Hostels';

        activate();

        function activate() {
            common.activateController([], controllerId)
                .then(function () { log('Activated Hostels View'); });
        }

    }
})();