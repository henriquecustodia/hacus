module.exports.noop = () => { };

module.exports.generateID = () => Math.floor(Math.random() * 10000000 + 1);

module.exports.isFunction = (fn) => typeof fn === 'function';

