'use strict';

class CustomError {
    constructor(message) {
        if (!message) {
            this.notify(`A message is required`);
        }

        throw new Error(message);
    }

    static notify(message) {
        throw new Error(message);
    }
}

module.exports = CustomError;
