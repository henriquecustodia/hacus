'use strict';

import CustomError from './../message/custom-error';
import {noop, isString} from './../utils';

const Storage = new Map();

module.exports.Recorder = class {
    static register(name, configuration) {
        if (!name) {
            throw new CustomError(`A name is required for that component.`);
        }

        if (Storage.has(name)) {
            throw new CustomError(`That name already in use`);
        }

        if (!configuration) {
            throw new CustomError(`A object's configuration is required for component.`);
        }

        configuration.selectors = configuration.selectors || [];
        configuration.helpers = configuration.helpers || [];
        configuration.dom = configuration.dom || noop;
        configuration.model = configuration.model || noop;
        configuration.template = configuration.template || '';

        Storage.set(name, configuration);
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
};