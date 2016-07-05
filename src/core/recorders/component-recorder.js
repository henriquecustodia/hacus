'use strict';

import CustomError from './../message/custom-error';
import {noop} from './../utils';

const Storage = new Map();

module.exports = class ComponentRecorder {
    constructor(name, configuration) {
        if (!name) {
            new CustomError(`A name is required for component.`);
        }

        if (Storage.has(name)) {
            new CustomError(`That name already in use`);
        }

        if (!configuration) {
            new CustomError(`A object's configuration is required for component.`)
        }

        this.name = name;
        this.configuration = configuration;
    }

    register() {
        this.configuration.prototype.helpers = this.configuration.prototype.helpers || noop; 
        this.configuration.prototype.dom = this.configuration.prototype.dom || noop; 
        this.configuration.prototype.model = this.configuration.prototype.model || noop; 
        Storage.set(this.name, this.configuration);
    }

    static has(key) {
        return Storage.has(key);
    }

    static get(key) {
        return Storage.get(key);
    }

    static each(fn = () => { }) {
        Storage.forEach(fn);
    }
}