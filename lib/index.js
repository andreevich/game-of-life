import { Life }   from "./life.js";
import { Map }    from "./map.js";
import { MapSVG } from "./mapsvg.js";

var body = document.querySelector("#table");
var svg_ = document.querySelector("#svg");
var btn  = document.querySelector("input");
var cnt  = document.querySelector("#count");

var t = new Life(0.5);
var map = new Map();
	body.innerHTML=map.drow(t.arr);
	
var svg = new MapSVG();
	svg_.innerHTML=svg.drow(t.arr);

	
	var iter=0;
	
	var timer = setInterval(function(){
		var temp_ = t.next();
		body.innerHTML=map.drow(temp_); // Живём в таблице
		svg_.innerHTML=svg.drow(t.arr);		// Живём в SVG
		
		cnt.innerHTML=(++iter)+": "+t.sizeOf(temp_);
		
		if (t.sizeOf(temp_)>140){
			clearInterval(timer);
			console.log(`stop ${t.sizeOf(temp_)}`)
		}
	},50)