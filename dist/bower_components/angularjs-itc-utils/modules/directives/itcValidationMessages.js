(function ()
{
    'use strict';

    function itcValidationMessages(ValidationMessages)
    {
        return {
            restrict: 'A',
            link: function (scope, element, attributes)
            {
                var DEFAULT_LANGUAGE = 'en';

                if (!attributes.name) {
                    throw new Error('Directive must be set on an element that has a "name" attribute');
                }

                var event = attributes.itcValidationMessagesEvent;

                var type = attributes.itcValidationMessagesType;

                // Get the form object.
                var formName = attributes.name;
                var form = scope[formName];

                scope.$on('fieldValidationError', function (evt, args)
                {
                    if (formName === args.formName) {
                        findErrors(args.field, args.fieldName);
                    }
                });

//                    On this event all fields in the form will be check
                scope.$on('formValidationErrors', function (evt, data)
                {
                    if (formName === data) {
                        checkFieldsValidity();
                    }
                });

                angular.forEach(form, function (field, fieldName)
                {
                    // If the field name starts with a '$' sign, it means it's an Angular property or function and we should skip those items.
                    if (fieldName[0] === '$') {
                        return;
                    }
                    var input = angular.element(element.context[fieldName]);
                    if (angular.isUndefined(event)) {
                        input.bind('blur', function ()
                        {
                            findErrors(field, fieldName);
                        });
                    } else {
                        scope.$watch(function ()
                        {
                            // Watching the class attribute to capture validations errors
                            return input.attr('class');
                        }, function ()
                        {
                            scope.$emit('fieldValidationError', {
                                formName: formName,
                                field: field,
                                fieldName: fieldName
                            });
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
                    var input = angular.element(element.context[fieldName]);
                    if (angular.isUndefined(type)) {
                        var popover = getPopover(input);
                        var tooltip;
                        if (field.$valid && !angular.isUndefined(popover)) {
                            hidePopover(input);
                            tooltip = popover.$tip;
                            tooltip.removeClass('error');
                        } else if (field.$invalid && field.$dirty) {
                            error = getFirstError(field);
                            if (angular.isUndefined(popover)) {
                                createPopover(input, error.key);
                                showPopover(input);
                            } else {
                                tooltip = popover.$tip;
                                if (!angular.isUndefined(tooltip)) {
                                    replacePopoverMessage(popover, getMessageContent(input, error.key));
                                    if (!tooltip.hasClass('error')) {
                                        tooltip.addClass('error');
                                    }
                                    showPopover(input);
                                }
                            }
                        }
                    } else {
                        var block;
                        if (type !== 'block') {
                            block = $(type + '-' + fieldName);
                        } else {
                            block = getBlock(input);
                        }
                        if (field.$valid && block.length !== 0) {
                            hideBlock(block);
                        } else if (field.$invalid && field.$dirty) {
                            error = getFirstError(field);
                            if (block.length === 0) {
                                createBlock(input, error.key);
                            } else {
                                replaceBlockMessage(block, getMessageContent(input, error.key));
                                showBlock(block);
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

                var createPopover = function (input, key)
                {
                    input.popover({
                        placement: 'right',
                        trigger: 'manual',
                        content: getMessageContent(input, key),
                        template: '<div class="popover error"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
                    });
                };

                var replacePopoverMessage = function (popover, newMessage)
                {
                    popover.options.content = newMessage;
                };

                var showPopover = function (input)
                {
                    input.popover('show');
                };

                var hidePopover = function (input)
                {
                    input.popover('hide');
                };

                var getPopover = function (input)
                {
                    return input.data('bs.popover');
                };

                var getMessageContent = function (input, key)
                {
                    var customMessage = input.attr(key + '-message');
                    if (angular.isUndefined(customMessage)) {
                        var selectedLanguage = scope.selectedLanguage;
                        if (!angular.isUndefined(selectedLanguage)) {
                            return ValidationMessages.validationMessages[selectedLanguage][key];
                        } else {
                            return ValidationMessages.validationMessages[DEFAULT_LANGUAGE][key];
                        }
                    } else {
                        return customMessage;
                    }
                };

                var createBlock = function (input, key)
                {
                    input.after('<div class="alert alert-danger alert-' + input.attr('name') + '">' + getMessageContent(input, key) + '</div>');
                };

                var replaceBlockMessage = function (block, newMessage)
                {
                    block.html(newMessage);
                };

                var showBlock = function (block)
                {
                    block.show();
                };

                var hideBlock = function (block)
                {
                    block.hide();
                };

                var getBlock = function (input)
                {
                    return input.parent().find('.alert-' + input.attr('name'));
                };

            }
        };
    }

    angular.module('pl.itcrowd.directives').directive('itcValidationMessages', ['ValidationMessages', itcValidationMessages]);
})();
