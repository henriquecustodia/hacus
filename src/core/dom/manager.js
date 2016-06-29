'use strict';

import ComponentRecorder from './../recorders/component-recorder';
import Engine from './engine';

module.exports = class Manager {
    static lookAround() {
        ComponentRecorder.each((component, componentName) => {
            if (!component.selector) {
                return;
            }

            var elements = document.querySelectorAll(component.selector);

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

