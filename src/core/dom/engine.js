'use strict';

import Context from './../context/context';
import { Recorder } from './../recorders/component-recorder';
import { isString } from './../utils';

module.exports = class Engine {
    constructor(element, component) {
        this.context = new Context();
        this.element = element;
        this.component = component;
    }

    render() {
        if (!this.component.template) {
            return;
        }

        let div = document.createElement('div');

        if (isString(this.component.template)) {
            div.innerHTML = this.component.template;
        } else {
            div.innerHTML = this.component.template(this.element);
        }

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
    let helpers = this.component.helpers;

    if (!helpers || !Array.isArray(helpers)) {
        return;
    }

    helpers.forEach(helper => {
        if (!helper || !Recorder.has(helper)) {
            return;
        }

        let ComponentHelper = Recorder.get(helper);
        
        var elements = this.element.querySelectorAll(ComponentHelper.selectors);
        if (elements.length) {
            Array.from(elements).forEach(element => {
                ComponentHelper.model.call(this.context);
                ComponentHelper.dom.call(null, this.context, element);
            });
        }
    });
}