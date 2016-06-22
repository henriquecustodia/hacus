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

component('@output', {
    selector: '[\\@output]',
    ui: function (model, element) {
        var output = element.getAttribute('@output');

        element.innerHTML = model[output];

        model['@watch'](output, function (old, current) {
            element.innerHTML = current;
        });
    }
});

component('myForm', {
    selector: 'my-form',

    template: [
        '<h1 @output="title"></h1>',
        '<input @model="name">',
        '<button @click="say()">click</button>',
        '<h2 @output="name"></h2>'
    ].join(''),
    
    helpers: [
        '@model',
        '@click',
        '@output'
    ],

    ui: function (model, element) {
        var title = element.getAttribute('title');
        
        model.title = title;
    },

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

wakeUp();