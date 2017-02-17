// main screen view
(function () {
    var leaderboardView = {
        name: 'leaderboard',
        images: [],

        imageInit: function () {
            var prefix = 'leaderboard';
            var nameArray = ['leaderboard'];

            for (var i=0; i<nameArray.length; i++) {
                this.images[nameArray[i]] = new Image();
                this.images[nameArray[i]].src = res[prefix+'_'+nameArray[i]];
            }

            this.imagesInitialized = true;
        },

        render: function(ctx) {
            this.imageInit();

            this.drawImage('leaderboard', ctx, {top: 0, left: 0});

            buttonsManager.drawButton('refresh', ctx);
            buttonsManager.drawButton('menu', ctx);

            // view logic
            ctx.shadowBlur = 0;

            ctx.font = '30px MyriadProCond';
            ctx.fillStyle = '#FFFFFF';
            ctx.textBaseline = 'top';

            var list = this.getLeaderList();
            var user;
            for (var i= 0, len = list.length; i<len; i++) {
                user = list.pop();
                ctx.fillText(user.name, 369, 323+i*45);
                ctx.fillText(user.score, 610, 323+i*45);
            }

        },

        drawImage: function (name, ctx, options) {
            var top = (options && options.top)?options.top:0;
            var left = (options && options.left)?options.left:0;

            ctx.drawImage(this.images[name], left,top);
        },

        getLeaderList: function () {
            var list = [];
            var uname = 'User Name';
            var score = 0;

            var leaders = JSON.parse(localStorage.getItem('leaders')) || [];
            leaders.sort(function (a, b) {
                return a.score > b.score ? -1 : 1;
            });

            for (var i=7; i!=-1; i--) {
                if (leaders[i]) {
                    leaders[i].name = i+1 + '. ' + leaders[i].name;
                        list.push(leaders[i]);
                } else {
                    list.push({name: i+1 + '. ' + uname, score: score});
                }
            }

            return list;
        }

    };

    viewManager.addView(leaderboardView);
})();
