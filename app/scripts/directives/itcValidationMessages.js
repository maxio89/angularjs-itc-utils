'use strict';

angular.module('angularjsItcUtilsApp').directive('itcValidationMessages', function (ValidationMessages)
{
    return {
        restrict: 'A',
        link: function (scope, element, attributes)
        {
            if (!attributes.name) {
                throw "Directive must be set on an element that has a 'name' attribute";
            }

            var event = attributes.itcValidationMessagesEvent;

            var type = attributes.itcValidationMessagesType;

            // Get the form object.
            var formName = attributes.name;
            var form = scope[formName];

            scope.$on("fieldValidationError", function (evt, args)
            {
                findErrors(args.field, args.fieldName);
            });

//                    On this event all fields in the form will be check
            scope.$on("formValidationErrors", function ()
            {
                checkFieldsValidity()
            });

            angular.forEach(form, function (field, fieldName)
            {
                // If the field name starts with a '$' sign, it means it's an Angular property or function and we should skip those items.
                if (fieldName[0] === '$') {
                    return;
                }
                var input = angular.element(element.context[fieldName]);
                if (angular.isUndefined(event)) {
                    scope.$watch(function ()
                    {
                        // Watching the class attribute to capture validations errors
                        return input.attr('class');
                    }, function ()
                    {
                        scope.$emit("fieldValidationError", {
                            field: field,
                            fieldName: fieldName
                        });
                    });
                } else {
                    input.bind(event, function ()
                    {
                        findErrors(field, fieldName);
                    });
                }
            });

            var checkFieldsValidity = function ()
            {
                if (!form.$pristine) {
                    angular.forEach(form, function (field, fieldName)
                    {
                        if (fieldName[0] === '$') {
                            return;
                        }
                        findErrors(field, fieldName);
                    });
                }
            };
            var findErrors = function (field, fieldName)
            {
                var error = {};
                /* TODO Maybe there is a better way to get access to that input */
                var input = angular.element(element.context[fieldName]);
                if (angular.isUndefined(type)) {
                    var popover = getPopoverObject(input);
                    var tooltip;
                    if (field.$valid && !angular.isUndefined(popover)) {
                        hidePopoverMessage(input);
                        tooltip = popover.$tip;
                        tooltip.removeClass('error');
                    } else if (field.$invalid && field.$dirty) {
                        error = getFirstError(field);
                        if (angular.isUndefined(popover)) {
                            createPopoverMessage(input, error.key);
                            showPopoverMessage(input);
                        } else {
                            tooltip = popover.$tip;
                            if (!angular.isUndefined(tooltip)) {
                                replacePopoverMessage(popover, getMessageContent(input, error.key));
                                if (!tooltip.hasClass('error')) {
                                    tooltip.addClass('error');
                                }
                                showPopoverMessage(input);
                            }
                        }
                    }
                } else if (type === 'block') {
                    var block = getBlockObject(input);
                    if (field.$valid && block.length !== 0) {
                        hideBlockMessage(block);
                    } else if (field.$invalid && field.$dirty) {
                        error = getFirstError(field);
                        if (block.length === 0) {
                            createBlockMessage(input, error.key);
                        } else {
                            replaceBlockMessage(block, getMessageContent(input, error.key));
                            showBlockMessage(block);
                        }
                    }
                }

            };

            var getFirstError = function (field)
            {
                var error = {};
                angular.forEach(field.$error, function (value, key)
                {
                    if (value && $.isEmptyObject(error)) {
                        error = {
                            value: value,
                            key: key
                        };
                    }
                });
                return error;
            };

            var createPopoverMessage = function (input, key)
            {
                input.popover({
                    placement: 'right',
                    trigger: 'manual',
                    delay: { show: 200, hide: 200 },
                    animation: true,
                    /*TODO Message customization */
                    content: getMessageContent(input, key),
                    template: '<div class="popover error"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
                });
            };

            var replacePopoverMessage = function (popover, newMessage)
            {
                popover.options.content = newMessage;
            };

            var showPopoverMessage = function (input)
            {
                input.popover('show');
            };

            var hidePopoverMessage = function (input)
            {
                input.popover('hide');
            };

            var getPopoverObject = function (input)
            {
                return input.data('bs.popover');
            };

            var getMessageContent = function (input, key)
            {
                var message, customMessage = input.attr(key + '-message');
                if (angular.isUndefined(customMessage)) {
                    return message = ValidationMessages.validationMessages[key];
                } else {
                    return message = customMessage;
                }
            };

            var createBlockMessage = function (input, key)
            {
                input.after('<div class="alert alert-danger alert-' + input.attr('name') + '">' + getMessageContent(input, key) + '</div>');
            };

            var replaceBlockMessage = function (block, newMessage)
            {
                block.html(newMessage);
            };

            var showBlockMessage = function (block)
            {
                block.show();
            };

            var hideBlockMessage = function (block)
            {
                block.hide();
            };

            var getBlockObject = function (input)
            {
                return input.parent().find('.alert-' + input.attr('name'));
            };

        }
    };
});
