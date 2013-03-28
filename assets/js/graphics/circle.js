/**
 * line.js
 * Line class using bresenhams algorithm
 * Also LineRelative and Cross elements
 * Danny Wilson
 * 05/10/2012
 * **/
//Absolute Circle
function Circle(midpoint, radius, fill) {
	this.class = 'Circle';
	this.xc = midpoint.x;
	this.yc = midpoint.y;
	this.r = radius;
	this.fill = fill || '#F00';
	this.translate = function(x, y) {
		this.xc += x;
		this.yc += y;
	}
	this.draw = function() {
		//local coords

		var x = parseInt(canvas.height / canvas.wh * this.r);
		var r = x;
		var xc = parseInt((canvas.width / canvas.ww) * (this.xc - canvas.vpx));
		var yc = parseInt((canvas.height / canvas.wh) * (canvas.vpy - this.yc));
		var y = 0;
		var color = this.fill;

		//current distance squared - radius squared
		var cd2 = 0;

		if (!r)
			return;
		new Point(xc - r, yc, color).draw();
		new Point(xc + r, yc, color).draw();
		new Point(xc, yc - r, color).draw();
		new Point(xc, yc + r, color).draw();

		while (x > y)//only formulate 1/8 of circle
		{
			cd2 -= (--x) - (++y);
			if (cd2 < 0)
				cd2 += x++;

			new Point(xc - x, yc - y, color).draw();
			//upper left left
			new Point(xc - y, yc - x, color).draw();
			//upper upper left
			new Point(xc + y, yc - x, color).draw();
			//upper upper right
			new Point(xc + x, yc - y, color).draw();
			//upper right right
			new Point(xc - x, yc + y, color).draw();
			//lower left left
			new Point(xc - y, yc + x, color).draw();
			//lower lower left
			new Point(xc + y, yc + x, color).draw();
			//lower lower right
			new Point(xc + x, yc + y, color).draw();
			//lower right right
		}
		canvas.cp = new Point(this.xc, this.yc);
		return this;
	}
	this.save = function() {
		canvas.add(this);
	}
}

function Petal(midpoint, radius, fill) {
	return new Circle(midpoint, radius, fill);
}

function Flower(midpoint, radius, fill) {
	this.midpoint = midpoint;
	this.radius = radius;
	this.fill = fill;
	this.draw = function() {
		new Circle(this.midpoint, this.radius, this.fill).draw();

		for (var i = 0; i < 360; i += 60) {
			var point = rotate(new Point(this.midpoint.x, this.midpoint.y + 2 * this.radius), this.midpoint, i);
			new Circle(point, this.radius, this.fill).draw();
			console.log(i, point);
		};
		return this;
	}
	this.save = function() {
		canvas.add(this);
	}
}

function rotate(point1, point2, deg) {
	var x, y, x1, y1, x2, y2, dx1, dy1, dx2, dy2;
	var rad = deg * (Math.PI / 180);

	//origin
	x1 = point2.x;
	y1 = point2.y;
	//point to rotate
	x2 = point1.x;
	y2 = point1.y;

	dx1 = x2 - x1;
	dy1 = y2 - y1;

	dx2 = dx1 * Math.cos(rad) - dy1 * Math.sin(rad);
	dy2 = dx1 * Math.sin(rad) + dy1 * Math.cos(rad);

	x = Math.round(dx2 + x1);
	y = Math.round(dy2 + y1);

	return new Point(x, y);
}

