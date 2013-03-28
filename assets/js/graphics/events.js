/**
 * events.js
 * Event handling
 * Danny Wilson
 * 09/10/2012
 * **/
$(document).ready(function() {

	//Zoom control
	$("canvas").bind("mousewheel", function(e) {
		//zoom in
		if (e.originalEvent.wheelDelta / 120 > 0) {
			canvas.zoomout();
		} else {
			canvas.zoomin();
		}
		return false;
	});

	//Arrow key pan control
	var tickRate = 1, keyArrowUp = false, keyArrowDown = false, keyArrowLeft = false, keyArrowRight = false;
	$('body').keydown(function(e) {
		switch (e.which) {
			case 38:
				keyArrowUp = true;
				break;
			case 40:
				keyArrowDown = true;
				break;
			case 37:
				keyArrowLeft = true;
				break;
			case 39:
				keyArrowRight = true;
				break;
		}
	});
	$('body').keyup(function(e) {
		switch (e.which) {
			case 38:
				keyArrowUp = false;
				break;
			case 40:
				keyArrowDown = false;
				break;
			case 37:
				keyArrowLeft = false;
				break;
			case 39:
				keyArrowRight = false;
				break;
		}
	});

	var tick = function() {
		if (keyArrowUp) {
			canvas.panUD(canvas.wh / 30);
		} else if (keyArrowDown) {
			canvas.panUD(canvas.wh / -30);
		} else if (keyArrowLeft) {
			canvas.panLR(canvas.wh / -30);
		} else if (keyArrowRight) {
			canvas.panLR(canvas.wh / 30);
		}
		setTimeout(tick, tickRate);
	};
	tick();

	//Window resize control
	var id;
	$(window).resize(function() {
		clearTimeout(id);
		id = setTimeout(doneResizing, 500);
	});
	function doneResizing() {
		canvas.setSize($("#canvas_container").width() - 10, $(window).height() - $("#canvas_container").offset().top - 10);
	}

	//reset canvas zoom and pan

	$("#plus").click(function() {
		canvas.zoomout();
	});

	$("#minus").click(function() {
		canvas.zoomin();
	});
	$("#reset").click(function() {
		canvas.ww = canvas.width / 100 * 3;
		canvas.wh = canvas.height / 100 * 3;
		canvas.vpx = -canvas.ww / 2;
		canvas.vpy = canvas.wh / 2;
		canvas.clear();
		canvas.updateValues();
	});
	$("#centercp").click(function() {
		canvas.vpx = canvas.cp.x - canvas.ww / 2;
		canvas.vpy = canvas.cp.y + canvas.wh / 2;
		canvas.clear();
		canvas.updateValues();
		new Cross(canvas.cp, canvas.ww / 40).draw();
	});
	$("#center00").click(function() {
		canvas.vpx = -canvas.ww / 2;
		canvas.vpy = canvas.wh / 2;
		canvas.clear();
		canvas.updateValues();
		new Cross(new Point(0, 0), canvas.ww / 40).draw();
	});
	//Drawn element list hover and click function
	var shake, x, fill;
	$(".drawn").live("mouseenter", function() {
		x = 1;
		var index = $(this).attr("data-index");
		var element = canvas.drawn[index];
		fill = element.fill;
		shake = setInterval(function() {
			element.translate(x * (canvas.ww / 400), -x * (canvas.wh / 400));
			element.fill = '#444';
			x *= -1
			canvas.clear();
		}, 5);
	}).live("mouseleave", function() {
		var index = $(this).attr("data-index");
		var element = canvas.drawn[index];
		clearInterval(shake);
		if (x == -1) {
			element.translate(x * (canvas.ww / 400), -x * (canvas.wh / 400));
		}
		element.fill = fill;		canvas.clear();
	}).live("click", function() {

		var index = $(this).attr("data-index");
		var element = canvas.drawn[index];
		if (element.class == "Polygon") {
			//load polygon data
			var points = element.points;
			var fill = element.fill;
			$("#polygon ul li").remove();
			for (var i = 0; i < points.length; i++) {
				$('<li><input type="text" size="4" name="x" class="pointx" value="' + points[i].x + '" placeholder="X" /> <input type="text"size="4" name="y" class="pointy" value="' + points[i].y + '" placeholder="Y" /> <i class="icon-remove"></i></li>').appendTo($("#polygon .sortable"))
				$("#polygon").attr("data-current", index);
				$("#polygon").modal('show');
			};
			$("#polygon .colorpick").val(fill);
		} else if (element.class == "Text") {
			var text = element.text;
			var point = element.start;
			var fill = element.lastfill;
			$("#text .text-data").val(text);
			$("#text .pointx").val(point.x);
			$("#text .pointy").val(point.y);
			$("#text .colorpick").val(fill);
			$("#text").attr("data-current", index);
			$("#text").modal('show');
		} else if (element.class == "Line") {
			var point1 = element.point1;
			var point2 = element.point2;
			var fill = element.lastfill;
			$("#line .text-data").val(text);
			$("#line li:first .pointx").val(point1.x);
			$("#line li:first .pointy").val(point1.y);
			$("#line li:last .pointx").val(point2.x);
			$("#line li:last .pointy").val(point2.y);
			$("#line .colorpick").val(fill);
			$("#line").attr("data-current", index);
			$("#line").modal('show');
		}
	});

	//Add new polygon point by clicking last input
	$('#polygon_points li:last').live('focus', function() {
		if ($(this).find('input').val() != "") {
			$('<li><input type="text" size="4" name="x" class="pointx" value="" placeholder="X" /> <input type="text"size="4" name="y" class="pointy" value="" placeholder="Y" /> <i class="icon-remove"></i></li>').appendTo($(this).parent('ul'));
		}
		return false;
	});

	//Add new polygon point by clicking last input
	$('#polygon_rel_points li:last').live('focus', function() {
		if ($(this).find('input').val() != "") {
			$('<li><input type="text" size="4" name="x" class="pointx" value="" placeholder="Delta X" /> <input type="text"size="4" name="y" class="pointy" value="" placeholder="Delta Y" /> <i class="icon-remove"></i></li>').appendTo($(this).parent('ul'));
		}
		return false;
	});
	//only allow numbers in x,y points
	$(".pointx, .pointy").live("propertychange keyup input paste", function(e) {
		$(this).val(function(i, v) {
			return v.replace(/[^\0-9]/ig, "");
		});
	});

	//remove a point
	$(".icon-remove").live('click', function() {
		$(this).parent('li:not(:only-child)').remove();
	});

	//remove the whole polygon
	$(".remove").click(function() {
		var index = $(this).parents('.modal').attr("data-current");
		canvas.drawn.splice(index, 1);
		canvas.clear();
		canvas.updateDrawn();
		$(this).parents('.modal').modal('hide');
	});

	//save polygon
	$("#polygon .save").click(function() {
		var current = $("#polygon").attr("data-current");
		var points = [];
		var fill = $("#polygon .colorpick").val();
		$("#polygon_points li").each(function() {
			var x = parseFloat($(this).find('.pointx').val());
			var y = parseFloat($(this).find('.pointy').val());
			if (!isNaN(x) && !isNaN(y)) {
				points.push(new Point(x, y));
			}
		});

		if (current) {
			canvas.drawn[current].points = points;
			canvas.drawn[current].fill = fill;
		} else {
			canvas.add(new Polygon(points, fill));
		}
		$("#polygon_points li:not(:first)").remove()
		$("#polygon_points input").val("");
		$('#polygon').attr('data-current', '');
		$('#polygon').modal('hide')
		canvas.clear();
	});

	//save text
	$("#text .save").click(function() {
		var current = $(this).parents('.modal').attr("data-current");
		var text = $(this).parents('.modal').find(".text-data").val();
		var x = $(this).parents('.modal').find(".pointx").val();
		var y = $(this).parents('.modal').find(".pointy").val();
		var fill = $(this).parents('.modal').find(".colorpick").val();
		var point = new Point(parseFloat(x), parseFloat(y));
		if (current) {
			canvas.drawn[current].text = text;
			canvas.drawn[current].start = point;
			canvas.drawn[current].fill = fill;
		} else {
			canvas.add(new Text(text, point, .2, .1, fill));
		}
		$(this).parents('.modal').find("input").val("");
		$(this).parents('.modal').attr('data-current', '');
		$(this).parents('.modal').modal('hide')
		canvas.clear();
	});

	//save text
	$("#textrel .save").click(function() {
		var current = $(this).parents('.modal').attr("data-current");
		var text = $(this).parents('.modal').find(".text-data").val();
		var x = $(this).parents('.modal').find(".pointx").val();
		var y = $(this).parents('.modal').find(".pointy").val();
		var fill = $(this).parents('.modal').find(".colorpick").val();

		new TextRelative(text, parseFloat(x), parseFloat(y), .2, .1, fill).draw().save();

		$(this).parents('.modal').find("input").val("");
		$(this).parents('.modal').modal('hide')
		canvas.clear();
	});

	//save polygon
	$("#polygonrel .save").click(function() {
		var points = [];
		var fill = $(this).parents('.modal').find('.colorpick').val();
		$(this).parents('.modal').find("li:not(:first)").each(function() {
			var x = parseFloat($(this).find('.pointx').val());
			var y = parseFloat($(this).find('.pointy').val());
			if (!isNaN(x) && !isNaN(y)) {
				points.push(new Point(x, y));
			}
		});

		new PolygonRelative(points, fill).draw().save();

		$(this).parents('.modal').find("li:not(:first)").remove()
		$(this).parents('.modal').find("input").val("");
		$(this).parents('.modal').modal('hide')
		canvas.clear();
	});
	//save polygon
	$("#linerel .save").click(function() {
		var points = [];
		var fill = $(this).parents('.modal').find('.colorpick').val();
		$(this).parents('.modal').find("li:not(:first)").each(function() {
			var x = parseFloat($(this).find('.pointx').val());
			var y = parseFloat($(this).find('.pointy').val());
			if (!isNaN(x) && !isNaN(y)) {
				points.push(new Point(x, y));
			}
		});

		new LineRelative(points[0], fill).draw().save();

		//$(this).parents('.modal').find("li:not(:first)").remove()
		$(this).parents('.modal').find("input").val("");
		$(this).parents('.modal').modal('hide')
		canvas.clear();
	});
	//save polygon
	$("#line .save").click(function() {
		var current = $(this).parents('.modal').attr("data-current");
		var points = [];
		var fill = $(this).parents('.modal').find('.colorpick').val();
		$(this).parents('.modal').find("li").each(function() {
			var x = parseFloat($(this).find('.pointx').val());
			var y = parseFloat($(this).find('.pointy').val());
			if (!isNaN(x) && !isNaN(y)) {
				points.push(new Point(x, y));
			}
		});
		if (current) {
			canvas.drawn[current].text = text;
			canvas.drawn[current].point1 = points[0];
			canvas.drawn[current].point2 = points[1];
			canvas.drawn[current].fill = fill;
		} else {
			new Line(points[0], points[1], fill).draw().save();
		}
		$(this).parents('.modal').attr('data-current', '');
		$(this).parents('.modal').find("input").val("");
		$(this).parents('.modal').modal('hide')
		canvas.clear();
	});
	$("#vpx input, #vpy input, #ww input, #wh input").live('input', function() {
		canvas.vpx = parseCanvas($("#vpx input").val());
		canvas.vpy = parseCanvas($("#vpy input").val());
		canvas.ww = parseCanvas($("#ww input").val());
		canvas.wh = parseCanvas($("#wh input").val());
		canvas.clear();
	});

	$('#polygonrel, #linerel').on('show', function() {
		$(this).find("li:first .pointx").val(canvas.cp.x.toFixed(2));
		$(this).find("li:first .pointy").val(canvas.cp.y.toFixed(2));
	})

	$("#move .save").click(function() {
		var x = $(this).parents('.modal').find(".pointx").val();
		var y = $(this).parents('.modal').find(".pointy").val();
		canvas.move(new Point(parseFloat(x), parseFloat(y)));
		$(this).parents('.modal').find('input').val('');
		$(this).parents('.modal').modal('hide')

	});
	$("#moverel .save").click(function() {
		var x = $(this).parents('.modal').find(".pointx").val();
		var y = $(this).parents('.modal').find(".pointy").val();
		canvas.moveRelative(parseFloat(x), parseFloat(y));
		$(this).parents('.modal').find('input').val('');
		$(this).parents('.modal').modal('hide')
	});
	//helper function to return one if NaNis given in display dimenst
	function parseCanvas(input) {
		if (!isNaN(parseFloat(input)) || parseInt(input) == 0) {
			return parseFloat(input);
		} else {
			return 1;
		}
	}

	var needToConfirm = false;
	window.onbeforeunload = confirmExit;
	function confirmExit() {
		if (needToConfirm)
			return "It appears you haven't saved recently. Are you sure you want to exit?";
	}


	$(':input', document.myForm).bind("change", function() {
		needToConfirm = true;
	});
	// Prevent accidental navigation away

	$("#new, #save, #load").click(function() {
		needToConfirm = false;
	});
	$("#new").click(function() {
		canvas.reset();
	});
	$("#save").click(function() {
		var name = prompt("Please name your session.", "Default");
		localStorage.setObject(name, canvas.drawn);
	});
	$("#load").click(function() {
		var name = prompt("Load which session?", "Default");
		canvas.drawn = [];
		for (var i = 0; i < localStorage.getObject(name).length; i++) {
			var object = localStorage.getObject(name)[i];
			switch(object.class) {
				case 'Text':
					canvas.add(new Text(object.text, object.start, object.size, object.spacing, object.fill));
					break;
				case 'Polygon':
					canvas.add(new Polygon(object.points, object.fill));
					break;
				case 'Line':
					canvas.add(new Line(object.point1, object.point2, object.fill));
					break;
				case 'Cross':
					canvas.add(new Cross(object.point, object.size));
					break;
			}
		};
		canvas.clear();
		canvas.updateDrawn();
	});

});
