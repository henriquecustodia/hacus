'use strict';

import Context from './../context/context';
import ComponentRecorder from './../recorders/component-recorder';
import {isFunction} from './../utils';

module.exports = class Engine {
    constructor(element, Component) {
        this.context = new Context();
        this.element = element;
        this.component = new Component();
    }

    render() {
        if (!isFunction(this.component.template)) {
            return;
        }

        let div = document.createElement('div');
        div.innerHTML = this.component.template();

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
    this.component.dom.call(null, this.context, this.element);
}

function compileHelpers() {
    let helpers = this.component.helpers();

    if (!helpers || !Array.isArray(helpers)) {
        return;
    }

    helpers.forEach(helper => {
        if (!helper || !ComponentRecorder.has(helper)) {
            return;
        }

        let ComponentHelper = ComponentRecorder.get(helper);

        var elements = this.element.querySelectorAll(ComponentHelper.selectors());
        if (elements.length) {
            Array.from(elements).forEach(elementHandler => {
                let componentHelper = new ComponentHelper();
                componentHelper.model.call(this.context);
                componentHelper.dom.call(null, this.context, elementHandler);
            });
        }
    });
}