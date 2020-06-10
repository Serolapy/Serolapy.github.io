window.onload = function(){
	//смена титла
	var newTitle = document.getElementsByTagName("article")[0].getElementsByTagName("h1")[0].innerText;
	if (newTitle!="undefined"){
		document.getElementsByTagName("title")[0].innerHTML = newTitle + ' | Serolapy';
	}
	
	var Mods = new Array("More_Stickers","CBM");
	var ModsLink = new Array("/More_Stickers", "CBM");
	var ModsList = document.createElement("div");
	ModsList.className="liMenu";
	for(i=0;i<Mods.length;i++){
		let a = document.createElement("a");
		a.href = ModsLink[i];
		a.innerHTML = Mods[i];
		ModsList.appendChild(a);
	}
	var ModBlock = document.createElement("div");
	ModBlock.className = "ulMenu";
	ModBlock.innerHTML = "Моды";
	ModBlock.appendChild(ModsList);
	document.getElementsByTagName("aside")[0].appendChild(ModBlock);
	
	
}
	