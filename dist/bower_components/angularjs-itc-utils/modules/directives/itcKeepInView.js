(function ()
{
    'use strict';

    function itcKeepInView()
    {
        return {
            restrict: 'A',
            scope: false,
            link: function (scope, element, attrs)
            {
                var $window = jQuery(window);
                var container = element.parents('.ui-layout-pane');

                function reattach()
                {
                    if (element.filter(':visible').size() < 1) {
                        return;
                    }
                    var container = element.parents('.ui-layout-pane');
                    //noinspection JSUnresolvedVariable
                    var parent = element.parents(attrs.ngKeepInView);
                    if (parent.size() === 0) {
                        return;
                    }
                    element.children().css({width: '100%'});
                    var elementOuterHeight = element.outerHeight();
                    if (parent.offset().top + parent.innerHeight() + container.scrollTop() <= container.height()) {
                        element.css({
                            position: 'static',
                            width: '100%'
                        });
                        parent.css({paddingBottom: 0});
                    } else {
                        var bottom = $window.innerHeight() - (container.innerHeight() + container.offset().top);
                        element.css({
                            position: 'fixed',
                            bottom: bottom,
                            width: parent.innerWidth()
                        });
                        parent.css({paddingBottom: elementOuterHeight + 'px'});
                    }
                }

                element.resize(reattach);
                $window.resize(reattach);
                container.resize(reattach);
                scope.$watch(attrs.ngModel, function ()
                {
                    reattach();
                });
                scope.$on('$destroy', function ()
                {
                    element.unbind('resize', reattach);
                    $window.unbind('resize', reattach);
                    container.unbind('resize', reattach);
                });
            }
        };
    }

    angular.module('pl.itcrowd.directives').directive('itcKeepInView', itcKeepInView);
})();
