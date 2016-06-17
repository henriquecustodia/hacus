component('@model', {
    selector: '[\\@model]',
    ui: function (model, element) {
        var modelAttr = element.getAttribute('@model');
        
        if (model[modelAttr]) {
            element.value = model[modelAttr];
        }
        
        element.onkeyup = function () {
            model[modelAttr] = element.value;
        };
        
        model.watch(modelAttr, function (id, old, value) {
            element.value = value;
        });
    }
});

component('app', {
    selector: 'app',
    template: '<input @model="name"><button @click="say()">click</button>',
    helpers: ['@model'],
    controller: function () {
        var that = this;
        this.watch('name', function (id, old, newName) {
            console.log(newName);
        });

        this.name = 'henrique';

        this.say = function () {
            alert('Hello, ' + that.name);
        };
    }
});

wakeUp()