var viewManager = {
    views: [],
    activeView: null,
    mainCtx: null,

    initialize: function (options) {
        this.mainCtx = options.ctx;
    },


    switchTo: function (name, ctx, state) {
        var context = ctx || this.mainCtx;

        if (this.views[name]) {
            //clear previous
            buttonsManager.disableButtons();
            if (this.activeView && this.views[this.activeView].destroy) {
                this.views[this.activeView].destroy();
            }

            //render new
            this.activeView = name;
            this.views[name].render(context, state);

        } else {
            console.error('there is no such view: '+name);
        }
    },

    addView: function (view) {
        this.views[view.name] = view;
    }
};