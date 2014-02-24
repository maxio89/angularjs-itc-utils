(function ()
{
    'use strict';

    function itcSubmit()
    {
        return {
            restrict: 'A',
            link: function (scope, element, attributes)
            {
                var PRISTINE_CLASS = 'ng-pristine', DIRTY_CLASS = 'ng-dirty';

                if (!attributes.name) {
                    throw "Directive must be set on an element that has a 'name' attribute";
                }

                // Add novalidate to the form element if not exist.
                if (angular.isUndefined(attributes.novalidate)) {
                    attributes.$set('novalidate', '');
                }

                element.bind('submit', function (e)
                {
                    e.preventDefault();

                    // Remove the class pristine from all form elements and add the dirty class
                    element.find('.ng-pristine').removeClass(PRISTINE_CLASS).addClass(DIRTY_CLASS);

                    // Get the form object.
                    var formName = attributes.name;
                    var form = scope[formName];
                    form.$setDirty(true);
                    // Set all the fields to dirty and apply the changes on the scope so that
                    // validation errors are shown on submit only.
                    angular.forEach(form, function (field, fieldName)
                    {
                        // If the field name starts with a '$' sign, it means it's an Angular object so we should skip those items
                        if (fieldName[0] === '$') {
                            return;
                        }
                        field.$dirty = true;
                        field.$pristine = false;
                    });

                    // Do not continue if the form is invalid.
                    if (form.$invalid) {
                        scope.$apply();
                        if (angular.isUndefined(attributes.itcSubmitWithoutFocus)) {
                            // Focus on the first field that is invalid
                            element.find('.ng-invalid').first().focus();
                        }
                        scope.$emit("formValidationErrors", formName);

                    } else {
                        scope.$apply(attributes.itcSubmit);
                    }

                });
            }
        }
    }

    angular.module('pl.itcrowd.directives').directive('itcSubmit', itcSubmit);
})();


