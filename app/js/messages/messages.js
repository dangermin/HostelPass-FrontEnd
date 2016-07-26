(function () {
    'use strict';
    var controllerId = 'messagesCtrl';
    angular.module('app').controller(controllerId, ['common', messages]);

    function messages(common) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var vm = this;
        vm.title = 'Messages';

        activate();

        function activate() {
            common.activateController([], controllerId)
                .then(function () { log('Activated Messages View'); });
        }
    }
})();