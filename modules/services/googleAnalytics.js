(function ()
{
    'use strict';

    function GoogleAnalytics($rootScope)
    {
        return {
            sendEvent: function (category, action, label, value)
            {
                $rootScope.$broadcast('GoogleAnalytics:event', category, action, label, value);
            },
            sendPageview: function (location, page, title)
            {
                $rootScope.$broadcast('GoogleAnalytics:event', location, page, title);
            },
            ecommerce: function (id, affiliation, revenue, shipping, tax)
            {
                var transaction = {
                    id: id,
                    affiliation: affiliation,
                    revenue: revenue,
                    shipping: shipping,
                    tax: tax,
                    items: []
                };
                return {
                    addItem: function (id, name, sku, category, price, quantity)
                    {
                        transaction.items.push({id: id, name: name, sku: sku, category: category, price: price, quantity: quantity});
                    },
                    send: function ()
                    {
                        $rootScope.$broadcast('GoogleAnalytics:ecommerce', transaction);
                    }
                };
            }
        };
    }

    angular.module('restbase.services').factory('GoogleAnalytics', ['$rootScope', GoogleAnalytics]);
})();
