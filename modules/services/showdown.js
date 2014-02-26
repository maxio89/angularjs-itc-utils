/*global Showdown*/
(function ()
{
    'use strict';

    function $showdown()
    {
        //noinspection JSPotentiallyInvalidConstructorUsage
        return new Showdown.converter();
    }

    angular.module('restbase.services').factory('$showdown', $showdown);
})();