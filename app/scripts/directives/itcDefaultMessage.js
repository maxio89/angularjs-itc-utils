'use strict';

angular.module('angularjsItcUtilsApp').directive('itcDefaultMessage', function ()
{
    return {
        restrict: 'A',
        link: function (scope, element, attributes)
        {
            if (!attributes.name) {
                throw "Directive must be set on an element that has a 'name' attribute";
            }
            // Get the input object.
            var fieldName = attributes.name;
            var field = scope[element.context.form.name][fieldName];
            var input = angular.element(element.context);

            element.bind("focus", function (evt, args)
            {
//                findErrors(args.field, args.fieldName);
                var popover = getPopoverObject(input);
                var tooltip;
                if (field.$valid || field.$pristine) {
                    if (angular.isUndefined(popover)) {
                        createMessage(input);
                        showMessage(input);
                    } else {
                        tooltip = popover.$tip;
//                        tooltip.hasClass('in')
                        if (!angular.isUndefined(tooltip)) {
                            replaceMessage(popover);
                            showMessage(input);
                        }
                    }
                }
            });

            element.bind("blur", function ()
            {
                if (field.$valid || field.$pristine) {
                    hideMessage(input);
                }
            });

            var createMessage = function (input)
            {
                input.popover({
                    placement: 'right',
                    trigger: 'manual',
                    delay: { show: 200, hide: 200 },
                    animation: true,
                    /*TODO Message customization */
                    content: attributes.itcDefaultMessage,
                    template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
                });
            };

            var replaceMessage = function (popover)
            {
                popover.options.content = attributes.itcDefaultMessage;
            };

            var showMessage = function (input)
            {
                input.popover('show');
            };

            var hideMessage = function (input)
            {
                input.popover('hide');
            };

            var getPopoverObject = function (input)
            {
                return input.data('bs.popover');
            };

        }
    };
});
