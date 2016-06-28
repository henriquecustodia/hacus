module.exports.noop = () => { };

module.exports.toArray = list => Array.from(list);

module.exports.generateID = () => Math.floor(Math.random() * 10000000 + 1);

