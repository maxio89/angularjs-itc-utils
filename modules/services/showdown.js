/*global Showdown*/
(function ()
{
    'use strict';

    function $showdown()
    {
        //noinspection JSPotentiallyInvalidConstructorUsage
        return new Showdown.converter();
    }

    angular.module('pl.itcrowd.services').factory('$showdown', $showdown);
})();