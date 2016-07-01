'use strict';

import ComponentRecorder from './../core/recorders/component-recorder';

const name = '@click';

class Configuration {
    static selectors() {
        return '[\\@click]';
    }

    dom(model, element) {
        let click = element.getAttribute('@click');
        let arr = click.split('(');

        element.onclick =  () => {
            model[arr[0]]();
        };
    }
}

new ComponentRecorder(name, Configuration).register();