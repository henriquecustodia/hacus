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
        let conf = {};
        conf.ui = this.configuration.ui || noop;
        conf.model = this.configuration.model || noop;
        conf.helpers = this.configuration.helpers || [];
        conf.selector = this.configuration.selector;
        conf.template = this.configuration.template;

        Storage.set(this.name, conf);
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