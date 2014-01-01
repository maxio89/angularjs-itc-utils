angular.module('directives.itcValidate', []).directive('itcCheckPassword', function ($parse)
{
    return {
        require: '^ngModel',
        link: function (scope, elem, attrs, ctrl)
        {
            var firstPassword = $parse(attrs['itcCheckPassword']);

            var validator = function (value) {
                var temp = firstPassword(scope),
                        v = value === temp;
                ctrl.$setValidity('match', v);
                console.log(v);
                return value;
            };

            ctrl.$parsers.unshift(validator);
            ctrl.$formatters.push(validator);
            attrs.$observe('itcCheckPassword', function () {
                validator(ctrl.$viewValue);
            });

        }
    }
});
//
//angular.module('directives.itcValidate', []).directive('passwordMatch', [function () {
//    return {
//        restrict: 'A',
//        scope:true,
//        require: 'ngModel',
//        link: function (scope, elem , attrs,control) {
//            var checker = function () {
//
//                //get the value of the first password
//                var e1 = scope.$eval(attrs.ngModel);
//
//                //get the value of the other password
//                var e2 = scope.$eval(attrs.passwordMatch);
//                return e1 == e2;
//            };
//            scope.$watch(checker, function (n) {
//
//                //set the form control to valid if both
//                //passwords are the same, else invalid
//                control.$setValidity("unique", n);
//            });
//        }
//    };
//}]);

//directives.directive("repeatPassword", function() {
//    return {
//        require: "ngModel",
//        link: function(scope, elem, attrs, ctrl) {
//            var otherInput = elem.inheritedData("$formController")[attrs.repeatPassword];
//
//            ctrl.$parsers.push(function(value) {
//                if(value === otherInput.$viewValue) {
//                    ctrl.$setValidity("repeat", true);
//                    return value;
//                }
//                ctrl.$setValidity("repeat", false);
//            });
//
//            otherInput.$parsers.push(function(value) {
//                ctrl.$setValidity("repeat", value === ctrl.$viewValue);
//                return value;
//            });
//        }
//    };
//});

//function link(scope, elem, attrs, ctrl) {
//// if ngModel is not defined, we don't need to do anything
//    if (!ctrl) return;
//    if (!attrs[directiveId]) return;
//
//    var firstPassword = $parse(attrs[directiveId]);
//
//    var validator = function (value) {
//        var temp = firstPassword(scope),
//                v = value === temp;
//        ctrl.$setValidity('match', v);
//        return value;
//    }
//
//    ctrl.$parsers.unshift(validator);
//    ctrl.$formatters.push(validator);
//    attrs.$observe(directiveId, function () {
//        validator(ctrl.$viewValue);
//    });
//
//}

//return {
//    require: 'ngModel',
//    link: function (scope, elem, attrs, ctrl) {
//        var firstPassword = '#' + attrs.pwCheck;
//        elem.add(firstPassword).on('keyup', function () {
//            scope.$apply(function () {
//                var v = elem.val()===$(firstPassword).val();
//                ctrl.$setValidity('pwmatch', v);
//            });
//        });
//    }
//}
