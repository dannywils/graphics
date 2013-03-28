/**
 * extend.js
 * Helper methods
 * Danny Wilson
 * 05/10/2012
 * **/
Storage.prototype.setObject = function(key, value) {
	this.setItem(key, JSON.stringify(value));
};
Storage.prototype.getObject = function(key) {
	var value = this.getItem(key);
	return value && JSON.parse(value);
};
$(function() {
	$('.lights').toggle(function() {
		$("body").css("background-color", "#222");
		$("canvas").css("background-color", "#010101");
		$(".well").css("background-color", "#444");
		$(".lights span").text("Lights On");
	}, function() {

		$("body").css("background-color", "#efefef");
		$("canvas").css("background-color", "#fff");
		$(".well").css("background-color", "whiteSmoke");

		$(".lights span").text("Lights Off");
	});
})
