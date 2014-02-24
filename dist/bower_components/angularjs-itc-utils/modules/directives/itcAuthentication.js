/*global clientContextPath*/
(function ()
{
    'use strict';

    function itcAuthentication($http, $timeout)
    {
        return {
            restrict: 'C',
            link: function (scope, elem)
            {
                var login = elem.find('#login-holder');

                /**
                 * Since Angular 1.2-rc3 ng-view element is not in DOM at the time of executing this linking function
                 */
                function getMainAndNavbar()
                {
                    return elem.find('#content').add(elem.find('header'));
                }

                login.hide();

                scope.$on('event:auth-loginRequired', function ()
                {
                    //clear cookie & auth header, when login required event is raised
                    $.removeCookie('token', {path: clientContextPath});
                    delete $http.defaults.headers.common.Authorization;

                    if (true !== scope.$root.isLoginView) {
                        getMainAndNavbar().hide();
                        login.show();
                        login.find('#inputUsername').focus();
                    }
                });

                scope.$on('event:signupRequired', function ()
                {
                    getMainAndNavbar().hide();
                    login.show();
                    $timeout(function ()
                    {
                        login.find('#inputEmail2').focus();
                    });
                });

                scope.$on('event:startChangeForgottenPassword', function ()
                {
                    getMainAndNavbar().hide();
                    login.show();
                    $timeout(function ()
                    {
                        login.find('#inputEmailForRemindPass').focus();
                    });
                });

                var hide = function ()
                {
                    getMainAndNavbar().show();
                    login.slideUp();
                };
                scope.$on('event:auth-loginConfirmed', hide);
                scope.$on('event:hide-signup', hide);
            }
        };
    }

    /**
     * This directive is responsible for showing/hiding login form.
     */
    angular.module('pl.itcrowd.directives').directive('itcAuthentication', ['$http', '$timeout', itcAuthentication]);
})();
