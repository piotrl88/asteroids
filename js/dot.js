Dot.count = 0;
Dot.maxD = 35;
Dot.all = {};

function Dot(x, y) {
    Dot.count++;
    this.id = Dot.count.toString();
    Dot.all[this.id] = this;
    this.x = x;
    this.y = y;

    this.start_r = CONST.rand(100, 240);
    this.start_g = CONST.rand(100, 240);
    this.start_b = CONST.rand(100, 240);

    this.d = 0;
    this.modX = CONST.rand(3,7) * (CONST.rand(0,1) ? 1 : -1 );
    this.modY = CONST.rand(3,7) * (CONST.rand(0,1) ? 1 : -1 );
}

Dot.prototype.draw = function () {

    this.x += this.modX;
    this.y += this.modY;

    this.d++;

    Game.ctx.fillStyle = 'rgb(' + this.start_r + ',' + this.start_g + ',' + this.start_b + ')';
    Game.ctx.fillRect(this.x, this.y, 3, 3);

    if(this.d > Dot.maxD) {

        Game.ctx.fillStyle = 'rgba(255,255,255, 0.2)';
        Game.ctx.fillRect(this.x, this.y, 3, 3);

        delete Dot.all[this.id];
    }
};

Dot.add = function (x ,y ) {
    var n = CONST.rand(15, 40);
    for (var i = 0; i < n; i++) {
        new Dot(x, y);
    }
};

Dot.draw = function () {
    //Rock.num = 0;
    for (var i in Dot.all) {
        Dot.num++;
        Dot.all[i].draw();
    }
}
