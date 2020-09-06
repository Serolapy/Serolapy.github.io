document.getElementById("plus").onclick=plus;
	document.getElementById("Ok").onclick=enter;
	var counter = 1;
	function plus(){
		counter++;
		let color_1 = document.createElement("tr");
		color_1.innerHTML += '<td><input type="text" name="color'+counter+'" class="colors"></td><td><input type="button" value="-" name="minus" class="buttonColor" onclick="minus('+counter+')"></td>';
		document.getElementsByTagName("tbody")[0].appendChild(color_1);
	}
	function minus(number){
		counter--;
		let line = document.getElementsByName("color"+number)[0].parentNode.parentNode;
		line.parentNode.removeChild(line);
	}
	function enter(){
		let c = document.getElementsByClassName("colors"),
			d = '';
		for(i=0;i<c.length;i++){
			if(i!=0){
				d+='%20';
			}
			d+=c[i].value;
		}
		document.getElementById("img").src = "https://catwar.su/smell?colors="+d;
	}