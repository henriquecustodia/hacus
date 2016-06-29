'use strict';

import Context from './../context/context';
import ComponentRecorder from './../recorders/component-recorder';

module.exports = class Engine {
    constructor(element, component) {
        this.context = new Context();
        this.element = element;
        this.component = component;
    }

    render() {
        let div = document.createElement('div');
        div.innerHTML = this.component.template;

        var arrNodes = Array.from(div.childNodes);

        arrNodes.forEach(node => {
            this.element.appendChild(node);
        });
    }

    compile() {
        compileComponent.apply(this);
        compileHelpers.apply(this);
    }
}

function compileComponent() {
    this.component.model.apply(this.context);
    this.component.ui.call(null, this.context, this.element);
}

function compileHelpers() {
    this.component.helpers.forEach(helper => {
        if (!ComponentRecorder.has(helper)) {
            return;
        }

        var componentHelper = ComponentRecorder.get(helper);

        var elements = this.element.querySelectorAll(componentHelper.selector);
        if (elements.length) {
            Array.from(elements).forEach(elementHandler => {
                componentHelper.ui.call(null, this.context, elementHandler);
            });
        }
    });
}