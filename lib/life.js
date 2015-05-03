function Life(k){
	this.width  = 20;
	this.height = 20;
	this.arr=[];
	this.k=k;
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
			if (Math.random()<that.k)
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

export { Life };