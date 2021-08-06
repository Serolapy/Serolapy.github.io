//считывание данных с полей форм

//select`ы условий и действий

//всё, что связано с данными полей

var questData = {
	'data': {
		'name': 'Очень крутое название',
		'description': 'Очень крутое описание',
		'authors': []
	},
	'locations': [],			//локации
	'bots': [],					//боты
	'replicas': [],			//реплики
	'moves': [],				//переходы
	'actions': [],				//действия
	'hauptSpieler': {}		//главный герой
}

/*
	ВКЛАДКА "КВЕСТ"
*/
//добавление строк авторов
$('#quest-addAuthorBtn').on('click', function(){
	$('#authors').append('<tr><td><input type="text" class="quest-nameAuthor"></td><td><input type="number" class="quest-idAuthor"></td><td><input type="button" class="quest-removeAuthor" value="-"></td></tr>');

	$('.quest-removeAuthor').off('click');
	$('.quest-removeAuthor').on('click', function(){
		$(this).parents().eq(1).remove();
	});
});
//расстановка полей
$('#quest-nameQuest').change(function(){
	if($(this).val() == ''){
		systemError('Название не сохранено');
		questData.data.name = '';
		return
	}
	questData.data.name = $(this).val();
});
$('#quest-descriptionQuest').change(function(){
	if($(this).val() == ''){
		systemError('Описание не сохранено');
		questData.data.description = '';
		return
	}
	questData.data.description = $(this).val();
});
$('#quest-saveAuthors').on('click', function(){
	let authors = $('#authors').children(),
		allAuthorsSaved = true;

	//если авторов нет - ошибка
	if(!authors.length){
		systemError('Авторов нет');
		return
	}
	for(let i = 0; i < authors.length; i++){
		let name = $('.quest-nameAuthor').eq(i).val(),
			id = $('.quest-idAuthor').eq(i).val();
		if(!(name && id)){
			allAuthorsSaved = false;
			continue
		}
		questData.data.authors.push({
			'name': name,
			'id': id
		});
	}

	if(!allAuthorsSaved){
		systemError('Сохранены не все авторы')
	}
});

/*
	ВКЛАДКА "ЛОКАЦИИ"
*/
//открыть блок локаций
$('#location-create-new').on('click', function(){
	$('#location-create-new').css('display', 'none');
	$('#location-create-createBlock').css('display', 'block');

	$('#location-create-idLocation').val(generationID(questData.locations));
});

/*
	ВКЛАДКА "БОТЫ"
*/
//открыть блок создания ботов
$('#bots-create-new').on('click', function(){
	$('#bots-create-new').css('display', 'none');
	$('#bots-create-createBlock').css('display', 'block');

	$('#bots-create-idBot').val(generationID(questData.bots));
});
