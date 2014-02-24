(function ()
{
    'use strict';

    function AsyncQueue($log, $timeout)
    {
        var defaultQueueName = 'default';
        var queue = [];
        var queueConfig = {};
        queueConfig[defaultQueueName] = {timeout: 0};

        function isDuplicate(queueItem, callback, options)
        {
            if (null != options.groupingId || null != queueItem.options.groupingId) {
                return options.groupingId === queueItem.options.groupingId;
            }
            return queueItem.callback === callback;
        }

        function createQueueItem(callback, config, options)
        {
            config = angular.extend({}, config, options);
            var promise = $timeout(callback, config.timeout);
            promise.then(function removeQueueItem()
            {
                for (var i = 0; i < queue.length; i++) {
                    if (queue[i].promise === promise) {
                        queue.splice(i, 1);
                        return;
                    }
                }
            });
            return {callback: callback, options: options, promise: promise};
        }

        function add(callback, options)
        {
            options = angular.extend({queueId: defaultQueueName}, options);

            for (var i = 0; i < queue.length; i++) {
                if (isDuplicate(queue[i], callback, options)) {
                    $timeout.cancel(queue[i].promise);
                    queue.splice(i, 1);
                    break;
                }
            }

            if (null == queueConfig[options.queueId]) {
                $log.warn('No queue `' + options.queueId + '` defined');
                options.queueId = defaultQueueName;
            }

            var config = angular.extend({}, queueConfig[options.queueId], options);

            if (config.timeout > 0) {
                queue.push(createQueueItem(callback, config, options));
            } else {
                callback();
            }
        }

        function configure(config, queueId)
        {
            if (null == queueId) {
                queueId = defaultQueueName;
            }
            queueConfig[queueId] = angular.extend(queueConfig[queueId] || {}, config);
        }

        return {
            add: add,
            configure: configure
        };
    }

    angular.module('pl.itcrowd.services').factory('AsyncQueue', ['$log', '$timeout', AsyncQueue]);
})();
