'use strict';

import 'core-js/es6/map';
import 'core-js/es6/array';

import './components/@input';
import './components/@click';
import './components/@output';

import ComponentRecorder from './core/recorders/component-recorder';
import Manager from './core/dom/manager';

let Lonely = (name, configuration) => {
    new ComponentRecorder(name, configuration).register();
};

Lonely.lookAround = () => Manager.lookAround();

window.Lonely = Lonely;