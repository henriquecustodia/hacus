hacus('customElement', {
    selectors: 'custom',

    helpers: ['@value', '@click', '@output'],

    template() {
        return `
            <h1 @output="title"></h1>
            <input @value="name">
            <button @click="say(name, ue)">click</button>
            <h2 @output="name"></h2>
        `;
    },
    
    dom(model, element) {
        var title = element.getAttribute('title');

        model.title = title;
    },

    model() {
        this['@watch']('name', function (old, newName) {
            console.log('controller', newName);
        });

        this.ue = { a: 'aa' };

        this.say = function (name, ue) {
            alert('Hello, ' + this.name);
        };

        this.onChange = function (name) {
          debugger  
        };
    }
});

hacus.lookAround();