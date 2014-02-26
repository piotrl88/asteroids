Pickup.count = 0;
Pickup.max = 5;
Pickup.all = {};
Pickup.data = [
    {
        bulletsMax: 2,
        bulletsLife: 15,
        bulletSpeed: 0.015
    },
    {
        bulletsMax: 7,
        bulletsLife: 35,
        bulletSpeed: 0.045
    },
    {
        bulletsMax: 15,
        bulletsLife: 50,
        bulletSpeed: 0.09
    }
];

function Pickup(x, y) {
    Pickup.count++;
    this.id = Pickup.count.toString();
    Pickup.all[this.id] = this;

    //this.type = type !== undefined ? type : CONST.rand(1,3);
    this.x = x;
    this.y = y;
    this.r = 0.05 * CONST.d;

    this.start_r = CONST.rand(100, 240);
    this.start_g = CONST.rand(100, 240);
    this.start_b = CONST.rand(100, 240);
}

Pickup.prototype.draw = function () {
    Game.ctx.fillStyle = 'rgb(' + this.start_r + ',' + this.start_g + ',' + this.start_b + ')';
    Game.ctx.fillRect(this.x, this.y, this.r, this.r);
};

Pickup.prototype.remove = function () {
    delete Pickup.all[this.id];
    Dot.add(this.x, this.y);
};

Pickup.draw = function () {
    Pickup.num = 0;
    for (var i in Pickup.all) {
        Pickup.num++;
        Pickup.all[i].draw();
    }
};

Pickup.reset = function () {
    for (var i in Pickup.all) {
        delete Pickup.all[i];
    }
    Bullet.max = 5;
    Bullet.speed = 0.022;
    Bullet.life = 35;
};


Pickup.add = function (x, y) {
    new Pickup(x, y);
};

Pickup.reward = function () {
    Bullet.life = Pickup.data[CONST.rand(0,2)].bulletsLife;
    Bullet.speed = Pickup.data[CONST.rand(0,2)].bulletSpeed;
    Bullet.max = Pickup.data[CONST.rand(0,2)].bulletsMax;

    setTimeout(Pickup.reset, 5000);
};

Pickup.prototype.hitTest = function (x, y) {
    if (x > this.x - this.r && x < this.x + this.r && y > this.y - this.r && y < this.y + this.r) {

        Game.hit_ctx.clearRect(this.x, this.y, this.r, this.r);
        Game.hit_ctx.fillRect(this.x, this.y, this.r, this.r);

        if (Game.hit_ctx.getImageData(x, y, 1, 1).data[0] === 255) {
            Pickup.reward();
            return true;
        }
    }
    return false;
};

