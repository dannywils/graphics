/**
 * canvas.js
 * Canvas Class. Includes all viewport data and methods.
 * Danny Wilson
 * 05/10/2012
 * **/
//Canvas class
function Canvas(selector, width, height) {
	this.class = 'Canvas';
	this.height = height;
	this.width = width;
	this.jqueryObject = jQuery(selector);
	this.jqueryObject.attr('width', this.width);
	this.jqueryObject.attr('height', this.height);
	this.ww = this.width / 100 * 3;
	this.wh = this.height / 100 * 3;
	this.vpx = -this.ww / 2;
	this.vpy = this.wh / 2;
	this.context = this.jqueryObject[0].getContext("2d");
	this.cp = new Point(0, 0);
	this.drawn = [];

	//reset size. called when the screen is resized
	this.setSize = function(width, height) {
		this.width = width;
		this.height = height;
		this.jqueryObject.attr('width', this.width);
		this.jqueryObject.attr('height', this.height);
		this.ww = this.width / 100 * 3;
		this.wh = this.height / 100 * 3;
		this.vpx = -this.ww / 2;
		this.vpy = this.wh / 2;
		this.updateValues()
		this.clear();
	};
	//pan left and right
	this.panLR = function(amount) {
		this.vpx += amount;
		this.updateValues();
		this.clear();
	};	//pan up and down
	this.panUD = function(amount) {
		this.vpy += amount;
		this.updateValues();
		this.clear();
	};
	//zoom in and out
	this.zoomout = function() {
		this.zoom(0.90);
	};

	this.zoomin = function() {
		this.zoom(1.10);
	};
	this.zoom = function(amount) {
		var tempw = this.ww;
		var temph = this.wh;
		this.ww *= amount;
		this.wh *= amount;

		this.vpx -= (this.ww - tempw) / 2;
		this.vpy += (this.wh - temph ) / 2;
		this.updateValues();
		this.clear();
	};
	//get context
	this.getContext = function() {
		return this.context;
	};
	//add an element to the data structure
	this.add = function(element) {
		this.drawn.push(element);
		this.updateDrawn();
	};
	//remove an element from the data structure
	this.remove = function(element) {
		for (var i = 0; i < this.drawn.length; i++) {
			if (this.drawn[i].equals(element)) {
				this.drawn.splice(i, 1);
			}
		};
	};
	//clear the canvas and redraw any saved elements
	this.clear = function() {
		var cp = new Point(this.cp.x, this.cp.y);
		this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
		this.context.restore();
		for (var i = 0, j = this.drawn.length; i < j; i++) {
			this.drawn[i].draw(this);
		};
		this.cp = cp;
	};
	this.reset = function() {
		this.drawn = [];
		this.updateDrawn();
		this.clear();
	}
	//set the current position
	this.move = function(point) {
		this.cp = point;
	};
	this.moveRelative = function(x, y) {
		this.cp.x += x;
		this.cp.y += y
	};
	//show the current position by drawing a cross
	this.showCurrentPosition = function() {
		new Cross(this.cp, 1).draw(this);
	};
	//update the drawn elements list in the UI
	this.updateDrawn = function() {
		$("#drawn li:not(.nav-header)").remove();
		for (var i = 0; i < this.drawn.length; i++) {0
			$("#drawn").append('<li><a href="#" class="drawn" data-index="' + i + '">' + this.drawn[i].class + '</a>');
		};
	};
	//update vpx, vpy, ww, and wh in the UI
	this.updateValues = function() {
		$("#vpx input").val(this.vpx.toFixed(3));
		$("#vpy input").val(this.vpy.toFixed(3));
		$("#ww input").val(this.ww.toFixed(3));
		$("#wh input").val(this.wh.toFixed(3));
	};
	this.updateValues();

}

var mousedown = false;
var lastx, lasty;
$('canvas').mousedown(function(e) {
	var pixelx = e.offsetX
	var pixely = e.offsetY;
	lastx = (pixelx * canvas.ww + canvas.vpx * canvas.width) / canvas.width;
	lasty = -(pixely * canvas.wh - canvas.vpy * canvas.height) / canvas.height;
	mousedown = true;

});
$('canvas').mouseup(function(e) {
	mousedown = false;
});
$('canvas').mousemove(function(e) {

	var pixelx = e.offsetX
	var pixely = e.offsetY;
	x = (pixelx * canvas.ww + canvas.vpx * canvas.width) / canvas.width;
	y = -(pixely * canvas.wh - canvas.vpy * canvas.height) / canvas.height;
	$("#mouse input").val(x.toFixed(2) + "," + y.toFixed(2));

	if (mousedown) {
		var dx = x - lastx;
		var dy = y - lasty;
		canvas.vpx -= dx;
		canvas.vpy -= dy;
		canvas.clear();
		canvas.updateValues();	}
});
var cvs = $('canvas')[0];
cvs.onselectstart = function() {
	return false;
}// ie
cvs.onmousedown = function() {
	return false;
}// mozilla
