component('@model', {
    selector: '[\\@model]',
    ui: function (model, element) {
        var modelAttr = element.getAttribute('@model');

        element.value = model[modelAttr];

        element.onkeyup = function () {
            model[modelAttr] = element.value;
        };

       var un = model['@watch'](modelAttr, function (old, value) {
            console.log('model', value)
            element.value = value;
            un();
        });
    }
});

component('@click', {
    selector: '[\\@click]',
    ui: function (model, element) {
        var click = element.getAttribute('@click');
        var arr = click.split('(');

        element.onclick = function () {
            model[arr[0]]();
        };
    }
});

component('app', {
    selector: 'app',
    template: '<input @model="name"><button @click="say()">click</button>',
    helpers: ['@model', '@click'],
    controller: function () {
        var that = this;
        this['@watch']('name', function (old, newName) {
            console.log('controller', newName);
        });

        this.name = 'henrique';

        this.say = function () {
            alert('Hello, ' + that.name);
        };
    }
});

wakeUp()