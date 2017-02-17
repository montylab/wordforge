var buttonsManager = {
    buttonsNames: ['playAgain', 'refresh', 'leaderboard', 'submitScore', 'howTo', 'menu', 'miniMenu', 'play', 'next', 'back', 'close', 'left', 'left_pressed', 'right', 'right_pressed'],
    buttons: {
        play: {
            top: 605,
            left: 360,
            width: 293,
            height: 100,

            action: function () {
                viewManager.views.gameplay.hardReset();
                App.score = 0;
                viewManager.switchTo('gameplay');
            },
            isActive: false
        },
        howTo: {
            top: 851,
            left: 360,
            width: 293,
            height: 100,
            action: function () {
                viewManager.switchTo('howToPlay');
            },
            isActive: false
        },
        leaderboard: {
            top: 744,
            left: 360,
            width: 293,
            height: 100,
            action: function () {
                viewManager.switchTo('leaderboard');
            },
            isActive: false
        },
        menu: {
            top: 813,
            left: 360,
            width: 293,
            height: 100,
            action: function () {
                viewManager.switchTo('main');
            },
            isActive: false
        },
        miniMenu: {
            top: 941,
            left: 800,
            width: 181,
            height: 56,
            action: function () {
                viewManager.switchTo('main');
                viewManager.views.gameplay.hardReset();
                App.anCtx.clearRect(0,0, 1000, 1000);
            },
            isActive: false
        },
        submitScore: {
            top: 701,
            left: 360,
            width: 280,
            height: 90,
            action: function () {
                var leaders = JSON.parse(localStorage.getItem('leaders')) || [];
                leaders.push({name: $('#submitScore').val(), score: App.score});
                localStorage.setItem('leaders', JSON.stringify(leaders));

                viewManager.switchTo('leaderboard', null, 'second');
            },
            isActive: false
        },
        playAgain: {
            top: 813,
            left: 360,
            width: 280,
            height: 90,
            action: function () {
                viewManager.views.gameplay.hardReset();
                App.score = 0;
                viewManager.switchTo('gameplay');
            },
            isActive: false
        },
        refresh: {
            top: 694,
            left: 360,
            width: 293,
            height: 100,
            action: function () {
                // transfer action into view
                // viewManager.switchTo('main');
            },
            isActive: false
        },
        close: {
            top: 5,
            left: 906,
            width: 69,
            height: 67,
            action: function () {
                viewManager.switchTo('main');
                viewManager.views.gameplay.hardReset();
                App.anCtx.clearRect(0,0, 1000, 1000);
            },
            isActive: false
        },
        back: {
            top: 465,
            left: 87,
            width: 59,
            height: 57,
            action: function () {
                viewManager.switchTo('howToPlay', null, 'first');
            },
            isActive: false
        },
        next: {
            top: 462,
            left: 840,
            width: 58,
            height: 57,
            action: function () {
                viewManager.switchTo('howToPlay', null, 'second');
            },
            isActive: false
        },
        left: {
            top: 868,
            left: 44,
            width: 135,
            height: 132,
            action: function (state) {
                if (viewManager.views.gameplay.paused) return;
                if (state == 'keyup') {
                    this.pressed = false;
                    buttonsManager.drawButton('left', this.ctx);
                    return;
                }

                if (state == 'keydown') {
                    this.pressed = true;
                    viewManager.views.gameplay.moveLeft();
                    buttonsManager.drawButton('left', this.ctx);
                    return;
                }
                this.pressed = state == 'pressed' ? true : false;;
                if (state == 'pressed') viewManager.views.gameplay.moveLeft();
                buttonsManager.drawButton('left', this.ctx);
            },
            isActive: false,
            pressed: false
        },
        left_pressed: {},
        right: {
            top: 868,
            left: 532,
            width: 135,
            height: 132,
            action: function (state) {
                if (viewManager.views.gameplay.paused) return;
                if (state == 'keyup') {
                    this.pressed = false;
                    buttonsManager.drawButton('right', this.ctx);
                    return;
                }

                if (state == 'keydown') {
                    this.pressed = true;
                    viewManager.views.gameplay.moveRight();
                    buttonsManager.drawButton('right', this.ctx);
                    return;
                }
                this.pressed = state == 'pressed' ? true : false;;
                if (state == 'pressed') viewManager.views.gameplay.moveRight();
                buttonsManager.drawButton('right', this.ctx);
            },
            isActive: false,
            pressed: false
        },
        right_pressed: {},
    },
    images: [],
    activeButtons: [],
    mainCtx: null,

    initialize: function (options) {
        this.mainCtx = options.ctx;
        this.buttonsInit();

        //mouse events
        $(document.body).on('mousemove', '#gameCanvas, #gmCanvas, #animationCanvas', this.mouseHover.bind(this));
        $(document.body).on('click', '#gameCanvas, #gmCanvas, #animationCanvas', this.mouseClick.bind(this));
        $(document.body).on('mousedown', '#gameCanvas, #gmCanvas, #animationCanvas', this.mouseDown.bind(this));

        this.buttons.left.ctx = App.anCtx;
        this.buttons.right.ctx = App.anCtx;
    },

    buttonsInit: function () {
        var prefix = 'button';

        for (var i=0; i<this.buttonsNames.length; i++) {
            this.images[this.buttonsNames[i]] = new Image();
            this.images[this.buttonsNames[i]].src = res[prefix+'_'+this.buttonsNames[i]];
            //console.log(this.buttonsNames[i]);
        }


        this.imagesInitialized = true;
    },

    drawButton: function (name, ctx, options) {
        var top = (options && options.top)?options.top:this.buttons[name].top;
        var left = (options && options.left)?options.left:this.buttons[name].left;

        ctx = this.buttons[name].ctx || ctx;

        this.buttons[name].isActive = true;
        if (this.buttons[name].pressed) {
            ctx.clearRect(this.buttons[name].left, this.buttons[name].top, this.buttons[name].width, this.buttons[name].height);
            ctx.drawImage(this.images[name+'_pressed'], left,top);
        } else {
            //ctx.clearRect(this.buttons[name].left, this.buttons[name].top, this.buttons[name].width, this.buttons[name].height);
            ctx.drawImage(this.images[name], left,top);
        }

    },

    mouseHover: function (e) {
        var btn;
        var x = e.offsetX;
        var y = e.offsetY;

        x = 1000/App.$gmCanvas.width() * x;
        y = 1000/App.$gmCanvas.width() * y;

        for (var i=0; i<this.buttonsNames.length; i++) {
            btn = this.buttons[this.buttonsNames[i]];
            if (btn.isActive && x > btn.left && x < btn.left+btn.width && y > btn.top && y < btn.top+btn.height) {
                //console.log(this.buttonsNames[i]);
                // inside the buttonName!
                $('#gameCanvas, #gmCanvas, #animationCanvas').css('cursor', 'pointer');
                return;
            }
            $('#gameCanvas, #gmCanvas, #animationCanvas').css('cursor', 'default');
        }
    },

    mouseClick: function (e) {
        var btn;
        var x = e.offsetX;
        var y = e.offsetY;

        x = 1000/App.$gmCanvas.width() * x;
        y = 1000/App.$gmCanvas.width() * y;

        for (var i=0; i<this.buttonsNames.length; i++) {
            btn = this.buttons[this.buttonsNames[i]];
            if (btn.isActive && x > btn.left && x < btn.left+btn.width && y > btn.top && y < btn.top+btn.height) {
                console.log('click on: '+this.buttonsNames[i]);
                btn.action();
                // inside the buttonName!
                return;
            }
        }
    },

    mouseDown: function (e) {
        var btn;
        var x = e.offsetX;
        var y = e.offsetY;

        x = 1000/App.$gmCanvas.width() * x;
        y = 1000/App.$gmCanvas.width() * y;

        for (var i=0; i<this.buttonsNames.length; i++) {
            btn = this.buttons[this.buttonsNames[i]];
            if (btn.isActive && btn.pressed != undefined && x > btn.left && x < btn.left+btn.width && y > btn.top && y < btn.top+btn.height) {
                btn.action('pressed');
                return;
            }
        }
    },

    disableButtons: function () {
        for (var i=0; i<this.buttonsNames.length; i++) {
            this.buttons[this.buttonsNames[i]].isActive = false;
        }
    }
};