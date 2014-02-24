angular.module('pl.itcrowd.directives').directive('itcLaddaButtons', ['laddaConfig', '$timeout', function (laddaConfig)
        {
            return {
                restrict: 'A',
                link: function postLink($scope, element, attrs)
                {
                    attrs['style'] = attrs['style'] || laddaConfig.style;
                    element.attr('data-style', attrs['style']);
                    if (!element.hasClass('ladda-button')) {
                        element.addClass('ladda-button');
                    }
                    if (!element[0].querySelector(".ladda-label")) {
                        var label = angular.element("<span class='ladda-label'></span>");
                        angular.forEach(element.contents(), function (item)
                        {
                            label.append(item);
                        });
                        element.append(label);
                    }
                    var ladda = Ladda.create(element[0]);
                    $scope.$watch(attrs.ladda, function (newVal)
                    {
                        if (newVal !== undefined) {
                            var progress = parseInt(newVal);
                            if (progress) {
                                if (!ladda.isLoading()) {
                                    ladda.start();
                                }
                                ladda.setProgress(progress / 100);
                            } else {
                                if (newVal) {
                                    ladda.start();
                                } else {
                                    ladda.stop();
                                }
                            }

                        }
                    });
                }
            };
        }]).constant('laddaConfig', {
            'style': 'slide-left'
        });
