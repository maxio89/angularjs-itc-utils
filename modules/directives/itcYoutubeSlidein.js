(function ()
{
    'use strict';

    function itcYoutubeSlidein()
    {
        return {
            restrict: 'E',
            transclude: false,
            scope: {
                event: '@',
                logo: '@',
                href: '@',
                title: '@',
                seeMore: '@',
                left: '@',
                width: '@'
            },
            template: '<div><div class="youtube-slidein-inner">' + '<a href="{{ href }}" title="{{ title }}" target="_blank">' +
                    '<img src="{{ logo }}" width="39" height="39"/>' + '<h4>{{ title }}</h4>' + '<p>{{ seeMore }} &raquo;</p>' + '</a>' + '</div></div>',
            link: function (scope, element)
            {
                var left = (/^true$/i).test(scope.left);
                element.addClass(left ? 'youtube-slidein-left' : 'youtube-slidein-right');
                element.append(angular.element('<span class="anchor"><span class="icon"></span></span>'));
                var magicNumber = 43, nextState;
                var hide = function ()
                {
                    var value = '-' + (parseInt(scope.width, 10) + magicNumber) + 'px';
                    var properties = left ? {left: value} : {right: value};
                    element.stop().animate(properties, 400);
                    nextState = show;
                };
                var show = function ()
                {
                    var value = '-' + magicNumber + 'px';
                    var properties = left ? {left: value} : {right: value};
                    element.stop().animate(properties, 400);
                    nextState = hide;
                };
                element.css(left ? 'left' : 'right', '-' + (parseInt(scope.width, 10) + magicNumber) + 'px');
                function toggle()
                {
                    nextState();
                }

                if ('click' === scope.event) {
                    element.click(toggle);
                } else {
                    element.hover(show, hide);
                }
                hide();
            },
            replace: true
        };
    }

    angular.module('restbase.directives').directive('itcYoutubeSlidein', itcYoutubeSlidein);
})();
