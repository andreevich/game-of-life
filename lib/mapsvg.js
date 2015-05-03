class MapSVG{
	constructor(){
		this.w=this.h=20;
		this.delta=3;
	};
	x(i){return i*(this.w+this.delta);};
	y(j){return j*(this.h+this.delta);};
	drow(arr){
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
		return svg;
	}
}
export { MapSVG };