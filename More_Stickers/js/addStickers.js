/*
	ФУНКЦИОНАЛ СТРАНИЦЫ
*/

/*добавление строк в поля с ссылками и авторами*/
//авторы
$('.addAuthor').on('click', function(){
	let tr = $('<tr></tr>').html('<td><input type="text" class="text authorName"></td><td><input type="number" class="text authorId"></td><td><input type="button" value="-" class="buttonpm removeLine"></td>');
	$('#authors').append(tr);
	removeLine();
});
//стикеры
$('.addSticker').on('click', function(){
	let tr = $('<tr></tr>').html('<td><input type="text" class="newsticker linkSticker"></td><td><input type="button" value="-" class="buttonpm removeLine"></td>');
	$('#sticks').append(tr);
	removeLine();
});
//удаление строк
function removeLine(){
	//класс .removeLine ставится на кнопку, удаляющую данную строку в таблице
	$('.removeLine').off('click');
	$('.removeLine').on('click', function(){
		$(this).parents().eq(1).remove();
	});
}

/* создание пакета стикеров */
/* кнопка ПРЕДПРОСМОТР */
$('#previewBtn').on('click', function(){
	var BBcode = '',
		code = {};

	//авторы
	let authorsPreview = '@ ',						//Строка для предпросмотра
		authors = $('#authors').children(),		//массив авторов
		authorCode = [];								//код авторов
	for(let i = 0; i < authors.length; i++){
		let author = {}
		//имя
		author['cat'] = authors.eq(i).children().eq(0).children().eq(0).val() || 'Нет игрока';
		//id
		author['id'] = parseInt(authors.eq(i).children().eq(1).children().eq(0).val()) || 982738;
		// author -> authorCode
		authorCode.push(author);
		//в превью
		authorsPreview += '<a href="/cat'+ author.id +'">'+ author.cat +'</a>' + (i == authors.length - 1? '' : ', ');
	}
	code['authors'] = authorCode;

	//название
	let namePreview = $('#nameStickerPack').val() || 'Без названия';
	code['name'] = namePreview;

	//стикеры
	let stickersPreview = '',							//Строка для предпросмотра
		stickers = $('#sticks').children(),			//массив стикеров
		stickersCode = [];								//код стикеров
	for(let i = 0; i < stickers.length; i++){
		let sticker = $('#sticks').children().eq(i).children().eq(0).children().eq(0).val();
		if(!sticker){continue}
		stickersCode.push(sticker);
		stickersPreview += '<a href="#" class="sticker" data-code="[img]'+ sticker +'[/img]"><img src="' + sticker +'" width="96" height="96"></a>';
	}
	code['stickers'] = stickersCode;

	//вывод кода
	console.dir(code);
	$('#stickersCode').val(JSON.stringify(code));
	//показ превью
	$('#images').html(`<b>${namePreview}</b> ${authorsPreview}\n${stickersPreview}`);
	$('#preview').css('display', 'block');
});

/* кнопка ДОБАВЛЕННЫЕ */
var mainMenu = '',	//кнопки с паками
	data = {};

//функция вывода пакам
function stickerPack(val){
	var pack = data[val],
		html = '';

	//закрытие пака
	html += '<input type="button" value="Скрыть" id="collectionClose"><br>';
	html += '<p class="stickers_title">';

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


	$('#collectoinField').html(html);

	//кнопка закрытия пака
	$('#collectionClose').off('click');
	$('#collectionClose').on('click', function(){
		$('#collectoinField').html('');
	});
}
//вешаю событие на кнопку
$('#previewCollection').on('click', function(){
	$('#collectionButtons').html('Загрузка..');

	$.get('https://raw.githubusercontent.com/Serolapy/Serolapy.github.io/master/More_Stickers/js/stickerpacks.js', function(getData){
		getData = getData.replace('\n', '');
		try{
			getData = JSON.parse(getData);

			data = getData;
			mainMenu = '';
		}
		catch(error){
			console.log('!!! Не удалось получить стикеры: ' + error);
			mainMenu = 'Ошибка обработки запроса. Напишите, пожалуйста, <a href="/cat982738">Серолапому</a> для уточнения причин ошибки.';
			data = {};
		}
		// data = "[{\"name\":\"Транзакция\",\"authors\":[{\"cat\":\"Райан\",\"id\":119456}],\"stickers\":[\"/img/stickers/transaction1/1.png\"]}]";
		// data = getData = JSON.parse(data);

		//кнопки меню
		for(var i = 0; i < data.length; i++){
			//переборка паков
			mainMenu += '<input type="button" data-value = "' + i + '" value="'+ data[i].name +'" class="MRbutton"><br/>';
		}
		$('#collectionButtons').html(mainMenu);
		//кнокпи вывода пака на экран
		$('.MRbutton').off('click');
		$('.MRbutton').on('click', function(){
			stickerPack(parseInt($(this).data('value')));
		});
	});
});
