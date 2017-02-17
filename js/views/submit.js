// main screen view
(function () {
    var submitView = {
        name: 'submit',
        images: [],

        imageInit: function () {
            var prefix = 'submit';
            var nameArray = ['submitscore'];

            for (var i=0; i<nameArray.length; i++) {
                this.images[nameArray[i]] = new Image();
                this.images[nameArray[i]].src = res[prefix+'_'+nameArray[i]];
            }

            this.imagesInitialized = true;
        },

        render: function(ctx, state) {
            this.imageInit();


            this.drawImage('submitscore', ctx);
            //this.drawImage('owl', ctx, {top: 123, left: 204});

            buttonsManager.drawButton('submitScore', ctx);
            buttonsManager.drawButton('playAgain', ctx);

            ctx.font = '34px MyriadProBold';
            ctx.fillStyle = '#FFFFFF';
            ctx.textBaseline = 'top';
            var copy = 'SCORE: '+ App.score;
            ctx.fillText(copy, 491-ctx.measureText(copy).width/2, 435);

            $('#submitScore').show();
            var y = 545;
            y = y / (1000 / App.$gmCanvas.width());
            $('#submitScore').css('top', y+'px');
        },

        destroy: function () {
            $('#submitScore').hide();
        },

        drawImage: function (name, ctx, options) {
            var top = (options && options.top)?options.top:0;
            var left = (options && options.left)?options.left:0;

            ctx.drawImage(this.images[name], left,top);
        }
    };

    viewManager.addView(submitView);
})();
