(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _Life = require("./life.js");

var _Map = require("./map.js");

var _MapSVG = require("./mapsvg.js");

var body = document.querySelector("#table");
var svg_ = document.querySelector("#svg");
var btn = document.querySelector("input");
var cnt = document.querySelector("#count");

var t = new _Life.Life(0.5);
var map = new _Map.Map();
body.innerHTML = map.drow(t.arr);

var svg = new _MapSVG.MapSVG();
svg_.innerHTML = svg.drow(t.arr);

var iter = 0;

var timer = setInterval(function () {
	var temp_ = t.next();
	body.innerHTML = map.drow(temp_); // Живём в таблице
	svg_.innerHTML = svg.drow(t.arr); // Живём в SVG

	cnt.innerHTML = ++iter + ": " + t.sizeOf(temp_);

	if (t.sizeOf(temp_) > 140) {
		clearInterval(timer);
		console.log("stop " + t.sizeOf(temp_));
	}
}, 50);

},{"./life.js":2,"./map.js":3,"./mapsvg.js":4}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
function Life(k) {
	this.width = 20;
	this.height = 20;
	this.arr = [];
	this.k = k;
	this.init();
	this.fill();
}
Life.prototype.init = function () {
	var that = this;
	for (var i = 0; i < that.height; i++) {
		var temp_arr = [];
		for (var j = 0; j < that.width; j++) {
			temp_arr.push("");
		}
		that.arr.push(temp_arr);
	}
};

Life.prototype.getArr = function () {
	return this.arr;
};
Life.prototype.set = function (a, b) {
	this.arr[a][b] = "X";
};
Life.prototype.fill = function () {
	var that = this;
	for (var i = 5; i < that.height - 5; i++) {
		for (var j = 5; j < that.width - 5; j++) {
			if (Math.random() < that.k) that.arr[i][j] = "X";
		}
	}
};
Life.prototype.sizeOf = function (ar) {
	var that = this;
	var temp = "";
	for (var i = 0; i < that.height; i++) {
		for (var j = 0; j < that.width; j++) {
			temp += ar[i][j];
		}
	}
	return temp.length;
};

Life.prototype.sosedi = function (a, b) {
	var that = this;
	var temp = "";
	try {
		temp = that.arr[a - 1][b - 1] + that.arr[a - 1][b] + that.arr[a - 1][b + 1] + that.arr[a][b - 1] + that.arr[a][b + 1] + that.arr[a + 1][b - 1] + that.arr[a + 1][b] + that.arr[a + 1][b + 1];
	} catch (e) {}

	return temp.length;
};
Life.prototype.next = function () {
	var that = this;
	var temp_arr = Object.create(that.arr);
	for (var i = 0; i < that.height; i++) {
		for (var j = 0; j < that.width; j++) {
			if (that.arr[i][j] == "" && that.sosedi(i, j) == 3) {
				temp_arr[i][j] = "X";
			}
			if (that.arr[i][j] == "X" && (that.sosedi(i, j) == 2 || that.sosedi(i, j) == 3)) {
				temp_arr[i][j] = "X";
			}
			if (that.arr[i][j] == "X" && (that.sosedi(i, j) < 2 || that.sosedi(i, j) > 3)) {
				temp_arr[i][j] = "";
			} else {
				temp_arr[i][j] = that.arr[i][j];
			}
		}
	}
	return temp_arr;
};
Life.prototype.get = function (a, b) {
	return this.arr[a - 1][b - 1];
};

exports.Life = Life;

//console.log('-')

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var Map = (function () {
	function Map() {
		_classCallCheck(this, Map);

		this.arr = [];
	}

	_createClass(Map, [{
		key: "drow",
		value: function drow(arr) {
			this.arr = arr;
			var that = this;
			var tbl = "<table>";
			var length_1 = that.arr.length;
			for (var i = 0; i < length_1; i++) {
				tbl += "<tr>";
				var length_2 = that.arr[i].length;
				for (var j = 0; j < length_2; j++) {
					if (that.arr[i][j] == "X") tbl += "<td class='X'></td>";else tbl += "<td></td>";
				}
				tbl += "</tr>";
			}
			tbl += "</table>";
			return tbl;
		}
	}]);

	return Map;
})();

exports.Map = Map;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var MapSVG = (function () {
	function MapSVG() {
		_classCallCheck(this, MapSVG);

		this.w = this.h = 20;
		this.delta = 3;
	}

	_createClass(MapSVG, [{
		key: "x",
		value: function x(i) {
			return i * (this.w + this.delta);
		}
	}, {
		key: "y",
		value: function y(j) {
			return j * (this.h + this.delta);
		}
	}, {
		key: "drow",
		value: function drow(arr) {
			var svg = "<svg>";
			var that = this;
			for (var i = 0; i < arr.length; i++) {
				for (var j = 0; j < arr[i].length; j++) {
					if (arr[j][i] == "X") {
						svg += "<rect x=" + that.x(i) + "  y=" + that.y(j) + " width=" + that.w + " height=" + that.h + " fill='black' stroke='rgb(150,107,100)'>" + " <animate attributeName='fill' from='black' to='lightblue' dur='0.5s' repeatCount='indefinite' />" + "</rect>";
					} else svg += "<rect x=" + that.x(i) + "  y=" + that.y(j) + " width=" + that.w + " height=" + that.h + " fill='white' stroke='rgb(0,0,0)'/>";
				}
			}
			svg += "</svg>";
			return svg;
		}
	}]);

	return MapSVG;
})();

exports.MapSVG = MapSVG;

},{}]},{},[1]);
