'use strict';

module.exports = object => {
    watch(object);
    unwatch(object);
}

function watch(object) {
    Object.defineProperty(object, "watch", {
        enumerable: false,
        configurable: true,
        writable: false,
        value: function (prop, handler) {
            var oldValue = this[prop],
                newValue = oldValue,
                getter = function () {
                    return newValue;
                },
                setter = function (value) {
                    if (oldValue === value) {
                        return;
                    }

                    newValue = value;
                    handler.call(this, prop, oldValue, value);

                    return oldValue = value;
                };

            if (delete this[prop]) {
                Object.defineProperty(this, prop, {
                    get: getter,
                    set: setter,
                    enumerable: true,
                    configurable: true
                });
            }
        }
    });
}

function unwatch(object) {
    Object.defineProperty(object, "unwatch", {
        enumerable: false,
        configurable: true,
        writable: false,
        value: function (prop) {
            var val = this[prop];
            delete this[prop];
            this[prop] = val;
        }
    });
}

