/**
 * polygon.js
 * Polygon class. Includes absolute and relative polygons.
 * Danny Wilson
 * 05/10/2012
 * **/
//Absolute Polygon
function Polygon(points, fill) {
	this.class = 'Polygon';
	this.points = points;
	this.fill = fill || '#F00';
	this.draw = function() {
		for (var i = 0; i < this.points.length - 1; i++) {
			new Line(new Point(this.points[i].x, this.points[i].y), new Point(this.points[i + 1].x, this.points[i + 1].y), this.fill).draw();
		};
		new Line(new Point(this.points[0].x, this.points[0].y), new Point(this.points[this.points.length - 1].x, this.points[this.points.length - 1].y), this.fill).draw();
		canvas.move(this.points[0]);
		return this;
	}
	this.translate = function(x, y) {
		for (var i = 0; i < this.points.length; i++) {
			this.points[i].x += x;
			this.points[i].y += y;
		};
	}
	this.save = function() {
		canvas.add(this);
		return this;
	}
}

//Relative Polygon
function PolygonRelative(points, fill) {
	this.fill = fill || '#F00';
	this.points = points;
	//save a copy of the points in a delta variable for cloning
	this.delta = [];
	for (var i = 0; i < points.length; i++) {
		this.delta.push(new Point(points[i].x, points[i].y));
	};

	this.draw = function() {
		//add the cp to the start of the points array
		this.points.unshift(canvas.cp);
		for (var i = 1; i <= this.points.length - 1; i++) {
			this.points[i].x += this.points[i - 1].x;
			this.points[i].y += this.points[i - 1].y;
		};
		this.poly = new Polygon(this.points, this.fill).draw();
		return this;
	}
	//save only the absolute polygon
	this.save = function() {
		this.poly.save();
		return this;
	}
}

