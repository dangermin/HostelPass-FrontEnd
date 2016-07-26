(function () { 
    'use strict';
    
    var controllerId = 'sidebar';
    angular.module('app').controller(controllerId,
        ['$route', 'config', sidebar]);

    function sidebar($route, config) {
        var vm = this;

        var routes = [
            {
                config: {
                    title: 'dashboard',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-dashboard"></i> Dashboard',
                        state: 'app.dashboard'
                    }
                }
            }, {
                config: {
                    title: 'payments',
                    settings: {
                        nav: 2,
                        content: '<i class="fa fa-dollar"></i> Payments',
                        state: 'app.payments'
                    }
                }
            }, {
                config: {
                    title: 'messages',
                    settings: {
                        nav: 3,
                        content: '<i class="fa fa-envelope"></i> Messages',
                        state: 'app.messages'
                    }
                }
            }, {
                config: {
                    title: 'hostels',
                    settings: {
                        nav: 4,
                        content: '<i class="fa fa-asterisk"></i> Hostels',
                        state: 'app.hostels'
                    }
                }
            }, {
                config: {
                    title: 'profile',
                    settings: {
                        nav: 5,
                        content: '<i class="fa fa-user"></i> Profiles',
                        state: 'app.profile'
                    }
                }
            }
        ];

        vm.isCurrent = isCurrent;

        activate();

        function activate() { getNavRoutes(); }
        
        function getNavRoutes() {
            vm.navRoutes = routes.filter(function(r) {
                return r.config.settings && r.config.settings.nav;
            }).sort(function(r1, r2) {
                return r1.config.settings.nav - r2.config.settings.nav;
            });
        }
        
        function isCurrent(route) {
            if (!route.config.title || !$route.current || !$route.current.title) {
                return '';
            }
            var menuName = route.config.title;
            return $route.current.title.substr(0, menuName.length) === menuName ? 'current' : '';
        }
    };
})();
