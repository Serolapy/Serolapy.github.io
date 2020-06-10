// ==UserScript==
// @name         More Stickers
// @namespace    https://catwar.su/cat982738
// @version      1.4
// @description  Больше стикеров для CatWar! Как добавить свои - спрашивайте в личку https://catwar.su/cat982738
// @copyright	 2020, Serolapy (https://openuserjs.org/users/Serolapy)
// @license		 MIT
// @author       Серолапый, 2020
// @include      https://catwar.su/*
// ==/UserScript==
if (typeof document.getElementById("footer")=="object"){
	document.getElementById("footer").innerHTML += '<br><u>More Stickers</u> © 2020 <a href="/cat982738">Серолапый</a>';
	}
	var externalscript = document.createElement("script");
	externalscript.src= "https://serolapy.github.io/More_Stickers/js/stickerpacks.js";
	document.head.appendChild(externalscript);
	var externalstyle = document.createElement("link");
	externalstyle.href = "https://serolapy.github.io/More_Stickers/css/stickerpacks.css";
	externalstyle.rel = "stylesheet";
	document.head.appendChild(externalstyle);

window.onload = function() {
	var script = document.createElement("script");
	script.innerHTML = 'var stickers_panel = document.getElementsByClassName("stickers_panel")[0], listStickers = "", one_sticker = "", MR_ = 0; function MRgo(){ if (MR_ == 0){MR_ = 1;for (i=0;i<stickersName.length;i++){one_sticker = \'<input type="button" onclick="stickerPack(stickerPacks[\'+i+\']);setTimeout(OnStickers, 1)" value="\'+stickersName[i]+\'" class="MRbutton"><br/>\';listStickers += one_sticker;}}stickers_panel.innerHTML = listStickers; } function clearStickers(){stickers_panel.innerHTML = listStickers; setTimeout(OnStickers, 1); } function stickerPack(stickarray){stickers_panel.innerHTML = \'<input type="button" value="Назад" onclick="clearStickers()" class="MRbutton"><br>\'+stickarray; } function OnStickers(){stickers_panel.style.display="block"; }var checkLS = \'\'; if(window.location.pathname == "/ls"){var timer = setInterval(timer, 5000); } function timer(){if(window.location.search == "?new"&&checkLS!="?new"){ stickers_panel = document.getElementsByClassName("stickers_panel")[0]; MRgo()}checkLS = window.location.search; }';
	document.head.appendChild(script);
	if (typeof document.getElementsByClassName("stickers_icon")[0]=="object"){
	document.getElementsByClassName("stickers_icon")[0].onclick = MRgo();
	}
}