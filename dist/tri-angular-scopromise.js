(function (ng, app) {
    'use strict';

    /**
     * shortcuts:
     */
    var _isArray = ng.isArray;
    var _forEach = ng.forEach;
    var _extend = ng.extend;

    /**
     * @ngdoc   function
     * @name    _shallowClear
     * @param   {Object|Array} dst
     */
    var _shallowClear = function (dst) {

        if (_isArray(dst)) {

            // clear array totally not just leaving array of nulls (as in _forEach way)
            dst.splice(0);

        } else {

            // all key => value pairs in object (or all index => value pairs in array, but that's not the case)
            _forEach(dst, function (value, key) {
                if (key.charAt(0) !== '$') {
                    delete dst[key];
                }
            });

        }

        return dst;
    };

    /**
     * @ngdoc   function
     * @name    _shallowCopy
     * @param   {Object|Array} src
     * @param   {Object|Array} dst
     */
    var _shallowCopy = function (src, dst) {
        var key;

        // all object keys or array indexes
        for (key in src) {
            // do not touch proto nor angular internal methods
            if (src.hasOwnProperty(key) && key.charAt(0) !== '$') {
                dst[key] = src[key];
            }
        }

        return dst;
    };

    /**
     * @ngdoc   service
     * @name    $scopromise
     */
    app.factory('$scopromise', ['$q', '$log', function ($q, $log) {
        /**
         * @param   {Object}            [model]      Model to be wrapped in 'Future'
         * @param   {Promise|Object}    promise      Future resolving PromiseLikeThingOrAnyThing
         */
        return function (model, promise) {
            if (!model && !promise) {
                $log.error(new Error('$scopromise needs at least one argument!'));
            }

            // pass anything if using one arg
            if (!promise) {
                promise = model;
                model = {};
            }

            // any promise like thing or just data
            promise = $q.when(promise);

            _extend(model, {
                $promise: promise.then(
                    function (data) {
                        // just extending promise and resolved or override old model
                        return data === model ? data : _shallowCopy(data, _shallowClear(model));
                    }, $q.reject),
                $resolved: false
            });

            model.$promise['finally'](function () {
                model.$resolved = true;
            });

            return model;

        };
    }]);

}(angular, angular.module('triNgScopromise', ['ng'])));