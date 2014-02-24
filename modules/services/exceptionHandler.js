(function ()
{
    'use strict';

    /**
     * ExceptionHandler must be loaded after http-auth-interceptor i.e.:
     *
     * angular.module('restbase', ['http-auth-interceptor','restbase.services']);
     */
    angular.module('pl.itcrowd.services').config(function ($httpProvider)
    {
        function interceptor($location, $rootScope, $q)
        {

            function success(response)
            {
                return response;
            }

            function error(response)
            {
                /*jshint maxcomplexity:false*/
                var status = response.status;
                $rootScope.errorDate = new Date();
                if (null != response.config && null != response.config.skipDefaultInterceptors && null != response.config.skipDefaultInterceptors.codes &&
                        response.config.skipDefaultInterceptors.codes.indexOf(status) > -1) {
                    return $q.reject(response);
                }
                switch (status) {
                    case 400:
                        $rootScope.errorMessage = 'Request cannot be fulfilled due to bad syntax!';
                        break;
                    case 401:
                        return response; // Let http-auth-interceptor.js handle this response
                    case 403:
                        $rootScope.errorMessage = 'You don\'t have access to this page or resource!';
                        break;
                    case 404:
                        $rootScope.errorMessage = 'The page or resource your are looking for does not exist!';
                        break;
                    case 405:
                        $rootScope.errorMessage = 'Request method not supported!';
                        break;
                    case 408:
                        $rootScope.errorMessage = 'The server timed out waiting for the request!';
                        break;
                    case 412:
                        $rootScope.errorMessage = 'Precondition failed: ' + response.data;
                        break;
                    case 415:
                        $rootScope.errorMessage = 'This media type is not supported!';
                        break;
                    case 503:
                        $rootScope.errorMessage = 'The server is currently unavailable (overloaded or down)!';
                        break;
                    case 505:
                        $rootScope.errorMessage = 'The server does not support the HTTP protocol version used in the request!';
                        break;
                    default:
                        $rootScope.errorMessage = response.message ? response.message : 'Internal Server Error! Something went really wrong...';

                }
                $location.path('/error');
                $location.replace();
                return $q.reject(response);
            }

            return function (promise)
            {
                return promise.then(success, error);
            };
        }

        $httpProvider.responseInterceptors.push(['$location', '$rootScope', '$q', interceptor]);
    });
})();
