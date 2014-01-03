'use strict';

angular.module('angularjsItcUtilsApp').constant("ValidationMessages", {
    validationMessages: {
        required: 'Value is required!',
        email: 'You should enter a valid email address!',
        minlength: 'Enter more characters',
        maxlength: 'You have entered to many characters',
        equals: 'Password don\'t match',
        unique: 'Your email should be unique'
    }
});
