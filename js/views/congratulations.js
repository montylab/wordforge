// main screen view
(function () {
    var congratulationsView = {
        name: 'congratulations',
        images: [],

        imageInit: function () {
            var prefix = 'congratulations';
            var nameArray = ['board', 'congratulations', 'stars', 'cong_01', 'cong_02', 'cong_03', 'cong_04', 'cong_05', 'cong_06', 'cong_07', 'cong_08', 'cong_09', 'cong_10'];

            for (var i=0; i<nameArray.length; i++) {
                this.images[nameArray[i]] = new Image();
                this.images[nameArray[i]].src = res[prefix+'_'+nameArray[i]];
            }

            this.imagesInitialized = true;
        },

        render: function(ctx, state) {
            this.imageInit();

            ctx.fillStyle = '#000000';
            ctx.globalAlpha=0.8;
            ctx.fillRect(0,0,1000,1000);
            ctx.globalAlpha=1;


            //this.drawImage('board', ctx, {top: 260, left: 45});
            //this.drawImage('stars', ctx, {top: 116, left: 389});
            //   this.drawImage('congratulations', ctx, {top: 222, left: 229});

            buttonsManager.drawButton('nextWordRack', ctx);

            ctx.font = '29px calibriz';
            ctx.fillStyle = '#483219';
            ctx.textBaseline = 'top';
            ctx.fillText('The words you entered were correct.', 288, 403);
            ctx.fillText('Hit the button below once the', 328, 439);
            ctx.fillText('next word set loads to continue', 320, 475);

            this.drawAnimations();
        },

        drawAnimations: function () {
            var frames = 1;
            var _this = this;
            var ctx = App.anCtx;
            var interval = setInterval(function () {

                var frame = frames < 10 ? '0'+frames : frames;
                ctx.clearRect(0,0, 1000, 1000);
                _this.drawImage('cong_'+frame, ctx, {top: 105, left: 46});

                ctx.font = '29px calibriz';
                ctx.fillStyle = '#483219';
                ctx.textBaseline = 'top';
                ctx.fillText('The words you entered were correct.', 288, 403);
                ctx.fillText('Hit the button below once the', 328, 439);
                ctx.fillText('next word set loads to continue', 320, 475);
                buttonsManager.drawButton('nextWordRack', ctx);

                if (frames == 10) clearInterval(interval);
                frames++;
            }, 60);
        },

        clearAnimation: function () {
            App.anCtx.clearRect(0,0, 1000, 1000);
        },


        drawImage: function (name, ctx, options) {
            var top = (options && options.top)?options.top:0;
            var left = (options && options.left)?options.left:0;

            ctx.drawImage(this.images[name], left,top);
        }
    };

    viewManager.addView(congratulationsView);
})();
