
window.onload = function () {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    //控制音效
    var hit = document.getElementById('hit');

    // 創建人物對象
    class Player {
        //要用constructor ES6
        constructor(name, character) {
            this.invincible = false;
            this.freezed = false;
            this.name = name;
            this.character = character;
            this.score = 0;
            // Image()對象 
            this.image = new Image(164 * 0.5, 214 * 0.7); // (width,height)
            // 初始位置
            this.x = character == 'left' ? 375 - this.image.width / 2 : 1125 - this.image.width / 2;
            this.y = canvas.height - this.image.height;
            //給圖片設置監聽事件
            this.ready = false;
            //重要！！ constructor內的可以在初始化的時候就先執行
            //要在paint()外面先load好圖片 不然每次都重新load一邊會造成時差=>圖片閃爍
            this.image.src = this.character == 'left' ? 'assets/trump.png' : 'assets/biden.png';
            //src放在onload前面或後面都可以
            var that = this;
            this.image.onload = function () {
                that.ready = true;
            }
        }
        paint() {
            if (this.ready = true) {
                // console.log(this.ready);
                // 利用that因為在function內部的this會變成this.image
                context.drawImage(this.image, this.x, this.y, 164 * 0.7, 214 * 0.7);

            }
        }
        toRight() {
            this.x += 50;

        }
        toLeft() {
            this.x -= 50;

        }
        checkOutOfBoundary() {
            if (this.x <= 0) {
                this.x = 0
            } else if (this.x >= canvas.width - this.image.width) {
                this.x = canvas.width - this.image.width;
            }
        }

        checkGetPoint() {

        }

        checkGetVirus() {

        }
    }


    class Drop {
        constructor() {
            // 初始位置
            // this.x = Math.random() * canvas.width;
            this.x;
            var tempX = Math.random();
            if (tempX < 0.1) {
                this.x = 0.1 * canvas.width;
            } else if (tempX >= 0.1 && tempX < 0.2) {
                this.x = 0.15 * canvas.width;
            } else if (tempX >= 0.2 && tempX < 0.3) {
                this.x = 0.25 * canvas.width;
            } else if (tempX >= 0.3 && tempX < 0.4) {
                this.x = 0.35 * canvas.width;
            } else if (tempX >= 0.4 && tempX < 0.5) {
                this.x = 0.45 * canvas.width;
            } else if (tempX >= 0.5 && tempX < 0.6) {
                this.x = 0.55 * canvas.width;
            } else if (tempX >= 0.6 && tempX < 0.7) {
                this.x = 0.65 * canvas.width;
            } else if (tempX >= 0.7 && tempX < 0.8) {
                this.x = 0.75 * canvas.width;
            } else if (tempX >= 0.8 && tempX < 0.9) {
                this.x = 0.85 * canvas.width;
            } else if (tempX >= 0.9 && tempX < 1.0) {
                this.x = 0.9 * canvas.width;
            }
            this.y = 0;
            //給圖片設置監聽事件
            this.ready = false;

        }

        paint() {
            if (this.ready) {
                context.drawImage(this.image, this.x, this.y, 100, 100);
            }
        }

        step() {
            this.y += 5;
        }

    }


    class Virus extends Drop {
        //可以設定遊戲難度
        constructor() {
            super();
            this.image = new Image(132, 124);
            this.image.src = 'assets/virus.png';
            var that = this;
            this.image.onload = function () {
                that.ready = true;
            }
        }
        paint() {
            if (this.ready) {
                context.drawImage(this.image, this.x, this.y, 70, 70);
            }
        }

        step() {
            this.y += 6;
        }
    }

    class Vote extends Drop {
        constructor() {
            super();
            this.image = new Image(132, 124);
            this.image.src = 'assets/vote.png';
            var that = this;
            this.image.onload = function () {
                that.ready = true;
            }
        }
        paint() {
            if (this.ready) {
                context.drawImage(this.image, this.x, this.y, 100, 100);
            }
        }
    }

    class Mask extends Drop {
        constructor() {
            super();
            this.image = new Image(132, 124);
            this.image.src = 'assets/mask.png';
            var that = this;
            this.image.onload = function () {
                that.ready = true;
            }
        }
        paint() {
            if (this.ready) {
                context.drawImage(this.image, this.x, this.y, 200, 180);
            }
        }

        step() {
            this.y += 8;
        }
    }


    var invincibleTime;
    function recordPoint() {
        var localArray = [];

        Object.keys(localStorage).forEach(function (key) {
            localArray.push([key, localStorage[key]])

        })
        var index = localArray.length;
        // console.log(localArray);
        while (index > 1) {
            index--;
            for (let i = 0; i < index; i++) {
                if (localArray[i][1] > localArray[i + 1][1]) {
                    let tempValue = localArray[i]
                    localArray[i] = localArray[i + 1]
                    localArray[i + 1] = tempValue
                }
            }
        }

        console.log(localArray);
        $('#leaderBoard ul').html('');
        for (let i = 0; i < localArray.length; i++) {
            $('#leaderBoard ul').append('<li>' + (i + 1) + '.        ' + localArray[i][0] + '           ' + localArray[i][1] + '  point' + '</li>')
        }
    
    }
    function gameStop() {
        clearInterval(gameStart);
        $('#protection1').css('display', 'none');
        $('#protection2').css('display', 'none');
        //存起來每個人的成績
        localStorage.setItem(Trump.name, Trump.score);
        localStorage.setItem(Biden.name, Biden.score);
        // console.log(localStorage);
        recordPoint();




        //展現restart
        $('#gameFinal').show();
        if (Trump.score > Biden.score) {
            $('#winner img').attr('src', "./assets/mask_trump.png");
            $('.score').text(Trump.score);
        } else {
            $('#winner img').attr('src', "./assets/mask_biden.png");
            $('.score').text(Biden.score);
        }
        // 清空陣列 為了下次重新開始遊戲
        clearInterval(masksInt);
        clearInterval(virusInt);
        clearInterval(virusInt2);
        clearInterval(votesInt);
        clearInterval(votesInt2);
        clearTimeout(invincibleTime);
        masks = [];
        virus_s = [];
        votes = [];
    }




    function checkHit(drops, character, type) {
        for (let i = 0; i < drops.length; i++) {
            if (drops[i].x + drops[i].image.width / 2 >= character.x - character.image.width / 2
                && drops[i].x - drops[i].image.width / 2 <= character.x + character.image.width / 2
                && drops[i].y >= character.y - character.image.height / 2) {

                if (type == 'virus') {
                    if (!character.invincible) {
                        //鼠掉
                        gameStop();
                        console.log('遊戲結束');
                        $('#pause').unbind('click');
                        hit.play();
                    }

                    //有bug會還沒碰到 或者已經過了才觸法這個function
                    // console.log('碰到了'+ character.name);
                    // console.log(drops[i].x);
                    // console.log(drops[i].y);
                } else if (type == 'mask') {
                    //無敵狀態
                    character.invincible = true;
                    if (character.character == 'left') {
                        //protection1 代表左邊圈圈
                        $('#protection1').css('display', 'block');
                        $('#protection1').css('top', (Trump.y - 40) + 'px');
                        $('#protection1').css('left', (Trump.x - 80) + 'px');
                    } else {
                        //protection2 代表右邊圈圈
                        $('#protection2').css('display', 'block');
                        $('#protection2').css('top', (Biden.y - 40) + 'px');
                        $('#protection2').css('left', (Biden.x - 80) + 'px');
                    }
                    // 設置timeout
                    var invincibleTime = setTimeout(function () {
                        console.log('無敵時間到');
                        if (character.character == 'left') {
                            $('#protection1').css('display', 'none');
                        } else if (character.character == 'right') {
                            $('#protection2').css('display', 'none');
                        }
                        character.invincible = false;

                    }, 5000);
                } else {
                    // gameStart = setInterval(gameOn,10);
                    character.score += 10;
                    if (character.character == 'left') {
                        $('#score1').text(character.score)
                    } else {
                        $('#score2').text(character.score)
                    }
                    // console.log(character.score + character.name);
                }

                drops.splice(i, 1);


            }
        }
    }



    var masks = [];
    var virus_s = [];  //複數
    var votes = [];

    // num = 一次創建多少個virus
    function virusCreate(virus_s, num) {
        for (let i = 0; i < num; i++) {
            var virus = new Virus();
            virus_s.push(virus);
        }
    }
    //繪製virus
    function virusPaint(virus_s) {
        for (let i = 0; i < virus_s.length; i++) {
            virus_s[i].paint();
        }
    }
    function virusMove(virus_s) {
        for (let i = 0; i < virus_s.length; i++) {
            virus_s[i].step();
        }
    }

    // num = 一次創建多少個vote
    function votesCreate(votes, num) {
        for (let i = 0; i < num; i++) {
            var vote = new Vote();
            votes.push(vote);
        }
    }
    //繪製votes
    function votesPaint(votes) {
        for (let i = 0; i < votes.length; i++) {
            votes[i].paint();
        }
    }
    function votesMove(masks) {
        for (let i = 0; i < votes.length; i++) {
            votes[i].step();
        }
    }

    // num = 一次創建多少個mask
    function masksCreate(masks, num) {
        for (let i = 0; i < num; i++) {
            var mask = new Mask();
            masks.push(mask);
        }
    }
    //繪製masks
    function masksPaint(masks) {
        for (let i = 0; i < masks.length; i++) {
            masks[i].paint();
        }
    }
    function masksMove(masks) {
        for (let i = 0; i < masks.length; i++) {
            masks[i].step();
        }
    }


    window.onkeydown = function (e) {
        //控制biden
        console.log(trumpName);
        if (trumpName && bidenName) {
            e.preventDefault();
            if ((e.keyCode == 37 || e.keyCode == 39) && !Biden.freezed) {
                if (e.keyCode == 37) {
                    Biden.toLeft();

                    $('#protection2').css('top', (Biden.y - 40) + 'px');
                    $('#protection2').css('left', (Biden.x - 80) + 'px');
                } else {
                    Biden.toRight();

                    $('#protection2').css('top', (Biden.y - 40) + 'px');
                    $('#protection2').css('left', (Biden.x - 80) + 'px');
                }
            }//控制trump 
            else if ((e.keyCode == 65 || e.keyCode == 68) && !Trump.freezed) {
                if (e.keyCode == 65) {
                    Trump.toLeft();
                    $('#protection1').css('top', (Trump.y - 40) + 'px');
                    $('#protection1').css('left', (Trump.x - 80) + 'px');
                } else {
                    Trump.toRight();
                    $('#protection1').css('top', (Trump.y - 40) + 'px');
                    $('#protection1').css('left', (Trump.x - 80) + 'px');
                }
            }
            if (e.keyCode == 38) {
                shootingBT()
                $('#shoot2').css('background', 'url("./assets/torpedo.png")')
                $('#shoot2').css('background-size', '90px 60px');
            } else if (e.keyCode == 87) {
                shootingTB()
                $('#shoot1').css('background', 'url("./assets/torpedo.png")')
                $('#shoot1').css('background-size', '90px 60px');

            }
            //check是否超出界外
            Trump.checkOutOfBoundary();
            Biden.checkOutOfBoundary();
            // check是否相撞 
            checkCollison(Trump, Biden, e.keyCode);
        }


    }

    //檢查川普和拜登碰撞
    function checkCollison(Trump, Biden, keycode) {

        var borderLeftBiden = Biden.x - Biden.image.width / 2;
        var borderRightTrump = Trump.x + Trump.image.width / 2;;
        if (borderRightTrump >= borderLeftBiden) {
            if (keycode == 37) {
                if (Trump.x <= 0) {
                    Biden.x = Trump.image.width;
                }
                Trump.x = Biden.x - Biden.image.width / 2 - Trump.image.width / 2;
            } else if (keycode == 68) {
                if (Biden.x >= canvas.width - Biden.image.width) {
                    Trump.x = canvas.width - Biden.image.width - Trump.image.width;
                }
                Biden.x = Trump.x + Trump.image.width / 2 + Biden.image.width / 2;
            }
        }

    }

    // bg可以包成一個對象
    var bg = new Image();
    var bgReady = false;
    bg.onload = function () {
        bgReady = true;
    }
    bg.src = 'assets/bg_final.jpg';



    //掉落mask數量、時間
    var masksInt
    //掉落virus數量、時間
    var virusInt
    var virusInt2
    //掉落vote數量、時間
    var votesInt
    var votesInt2

    function gameOn() {
        if (bgReady) {
            context.drawImage(bg, 0, 0, 1300, 800);
        }
        checkHit(masks, Trump, 'mask');
        checkHit(masks, Biden, 'mask');
        checkHit(virus_s, Trump, 'virus');
        checkHit(virus_s, Biden, 'virus');
        checkHit(votes, Trump, 'votes');
        checkHit(votes, Biden, 'votes');
        Trump.paint();
        Biden.paint();
        masksMove(masks);
        masksPaint(masks);
        votesMove(votes);
        votesPaint(votes);
        virusMove(virus_s);
        virusPaint(virus_s);
    }
    var gameStart;
    var trumpName;
    var bidenName;
    var Trump;
    var Biden;
    // 控制DOM

    //填寫完名字後正式開始
    $('#start').on('click', function () {
        // 填入玩家姓名
        trumpName = $('#trumpName').val()
        bidenName = $('#bidenName').val()
        if (!trumpName || !bidenName) {
            alert('請輸入玩家姓名');
            return
        }
        $('#loginBoard').css('display', 'none');
        masksInt = setInterval(function () {
            masksCreate(masks, 1);
        }, 1000)
        //掉落virus數量、時間
        virusInt = setInterval(function () {
            virusCreate(virus_s, 2);
        }, 5000)
        virusInt2 = setInterval(function () {
            virusCreate(virus_s, 1);
        }, 3000)
        //掉落vote數量、時間
        votesInt = setInterval(function () {
            votesCreate(votes, 1);
        }, 2000)
        votesInt2 = setInterval(function () {
            votesCreate(votes, 2);
        }, 1000)
        gameStart = setInterval(gameOn, 10);


        // 實例化兩個人物
        Trump = new Player(trumpName, 'left');
        Trump.paint();
        Biden = new Player(bidenName, 'right');
        Biden.paint();
    })

    $('#gameStart').on('click', function () {
        $('#loginBoard').show();
        $('#controlBoard').hide()
    })

    $('.ranking').on('click', function () {
        recordPoint();
        $('#leaderBoard').show();
    })

    $('#leaderBoard img').on('click', function () {
        $('#leaderBoard').hide()
    })
    $('#pause').on("click", function () {
        $(this).toggleClass('play');
        if ($(this).hasClass('play')) {
            clearInterval(gameStart);
            clearInterval(masksInt);
            clearInterval(virusInt);
            clearInterval(virusInt2);
            clearInterval(votesInt);
            clearInterval(votesInt2);
            clearTimeout(invincibleTime);


        } else {
            gameStart = setInterval(gameOn, 10);
            //掉落mask數量、時間
            masksInt = setInterval(function () {
                masksCreate(masks, 1);
            }, 1000)
            //掉落virus數量、時間
            virusInt = setInterval(function () {
                virusCreate(virus_s, 2);
            }, 5000)
            virusInt2 = setInterval(function () {
                virusCreate(virus_s, 1);
            }, 3000)
            //掉落vote數量、時間
            votesInt = setInterval(function () {
                votesCreate(votes, 1);
            }, 2000)
            votesInt2 = setInterval(function () {
                votesCreate(votes, 2);
            }, 1000)

        }
    })


    function parabola(x, destX, startX) {
        var distance = Math.abs(destX - startX);
        console.log('distance', distance);
        var y = (Math.pow((x + (distance / 2)) * 0.05, 2) * (1) + Math.pow((distance / 2) * 0.05, 2));

        return y;
    }

    // i.e from = Biden.x; to = Trump.x;
    function shootingBT() {
        var startX = Biden.x;
        var destX = Trump.x;
        var x = 0;
        var diff = parabola(0, destX, startX) - 800;
        var y = 0;
        var boom = setInterval(function () {
            y = parabola(x, destX, startX) - diff;
            x -= 5;

            console.log((x + Biden.x) + ',' + y);
            $('#testBlock').css('display', 'block');
            $('#testBlock').css('top', (y) + 'px');
            $('#testBlock').css('left', (x + Biden.x) + 'px');

            var num = $('#testBlock').css('left').substr(0, $('#testBlock').css('left').length - 2);

            //到底目的地
            if (num <= destX) {
                clearInterval(boom);
                // alert('daole!!!' + num);
                $('#testBlock').css('display', 'none');
                //爆炸動畫
                $('#explode').css('display', 'block');
                $('#explode').css('left', (destX + 200) + 'px');
                setTimeout(function () {
                    $('#explode').css('display', 'none');
                }, 2000);
                //凍結動作
                if (Math.abs(Trump.x - destX) < 200) {
                    freeze(Trump);
                }
            }
        }, 10);
    }
    function shootingTB() {
        function parabola1(x, destX, startX) {
            var distance = Math.abs(destX - startX);
            console.log('distance', distance);
            var y = (Math.pow((x - (distance / 2)) * 0.05, 2) * (1) + Math.pow((distance / 2) * 0.05, 2));

            return y;
        }

        var startX = Trump.x;
        var destX = Biden.x;
        var x = 0;
        var diff = parabola1(0, destX, startX) - 800;
        var y = 0;
        var boom = setInterval(function () {
            y = parabola1(x, destX, startX) - diff;
            x += 5;
            console.log((x + Trump.x) + ',' + y);
            $('#testBlock1').css('display', 'block');
            $('#testBlock1').css('top', (y) + 'px');
            $('#testBlock1').css('left', (x + Trump.x) + 'px');

            var num = $('#testBlock1').css('left').substr(0, $('#testBlock1').css('left').length - 2);


            if (num >= destX) {
                clearInterval(boom);
                // alert('daole!!!' + num);
                $('#testBlock1').css('display', 'none');
                // 爆炸特效
                $('#explode').css('display', 'block');
                $('#explode').css('left', (destX + 200) + 'px');
                setTimeout(function () {
                    $('#explode').css('display', 'none');
                }, 500);

                //凍結動作
                if (Math.abs(Biden.x - destX) < 200) {
                    freeze(Biden);
                }
            }
        }, 10);
    }

    // 暫停一個人的動作2秒
    function freeze(character) {
        var characterX = character.x;
        character.freezed = true;
        var freezeInt = setInterval(() => {
            character.x = characterX;
        }, 1);
        setTimeout(() => {
            clearInterval(freezeInt);
            character.freezed = false;
        }, 2000);
    }
}




