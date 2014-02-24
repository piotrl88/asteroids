Pickup.count = 0;
Pickup.max = 5;
Pickup.all = {};
Pickup.data = [
    {
        bulletMax: 2
    },
    {
        bulletMax: 7
    },
    {
        bulletMax: 15
    }
];

function Pickup(type, x, y) {
    Pickup.count++;
    this.id = Pickup.count.toString();
    Pickup.all[this.id] = this;
    this.type = type !== undefined ? type : CONST.rand(1,3);
    this.x = x;
    this.y = y;
    this.r = 0.02 * CONST.d;

    this.start_r = CONST.rand(100, 240);
    this.start_g = CONST.rand(100, 240);
    this.start_b = CONST.rand(100, 240);

    this.modX = CONST.rand(3, 7) * (CONST.rand(0, 1) ? 1 : -1 );
    this.modY = CONST.rand(3, 7) * (CONST.rand(0, 1) ? 1 : -1 );
}

Pickup.prototype.hitTest = function (x, y) {
    Game.hit_ctx.clearRect(this.x, this.y, this.r, this.r);
    Game.hit_ctx.fillRect(this.x, this.y, this.r, this.r);

    if (Game.hit_ctx.getImageData(x, y, 1, 1).data[0] === 255) {
        //Bullet.max = (CONST.rand(1,3) === Pickup.data[this.type]) ? Pickup.data[this.type].bulletMax : 5;
        return true;
    }
    return false;
};

Pickup.prototype.draw = function () {
    Game.ctx.fillStyle = 'rgb(' + this.start_r + ',' + this.start_g + ',' + this.start_b + ')';
    Game.ctx.fillRect(this.x, this.y, this.r, this.r);
};

Pickup.prototype.remove = function () {
    delete Pickup.all[this.id];
};

Pickup.draw = function () {
    Pickup.num = 0;
    for (var i in Pickup.all) {
        Pickup.num++;
        Pickup.all[i].draw();
    }
};