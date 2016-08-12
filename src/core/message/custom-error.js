'use strict';

class CustomError extends Error{
    constructor(message) {
        super(message);
        this.name = 'Hacus Error';
    }
}

module.exports = CustomError;
