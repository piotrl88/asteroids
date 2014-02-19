function Ship() {
    this.r = 0.04;
    this.rear_angle = 50;
    this.angle = 0;
    //
    this.x = CONST.width / 2;
    this.y = CONST.height / 2;
    //
    this.modX = 0;
    this.modY = 0;
    this.acc = 0.0004;
    this.maxMod = 0.019;
    //
    this.points = [
        {},
        {},
        {}
    ];
}

Ship.prototype.draw = function () {
    if (Game.key_37 || Game.key_39) {
        this.angle = this.angle + 7 * ( Game.key_37 ? -1 : 1);
    }
    if (Game.key_38) {
        this.modX = Math.max(-this.maxMod * CONST.d, Math.min(this.maxMod * CONST.d, this.modX + Math.sin(Math.PI / 180 * this.angle) * this.acc * CONST.d));
        this.modY = this.modY - Math.cos(Math.PI / 180 * this.angle) * this.acc * CONST.d;
    } else {
        this.modX = this.modX * 0.98;
        this.modX = Math.abs(this.modX) < 0.0001 ? 0 : this.modX;

        this.modY = this.modY * 0.98;
        this.modY = Math.abs(this.modY) < 0.0001 ? 0 : this.modY;
    }
    this.x += this.modX;
    this.y += this.modY;


    Game.ctx.beginPath();
    for (var i = 0; i < 3; i++) {
        this.tmp_angle = i === 0 ? this.angle : (this.angle + 180 + (i === 1 ? this.rear_angle : -this.rear_angle));
        this.tmp_r = i === 0 ? this.r : this.r * 0.6;

        this.points[i].x = Math.sin(Math.PI / 180 * this.tmp_angle) * this.tmp_r * CONST.d + this.x;
        this.points[i].y = -Math.cos(Math.PI / 180 * this.tmp_angle) * this.tmp_r * CONST.d + this.y;

        Game.ctx[ i === 0 ? 'moveTo' : 'lineTo'](this.points[i].x, this.points[i].y);
    }
    Game.ctx.closePath();
    Game.ctx.stroke();


    if (Game.key_38 && this.draw_thrust) {
        Game.ctx.beginPath();
        this.draw_thrust = false;
        for (i = 0; i < 3; i++) {
            this.tmp_angle = i != 1 ? this.angle + 180 + (i === 0 ? -this.rear_angle + 14 : this.rear_angle - 14) : this.angle + 180;
            this.tmp_r = i == 1 ? this.r : this.r * 0.5;
            Game.ctx[i === 0 ? 'moveTo' : 'lineTo'](
                (Math.sin(Math.PI / 180 * this.tmp_angle) * this.tmp_r * CONST.d) + this.x,
                (-Math.cos(Math.PI / 180 * this.tmp_angle) * this.tmp_r * CONST.d) + this.y
            );
        }
        Game.ctx.stroke();
    } else if (Game.key_38 && !this.draw_thrust) {
        this.draw_thrust = true;
    }


    if (this.points[0].x < 0 && this.points[1].x < 0 && this.points[2].x < 0) {
        this.x += CONST.width - Math.min(this.points[0].x, this.points[1].x, this.points[2].x) * 0.9;
    } else if (this.points[0].x > CONST.width && this.points[1].x > CONST.width && this.points[2].x > CONST.width) {
        this.x -= CONST.width - (CONST.width - Math.max(this.points[0].x, this.points[1].x, this.points[2].x)) * 0.9;
    }

    if (this.points[0].y < 0 && this.points[1].y < 0 && this.points[2].y < 0) {
        this.y += CONST.height - Math.min(this.points[0].y, this.points[1].y, this.points[2].y) * 0.9;
    } else if (this.points[0].y > CONST.height && this.points[1].y > CONST.height && this.points[2].y > CONST.height) {
        this.y -= CONST.height - (CONST.height - Math.max(this.points[0].y, this.points[1].y, this.points[2].y)) * 0.9;
    }
};

