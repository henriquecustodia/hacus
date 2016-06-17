(function (w) {

    function toArray(list) {
        return Array.prototype.slice.call(list);
    }

    function has(name) {
        return !!_components[name];
    }

    var _components = {};

    function component(name, conf) {
        if (_components[name]) {
            throw new Error('Already exists the "' + name + '" component');
        }

        if (!conf) {
            throw new Error('The second parameter has to be defined.');
        }

        _components[name] = {
            ui: conf.ui,
            controller: conf.controller,
            helpers: conf.helpers,
            selector: conf.selector,
            template: conf.template
        }
    }

    function searchComponents() {
        for (var componentName in _components) {
            var component = _components[componentName];
            var arr = toArray(document.querySelectorAll(component.selector));

            if (arr.length) {
                renderComponent(arr, component);
            }
        }
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
        var context = {};

        component.controller.apply(context);

        component.helpers.forEach(function (helper) {
            if (!has(helper)) {
                return;
            }

            var componentHelper = _components[helper];

            var arr = toArray(element.querySelectorAll(componentHelper.selector));
            if (arr.length) {
                arr.forEach(function (elementHandler) {
                    componentHelper.ui.call(null, context, elementHandler);
                });
            }
        });
    }

    function wakeUp() {
        searchComponents();
    }

    w.component = component;
    w.wakeUp = wakeUp;

})(window);