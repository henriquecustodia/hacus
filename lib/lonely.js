(function (w) {
    'use strict';

    lonely.say = say;
    lonely.inject = inject;
    lonely.isFunction = isFunction;
    lonely.isArray = isArray;
    lonely.isUndefined = isUndefined;
    lonely.isNull = isNull;
    lonely.isUndefinedOrNull = isUndefinedOrNull;
    w.lonely = lonely;

    var _lonely = {};

    function say(message) {
        throw new Error(message);
    }

    function isFunction(fn) {
        return typeof fn === 'function';
    }

    function isArray(arr) {
        return Array.isArray(arr);
    }

    function isUndefined(value) {
        return value === undefined;
    }

    function isNull(value) {
        return value === null;
    }

    function isUndefinedOrNull(value) {
        return isUndefined(value) || isNull(value);
    }

    function inject(dependencies) {
        var _dependencies = [];

        dependencies.forEach(function (dependency) {
            _dependencies.push(_get(dependency));
        });

        return _dependencies;
    }

    function _set(name, value, dependencies) {
        if (_lonely[name]) {
            say('Already exists this lonely: ' + name);
        }

        if (isUndefinedOrNull(value)) {
            say('The second parameter has to be defined.');
        }

        if (!isUndefinedOrNull(dependencies) && !isArray(dependencies)) {
            say('The third parameter has to be an Array');
        }

        _lonely[name] = {
            get: value,
            isFunction: isFunction(value),
            dependencies: dependencies
        }
    }

    function _get(name) {
        var lonely = _lonely[name];

        if (!lonely) {
            say('The lonely "' + name + '" was not found.')
        }

        var _dependencies = lonely.dependencies ? inject(lonely.dependencies) : [];

        if (lonely.isFunction) {
            return lonely.get.apply({}, _dependencies);
        }

        return lonely.get;
    }

    function lonely(name, fn, dependencies) {
        if (!arguments.length) {
            return;
        }

        if (arguments.length === 1) {
            return _get(name);
        }

        _set(name, fn, dependencies);
    };

})(window);
