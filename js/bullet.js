Bullet.max = 5;
Bullet.all = {};
Bullet.speed = 0.022;
Bullet.count = 0;
Bullet.active_count = 0;
Bullet.life = 35;

function Bullet() {
    if (Bullet.active_count < Bullet.max) {
        Bullet.count++;
        Bullet.active_count++;

        this.id = Bullet.count.toString();
        Bullet.all[this.id] = this;

        this.life = 0;
        this.angle = Game.ship.angle;
        this.x = Game.ship.points[0].x;
        this.y = Game.ship.points[0].y;

        this.modX = Math.sin(Math.PI / 180 * this.angle) * Bullet.speed * CONST.d;
        this.modY = -Math.cos(Math.PI / 180 * this.angle) * Bullet.speed * CONST.d;
    }
}

Bullet.draw = function () {
    for (var i in Bullet.all) {

        for (var r in Rock.all) {
            if (Rock.all[r].hitTest(Bullet.all[i].x, Bullet.all[i].y)) {
                Bullet.all[i].life += Bullet.life;
                Rock.all[r].remove();
                break;
            }
        }

        for (var p in Pickup.all) {
            if (Pickup.all[p].hitTest(Bullet.all[i].x, Bullet.all[i].y)) {
                console.log("hitttt");
                Bullet.all[i].life += Bullet.life;
                //Pickup.all[p].remove();
                break;
            }
        }

        if (Bullet.all[i].life < Bullet.life) {

            Bullet.all[i].life++;
            Bullet.all[i].x += Bullet.all[i].modX;
            Bullet.all[i].y += Bullet.all[i].modY;

            if (Bullet.all[i].x < 0) {
                Bullet.all[i].x += CONST.width;
            } else if (Bullet.all[i].x > CONST.width) {
                Bullet.all[i].x -= CONST.width;
            }

            if (Bullet.all[i].y < 0) {
                Bullet.all[i].y += CONST.height;
            } else if (Bullet.all[i].y > CONST.height) {
                Bullet.all[i].y -= CONST.height;
            }

            Game.ctx.beginPath();
            Game.ctx.arc(Bullet.all[i].x, Bullet.all[i].y, 3, 0, Math.PI / 180 * 360);
            Game.ctx.closePath();
            Game.ctx.fill();
        } else {
            Bullet.active_count--;
            delete Bullet.all[i];
        }
    }
};
