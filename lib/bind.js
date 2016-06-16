(function (w) {
    var _components = {};

    function component(name, conf) {
        if (_components[name]) {
            throw new Error('Already exists the "' + name + '" component');
        }

        if (!conf) {
            throw new Error('The second parameter has to be defined.');
        }

        _components[name] = {
            get: conf.controller,
            selector: conf.selector,
            template: conf.template
        }
    }

    function wakeUp() {
        for (var component in _components) {
            component = _components[component];
            
            var list = document.querySelectorAll(component.selector);

            for (var i = 0; i < list.length; i++) {
                var div = document.createElement('div');
                div.innerHTML = component.template;
                list[i].appendChild(div.firstChild);
            }
        }
    }

    w.component = component;
    w.wakeUp = wakeUp;

})(window);