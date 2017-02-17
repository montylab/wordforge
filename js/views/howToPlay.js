// main screen view
(function () {
    var howToPlayView = {
        name: 'howToPlay',
        images: [],

        imageInit: function () {
            var prefix = 'howtoplay';
            var nameArray = ['howtoplay', 'controls'];

            for (var i=0; i<nameArray.length; i++) {
                this.images[nameArray[i]] = new Image();
                this.images[nameArray[i]].src = res[prefix+'_'+nameArray[i]];
            }

            this.imagesInitialized = true;
        },

        render: function(ctx, state) {
            this.imageInit();

            if (state == 'first' || !state) {
                this.drawImage('howtoplay', ctx, {top: 0, left: 0});

                buttonsManager.drawButton('next', ctx);
            } else if (state == 'second') {
                this.drawImage('controls', ctx, {top: 0, left: 0});
                buttonsManager.drawButton('back', ctx);
            }
            buttonsManager.drawButton('menu', ctx);
        },

        drawImage: function (name, ctx, options) {
            var top = (options && options.top)?options.top:0;
            var left = (options && options.left)?options.left:0;

            ctx.drawImage(this.images[name], left,top);
        }
    };

    viewManager.addView(howToPlayView);
})();
