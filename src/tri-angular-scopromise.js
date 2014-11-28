(function (ng, app) {
    'use strict';


    /**
     * Shortcuts
     */
    var _isArray = ng.isArray;
    var _forEach = ng.forEach;
    var _extend = ng.extend;



    /**
     * Clear the fulfillment placeholder
     */
    var _shallowClear = function (dst) {

        if (_isArray(dst)) {

            // clear array totally not just leaving array of nulls (as in _forEach way)
            dst.splice(0);

        } else {

            // all key => value pairs in object (or all index => value pairs in array, but that's not the case)
            _forEach(dst, function (value, key) {
                /*jslint unparam: true*/
                if (key.charAt(0) !== '$') {
                    delete dst[key];
                }
            });

        }

        return dst;
    };



    /**
     * Create a shallow copy of an object or array - fill fulfillment placeholder with real data
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
     * @ngdoc module
     * @name triNgScopromise
     * @description
     *
     * # triNgScopromise
     *
     * The `triNgScopromise` module provides support for any `promised` data
     * that may be bound to scope. It's inspired by AngularJS `$resource` service.
     *
     */

    /**
     * @ngdoc service
     * @name $scopromise
     * @requires $q, $log
     *
     * @description
     *
     *
     * @param {Object|Array} [model] Model to be wrapped in 'Future'
     * @param {Promise|Object} promise Future resolving PromiseLikeThingOrAnyThing
     *
     * @returns {Object|Array} fulfillment An object or array that is placeholder
     *   for promised data.
     */

    app.factory('$scopromise', ['$q', '$log', function ($q, $log) {
        return function (promiseOrData, dataOrNothing) {
            var promise, model;

            if (!promiseOrData && !dataOrNothing) {
                $log.error(new Error('$scopromise needs at least one argument!'));
            }

            // pass anything if using one arg
            if (!dataOrNothing) {

                // any promise like thing or just data
                promise = $q.when(promiseOrData);

                // empty data placeholder for upcoming fulfillment
                model = {};

            } else {

                // any promise like thing or just data
                promise = $q.when(dataOrNothing);

                // user defined data placeholder for upcoming fulfillment
                model = promiseOrData;

            }

            _extend(model, {

                // anyone can use promise in future
                $promise: promise.then(function (data) {

                    // just extending promise and resolved or override old model
                    return data === model ? data : _shallowCopy(data, _shallowClear(model));

                }, $q.reject), // AngularJS $q does not automatically pass a rejection, so it's handled explicitly

                // hold state of our fulfillment for outer world ($scope)
                $resolved: false

            });

            model.$promise['finally'](function () {
                model.$resolved = true;
            });

            return model;

        };
    }]);

}(angular, angular.module('triNgScopromise', ['ng'])));