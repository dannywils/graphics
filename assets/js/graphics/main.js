/**
 * main.js
 * Main JavaScript Controller for User interface
 * Danny Wilson
 * 05/10/2012
 * **/
//canvas is a global variable
var canvas;
$(document).ready(function() {
	//create the canvas once all dependencies are loaded
	canvas = new Canvas('#myCanvas', $("#canvas_container").width() - 10, $(window).height() - $("#canvas_container").offset().top - 10);

	//define some colors
	var color1 = '#800909';
	var color2 = '#fa530b';
	var color3 = '#3DA6D6';

	//draw absolute text
	var top = new Text("Danny Wilson Presents", new Point(-11, 7), .2, .1, color1).draw().save();
	var middle = new Text("The Amazing", new Point(-10, 6.5), .2, .1, color2).draw().save();
	var bottom = new Text("Boats", new Point(-10, 5.3), .5, .1, color3).draw().save();

	//draw one absolute boat
	var absolute_points = [new Point(12, 0), new Point(8, 0), new Point(9, -1), new Point(15, -1), new Point(16, 0), new Point(8.5, 0), new Point(12, 4), new Point(15.5, 0), new Point(12, 4)];
	var boat0 = new Polygon(absolute_points, color3).draw().save();
	new Text("Boat Absolute", new Point(canvas.cp.x - 1.8, canvas.cp.y - 4.7), .2, .1, color2).draw().save();

	//draw relative boats
	var last = [new Point(-4, 0), new Point(1, -1), new Point(6, 0), new Point(1, 1), new Point(-7.5, 0), new Point(3.5, 4), new Point(3.5, -4), new Point(-3.5, 4)];
	canvas.moveRelative(-10, 0);
	var boat = new PolygonRelative(last, color2).draw().save();
	new TextRelative("Boat Relative", -1.8, -4.7, .2, .1, color3).draw().save();
	last = boat.delta;

	canvas.moveRelative(-10, 0);
	var boat = new PolygonRelative(last, color2).draw().save();
	new TextRelative("Boat Relative", -1.8, -4.7, .2, .1, color3).draw().save();
	last = boat.delta;

	canvas.moveRelative(-10, 0);
	var boat = new PolygonRelative(last, color2).draw().save();
	new TextRelative("Boat Relative", -1.8, -4.7, .2, .1, color3).draw().save();
	last = boat.delta;

	canvas.moveRelative(-10, 0);
	var boat = new PolygonRelative(last, color2).draw().save();
	new TextRelative("Boat Relative", -1.8, -4.7, .2, .1, color3).draw().save();
	last = boat.delta;

	var alphabet = new Text("ABCDEFGHIJKLMNOPQRSTUVWXYZ", new Point(-11.5, -8.5), .3, .1, color1).draw().save();

	new Circle(new Point(-8.15, 6.5), 4, '#2e2').draw().save();

	if (localStorage.getObject('Default') == null) {
		localStorage.setObject('Default', canvas.drawn);
	}
});
