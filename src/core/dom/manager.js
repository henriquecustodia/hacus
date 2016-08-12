'use strict';

import { Recorder } from './../recorders/component-recorder';
import Engine from './engine';
import {isFunction} from './../utils';

module.exports = class Manager {
    static lookAround() {
        Recorder.each((component, componentName) => {

            if (!component.selectors) {
                return;
            }

            var elements = document.querySelectorAll(component.selectors);

            if (elements.length) {
                Array.from(elements).forEach(element => {
                    let engine = new Engine(element, component);
                    engine.render();
                    engine.compile();
                });
            }
        });
    }
}

