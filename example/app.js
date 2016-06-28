Lonely('@input', {
    selector: '[\\@input]',
    ui: function (model, element) {
        var modelAttr = element.getAttribute('@input');

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

Lonely('@click', {
    selector: '[\\@click]',
    ui: function (model, element) {
        var click = element.getAttribute('@click');
        var arr = click.split('(');

        element.onclick = function () {
            model[arr[0]]();
        };
    }
});

Lonely('@output', {
    selector: '[\\@output]',
    ui: function (model, element) {
        var output = element.getAttribute('@output');

        element.innerHTML = model[output];

        model['@watch'](output, function (old, current) {
            element.innerHTML = current;
        });
    }
});

Lonely('myForm', {
    selector: 'my-form',

    template: [
        '<h1 @output="title"></h1>',
        '<input @input="name">',
        '<button @click="say()">click</button>',
        '<h2 @output="name"></h2>'
    ].join(''),
    
    helpers: [
        '@input',
        '@click',
        '@output'
    ],

    ui: function (model, element) {
        var title = element.getAttribute('title');
        
        model.title = title;
    },

    model: function () {
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

Lonely.lookAround();