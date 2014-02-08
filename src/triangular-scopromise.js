(function (ng, app) {
    'use strict';

    /**
     * shortcuts:
     */
    var _isArray = ng.isArray;
    var _forEach = ng.forEach;
    var _extend = ng.extend;

    /**
     * Create a shallow copy of an object and conditionally clear other fields from the destination
     * based on https://github.com/angular/angular.js/blob/master/src/ngResource/resource.js
     */

    var _shallowClear = function (dst) {

        // this line is different than ngResource - it clears array totally,
        // not just leaving array of nulls
        _isArray(dst) && dst.splice(0);

        // this line is also different than ngResource - it clears
        // all properties that do not start with '$' or '_'
        _forEach(dst, function (value, key) {
            if (key.charAt(0) !== '$' && key.charAt(0) !== '_') {
                delete dst[key];
            }
        });

        return dst;
    };

    // TODO: check if $method fields are copied from $resource.$promise
    // (i think they should be, $promise, and $resolved shouldn't)
    var _shallowCopy = function (src, dst) {
        var key;

        for (key in src) {
            if (src.hasOwnProperty(key) && key.charAt(0) !== '$' && key.charAt(1) !== '$') {
                dst[key] = src[key];
            }
        }

        return dst;
    };

    /**
     * the $scopromise factory itself:
     */
    app.factory('$scopromise', ['$log', function ($log) {

        return function (promise, scopromise) {
            scopromise = scopromise || {};

            _extend(scopromise, {
                $promise: promise,
                $resolved: false
            });

            promise.then(
                function (data) {
                    return _shallowCopy(
                        data,
                        _shallowClear(scopromise)
                    );
                },
                function (status) {
                    // TODO: maybe some log levels e.g. (null|'DEBUG'|'WARN')
                    $log.warn('$scopromise rejected: ', status);
                }
            ).finally(function () {
                scopromise.$resolved = true;
            });

            return scopromise;

        };
    }]);

}(angular, angular.module('triScopromise', [])));