var App = {
    $canvas: null,
    ctx: null,
    score: 0,
    level: 1,

    init: function () {
        this.$canvas =  $('<canvas id="gameCanvas"></canvas>').appendTo($('.canvasHolder'));
        this.$gmCanvas =  $('<canvas id="gmCanvas"></canvas>').appendTo($('.canvasHolder'));
        this.$anCanvas =  $('<canvas id="animationCanvas"></canvas>').appendTo($('.canvasHolder'));

        this.$canvas[0].width = 1000;
        this.$canvas[0].height = 1000;
        this.ctx = this.$canvas[0].getContext('2d');

        this.$gmCanvas[0].width = 1000;
        this.$gmCanvas[0].height = 1000;
        this.gmCtx = this.$gmCanvas[0].getContext('2d');

        this.$anCanvas[0].width = 1000;
        this.$anCanvas[0].height = 1000;
        this.anCtx = this.$anCanvas[0].getContext('2d');

        buttonsManager.initialize({ctx: this.ctx});



        viewManager.initialize({ctx: this.ctx});
        viewManager.switchTo('main');
        //you can swith to any view for debug;
        //viewManager.switchTo('gameplay');


    }
};

$(function () {
    $(window).trigger('resize');
});

$(window).on('resize', function () {
    $('.canvasHolder').height($('.canvasHolder').width());
});