import {noop, toArray} from './utils';
import Context from './context';
import ComponentRecorder from './recorders/component-recorder';

function searchComponents() {
    ComponentRecorder.each((component, componentName) => {
        if(!component.selector){
            return;
        }

        var elements = toArray(document.querySelectorAll(component.selector));

        if (elements.length) {
            renderComponent(elements, component);
        }
    });
}

function renderComponent(elements, component) {
    elements.forEach(function (element) {
        appendIt(element, component.template);
        compileComponent(element, component);
    });
}

function appendIt(element, template) {
    var div = document.createElement('div');
    div.innerHTML = template;

    var arrNodes = toArray(div.childNodes);
    arrNodes.forEach(function (node) {
        element.appendChild(node);
    });
}

function compileComponent(element, component) {
    var context = new Context();

    component.model.apply(context);
    component.ui.call(null, context, element);

    component.helpers.forEach(helper => {
        if (!ComponentRecorder.has(helper)) {
            return;
        }

        var componentHelper = ComponentRecorder.get(helper);

        var elements = toArray(element.querySelectorAll(componentHelper.selector));
        if (elements.length) {
            elements.forEach(elementHandler => {
                componentHelper.ui.call(null, context, elementHandler);
            });
        }
    });
}

function lookAround() {
    searchComponents();
}

module.exports.componentRecorder = (name, configuration) => new ComponentRecorder(name, configuration);
module.exports.lookAround = lookAround;
