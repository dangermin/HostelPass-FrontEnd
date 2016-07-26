(function() {
    'use strict';

    angular
        .module('app')
        .controller('LandingController', LandingController);

    LandingController.$inject = ['authService', '$state', 'toastr', '$uibModal'];

    function LandingController(authService, $state, toastr, $uibModal) {
        var vm = this;

        var modals = {
            'register': { templateUrl: 'registerModal.html', controller: RegisterModalController, size: 'md' },
            'login': { templateUrl: 'loginModal.html', controller: LoginModalController, size: 'sm' }
        };

        vm.openModal = function(name) {
            var modal = modals[name];

            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: modal.templateUrl,
                controller: modal.controller,
                size: modal.size
            });

            /*modalInstance.result.then(function(success) {
                window.location.replace('');
            });*/
        };
    }

    RegisterModalController.$inject = ['$uibModalInstance', 'authService', 'toastr', '$scope'];

    function RegisterModalController($uibModalInstance, authService, toastr, $scope) {

        $scope.register = function(registration) {
            console.log(registration);
            authService.register(registration).then(
                function(response) {
                     
                    $uibModalInstance.close(true);
                    window.location.replace('');
                   
                },
                function(message) {
                    toastr.warning(message);
                }
            );
        };
    }

    LoginModalController.$inject = ['$uibModalInstance', 'authService', 'toastr', '$scope'];

    function LoginModalController($uibModalInstance, authService, toastr, $scope) {
        $scope.login = function(username,password) {
            
            authService.login(username,password)
                .then(
                    function(response) {
                        if (response.hostelOwner == "True") {
                            console.log(response.hostelOwner);
                            window.location.replace('#/app/dashboard');
                        }
                        else {
                            window.location.replace('#/travelerDash');
                        }
                        
                        $uibModalInstance.close(true);
                    },
                    function(message) {
                        toastr.warning(message);
                    }
                );
        };
    }
})();


