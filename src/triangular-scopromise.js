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

        _forEach(dst, function (value, key) {
            delete dst[key];
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
    app.factory('$scopromise', ['$log', '$q', function ($log, $q) {

        return function (promise, scopromise, clear) {
            scopromise = scopromise || {};

            _extend(scopromise, {
                $promise: promise.then(
                    function (data) {
                        clear && _shallowClear(scopromise);
                        return _shallowCopy(data, scopromise);
                    },
                    function (config) {
                        $log.warn('$scopromise rejected: ', config.status);
                        return $q.reject(config);
                    }
                ),
                $resolved: false
            });

            scopromise.$promise['finally'](function () {
                scopromise.$resolved = true;
            });

            return scopromise;

        };
    }]);

}(angular, angular.module('triScopromise', [])));