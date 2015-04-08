function Life(){
	this.width  = 20;
	this.height = 20;
	this.arr=[];
	this.init();
	this.fill();
}
Life.prototype.init = function(){
	var that = this;
	for (var i=0; i<that.height;i++){
		var temp_arr=[];
		for (var j=0; j<that.width;j++){
			temp_arr.push("");
		}
		that.arr.push(temp_arr);
	}
};

Life.prototype.getArr = function(){
	return this.arr;
};
Life.prototype.set = function(a,b){
	this.arr[a][b]="X";
};
Life.prototype.fill = function(){
	var that = this;
	for (var i=5; i<that.height-5;i++){
		for (var j=5; j<that.width-5;j++){
			if (Math.random()< 0.4)
				that.arr[i][j]="X";
		}
	}
};
Life.prototype.sizeOf = function(ar){
	var that = this;
	var temp = "";
	for (var i=0; i<that.height;i++){
		for (var j=0; j<that.width;j++){
				temp+=ar[i][j];
		}
	}
	return temp.length;
};

Life.prototype.sosedi=function(a,b){
	var that = this;
	var temp="";
	try{
	    temp = that.arr[a-1][b-1]+that.arr[a-1][b]+that.arr[a-1][b+1]+
			  that.arr[a][b-1]+that.arr[a][b+1]+
			  that.arr[a+1][b-1]+that.arr[a+1][b]+that.arr[a+1][b+1];
	}
	catch(e){
		//console.log('-')
	}
	
	return temp.length;
};
Life.prototype.next = function(){
	var that = this;
	var temp_arr =Object.create(that.arr);
	for (var i=0; i<that.height;i++){
		for (var j=0; j<that.width;j++){
				if (that.arr[i][j]=="" && that.sosedi(i,j)==3){
					temp_arr[i][j]="X";
				}
				if (that.arr[i][j]=="X" && (that.sosedi(i,j)==2 || that.sosedi(i,j)==3)){
					temp_arr[i][j]="X";
				}
				if (that.arr[i][j]=="X" && (that.sosedi(i,j)<2 || that.sosedi(i,j)>3)){
					temp_arr[i][j]="";
				}
				else{
					temp_arr[i][j]=that.arr[i][j];
				}
				
		}
	}
	return temp_arr;
};
Life.prototype.get = function(a,b){
	return this.arr[a-1][b-1];
};


function Map(){
	this.arr=[];
}
Map.prototype.drow=function(arr){
this.arr = arr;
var that = this;
var tbl="<table>";

	for (var i=0; i<that.arr.length;i++){
		tbl+="<tr>";
		
		for (var j=0; j<that.arr[i].length;j++){
			if(that.arr[i][j]=="X")
				tbl+="<td class='X'></td>";
			else
				tbl+="<td></td>";
		}
		
		tbl+="</tr>";
	}
	
	tbl+="</table>";
body.innerHTML = tbl ;
};

Map.prototype.update = function(arr){
	body.innerHTML=map.drow(arr);
};

function MapSVG(){
	this.w=this.h=20;
	this.delta=3;
}
MapSVG.prototype.x=function(i){
	return i*(this.w+this.delta);
};
MapSVG.prototype.y=function(j){
	return j*(this.h+this.delta);
};
MapSVG.prototype.drow=function(arr){
	var svg="<svg>";
	var that = this;
	for (var i=0; i<arr.length;i++){
		for (var j=0; j<arr[i].length;j++){
			if(arr[j][i]=="X"){
				svg+="<rect x="+that.x(i)+"  y="+that.y(j)+" width="+that.w+" height="+that.h+" fill='black' stroke='rgb(150,107,100)'>"+
					" <animate attributeName='fill' from='black' to='lightblue' dur='0.5s' repeatCount='indefinite' />"+
				
				"</rect>";
			}
			else
				svg+="<rect x="+that.x(i)+"  y="+that.y(j)+" width="+that.w+" height="+that.h+" fill='white' stroke='rgb(0,0,0)'/>";
		}
	}
	svg+="</svg>";
svg_.innerHTML = svg;
};

var body = document.querySelector("#table");
var svg_ = document.querySelector("#svg");
var btn  = document.querySelector("input");
var cnt  = document.querySelector("#count");

var t = new Life();
var map = new Map();
	map.drow(t.arr);
	
var svg = new MapSVG();
	svg.drow(t.arr);

	var iter=0;
	timer = setInterval(function(){
		var temp_ = t.next();
		map.drow(temp_);
		cnt.innerHTML="Популяция "+(++iter)+": "+t.sizeOf(temp_);
	},70)
	
btn.addEventListener("click",function(){
	var temp_ = t.next();
	map.drow(temp_);
	svg.drow(temp_);
	cnt.innerHTML="Популяция "+(++iter)+": "+t.sizeOf(temp_);
});