/**
 * text.js
 * Text Class. Includes drawing text absolute and relative.
 * Danny Wilson
 * 05/10/2012
 * **/
function Text(text, start, size, spacing, fill) {
	this.class = 'Text';
	this.text = text;
	this.size = size;
	this.spacing = spacing;
	this.fill = fill || '#F00';
	this.start = start;
	//draw a letter
	this.translate = function(x, y) {
		this.start.x += x;
		this.start.y += y;
	};
	this.letter = function(letter, size, start) {
		var width = size;
		var height = width * 2;

		// http://upload.wikimedia.org/wikipedia/commons/b/b0/14_segment_alphabet.svg
		// 14 segment led style display
		var bottom_flat = new Line(start, new Point(start.x + width, start.y));
		var top_flat = new Line(new Point(start.x, start.y + height), new Point(start.x + width, start.y + height));

		var middle_l_flat = new Line(new Point(start.x, start.y + height / 2), new Point(start.x + width / 2, start.y + height / 2));
		var middle_r_flat = new Line(new Point(start.x + width / 2, start.y + height / 2), new Point(start.x + width, start.y + height / 2));

		var top_f_slash = new Line(new Point(start.x + width / 2, start.y + height / 2), new Point(start.x + width, start.y + height));
		var top_b_slash = new Line(new Point(start.x + width / 2, start.y + height / 2), new Point(start.x, start.y + height));

		var bottom_f_slash = new Line(start, new Point(start.x + width / 2, start.y + height / 2));
		var bottom_b_slash = new Line(new Point(start.x + width, start.y), new Point(start.x + width / 2, start.y + height / 2));

		var bottom_l_pipe = new Line(start, new Point(start.x, start.y + height / 2));
		var bottom_r_pipe = new Line(new Point(start.x + width, start.y), new Point(start.x + width, start.y + height / 2));
		var bottom_pipe = new Line(new Point(start.x + width / 2, start.y), new Point(start.x + width / 2, start.y + height / 2));

		var top_l_pipe = new Line(new Point(start.x, start.y + height / 2), new Point(start.x, start.y + height));
		var top_r_pipe = new Line(new Point(start.x + width, start.y + height / 2), new Point(start.x + width, start.y + height));
		var top_pipe = new Line(new Point(start.x + width / 2, start.y + height / 2), new Point(start.x + width / 2, start.y + height));

		var toDraw = [];
		switch(letter) {
			case "a":
				toDraw = [top_flat, middle_l_flat, middle_r_flat, bottom_l_pipe, bottom_r_pipe, top_l_pipe, top_r_pipe];
				break;
			case "b":
				toDraw = [top_flat, bottom_flat, middle_r_flat, top_r_pipe, bottom_r_pipe, bottom_pipe, top_pipe];
				break;
			case "c":
				toDraw = [top_flat, bottom_flat, top_l_pipe, bottom_l_pipe];
				break;
			case "d":
				toDraw = [top_flat, bottom_flat, top_r_pipe, bottom_r_pipe, bottom_pipe, top_pipe];
				break;
			case "e":
				toDraw = [top_flat, bottom_flat, top_l_pipe, bottom_l_pipe, middle_r_flat, middle_l_flat];
				break;
			case "f":
				toDraw = [top_flat, top_l_pipe, bottom_l_pipe, middle_r_flat, middle_l_flat];
				break;
			case "g":
				toDraw = [top_flat, bottom_flat, top_l_pipe, bottom_l_pipe, bottom_r_pipe, middle_r_flat];
				break;
			case "h":
				toDraw = [top_l_pipe, bottom_l_pipe, top_r_pipe, bottom_r_pipe, middle_r_flat, middle_l_flat];
				break;
			case "i":
				toDraw = [top_flat, bottom_flat, bottom_pipe, top_pipe];
				break;
			case "j":
				toDraw = [bottom_flat, top_r_pipe, bottom_r_pipe, bottom_l_pipe];
				break;
			case "k":
				toDraw = [middle_l_flat, bottom_l_pipe, top_l_pipe, top_f_slash, bottom_b_slash];
				break;
			case "l":
				toDraw = [bottom_flat, top_l_pipe, bottom_l_pipe];
				break;
			case "m":
				toDraw = [top_l_pipe, bottom_l_pipe, top_r_pipe, bottom_r_pipe, top_f_slash, top_b_slash];
				break;
			case "n":
				toDraw = [top_l_pipe, bottom_l_pipe, top_r_pipe, bottom_r_pipe, top_b_slash, bottom_b_slash];
				break;
			case "o":
				toDraw = [top_flat, bottom_flat, top_l_pipe, bottom_l_pipe, top_r_pipe, bottom_r_pipe];
				break;
			case "p":
				toDraw = [top_flat, middle_l_flat, middle_r_flat, bottom_l_pipe, top_l_pipe, top_r_pipe];
				break;
			case "q":
				toDraw = [top_flat, bottom_flat, top_l_pipe, bottom_l_pipe, top_r_pipe, bottom_r_pipe, bottom_b_slash];
				break;
			case "r":
				toDraw = [top_flat, middle_l_flat, middle_r_flat, bottom_l_pipe, top_l_pipe, top_r_pipe, bottom_b_slash];
				break;
			case "s":
				toDraw = [top_flat, bottom_flat, top_l_pipe, bottom_r_pipe, middle_r_flat, middle_l_flat];
				break;
			case "t":
				toDraw = [top_flat, bottom_pipe, top_pipe];
				break;
			case "u":
				toDraw = [bottom_flat, top_l_pipe, bottom_l_pipe, top_r_pipe, bottom_r_pipe];
				break;
			case "v":
				toDraw = [top_l_pipe, bottom_l_pipe, top_f_slash, bottom_f_slash];
				break;
			case "w":
				toDraw = [top_l_pipe, bottom_l_pipe, top_r_pipe, bottom_r_pipe, bottom_b_slash, bottom_f_slash];
				break;
			case "x":
				toDraw = [top_f_slash, top_b_slash, bottom_b_slash, bottom_f_slash];
				break;
			case "y":
				toDraw = [top_f_slash, top_b_slash, bottom_pipe];
				break;
			case "z":
				toDraw = [top_f_slash, bottom_f_slash, top_flat, bottom_flat];
				break;
			case " ":
				toDraw = [];
				break
		}
		for (var i = 0; i < toDraw.length; i++) {
			toDraw[i].fill = this.fill;
			toDraw[i].draw();
		};
	}
	//draw a string by calling letters at different spacing
	this.draw = function() {
		s = this.text.toLowerCase().split('');
		for (var i = 0; i < s.length; i++) {
			var spacing = this.spacing;
			var size = this.size;
			var start = new Point(this.start.x + ((size + spacing) * i), this.start.y);
			this.letter(s[i], size, start, canvas);
		};
		return this;
	}
	this.save = function() {
		canvas.add(this);
	}
}

// Relative text. Starts at CP
function TextRelative(string, x, y, size, spacing, color) {
	return new Text(string, new Point(canvas.cp.x + x, canvas.cp.y + y), size, spacing, color);
}