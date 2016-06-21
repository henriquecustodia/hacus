(function (w) {

    function noop() { }

    function toArray(list) {
        return Array.prototype.slice.call(list);
    }

    function has(name) {
        return !!_components[name];
    }

    var _components = {};

    function createContext() {
        return {
            '@firstWatch': true,
            '@watchers': {},
            '@watch': function (prop, fn) {
                var that = this;
                var id = Math.random() * 100 * 1000;
                var watch = that['@watchers'][prop];

                watch = watch || {};
                watch[id] = fn;

                that['@watchers'][prop] = watch;

                if (that['@firstWatch']) {
                    that.watch(prop, function name(id, old, current) {
                        var watcher = that['@watchers'][id];
                        for (var prop in watcher) {
                            watcher[prop](old, current);
                        }
                    });

                    that['@firstWatch'] = false;
                }

                return function () {
                    that['@unwatch'](prop, id);
                };
            },
            '@unwatch': function (prop, id) {
                delete this['@watchers'][prop][id];
            }
        };
    }

    function component(name, conf) {
        if (_components[name]) {
            throw new Error('Already exists the "' + name + '" component');
        }

        if (!conf) {
            throw new Error('The second parameter has to be defined.');
        }

        _components[name] = {
            ui: conf.ui || noop,
            controller: conf.controller || noop,
            helpers: conf.helpers,
            selector: conf.selector,
            template: conf.template
        }
    }

    function searchComponents() {
        for (var componentName in _components) {
            var component = _components[componentName];
            var elements = toArray(document.querySelectorAll(component.selector));

            if (elements.length) {
                renderComponent(elements, component);
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
        var context = createContext();

        component.controller.apply(context);

        component.helpers.forEach(function (helper) {
            if (!has(helper)) {
                return;
            }

            var componentHelper = _components[helper];

            var elements = toArray(element.querySelectorAll(componentHelper.selector));
            if (elements.length) {
                elements.forEach(function (elementHandler) {
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