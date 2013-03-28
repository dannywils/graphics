/**
 * point.js
 * Point class is used as a delta of x,y and for drawing a pixel to screen.
 * Danny Wilson
 * 05/10/2012
 * **/
function Point(x, y, fill) {
	this.class = 'Point';
	this.x = x;
	this.y = y;
	this.fill = fill || '#F00';

	this.draw = function() {
		//pixel drawing
		if (this.x > 0 && this.x < canvas.width && this.y > 0 && this.y < canvas.height) {
			ctx = canvas.context;
			ctx.fillStyle = this.fill;
			ctx.fillRect(parseInt(this.x), parseInt(this.y), 1, 1);
		}
	}
}