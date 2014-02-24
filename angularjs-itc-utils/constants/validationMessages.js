(function ()
{
    'use strict';

    function ValidationMessagess()
    {
        return {
            validationMessages: {
                en: {
                    required: 'Value is required!',
                    email: 'Please enter a valid email address!',
                    minlength: 'Enter more characters!',
                    maxlength: 'You have entered to many characters!',
                    equals: 'Password doesn\'t match!',
                    unique: 'Your email should be unique!',
                    pattern: 'Characters don\'t match to the pattern!'
                }
            }
        }
    }

    angular.module('pl.itcrowd.directives').constant('ValidationMessages', ValidationMessagess);
})();
