(function ()
{
    'use strict';

    function itcFacebookSlidein($window)
    {
        return {
            restrict: 'E',
            transclude: false,
            scope: {
                left: '@',
                href: '@',
                width: '@',
                height: '@',
                showFaces: '@',
                stream: '@',
                header: '@'
            },
            template: '<div><div class="fb-slidein-inner"><div id="fb-root"></div><div class="fb-like-box"></div></div></div>',
            link: function (scope, element)
            {
                var left = (/^true$/i).test(scope.left);
                element.addClass(left ? 'fb-slidein-left' : 'fb-slidein-right');
                element.find('.fb-like-box').attr('data-show-faces', scope.showFaces).attr('data-stream', scope.stream).attr('data-header',
                        scope.header).attr('data-width', scope.width).attr('data-height', scope.height).attr('data-href', scope.href);
                var hide = function ()
                {
                    var value = '-' + (parseInt(scope.width, 10) + 15) + 'px';
                    var properties = left ? {left: value} : {right: value};
                    element.stop().animate(properties, 400);
                };
                element.css('right', '-' + (parseInt(scope.width, 10) + 15) + 'px').hover(function ()
                {
                    var properties = left ? {left: '-15px'} : {right: '-15px'};
                    element.stop().animate(properties, 400);
                }, hide);
                hide();
                (function (d, s, id)
                {
                    var js, fjs = d.getElementsByTagName(s)[0];
                    if (d.getElementById(id)) {
                        return;
                    }
                    js = d.createElement(s);
                    js.id = id;
                    js.src = '//connect.facebook.net/pl_PL/all.js#xfbml=1';
                    fjs.parentNode.insertBefore(js, fjs);
                }($window.document, 'script', 'facebook-jssdk'));
            },
            replace: true
        };
    }

    //noinspection JSValidateTypes
    angular.module('pl.itcrowd.directives').directive('itcFacebookSlidein', ['$window', itcFacebookSlidein]);
})();
