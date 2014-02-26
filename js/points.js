Points.score = 0;

function Points() {
    //console.log("ok");
    this.score = 0;
}

Points.draw = function() {
    Game.ctx.fillStyle = '#ffffff';
    Game.ctx.font = 'bold 24px Titillium Web';
    Game.ctx.fillText("Score: " + Points.score, 10, 30);

    Game.ctx.font = 'normal 18px Titillium Web';
    Game.ctx.fillText("Max bullets: " + Bullet.max, 10, 55);
    Game.ctx.fillText("Life of bullet: " + Bullet.life, 10, 75);
    Game.ctx.fillText("Bullet speed: " + Bullet.speed, 10, 95);
};

Points.add = function(point) {
    Points.score += parseInt(point);
};

Points.reset = function() {
    Points.score = 0;
};
