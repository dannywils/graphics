/**
 * line.js
 * Line class using bresenhams algorithm
 * Also LineRelative and Cross elements
 * Danny Wilson
 * 05/10/2012
 * **/
//Absolute Line
function Line(point1, point2, fill) {
	this.class = 'Line';
	this.point1 = point1;
	this.point2 = point2;
	this.fill = fill || '#F00';
	this.translate = function(x, y) {
		this.point1.x += x;
		this.point1.y += y;
		this.point2.x += x;
		this.point2.y += y;
	}
	this.draw = function() {
		//Bresenham's line alrogithm
		x0 = parseInt((canvas.width / canvas.ww) * (this.point1.x - canvas.vpx));
		y0 = parseInt((canvas.height / canvas.wh) * (canvas.vpy - this.point1.y));

		x1 = parseInt((canvas.width / canvas.ww) * (this.point2.x - canvas.vpx));
		y1 = parseInt((canvas.height / canvas.wh) * (canvas.vpy - this.point2.y));

		var dx = Math.abs(x1 - x0), sx = x0 < x1 ? 1 : -1;
		var dy = Math.abs(y1 - y0), sy = y0 < y1 ? 1 : -1;
		var err = (dx > dy ? dx : -dy) / 2;
		while (true) {
			new Point(x0, y0, this.fill).draw();
			if (x0 === x1 && y0 === y1)
				break;
			var e2 = err;
			if (e2 > -dx) {
				err -= dy;
				x0 += sx;
			}
			if (e2 < dy) {
				err += dx;
				y0 += sy;
			}
		}
		canvas.move(this.point2);
		return this;
	}
	this.save = function() {
		canvas.add(this);
	}
	//check if two lines are equal
	this.equals = function(line) {
		return this.point1.equals(line.point1) && this.point2.equals(line.point2);
	}
	//rotate the line around one of its points
	this.rotate = function(deg, point) {

		this.canvas.remove(this);
		var x, y, x1, y1, x2, y2, dx1, dy1, dx2, dy2;
		var rad = deg * (Math.PI / 180);

		//origin
		x1 = this.point2.x;
		y1 = this.point2.y;
		//point to rotate
		x2 = point.x;
		y2 = point.y;

		dx1 = x2 - x1;
		dy1 = y2 - y1;

		dx2 = dx1 * Math.cos(rad) - dy1 * Math.sin(rad);
		dy2 = dx1 * Math.sin(rad) + dy1 * Math.cos(rad);

		x = parseInt(dx2 + x1);
		y = parseInt(dy2 + y1);

		var point1 = new Point(x, y);

		this.point1 = point1;
	}
}

//Line that only takes a point. Uses CP as first point
function LineRelative(delta, fill) {
	return new Line(canvas.cp, new Point(canvas.cp.x + delta.x, canvas.cp.y + delta.y), fill);
}

//Cross takes one point and radius of cross.
function Cross(point, size) {
	this.point = point;
	this.size = size;
	this.draw = function() {
		var temp = new Point(canvas.cp.x, canvas.cp.y);
		var line1 = new Line(new Point(this.point.x - this.size, this.point.y), new Point(this.point.x + this.size, this.point.y), '#F00');
		var line2 = new Line(new Point(this.point.x, this.point.y - this.size), new Point(this.point.x, this.point.y + this.size), '#F00');
		line1.draw();
		line2.draw();
		canvas.move(temp);
	}
}
