'use strict';

import ComponentRecorder from './../core/recorders/component-recorder';

const name = '@output';

class Configuration {
    static selectors() {
        return '[\\@output]';
    }

    dom(model, element) {
        let output = element.getAttribute('@output');

        element.innerHTML = model[output];

        model['@watch'](output, (old, current) => {
            element.innerHTML = current;
        });
    }
}

new ComponentRecorder(name, Configuration).register();