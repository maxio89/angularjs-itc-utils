(function ()
{
    'use strict';

    function Patterns()
    {
        return {
            latinText: /^[\u0041-~\u0080-þĀ-ž ]+$/ //for text inputs when we want latin letters, such as City
        }
    }

    angular.module('pl.itcrowd.constants').constant('Patterns', Patterns);
})();