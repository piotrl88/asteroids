$(document).ready(function () {
    Game.init();
});

var CONST = {
    fps: 60,
    width: 0,
    height: 0,
    d: 0,
    lastTime: 0,
    lastUpdate: -1,
    rand: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
};

var Game = {
    init: function () {
        Game.canvas = document.createElement('canvas');
        Game.hit_canvas = document.createElement('canvas');
        Game.ctx = Game.canvas.getContext('2d');
        Game.hit_ctx = Game.hit_canvas.getContext('2d');
        Game.layout();

        window.addEventListener('resize', Game.layout, false);
        window.addEventListener('keydown', Game.onKey, false);
        window.addEventListener('keyup', Game.onKey, false);

        document.body.appendChild(Game.canvas);

        for (var i = 0; i < 5; i++) {
            new Rock();
        }

        Game.ship = new Ship();
        Game.score = new Points();
        Game.animationLoop();

    },
    stop : function () {

        Game.key_37 = false;
        Game.key_38 = false;
        Game.key_39 = false;
        Game.key_32 = false;

        Game.ctx.clearRect(0, 0, CONST.width, CONST.height);
        Game.hit_ctx.clearRect(0, 0, CONST.width, CONST.height);

        window.removeEventListener('keydown', Game.onKey, false);
        window.removeEventListener('keyup', Game.onKey, false);
    },
    layout: function (e) {
        CONST.width = window.innerWidth;
        CONST.height = window.innerHeight;

        CONST.d = Math.min(CONST.width, CONST.height);

        Game.canvas.width = CONST.width;
        Game.canvas.height = CONST.height;

        Game.hit_canvas.width = CONST.width;
        Game.hit_canvas.height = CONST.height;
        Game.hit_ctx.fillStyle = '#ff0000';

        Game.ctx.fillStyle = '#ffffff';
        Game.ctx.strokeStyle = '#ffffff';
        Game.ctx.lineWidth = 3;
        Game.ctx.lineJoin = 'round';
    },
    animationLoop: function (time) {
        requestAnimationFrame(Game.animationLoop);
        if (time - CONST.lastTime >= 1000 / CONST.fps) {
            CONST.lastTime = time;
            Game.ctx.clearRect(0, 0, CONST.width, CONST.height);

            Game.ship.draw();
            Rock.draw();
            Bullet.draw();
            Dot.draw();
            Points.draw();
        }

    },
    onKey: function (e) {
        if (e.keyCode === 32 || e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39) {
            e.preventDefault();
            if (e.type === "keydown" && !Game['key_' + e.keyCode]) {
                Game['key_' + e.keyCode] = true;
                if (e.keyCode === 37) {
                    Game.key_39 = false;
                } else if (e.keyCode === 39) {
                    Game.key_37 = false;
                } else if (e.keyCode === 32) {
                    new Bullet();
                }
            } else if (e.type === "keyup") {
                Game['key_' + e.keyCode] = false;
            }
        }
    }
};
