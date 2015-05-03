class Map{
	constructor(){
		this.arr=[];
	}
	
	drow(arr){
		this.arr = arr;
		let that = this;
		let tbl="<table>";
		let length_1 = that.arr.length;
			for (let i=0; i<length_1;i++){
				tbl+="<tr>";
				let length_2 = that.arr[i].length;
				for (let j=0; j<length_2;j++){
					if(that.arr[i][j]=="X")
						tbl+="<td class='X'></td>";
					else
						tbl+="<td></td>";
				}
				tbl+="</tr>";
			}
		tbl+="</table>";
		return tbl;
	}
}
export { Map};