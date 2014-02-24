(function ()
{
    'use strict';

    function itcAlert()
    {
        return {
            restrict: 'A',
            link: function (scope)
            {
                scope.$on('Alert', function (e, data)
                {
                    window.alert(data);
                });
            }
        };
    }

    angular.module('pl.itcrowd.directives').directive('itcAlert', itcAlert);
})();
