'use strict';

import ComponentRecorder from './../recorders/component-recorder';
import Engine from './engine';

module.exports = class Manager {
    static lookAround() {
        ComponentRecorder.each((Component, componentName) => {
            if (!Component.selectors) return;

            var elements = document.querySelectorAll(Component.selectors());

            if (elements.length) {
                Array.from(elements).forEach(element => {
                    let engine = new Engine(element, Component);
                    engine.render();
                    engine.compile();
                });
            }
        });
    }
}

