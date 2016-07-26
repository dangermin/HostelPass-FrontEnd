(function () {
    'use strict';
    var controllerId = 'paymentsCtrl';
    angular.module('app').controller(controllerId, ['common', payments]);

    function payments(common) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var vm = this;
        vm.title = 'Payments';

        activate();

        function activate() {
            common.activateController([], controllerId)
                .then(function () { log('Activated Payments View'); });
        }
    }
})();