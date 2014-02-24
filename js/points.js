Points.score = 0;

function Points() {
    //console.log("ok");
}

Points.draw = function() {
    Game.ctx.fillStyle = '#ffffff';
    Game.ctx.font = 'bold 24px Titillium Web';
    Game.ctx.fillText("Score: " + Points.score, 10, 30);
};

Points.add = function(point) {
    Points.score += parseInt(point);
};

Points.reset = function() {
    Points.score = 0;
};
