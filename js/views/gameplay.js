// main screen view
(function () {
    var letterSize = 57;
    var alphabet = 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z'.split(' ');
    var alphabetCnt = {
        A: 1,
        B: 3,
        C: 3,
        D: 2,
        E: 1,
        F: 4,
        G: 2,
        H: 4,
        I: 1,
        J: 8,
        K: 5,
        L: 1,
        M: 3,
        N: 1,
        O: 1,
        P: 3,
        Q: 10,
        R: 1,
        S: 1,
        T: 1,
        U: 1,
        V: 4,
        W: 4,
        X: 8,
        Y: 4,
        Z: 10,
    };

    var randomCnt = {
        A: 1,
        B: 3,
        C: 3,
        D: 2,
        E: 1,
        F: 4,
        G: 2,
        H: 4,
        I: 1,
        J: 8,
        K: 5,
        L: 1,
        M: 3,
        N: 1,
        O: 1,
        P: 3,
        Q: 20,
        R: 1,
        S: 1,
        T: 1,
        U: 1,
        V: 4,
        W: 4,
        X: 16,
        Y: 8,
        Z: 20,
    };


    var self;


    var gameplayView = {
        name: 'gameplay',
        images: [],
        lettersOnBoard: [],
        gridStartX: 61,
        gridStartY: 157,
        gridSizeX: 588,
        gridSizeY: 707,
        cellSize: 84,
        score: 0,
        mainWord: '',
        timePerFrame: 14,
        activeLetters: [],
        prediction: null,
        tetrisMatrix: [[],[],[], [],[],[], [],[],[]],
        paused: true,
        createdWords: [],
        level: 0,
        animationQ: [],
        catAnim: '',

        imageInit: function () {
            var prefix = 'gameplay';
            var nameArray = ['gameplay', 'panel', 'left', 'right', 'down', 'cat_01', 'cat_02', 'cat_03', 'cat_04','cat_05','cat_06','cat_07','cat_08','cat_09','cat_10', 'cat_11', 'cell_z_yellow',  'cell_z_blue',  'cell_z_green',  'cell_z_red',  'cell_z_pink', 'cell_y_yellow',  'cell_y_blue',  'cell_y_green',  'cell_y_red',  'cell_y_pink', 'cell_x_yellow',  'cell_x_blue',  'cell_x_green',  'cell_x_red',  'cell_x_pink', 'cell_w_yellow',  'cell_w_blue',  'cell_w_green',  'cell_w_red',  'cell_w_pink', 'cell_v_yellow',  'cell_v_blue',  'cell_v_green',  'cell_v_red',  'cell_v_pink', 'cell_u_yellow',  'cell_u_blue',  'cell_u_green',  'cell_u_red',  'cell_u_pink', 'cell_t_yellow',  'cell_t_blue',  'cell_t_green',  'cell_t_red',  'cell_t_pink', 'cell_s_yellow',  'cell_s_blue',  'cell_s_green',  'cell_s_red',  'cell_s_pink', 'cell_r_yellow',  'cell_r_blue',  'cell_r_green',  'cell_r_red',  'cell_r_pink', 'cell_q_yellow',  'cell_q_blue',  'cell_q_green',  'cell_q_red',  'cell_q_pink', 'cell_p_yellow',  'cell_p_blue',  'cell_p_green',  'cell_p_red',  'cell_p_pink', 'cell_o_yellow',  'cell_o_blue',  'cell_o_green',  'cell_o_red',  'cell_o_pink', 'cell_n_yellow',  'cell_n_blue',  'cell_n_green',  'cell_n_red',  'cell_n_pink', 'cell_m_yellow',  'cell_m_blue',  'cell_m_green',  'cell_m_red',  'cell_m_pink', 'cell_l_yellow',  'cell_l_blue',  'cell_l_green',  'cell_l_red',  'cell_l_pink', 'cell_k_yellow',  'cell_k_blue',  'cell_k_green',  'cell_k_red',  'cell_k_pink', 'cell_j_yellow',  'cell_j_blue',  'cell_j_green',  'cell_j_red',  'cell_j_pink', 'cell_i_yellow',  'cell_i_blue',  'cell_i_green',  'cell_i_red',  'cell_i_pink', 'cell_h_yellow',  'cell_h_blue',  'cell_h_green',  'cell_h_red',  'cell_h_pink', 'cell_g_yellow',  'cell_g_blue',  'cell_g_green',  'cell_g_red',  'cell_g_pink', 'cell_f_yellow',  'cell_f_blue',  'cell_f_green',  'cell_f_red',  'cell_f_pink', 'cell_e_yellow',  'cell_e_blue',  'cell_e_green',  'cell_e_red',  'cell_e_pink',    'cell_d_yellow',  'cell_d_blue',  'cell_d_green',  'cell_d_red',  'cell_d_pink',    'cell_c_yellow',  'cell_c_blue',  'cell_c_green',  'cell_c_red',  'cell_c_pink',    'cell_b_yellow',  'cell_b_blue',  'cell_b_green',  'cell_b_red',  'cell_b_pink',    'cell_a_yellow',  'cell_a_blue',  'cell_a_green',  'cell_a_red',  'cell_a_pink',];

            for (var i = 0; i < nameArray.length; i++) {
                this.images[nameArray[i]] = new Image();
                this.images[nameArray[i]].src = res[prefix + '_' + nameArray[i]];
            }

            this.imagesInitialized = true;
        },

        render: function (ctx) {
            this.imageInit();

            this.nextLevel(1);

            // init only one time per game
            if (!this.initialized) {
                this.initialized = true;
                $(window).on('keydown', this.keydown);
                $(window).on('keyup', this.keyup);

                var i = clean.length;
                while(i--) {
                    clean[i].w = clean[i].w.toUpperCase();
                }
            }

            this.generateBonusWord();

            this.drawImage('gameplay', ctx);

            this.drawLevelScore(App.anCtx);

            //buttonsManager.drawButton('submit', ctx);
            buttonsManager.drawButton('miniMenu', ctx);
            buttonsManager.drawButton('close', ctx);

            buttonsManager.drawButton('left', ctx);
            buttonsManager.drawButton('right', ctx);

            this.newLetter();
            this.drawBonusWord();

            this.gameStart();
            this.drawAnimations();
        },

        generateBonusWord: function () {
            App.bonusWord = kids[~~(Math.random()*kids.length)].w;
            if (App.bonusWord.length != 5) this.generateBonusWord();
        },

        drawBonusWord: function () {
            var ctx = App.anCtx;

            ctx.clearRect(208, 906, 300, 45);

            ctx.font = '40px Montserrat-Bold';
            ctx.fillStyle = '#FF0000';
            ctx.textBaseline = 'top';
            ctx.fillText(App.bonusWord, 363 - ctx.measureText(App.bonusWord).width/2, 899);

        },

        drawLevelScore: function (ctx) {
            ctx.clearRect(337, 53, 300, 50);
            ctx.clearRect(695, 155, 270, 680);

            ctx.font = '36px Muller-ExtraBold-DEMO';
            ctx.fillStyle = '#24FF00';
            ctx.textBaseline = 'top';
            ctx.lineWidth=4;
            ctx.strokeText(App.score, 569 - ctx.measureText(App.score).width/2, 62);
            ctx.fillText(App.score, 569 - ctx.measureText(App.score).width/2, 62);

            ctx.font = '32px Muller-ExtraBold-DEMO';
            ctx.strokeText(this.level, 387 - ctx.measureText(this.level).width/2, 64);
            ctx.fillText(this.level, 387 - ctx.measureText(this.level).width/2, 64);


            ctx.font = '24px Montserrat-Bold';
            ctx.fillStyle = '#FFFFFF';
            var i = this.createdWords.length;
            var w;
            while (i--) {
                w = this.createdWords[i];
                ctx.fillText(w, 830 - ctx.measureText(w).width/2, 170+32*i);
            }



        },

        gameStart: function () {
            self = this;
            this.paused = false;
            this.gameloop();
        },

        drawLetter: function (ctx, letter, size) {
            this.drawImage('cell_'+letter.name.toLowerCase()+'_'+letter.color, ctx, {left: letter.left, top: letter.top, size: size || this.cellSize});
        },

        destroy: function () {
            clearInterval(this.interval);
            this.lettersOnBoard = [];
            this.letterDragged = -1;
            this.tapped = -1;
            App.gmCtx.clearRect(0, 0, 1000, 1000);
        },

        drawImage: function (name, ctx, options) {
            var top = (options && options.top) ? options.top : 0;
            var left = (options && options.left) ? options.left : 0;

            if (options && options.size) {
                ctx.drawImage(this.images[name], 0, 0, this.images[name].width, this.images[name].height, left, top, options.size, options.size);
            } else {
                ctx.drawImage(this.images[name], left, top);
            }
        },

        drawAnimations: function () {
            var frames = 1;
            var _this = this;
            var ctx = App.anCtx;
            var interval = setInterval(function () {
                if (_this.paused) {
                    clearInterval(interval);
                    return;
                }
                var frame = frames < 10 ? '0'+frames : frames;
                ctx.clearRect(664, 619, 340, 340);

                if (_this.catAnim == 'left' ) {
                    _this.drawImage('left', ctx, {top: 619, left: 664});
                    _this.catAnim = '';

                } else if (_this.catAnim == 'right') {
                    _this.drawImage('right', ctx, {top: 619, left: 664});
                } else if (_this.catAnim == 'down') {
                    _this.drawImage('down', ctx, {top: 619, left: 664});
                } else {
                    _this.drawImage('cat_'+frame, ctx, {top: 619, left: 664});
                }

                _this.catAnim = '';
                _this.drawImage('panel', ctx, {top: 852, left: 663});


                if (frames == 11) frames = 1;
                frames++;
            }, 100);
        },

        detectPos: function (sym) {
            if (!sym) return;
            var hc = this.cellSize/8;
            if (sym.left > this.gridStartX - hc && sym.left < this.gridStartX + this.gridSizeX - hc && sym.top > this.gridStartY - hc && sym.top < this.gridStartY + this.gridSizeY - hc) {

                var shiftX = (sym.left - this.gridStartX) % this.cellSize;
                var shiftY = (sym.top - this.gridStartY) % this.cellSize;

                var x = Math.round((sym.left - this.gridStartX) / this.cellSize);
                var y = Math.round((sym.top - this.gridStartY) / this.cellSize);

                return {x: x, y: y, shiftY: shiftY, shiftX: shiftX};
            }
        },


        checkWords: function () {
            var matrix = this.tetrisMatrix;
            var words = [];
            var word;
            var x, y, i, maxLength = 0, maxLengthI = -1;
            var correctWords = [];

            for (y = 0; y < 8; y++) {
                word = '';
                for (x = 0; x < 7; x++) {
                    if (matrix[y][x]) {
                        word = matrix[y][x].name;
                        for (i = x+1; i < 7; i++) {
                            if (matrix[y][i]) {
                                word += matrix[y][i].name;
                                if (word.length > 2) words.push(word);
                            } else {
                                break;
                            }
                        }
                    }
                }
            }

            i = words.length;
            while (i--) {
                if (words[i] != this.mainWord) { // don't count main word
                    x = clean.length;
                    while (x--) {
                        if (words[i] == clean[x].w) {
                            correctWords.push(words[i]);

                            if (maxLength<words[i].length ) {
                                maxLength = words[i].length;
                                maxLengthI = i;
                            }
                        }
                    }
                }
            }

            if (maxLengthI == -1) return;

            var wordLen;
            var wLen;
            var indexes = [];
            wordLen = words[maxLengthI].length;
            word = words[maxLengthI];
            for (y = 0; y < 8; y++) {
                wLen = 0;
                indexes = [];
                for (x = 0; x < 7; x++) {
                    for (i = x; i < 7; i++) {
                        if (matrix[y][i] && word[wLen] == matrix[y][i].name) {
                            indexes.push({x: i, y: y, cost: alphabetCnt[matrix[y][i].name]});
                            wLen++;
                            if (wLen == wordLen) {
                                this.createdWords.push(word);

                                if (word==App.bonusWord) {
                                    this.generateBonusWord();
                                    this.drawBonusWord();
                                    this.removeWord(indexes, 2);
                                } else {
                                    this.removeWord(indexes, 1);
                                }

                                return;
                            }
                        } else {
                            wLen = 0;
                            indexes = [];
                        }
                    }
                }
            }

            console.info(words);
            console.info(correctWords);
        },

        removeWord: function (indexes, multiplier) {
            var i=indexes.length;
            var k;
            var letIndex = indexes.length;

            while (i--) {
                App.score += indexes[i].cost*multiplier;
                this.tetrisMatrix[indexes[i].y][indexes[i].x].delay = 5*letIndex--;

                this.animationQ.push(this.tetrisMatrix[indexes[i].y][indexes[i].x]);
                this.tetrisMatrix[indexes[i].y][indexes[i].x] = undefined;
                k = indexes[i].y;
                while (k > 0) {
                    this.tetrisMatrix[k][indexes[i].x] = this.tetrisMatrix[k-1][indexes[i].x];
                    if (this.tetrisMatrix[k][indexes[i].x]) {
                        setTimeout(function (dx, dy, fCnt) {
                            fCnt--;
                            if (fCnt < 20) {
                                self.tetrisMatrix[dy][dx].top += self.cellSize/20;
                            }
                            if (fCnt) setTimeout(arguments.callee.bind(this, dx, dy, fCnt), self.timePerFrame);
                        }.bind(this, indexes[i].x, k, 40+3*i), this.timePerFrame);

                    }
                    k--;
                }
            }

            this.nextLevel();
            this.drawLevelScore(App.anCtx);

        },

        reset: function () {
            this.paused = true;
        },

        hardReset: function () {
            this.paused = true;
            this.tetrisMatrix = [[],[],[], [],[],[], [],[],[]];
            this.activeLetter = null;
            this.activeLetters =  [];
            this.createdWords = [];
        },

        newLetter: function () {
            if (!this.prediction) this.predictLetters();

            this.activeLetters = this.prediction;
            this.predictLetters();

            App.anCtx.clearRect(100, 20, 160, 90);

            if (this.lpl == 3) {
                this.drawLetter(App.anCtx, {name: this.prediction[0].name, left: 118, top: 48, color: this.prediction[0].color}, 40);
                this.drawLetter(App.anCtx, {name: this.prediction[1].name, left: 158, top: 48, color: this.prediction[1].color}, 40);
                this.drawLetter(App.anCtx, {name: this.prediction[2].name, left: 198, top: 48, color: this.prediction[2].color}, 40);
            } else if (this.lpl == 2) {
                this.drawLetter(App.anCtx, {name: this.prediction[0].name, left: 131, top: 42, color: this.prediction[0].color}, 50);
                this.drawLetter(App.anCtx, {name: this.prediction[1].name, left: 178, top: 42, color: this.prediction[1].color}, 50);
            } else {
                this.drawLetter(App.anCtx, {name: this.prediction[0].name, left: 153, top: 42, color: this.prediction[0].color}, 50);
            }
        },

        predictLetters: function (forced) {
            if (this.lpl == 1) {
                this.prediction = [{name: this.randomLetter(), top: 152, left: 313, color: ['green', 'red', 'pink', 'blue', 'yellow'][~~(Math.random()*5)]}];
            }
            if (this.lpl == 2) {
                this.prediction = [
                    {name: this.randomLetter(), top: 152, left: 229, color: ['green', 'red', 'pink', 'blue', 'yellow'][~~(Math.random()*5)]},
                    {name: this.randomLetter(), top: 152, left: 313, color: ['green', 'red', 'pink', 'blue', 'yellow'][~~(Math.random()*5)]},
                ];
            }
            if (this.lpl == 3) {
                this.prediction = [
                    {name: this.randomLetter(), top: 152, left: 229, color: ['green', 'red', 'pink', 'blue', 'yellow'][~~(Math.random()*5)]},
                    {name: this.randomLetter(), top: 152, left: 313, color: ['green', 'red', 'pink', 'blue', 'yellow'][~~(Math.random()*5)]},
                    {name: this.randomLetter(), top: 152, left: 397, color: ['green', 'red', 'pink', 'blue', 'yellow'][~~(Math.random()*5)]}
                ];
            }

        },

        gameover: function () {
            this.pause = true;
            this.hardReset();
            App.anCtx.clearRect(0,0, 1000, 1000);
            viewManager.switchTo('submit');
        },

        nextLevel: function () {
            this.level = ~~(App.score / 30) + 1;
            this.lpl = this.level%3 ? this.level%3 : 3;

            var empty = 0;
            this.activeLetters.forEach(function(el, i) {
                if (!el )empty++;
            });
            if (empty == this.activeLetters.length) {
                this.predictLetters();
                this.newLetter();
            }
        },


        needU: false,
        lastVowel: 0,
        vowels: "EYUIOA",
        randomLetter: function () {
            var randN = ~~(Math.random()*427);
            if (this.needU) {
                this.needU = false;
                lastVowel = 0;
                return 'U';
            }

            for (var name in randomCnt) {
                randN -= (21-randomCnt[name]);
                if (randN < 0) {
                    this.needU = name=='Q';
                    if (this.vowels.indexOf(name) != -1) {
                        this.lastVowel = 0;
                    } else {
                        this.lastVowel++;
                    }

                    if (this.lastVowel > 4) {
                        return this.randomLetter();
                    }
                    return name;
                }
            }
        },

        gameloop: function () {
            if (this.tetrisMatrix[0][3]) {
                this.gameover();
            }
            if (this.paused) return;
            var empty = 0;
            this.activeLetters.forEach(function(el, i) {
                if (!el )empty++;
            });
            if (!this.activeLetters || empty == this.activeLetters.length) {
                this.newLetter();
            }


            var i = this.activeLetters.length;
            while (i--){
                if (!this.activeLetters[i]) continue;
                this.activeLetters[i].top += 2;
                this.checkCollisions(this.activeLetters[i]);
            }

            // erase
            App.anCtx.clearRect(this.gridStartX, this.gridStartY - this.cellSize/2 , this.gridSizeX, this.gridSizeY + this.cellSize/2);

            //draw
            for (var y=0; y<this.tetrisMatrix.length; y++) {
                for (var x=0; x<this.tetrisMatrix[y].length; x++) {
                    if (this.tetrisMatrix[y][x]) {
                        this.drawLetter(App.anCtx, this.tetrisMatrix[y][x]);
                    }
                }
            }
            if (this.activeLetters) {
                var i = this.activeLetters.length;
                while (i--){
                    if (!this.activeLetters[i]) continue;
                    this.drawLetter(App.anCtx, this.activeLetters[i]);
                }
            }

            var i = this.animationQ.length;
            var ctx =  App.anCtx;
            var fs;
            while(i--) {
                if (this.animationQ[i]) {
                    if (this.animationQ[i].delay-- > 0) {
                        this.drawLetter(App.anCtx, this.animationQ[i], this.cellSize);
                        continue;
                    }

                    this.animationQ[i].size = this.animationQ[i].size-4 || this.cellSize;
                    this.animationQ[i].left += 2;
                    this.animationQ[i].top += 2;
                    this.drawLetter(App.anCtx, this.animationQ[i], this.animationQ[i].size);

                    fs = this.animationQ[i].size-47*(1/this.animationQ[i].size);
                    fs = Math.max(fs, 5);
                    ctx.font = fs +'px Muller-ExtraBold-DEMO';
                    ctx.fillStyle = '#FFFFFF';
                    ctx.textBaseline = 'top';
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = '#FFFFFF';
                    ctx.fillText(this.animationQ[i].name, this.animationQ[i].left+this.animationQ[i].size/2-ctx.measureText(this.animationQ[i].name).width/2, this.animationQ[i].top+this.animationQ[i].size/5-3);
                    ctx.shadowBlur = 0;
                    if (this.animationQ[i].size < 5) this.animationQ[i] = undefined;
                }
            }


            setTimeout(this.gameloop.bind(this), this.timePerFrame);
        },

        checkCollisions: function (al) {

            // tetris matrix collisions
            for (var y=0; y<this.tetrisMatrix.length; y++) {
                for (var x=0; x<this.tetrisMatrix[y].length; x++) {
                    if (this.tetrisMatrix[y][x]) {
                        if (al.top >= this.tetrisMatrix[y][x].top - this.cellSize && al.left == this.tetrisMatrix[y][x].left) {
                            this.putLetterToMatrix(al);
                            return;
                        }
                    }
                }
            }

            if (al.top > 828-this.cellSize) {
                this.putLetterToMatrix(al);
            }
        },

        putLetterToMatrix: function (al) {
            var pos = this.detectPos(al);
            al.left = this.gridStartX + pos.x * this.cellSize;
            al.top = this.gridStartY + pos.y * this.cellSize;
            this.tetrisMatrix[pos.y][pos.x] = al;

            this.activeLetters.forEach(function (el, i) {
                if (!el) return;
                if (el.left == al.left) {
                    self.activeLetters[i] = null;
                }
            });

            this.checkWords();
        },

        clearActiveLetter: function () {
            var l;
            var ctx = App.anCtx;
            var i = this.activeLetters.length;
            while (i--) {
                l = this.activeLetters[i];
                ctx.clearRect(l.left-this.cellSize, l.top-this.cellSize, l.left+this.cellSize, l.top+this.cellSize)
            }
        },

        keydown: function (e) {
            if (!self.activeLetters) return;

            if (e.keyCode == 37) {
                buttonsManager.buttons.left.action('keydown');
            }
            if (e.keyCode == 39) {
                buttonsManager.buttons.right.action('keydown');
            }
            if (e.keyCode == 40) {
                self.activeLetters.forEach(function (el, i) {
                    if (!el) return;
                    el.top += 40;
                });
                self.catAnim = 'down';
            }
        },
        keyup: function () {
            if (buttonsManager.buttons.left.pressed) buttonsManager.buttons.left.action('keyup');
            if (buttonsManager.buttons.right.pressed) buttonsManager.buttons.right.action('keyup');
        },

        moveLeft: function () {
            if (self.activeLetters && !self.paused) {
                var leftLetter = self.activeLetters[0] || self.activeLetters[1] || self.activeLetters[2];

                if (!leftLetter) return;

                var pos = self.detectPos(leftLetter);
                if (leftLetter.left >= self.gridStartX + self.cellSize && !self.tetrisMatrix[pos.y][pos.x - 1]) {

                    if (pos.shiftY < self.cellSize/2 &&  self.tetrisMatrix[pos.y+1][pos.x - 1]) {console.error(pos.shiftY); return;}
                    console.log(pos.shiftY);
                    self.activeLetters.forEach(function (el, i) {
                        if (!el) return;
                        el.left -= self.cellSize;
                    });

                }
            }
            this.catAnim = 'left';
        },
        moveRight: function () {
            if (self.activeLetters && !self.paused) {
                var rightLetter = self.activeLetters[2] || self.activeLetters[1] || self.activeLetters[0];
                if (!rightLetter) return;

                var pos = self.detectPos(rightLetter);
                if (rightLetter.left < self.gridStartX + self.gridSizeX-self.cellSize && !self.tetrisMatrix[pos.y][pos.x+1]) {
                    self.activeLetters.forEach(function (el, i) {
                        if (!el) return;
                        el.left += self.cellSize;
                    });
                }
            }
            this.catAnim = 'right';
        }
    };

    viewManager.addView(gameplayView);
})();
