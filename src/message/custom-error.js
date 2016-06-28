'use strict';

class CustomError {
    constructor(message){
        if(!message){
            this.notify(`A message is requires`);
        }

        this.notify(message);
    }

    notify(message){
        throw new Error(message);
    }

    static notify(message){
        throw new Error(message);
    }
}

module.exports = CustomError;