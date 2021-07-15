// ==UserScript==
// @name         More Stickers
// @namespace    https://catwar.su/cat982738
// @version      default
// @description  Больше стикеров для CatWar! Как добавить свои - спрашивайте в личку https://catwar.su/cat982738
// @copyright	  2020 - 2021, Serolapy (https://openuserjs.org/users/Serolapy)
// @license		  MIT
// @author       Серолапый, 2020 - 2021
// @include      https://catwar.su/*
// ==/UserScript==

(function(){
	/*
	var ModLauncher = document.createElement("script");
	ModLauncher.src = "https://cdn.jsdelivr.net/gh/Serolapy/ModLauncher/publick.js";
	ModLauncher.type = 'text/javascript';
	document.getElementsByTagName("head")[0].appendChild(ModLauncher);
	*/
	$.get('https://github.com/Serolapy/Serolapy.github.io/raw/master/mods/More_Stickers_Addon.js', function(data){
		new Function(data)();
	});
})();
