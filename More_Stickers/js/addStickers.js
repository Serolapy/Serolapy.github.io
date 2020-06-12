//Добавление стикеров
var newsticker = document.getElementById("tablesticks").childNodes[3],
	counter = 1,
	oldstickers = '',
	oldstickersNB = 0;
function plus(){
	counter++;
	var onestickerTr = document.createElement("tr");
	onestickerTr.innerHTML += '<td><input type="text" name="MR'+counter+'" class="newsticker"></td><td><input type="button" value="-" name="minus" class="buttonpm" onclick="minus('+counter+')"></td>';
	newsticker.appendChild(onestickerTr);
	document.getElementById("spanstickers").innerHTML = counter;
}
function minus(number){
	let line = document.getElementsByName("MR"+number)[0].parentNode.parentNode;
	line.parentNode.removeChild(line);
	counter--;
	document.getElementById("spanstickers").innerHTML = counter;
}
//Вывод добавленных


var stickers_panel = document.getElementById("listStickers"),	
	listStickers = '',
	one_sticker = '';
function clearStickers(){													//Названия стиков
	stickers_panel.innerHTML = listStickers;
}
function stickerPack(stickarray){											//Замена стикеров
	stickers_panel.innerHTML = '<input type="button" value="Назад" onclick="clearStickers()" style="cursor: pointer"><br>'+stickarray;
}
for (i=0;i<stickersName.length;i++){
	one_sticker = '<input type="button" onclick="stickerPack(stickerPacks['+i+'])" value="'+stickersName[i]+'"><br/>';
	listStickers += one_sticker;
}
stickers_panel.innerHTML += listStickers;
document.getElementsByName("oldstickers")[0].onclick = function(){
	if (oldstickersNB == 0){
		document.getElementById("oldstickers").style.display = "block";
		oldstickersNB = 1;
	} else if (oldstickersNB == 1){
		document.getElementById("oldstickers").style.display = "none";
		oldstickersNB = 0;
	}
};
//превью
var previewNB = 0,
	stickers = document.getElementById("tablesticks").childNodes[3].childNodes,
	newstickerPack = '',
	valueSt ='';
function Ferrors(){
	document.getElementById("ID").style.color = "black";
	document.getElementById("name").style.color = "black";
	document.getElementById("nameSt").style.color = "bkack";
}
function preview() {
	//стикеры
	for (j=1;j<stickers.length-1;j++){
		valueSt = document.getElementsByName("MR"+j)[0].value;
		if (valueSt != ''){
		newstickerPack += '<a href="#" class="sticker" data-code="[img]'+valueSt+'[/img]"><img src="'+valueSt+'" width="96" height="96"></a>';
		}
	}
	//авторизация
	var authorization = document.getElementsByName("name"),
		newstickerPackname = '<div><p class="stickers_title">'+authorization[2].value+' © <a href="/cat'+authorization[0].value+'">'+authorization[1].value+'</a></p>'+newstickerPack+'</div>',
		check = true,
		errors = '';
	document.getElementById("previewstickersimg").innerHTML = newstickerPackname;
		var textnewstickerPack = document.createTextNode(newstickerPackname);
	document.getElementById("previewstickers").appendChild(textnewstickerPack);
	if (authorization[0].value ==''){
		document.getElementById("ID").style.color = "red";
		check = false;
		errors += 'Введите свой ID!<br>';
		setTimeout(Ferrors, 3000);
	}
	if (authorization[1].value ==''){
		document.getElementById("name").style.color = "red";
		check = false;
		errors += 'Введите своё имя! <br>';
		setTimeout(Ferrors, 3000);
	}
	if (authorization[2].value ==''){
		document.getElementById("nameSt").style.color = "red";
		check = false;
		errors += 'Введите имя стикерпака!';
		setTimeout(Ferrors, 3000);
	}
	if (newstickerPack =='' && check){
		errors = 'Тут пусто!';
	}
	if (errors!=''){
		document.getElementById("previewstickers").innerHTML = errors;
		document.getElementById("previewstickersimg").innerHTML = '';
	}
	newstickerPack = '';
	
}
document.getElementsByName("preview")[0].onclick = function(){
	if (previewNB == 0){
		document.getElementById("preview").style.display = "block";
		previewNB = 1;
		preview();
	} else if (previewNB == 1){
		document.getElementById("preview").style.display = "none";
		previewNB = 0;
		
		newstickerPack = '';
		textnewstickerPack = '';
		document.getElementById("previewstickers").innerHTML = '';
		document.getElementById("previewstickersimg").innerHTML = '';
	}
};
