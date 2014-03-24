(function ()
{
    'use strict';

    angular.module('pl.itcrowd.constants').constant('ValidationMessages', {
        validationMessages: {
            en: {
                required: 'Value is required!',
                email: 'Please enter a valid email address!',
                minlength: 'Enter more characters!',
                maxlength: 'You have entered to many characters!',
                equals: 'Password doesn\'t match!',
                lessthan: 'Value must be less than other!',
                float: 'Value must be a decimal number',
                unique: 'Your email should be unique!',
                pattern: 'Characters don\'t match to the pattern!',
                'unique-user-email': 'This email is already registered!',
                'unique-product-permalink': 'This permalink already exists!',
                'unique-shop-permalink': 'This permalink already exists!'
            },
            pl: {
                required: 'Wartość wymagana!',
                email: 'Wprowadź poprawny adres email!',
                minlength: 'Za mało znaków!',
                maxlength: 'Za dużo znaków!',
                equals: 'Hasło nie pasuje!',
                float: 'Wartość musi być liczbą',
                unique: 'Email musi być unikalny. To będzie twój login!',
                pattern: 'Podane znaki nie są dopuszczalne!',
                'unique-user-email': 'Ten adres jest już zarejestrowany',
                'unique-product-permalink': 'Taki permalink już istnieje!',
                'unique-shop-permalink': 'Taki permalink już istnieje!'
            }
        }
    });
})();
