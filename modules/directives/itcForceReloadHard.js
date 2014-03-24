(function ()
{
    'use strict';

    function itcForceReloadHard($location, $route, $window)
    {
        return {
            restrict: 'A',
            scope: false,
            link: function (scope, element, attrs)
            {
                /*when path is handle by the same app, make soft reload*/
                element.bind('click', function ()
                {
                    function isTheSameApp()
                    {
                        /*path startWith*/
                        var regexp = '(/shop|/admin|/product|/me|/signup|/signin|/error|/home|/contact|/email|/checkout)';
                        var href = attrs.href.match(regexp);
                        var routing = {product: '/product|/me|/signup|/signin|/home|/contact|/error|/email|/checkout', admin: '/admin', shop: '/shop'};
                        var defaultCtrl;
                        for (var a in routing) {
                            if ($location.path().match(routing[a])) {
                                defaultCtrl = a;
                                break;
                            }
                        }
                        return null != href && routing[defaultCtrl].match(href[0]);

                    }

                    scope.$apply(function ()
                    {
                        if (isTheSameApp()) {
                            $route.reload();
                        } else {
                            $window.location = attrs.href;
                        }
                    });
                });
            }
        };
    }

    angular.module('pl.itcrowd.directives').directive('itcForceReloadHard', ['$location', '$route', '$window', itcForceReloadHard]);
})();