/*отлов старых ошибок*/

//коты
try{
	if(!JSON.parse(localStorage.getItem('oldCats'))){
		localStorage.setItem('oldCats', JSON.stringify([]));
	}
}
catch(e){
	if (e instanceof SyntaxError){
		localStorage.setItem('oldCats', JSON.stringify([]));
	}
}
//переходы
try{
	if(!JSON.parse(localStorage.getItem('moves'))){
		localStorage.setItem('moves', JSON.stringify([]));
	}
}
catch(e){
	if (e instanceof SyntaxError){
		localStorage.setItem('moves', JSON.stringify([]));
	}
}


/*
	конструктор котов
*/
function New_cat(pol='der', name='Системолап', job='Воитель', smell='https://catwar.su/cw3/odoroj/51.png', online='block', color='https://catwar.su/cw3/composited/d2bb67dfe46197cf.png', costume='', size='100', mouth=''){
	/*
			Входные данные (совместно с функцией codeCat())
			
		>pol - пол персонажа; 
		Тип: string;
		Возможные значения: 
			'der' - муж.,
			'die' - жен.;
		По умолчанию: 'der';
		Заметки:
		
		>name - имя персонажа;
		Тип: string;
		Возможные значения: любая строка;
		По умолчанию: 'Системолап';
		Заметки:
		
		>job - должность персонажа;
		Тип: string;
		Возможные значения: любая строка;
		По умолчанию: 'Воитель';
		Заметки:
		
		>job - запах племени персонажа;
		Тип: string;
		Возможные значения: прямая ссылка на картинку;
		По умолчанию: 'https://catwar.su/cw3/odoroj/51.png';
		Заметки:
		
		>online - состояние игрока (онлайн?);
		Тип: string;
		Возможные значения: 
			'online' - "В сети", 
			'offline' - "Спит",
			'wait' - "Недавно ушёл/ушла",
			'delete' - "На удалении",
			'block' - "Заблокирован(-а)";
		По умолчанию: 'block';
		Заметки:
		
		>color - окрас персонажа;
		Тип: string;
		Возможные значения: прямая ссылка на картинку;
		По умолчанию: 'https://catwar.su/cw3/composited/d2bb67dfe46197cf.png' (окрас "Енот");
		Заметки:
		
		>costume - костюмы и дефекты персонажа;
		(!!!)Тип: string;
		Возможные значения: прямые ссылки на картинки;
		По умолчанию: '';
		Заметки:
			~перечиление должно идти через пробел, например:
				'[окрас1] [дефект1] [дефект2]'
				'[окрас1]'
		
		>size - размер персонажа; 
		Тип: integer;
		Возможные значения: числа от 1 до 100;
		По умолчанию: 100;
		Заметки:
			~если допущена ошибка, и значение не вписывается в рамки, то программа вернёт значение 100
			~если допущена ошибка типа, то программа преобразует строку в целое число
		
		>mouth - предметы во рту персонажа;
		(!!!)Тип: string;
		Возможные значения: прямые ссылки на картинки;
		По умолчанию: '';
		Заметки:
			~перечиление должно идти через пробел, например:
				'[предмет1] [предмет2] [предмет2]'
				'[предмет1]'
		
	*/
	this.pol = pol;
	this.name = (name==''?'Системолап':name);
	this.job = (job==''?'Воитель':job);
	this.smell = (smell==''?'https://catwar.su/cw3/odoroj/51.png':smell);
	this.online = online;
	this.color = (color==''?'https://catwar.su/cw3/composited/d2bb67dfe46197cf.png':color);
	this.costume = costume.split(' ');
	if(Number(size) <= 0 || Number(size) > 100){
		this.size = 100;
	}else{
		this.size = Number(size);
	}
	
	this.mouth = mouth.split(' ');
	
	//сохранение в localStorage
	this.save = function(){
		if(confirm('Сохранить персонажа?')){
			var cats = JSON.parse(localStorage.getItem('oldCats'));
			cats.push(this);
			localStorage.setItem('oldCats', JSON.stringify(cats));
			updateDataHome();
		}
	}
	
	//превью
	this.preview = function(){
		$('#previewDataCat').html('<div class="cage_items">' + codeCat(this) + '</div>');
	}
}

//код кота по его данным
function codeCat(katze){
	//katze - текущий персонаж
	
	//
	//кот
	//
	var cat = '';
	/*костюмы и дефекты*/
	for (i = 0; i < katze.costume.length; i++) {
		cat += '<div style="background-image:url(\''+ katze.costume[i] + '\');background-size:' + katze.size + '%; position: absolute;"></div>';
	}
	/*окрас*/
	cat = '<div style="background-image:url(\'' + katze.color + '\');background-size:' + katze.size + '%;" class="d">' + cat + '</div>';
	/*какой-то странный div*/
	cat = '<div>'+cat+'</div>';
	
	
	
	//
	//сведения
	//
	
	var cName = '<u><a href="#">' + katze.name + '</a></u><br>',
		cJob = '<small><i>' + katze.job + '</i></small><br>',
		cSmell = ((katze.pol == 'der') ? 'Его ' : 'Её ') + 'запах:<br><img src="' + katze.smell + '"><br>',
		cOnline = '[ ',
		cMouth  = '';
		
	/*рот*/
	if(katze.mouth.length != 0 && katze.mouth[0]!=''){
		cMouth = 'У ' + ((katze.pol == 'der') ? 'него ' : 'неё ') + 'во рту:';
		cMouth += '<ol class="mouth">';
		for(i=0;i<katze.mouth.length;i++){
			cMouth += '<li><img src="'+katze.mouth[i]+'"></li>';
		}
		cMouth += '</ol>'
	}
	
	/*статус*/
	switch (katze.online) {
		case 'online':
			cOnline += '<font color="#006400">В игре</font>';
			break;
		case 'offline':
			cOnline += '<font color="#A52A2A">Спит</font>';
			break;
		case 'wait':
			cOnline += '<font color="#333333">Недавно ' + ((katze.pol == 'der') ? 'ушёл' : 'ушла') + '</font>';
			break;
		case 'delete':
			cOnline += '<font color="#333366">На удалении</font>';
			break;
		case 'block':
			cOnline += '<font color="#333366">Заблокирован' + ((katze.pol == 'der') ? '' : 'а') + '</font>';
			break;
	}
	cOnline += ' ]';
	
	/*сборка сведений*/
	
	//стили нужны?
	var dataCat = '<span class="cat_tooltip">' + cName + cJob + cMouth + cSmell + cOnline + '</span>';
		
	
	
	//
	//стрела
	//
	
	var arrow = '';
	if(false){
		//добавка наполнения
	}
	
	
	
	//
	//сборка
	//
	var CatAndData = '<span class="cat">' + cat + dataCat + '</span>',
		CatWithArrow = '<span class="catWithArrow">' + arrow + CatAndData + '</span>';
	
	return CatWithArrow
}

//предпросмотр
$('#previewcatBtn').on('click', function () {
	new New_cat(
		$('#catPOL').val(),
		$('#catName').val(),
		$('#catJob').val(),
		$('#catSmell').val(),
		$('#catOnline').val(),
		$('#catColor').val(),
		$('#catCostume').val(),
		$('#catSize').val(),
		$('#catMouth').val(),
	).preview();
});

//сохранение
$('#saveCat').on('click', function () {
	new New_cat(
		$('#catPOL').val(),
		$('#catName').val(),
		$('#catJob').val(),
		$('#catSmell').val(),
		$('#catOnline').val(),
		$('#catColor').val(),
		$('#catCostume').val(),
		$('#catSize').val(),
		$('#catMouth').val(),
	).save();
});

/*
	конструктор переходов
*/
function New_moves(img='', name=''){
	/*
			Входные данные (совместно с функцией codeCat())
			
		>img - картинка перехода; 
		Тип: string;
		Возможные значения: прямая ссылка на картинку;
		По умолчанию: '';
		Заметки:
		
		>name - текст под картинкой;
		Тип: string;
		Возможные значения: любая строка;
		По умолчанию: '';
		Заметки: 
			название локации, куда переходит кот;
	*/
	this.img = img;
	this.name = name;
	
	this.save = function(){
		if(confirm('Сохранить переход?')){
			var moves = JSON.parse(localStorage.getItem('moves'));
			moves.push(this);
			localStorage.setItem('moves', JSON.stringify(moves));
			updateDataHome();
		}
	}
	this.preview = function(){
		$('#previewMoves').html('<div class="cage_items">' + codeMoves(this) + '</div>');
	}
}
//код перехода
function codeMoves(moves){
	return '<span class="move_parent"><img src="'+ moves.img +'" class="move_img"> <span class="move_name">'+ moves.name + '</span></span>'
	
}
//превью перехода
$('#previewmovesBtn').on('click', function () {
	new New_moves(
		$('#movesBackground').val(),
		$('#movesName').val()
	).preview();
});
//сохранение перехода
$('#saveMoves').on('click', function () {
	new New_moves(
		$('#movesBackground').val(),
		$('#movesName').val()
	).save();
});



//обновление в >HOME<
function updateDataHome(){
	/*персонаж*/
	var cats = JSON.parse(localStorage.getItem('oldCats')),
	divCat = '';
	for(catNum=0;catNum<cats.length;catNum++){
		divCat += '<div class="cage_items" data-type="cat" data-id="'+catNum+'">' + codeCat(cats[catNum]) + '</div>';
	}
	$('#oldCats').html(divCat);
	
	/*переход*/
	var moves = JSON.parse(localStorage.getItem('moves')),
	divMoves = '';
	for(movesNum=0;movesNum<moves.length;movesNum++){
		divMoves += '<div class="cage_items" data-type="moves" data-id="'+movesNum+'">' + codeMoves(moves[movesNum]) + '</div>';
	}
	$('#oldMoves').html(divMoves);
	
	
	/*выборка кота*/
	$('.editData .cage_items').on('click', function(){
		if($(this).hasClass('select')){
			$(this).removeClass('select');
			return
		}
		$('.select').removeClass('select');
		$(this).addClass('select');	
	});
};
updateDataHome();

//удаление предметов
$('#delete_select').on('click', function(){
	if(confirm('Удалить выбранный предмет?')){
		//если предмет выбран
		if ($('.select').length == 0){
			return
		}
		//тип предмета
		switch($('.select').data('type')){
			case 'cat':
				var i = $('.select').data('id'),
					cats = JSON.parse(localStorage.getItem('oldCats'));
				cats.splice(i,1);
				localStorage.setItem('oldCats', JSON.stringify(cats));
				updateDataHome();
				break;
			case 'moves':
				var i = $('.select').data('id'),
					moves = JSON.parse(localStorage.getItem('moves'));
				moves.splice(i,1);
				localStorage.setItem('moves', JSON.stringify(moves));
				updateDataHome();
				break;
		}
	}
});

//постановка пердметов в клетку
$('.cage').on('click', function(){
	//если предмет выбран
	if ($('.select').length == 0){
		return
	}
	//тип объекта
	switch($('.select').data('type')){
		case 'cat':
			var catID = $('.select').data('id'),
				cage = $(this),
				cats = JSON.parse(localStorage.getItem('oldCats'));
			
			cage.html('<div class="cage_items">' + codeCat(cats[catID]) + '</div>');
			break;
		case 'moves':
			var movesID = $('.select').data('id'),
				cage = $(this),
				moves = JSON.parse(localStorage.getItem('moves'));
			
			cage.html('<div class="cage_items">' + codeMoves(moves[movesID]) + '</div>');
			break;
	}
});