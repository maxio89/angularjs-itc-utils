'use strict';

angular.module('angularjsItcUtilsApp').directive('itcScrollTo', function ($window)
{
    return {
        restrict: 'A',
        compile : function(){
//            function scrollInto(id) {
//                if(!id) $window.scrollTo(0, 0);
//                console.log($(id));
//                $(id).smoothScroll({offset: -100});
//            }
            return function(scope, element) {
                element.find('a').smoothScroll({offset: -100});
                angular.forEach(element.find('a'), function(field) {
                    jQuery(field).click(function(event) {
                        event.preventDefault();
//                        scrollInto(field.attributes.href.value);
                    });
                });
            };
        }
    };
});
