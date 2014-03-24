(function ()
{
    'use strict';

    function itcGoogleTagManager($location, $rootScope, $window)
    {
        /**
         * Please read README.txt.
         * Google Tag Manager needs configuration before using this directive.
         */

        return {
            restrict: 'E',
            transclude: false,
            replace: false,
            scope: {
                gtmId: '@'
            },
            link: function ($scope)
            {
                if (angular.isUndefinedOrNull($scope.gtmId)) {
                    throw new Error('Google Tag Manager ID missing');
                }

                //load tag manager
                (function (w, d, s, l, i)
                {
                    /*jshint eqeqeq:false*/
                    w[l] = w[l] || [];
                    w[l].push({'gtm.start': new Date().getTime(), event: 'gtm.js'});
                    var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : '';
                    j.async = true;
                    j.src = '//www.googletagmanager.com/gtm.js?id=' + i + dl;
                    f.parentNode.insertBefore(j, f);
                })(window, document, 'script', 'dataLayer', $scope.gtmId);


                //trigger event when order has been placed
                $rootScope.$on('GoogleAnalytics:ecommerce', function (event, transaction)
                {
                    var analyticsEvent = {
                        'event': 'ecommerce',
                        'transactionId': transaction.id,
                        'transactionAffiliation': transaction.affiliation,
                        'transactionTotal': transaction.revenue,
                        'transactionTax': transaction.tax,
                        'transactionShipping': transaction.shipping,
                        'transactionProducts': []
                    };
                    angular.forEach(transaction.items, function (item)
                    {
                        analyticsEvent.transactionProducts.push({
                            'sku': item.sku,
                            'name': item.name,
                            'category': item.category,
                            'price': item.price,
                            'quantity': item.quantity
                        });
                    });
                    //noinspection JSUnresolvedVariable
                    $window.dataLayer.push(analyticsEvent);
                });
                $rootScope.$on('GoogleAnalytics:event', function (category, action, label, value)
                {
                    //noinspection JSUnresolvedVariable
                    $window.dataLayer.push({event: 'event', category: category, action: action, label: label, value: value});
                });
                $rootScope.$on('GoogleAnalytics:pageview', function (location, page, title)
                {
                    //noinspection JSUnresolvedVariable
                    $window.dataLayer.push({event: 'pageview', location: location, page: page, title: title});
                });

                //send page view when url has been changed
                $rootScope.$on('$routeChangeSuccess', function ()
                {
                    var path = $location.path();
                    //noinspection JSUnresolvedVariable
                    $window.dataLayer.push({event: 'pageview', location: path});
                });
            }
        };
    }

    //noinspection JSValidateTypes
    angular.module('pl.itcrowd.directives').directive('itcGoogleTagManager', ['$location', '$rootScope', '$window', itcGoogleTagManager]);
})();
