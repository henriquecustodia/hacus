Lonely('customElement', class {
    static selectors() {
        return 'custom';
    }

    helpers(){
        return ['@input', '@click', '@output'];
    }

    template() {
        return `
            <h1 @output="title"></h1>
            <input @input="name">
            <button @click="say()">click</button>
            <h2 @output="name"></h2>
        `;
    }
    
    dom(model, element) {
        var title = element.getAttribute('title');

        model.title = title;
    }

    model() {
        this['@watch']('name', function (old, newName) {
            console.log('controller', newName);
        });

        this.name = 'henrique';

        this.say = function () {
            alert('Hello, ' + this.name);
        };
    }
});

Lonely.lookAround();