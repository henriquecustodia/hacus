module.exports.noop = () => { };

module.exports.generateID = () => Math.floor(Math.random() * 10000000 + 1);

module.exports.isFunction = (fn) => typeof fn === 'function';

module.exports.isString = (string) => typeof string === 'string';

module.exports.isUndefined = (value) => value === 'undefined' || value === undefined;

module.exports.isNull = (value) => value === null;

module.exports.isInvalidToDOM = (value) => value === null || value === 'null' || value === 'undefined' || value === undefined;
