var res = {
    main_main: 'resources/main.png',
    howtoplay_howtoplay: 'resources/howToPlay.png',
    howtoplay_controls: 'resources/controls.png',
    submit_submitscore: 'resources/submitScore.png',
    leaderboard_leaderboard: 'resources/leaderboard.png',

    gameplay_gameplay: 'resources/gameplay.png',
    gameplay_panel: 'resources/panel.png',
    gameplay_cat_01: 'resources/animation/cat_01.png',
    gameplay_cat_02: 'resources/animation/cat_02.png',
    gameplay_cat_03: 'resources/animation/cat_03.png',
    gameplay_cat_04: 'resources/animation/cat_04.png',
    gameplay_cat_05: 'resources/animation/cat_05.png',
    gameplay_cat_06: 'resources/animation/cat_06.png',
    gameplay_cat_07: 'resources/animation/cat_07.png',
    gameplay_cat_08: 'resources/animation/cat_08.png',
    gameplay_cat_09: 'resources/animation/cat_09.png',
    gameplay_cat_10: 'resources/animation/cat_10.png',
    gameplay_cat_11: 'resources/animation/cat_11.png',
    gameplay_left: 'resources/animation/left.png',
    gameplay_right: 'resources/animation/right.png',
    gameplay_down: 'resources/animation/down.png',

    button_play: 'resources/button/play.png',
    button_howTo: 'resources/button/howTo.png',
    button_leaderboard: 'resources/button/leaderboard.png',
    button_menu: 'resources/button/menu.png',
    button_miniMenu: 'resources/button/miniMenu.png',
    button_refresh: 'resources/button/refresh.png',
    button_playAgain: 'resources/button/playAgain.png',
    button_submitScore: 'resources/button/submitScore.png',

    button_close: 'resources/button/close.png',
    button_back: 'resources/button/back.png',
    button_next: 'resources/button/next.png',

    button_left: 'resources/button/btn_left.png',
    button_left_pressed: 'resources/button/btn_left_pressed.png',
    button_right: 'resources/button/btn_right.png',
    button_right_pressed: 'resources/button/btn_right_pressed.png',
};

(function () {
    var i=26;
    var alphabet = 'a b c d e f g h i j k l m n o p q r s t u v w x y z'.split(' ');
    while(i--) {
        res['gameplay_cell_'+alphabet[i]+'_blue'] = 'resources/letters/' + alphabet[i] + '_blue.png';
        res['gameplay_cell_'+alphabet[i]+'_green'] = 'resources/letters/' + alphabet[i] + '_green.png';
        res['gameplay_cell_'+alphabet[i]+'_pink'] = 'resources/letters/' + alphabet[i] + '_pink.png';
        res['gameplay_cell_'+alphabet[i]+'_red'] = 'resources/letters/' + alphabet[i] + '_red.png';
        res['gameplay_cell_'+alphabet[i]+'_yellow'] = 'resources/letters/' + alphabet[i] + '_yellow.png';
        //console.log('\'cell_'+alphabet[i]+'_yellow\', ', '\'cell_'+alphabet[i]+'_blue\', ', '\'cell_'+alphabet[i]+'_green\', ', '\'cell_'+alphabet[i]+'_red\', ', '\'cell_'+alphabet[i]+'_pink\', ');
    }
})();

$(function () {
    var sources = res;
    loadImages(sources, initGame);  // calls initGame after *all* images have finished loading

    function loadImages(sources, callback) {
        var images = {};
        var loadedImages = 0;
        var numImages = 0;
        for (var src in sources) {
            numImages++;
        }
        for (var src in sources) {
            images[src] = new Image();
            images[src].onload = function(){
                if (++loadedImages >= numImages) {
                    callback(images);
                }

            };
            images[src].src = sources[src];
            $('.preloadHolder').append('<img src="'+images[src].src+'" alt="">');
        }
    }

    function initGame(images) {
        /*if (fontLoaded == 1) {
            App.init();
        }else */
        //setTimeout(App.init, 500);
        App.init();
    }
});
