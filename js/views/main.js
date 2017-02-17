// main screen view
(function () {
    var mainView = {
        name: 'main',
        images: [],

        imageInit: function () {
            var prefix = 'main';
            var nameArray = ['main'];

            for (var i=0; i<nameArray.length; i++) {
                this.images[nameArray[i]] = new Image();
                this.images[nameArray[i]].src = res[prefix+'_'+nameArray[i]];
            }

            this.imagesInitialized = true;
        },

        render: function(ctx) {
            this.imageInit();


            this.drawImage('main', ctx);

            buttonsManager.drawButton('play', ctx);
            buttonsManager.drawButton('howTo', ctx);
            buttonsManager.drawButton('leaderboard', ctx);
        },

        drawImage: function (name, ctx, options) {
            var top = (options && options.top)?options.top:0;
            var left = (options && options.left)?options.left:0;

            ctx.drawImage(this.images[name], left,top);
        }


    };

    viewManager.addView(mainView);
})();
