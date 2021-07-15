// ==UserScript==
// @name         More Stickers - код
// @namespace    https://catwar.su/cat982738
// @version      3.0
// @description  Больше стикеров для CatWar! Как добавить свои - спрашивайте в личку https://catwar.su/cat982738
// @copyright	 2020 - 2021, Serolapy (https://openuserjs.org/users/Serolapy)
// @license	 MIT
// @author       Серолапый, 2020 - 2021
// @include      https://catwar.su/*
// ==/UserScript==

/*подпись*/
$('#footer').append('<br><a href="#" id="MSbutton">More Stickers<\/a> © 2020-2021 <a href="/cat982738">Серолапый<\/a>');

/*внешка*/
$('head').append($('<\link>').attr('href','https://serolapy.github.io/More_Stickers/css/stickerpacks.css').attr('rel','stylesheet'));

/*текст главного меню и данные запроса*/
var mainMenu = '',
   data = {};

/*вкл панели*/
function OnStickers(){
	$('.stickers_panel').css('display','block');
}

/*по нажатию кнопки MORE_STICKERS*/
$('#MSbutton').on('click',function(e){
	e.preventDefault();
	MSgo();
});

/*возврат к меню*/
function clearStickers(){
	$('.stickers_panel').html(mainMenu);
	setTimeout(OnStickers, 1);
}

/*вывод стикерпака на экран*/
function stickerPack(val){
	var pack = data[val],
		html = '';
	//кнопка "назад"
	html += '<input type="button" value="Назад" onclick="clearStickers()" class="MRbutton MRToHome"><br>';
	html += '<div><p class="stickers_title">';

	//название
	html += pack.name + ' ';

	//имена создателей
	html += '@ ';

	for(var j = 0; j < pack.authors.length; j++){
		var author = pack.authors[j];
		html += '<a href="/cat'+ author.id +'">'+ author.cat +'</a>';

		if(j != pack.authors.length - 1){
			//если не последний автор
			html += ', ';
		}
	}
	html += '</p>';

	//добавка стикеров
	for(var k = 0; k < pack.stickers.length; k++){
		html += '<a href="#" class="sticker" data-code="[img]'+ pack.stickers[k] +'[/img]"><img src="' + pack.stickers[k] +'" width="96" height="96"></a>';
	}

	html += '</div>';

	$('.stickers_panel').html(html);
	setTimeout(OnStickers, 1);

	//возврат домой по кнопке
	$('.MRToHome').on('click', clearStickers);
}

/*запрос наборов и обновление кнопки*/
function MSgo(){
	$.get('https://raw.githubusercontent.com/Serolapy/Serolapy.github.io/master/More_Stickers/js/stickerpacks.js', function(getData){
		/*
			data = [
				{
					"name": '',				//название стикерпака
					"authors": [
						{
							"cat": '',		//имя кота
							"id": <num>		//его ID
						},
						{...}
					]
					stickers: ['', ...]	//ссылки на картинки
				}
			]
		*/
		getData = getData.replace('\n', '');
		//выключено на время тестов

		try{
			getData = JSON.parse(getData);

			data = getData;
			mainMenu = '';
		}
		catch(error){
			console.log('!!! More Stickers Addon - ошибка обработки запроса: ' + error);
			mainMenu = 'Ошибка обработки запроса. Напишите, пожалуйста, <a href="/cat982738">Серолапому</a> для уточнения причин ошибки.';
			data = {};
		}

		//тесты
		// data = "[{\"name\":\"Транзакция\",\"authors\":[{\"cat\":\"Райан\",\"id\":119456}],\"stickers\":[\"/img/stickers/transaction1/1.png\"]}]";
		// data = getData = JSON.parse(data);

		/*главное меню*/
		for(var i = 0; i < data.length; i++){
			//переборка паков
			mainMenu += '<input type="button" data-value = "' + i + '" value="'+ data[i].name +'" class="MRbutton"><br/>';
		}

		//кнокпи добавления пака на экран
		$('.MRbutton').off('click');
		$('.MRbutton').on('click', function(){
			stickerPack(parseInt($(this).data('value')));
		});


		console.log(mainMenu);
		//смена в панельке на моё гл. меню
		$('.stickers_panel').html(mainMenu);
	});
}

MSgo();
