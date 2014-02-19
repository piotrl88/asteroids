Rock.count = 0;
Rock.all = {};
Rock.data = [
    {
        r: 0.025,
        speed: 0.0005,
        minAngle: 60,
        maxAgnle: 90
    },
    {
        r: 0.08,
        speed: 0.00025,
        minAngle: 50,
        maxAgnle: 70
    },
    {
        r: 0.2,
        speed: 0.00006,
        minAngle: 30,
        maxAgnle: 45
    }
];

function Rock(size, x, y) {
    Rock.count++;
    this.id = Rock.count.toString();
    Rock.all[this.id] = this;

    this.size = size !== undefined ? size : 2;
    this.x = x !== undefined ? x : (CONST.rand(0, 1) ? CONST.rand(0, 30) : CONST.rand(70, 100) / 100) * CONST.width;
    this.y = y !== undefined ? y : (CONST.rand(0, 1) ? CONST.rand(0, 30) / 100 : CONST.rand(70, 100) / 100) * CONST.width;

    this.modX = Rock.data[this.size].speed * CONST.rand(1, 10) * (CONST.rand(0, 1) ? 1 : -1);
    this.modY = Rock.data[this.size].speed * CONST.rand(1, 10) * (CONST.rand(0, 1) ? 1 : -1);

    this.points = [];

    this.r = Rock.data[this.size].r;


    var angle = 0;
    while (angle < 360) {
        angle += CONST.rand(Rock.data[this.size].minAngle, Rock.data[this.size].maxAgnle);
        this.points.push({
            x: Math.sin(Math.PI / 180 * angle) * this.r,
            y: Math.cos(Math.PI / 180 * angle) * this.r
        });
    }
}
Rock.prototype.hitTest = function (x, y) {
    if (x > this.x - this.r * CONST.d && x < this.x + this.r * CONST.d && y > this.y - this.r * CONST.d && y < this.y + this.r * CONST.d) {

        Game.hit_ctx.clearRect(this.x - this.r * CONST.d, this.y - this.r * CONST.d, this.r * 2 * CONST.d, this.r * 2 * CONST.d);

        Game.hit_ctx.beginPath();

        for (var i = 0; i < this.points.length; i++) {
            Game.hit_ctx[i === 0 ? 'moveTo' : 'lineTo'](this.points[i].x * CONST.d + this.x, this.points[i].y * CONST.d + this.y);
        }

        Game.hit_ctx.closePath();
        Game.hit_ctx.fill();

        if (Game.hit_ctx.getImageData(x, y, 1, 1).data[0] === 255) {
            return true;
        }
    }
    return false;
};

Rock.prototype.draw = function () {

    this.x += this.modX * CONST.d;
    this.y += this.modY * CONST.d;

    if (this.x + this.r * CONST.d < 0) {
        this.x += CONST.width + (this.r * 2 * CONST.d);
    } else if (this.x - this.r * CONST.d > CONST.width) {
        this.x -= CONST.width + (this.r * 2 * CONST.d);
    }

    if (this.y + this.r * CONST.d < 0) {
        this.y += CONST.height + (this.r * 2 * CONST.d);
    } else if (this.y - this.r * CONST.d > CONST.height) {
        this.y -= CONST.height + (this.r * 2 * CONST.d);
    }

    Game.ctx.beginPath();
    for (var i = 0; i < this.points.length; i++) {
        Game.ctx[i === 0 ? 'moveTo' : 'lineTo'](this.points[i].x * CONST.d + this.x, this.points[i].y * CONST.d + this.y);
        Game.hit_ctx[i === 0 ? 'moveTo' : 'lineTo'](this.points[i].x * CONST.d + this.x, this.points[i].y * CONST.d + this.y);
    }
    Game.ctx.closePath();
    Game.ctx.stroke();

};

Rock.prototype.remove = function () {
    if(this.size > 0) {
        for( var i = 0, j = CONST.rand(2,6); i < j; i ++) {
            new Rock(this.size-1, this.x, this.y);
        }
    }
    delete Rock.all[this.id];
};

Rock.draw = function () {
    Rock.num = 0;
    for (var i in Rock.all) {
        Rock.num++;
        Rock.all[i].draw();
    }
};
