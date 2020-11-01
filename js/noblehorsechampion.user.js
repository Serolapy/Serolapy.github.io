// ==UserScript==
// @name         Чит-накрутка
// @version      defaiult Alpha
// @author       Serolapy https://catwar.su/cat982738
// @match        https://noblehorsechampion.com/*
// @grant        none
// ==/UserScript==

if("jQuery" in window){
	function reloadWindow(){
		window.location.reload();
	}
	function startReload(){
		if($('.body').children().length == '4'){
			setTimeout(reloadWindow, 7000);
			console.log('Награды нет');
		}
		else if($('.body').children().length == '6'){
			setTimeout(reloadWindow, 60000);
			console.log('Награда получена');
		}
		else{
			console.log('Страница еще не прогрузила. Повторная попытка через 5 секунд');
			setTimeout(startReload, 5000);
		}
	}
	startReload();
}
else{
	alert('Заскриншоть это и отправь Серику. Нет "jQuery" in window');
}
