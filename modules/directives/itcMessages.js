/**
 * Directive has the following options:
 * - It can show all messages or only those of specific type. To display all messages use itc-messages attribute with no parameters.
 *   To display messages of certain type use itc-messages="[type]" ex. itc-messages="error". Note that you can have several itc-messages tags on page,
 *   each displaying different type of messages.
 * - Message bubbles can stay until they are closed by the user (default option) or fade out after given time. For the latter use attribute
 *   stay-time="[time in millis]" .
 */
(function ()
{
    'use strict';

    function itcMessages($compile, $timeout, MessageFactory)
    {
        return {
            scope: {
                stayTime: '@'
            },
            template: '<div id="messages" ng-repeat="message in messages"></div>',
            link: function ($scope, element, attr)
            {
                function show(message, type)
                {
                    var messageTemplate = '<div class="alert"><button type="button" class="close" data-dismiss="alert">&times;</button>' + message + '</div>';
                    var messageElement = $compile(messageTemplate)($scope);
                    messageElement.addClass('alert-' + (type === 'error' ? 'danger' : (type === 'warn' ? 'warning' : type)));
                    element.append(messageElement);
                    if ($scope.stayTime) {
                        $timeout(function ()
                        {
                            messageElement.fadeOut(400, function ()
                            {
                                messageElement.remove();
                            });
                        }, $scope.stayTime);
                    }
                }

                $scope.$on('$destroy', function ()
                {
                    MessageFactory.clean();
                });

                //noinspection JSUnresolvedVariable
                MessageFactory.subscribe(show, attr.itcMessages);
            }
        };
    }

    //noinspection JSValidateTypes
    angular.module('pl.itcrowd.directives').directive('itcMessages', ['$compile', '$timeout', 'MessageFactory', itcMessages]);
})();
