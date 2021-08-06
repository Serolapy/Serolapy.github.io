/*
	SEROLAPY - объекты для проектов
*/
// >Списки условий и действий< \\
const conditionsList = [
	'say',				//поговорил с ботом
	'userInLocation',	//пришёл на локацию
	'hasItem'			//у него есть предмет..
];
// >Типы объектов и описания< \\

//CAT.SEROLAPY - объект кота
	/*
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

			>smell - запах племени персонажа;
			Тип: string;
			Возможные значения: прямая ссылка на картинку;
			По умолчанию: 'defaultImages/smell.png';
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
			По умолчанию: 'defaultImages/color.png' (окрас "Енот");
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
function cat(pol='der', name='Системолап', job='Воитель', smell='defaultImages/smell.png', online='block', color='defaultImages/color.png', costume='', size='100', mouth=''){
	this.format = '.cat.serolapy';
	this.pol = pol;
	this.name = (name==''?'Системолап':name);
	this.job = (job==''?'Воитель':job);
	this.smell = (smell==''?'defaultImages/smell.png':smell);
	this.online = online;
	this.color = (color==''?'defaultImages/color.png':color);
	this.costume = costume.split(' ');
	if(Number(size) <= 0 || Number(size) > 100){
		this.size = 100;
	}else{
		this.size = Number(size);
	}
	this.mouth = mouth.split(' ');

	this.import = function(data = this){
		if(data.format != this.format){return false}
		//data - это obj, который импортируется
		this.pol = data.pol || this.pol;
		this.name = data.name || this.name;
		this.job = data.job || this.job;
		this.smell = data.smell || this.smell;
		this.online = data.online || this.online;
		this.color = data.color || this.color;
		this.costume = data.costume || this.costume;
		this.size = data.size || this.size;
		this.mouth = data.mouth || this.mouth;

		return true
	}
	this.export = function(){
		return JSON.stringify(this);
	}
}
function codeCat(katze){
	//katze - текущий персонаж

	//
	//кот
	//
	var bodyCat = '';
	/*костюмы и дефекты*/
	for (i = 0; i < katze.costume.length; i++) {
		bodyCat += '<div style="background-image:url(\''+ katze.costume[i] + '\');background-size:' + katze.size + '%; position: absolute;"></div>';
	}
	/*окрас*/
	bodyCat = '<div style="background-image:url(\'' + katze.color + '\');background-size:' + katze.size + '%;" class="d">' + bodyCat + '</div>';
	/*какой-то странный div*/
	bodyCat = '<div>'+bodyCat+'</div>';



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
	//сборка
	//
	var CatAndData = '<span class="cat">' + bodyCat + dataCat + '</span>',
		CatWithArrow = '<span class="catWithArrow">' + CatAndData + '</span>';

	return CatWithArrow
}

//MOVE.SEROLAPY - объект перехода
	/*
		Входные данные

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
function move(img='', name=''){
	this.format = '.move.serolapy';
	this.img = img;
	this.name = name;

	this.import = function(data = this){
		//data - это obj, который импортируется
		if(data.format != this.format){return false}
		this.img = data.img || this.img;
		this.name = data.text || this.text;

		return true
	}
	this.export = function(){
		return JSON.stringify(this);
	}
}
function codeMoves(moves){
	return '<span class="move_parent"><img src="'+ moves.img +'" class="move_img"> <span class="move_name">'+ moves.name + '</span></span>'
}

//FIELD.SEROLAPY - объект локации
/*
	>name - название локации;
	Тип: string;
	Возможные значения: текст;
	По умолчанию: 'Без названия';
	Заметки:

	>img - фон локации;
	Тип: string;
	Возможные значения: прямая ссылка на картинку;
	По умолчанию: '/standart.png';
	Заметки:

	>playerSpawn - точка появления игрока
	Тип: object;
	Ключи:
		'x' - по оси Ox (считая с нуля, тип: int),
		'y' - по оси Oy (считая с нуля, тип: int);
	По умолчанию: {'x': 0, 'y': 0};
	Заметки:

	>bots - боты на локации
	Тип: array;
	Возможные значения: массив с объектами CAT
	По умолчанию: [];
	Заметки:

*/
function field(name = 'Без названия', img = '/standart.png', playerSpawn = {'x': 0, 'y': 0}, bots = []){
	this.format = '.field.serolapy';
	this.img = img;
	this.playerSpawn = {};
		this.playerSpawn.x = playerSpawn.x;
		if(!playerSpawn.x){this.playerSpawn.x = 0;}
		this.playerSpawn.y = playerSpawn.y;
		if(!playerSpawn.y){this.playerSpawn.y = 0;}
	this.bots = bots;
	//добавить проверку на точку появления кота относительно ботов
	this.import = function(data){
		if(data.format != this.format){return false}
		this.img = data.img || this.img;
		this.playerSpawn = data.playerSpawn || this.playerSpawn;
		this.bots = data.bots || this.bots;

		return true
	}
	this.export = function(){
		return JSON.stringify(this);
	}


}

//BOT.SEROLAPY - объект бота
/*
	>cat - внешние признаки;
	Тип: object;
	Возможные значения: объект CAT;
	По умолчанию: new cat();
	Заметки:

	>id - ID бота;
	Тип: string;
	Возможные значения: '#####';
	По умолчанию: '00000';
	Заметки:

	>description - описание бота;
	Тип: string;
	Возможные значения: текст пользователя;
	По умолчанию: '';
	Заметки:

	>position - позиция бота на локации;
	Тип: object;
	Ключи:
		'x' - по оси Ox (считая с нуля, тип: int),
		'y' - по оси Oy (считая с нуля, тип: int);
	По умолчанию: {'x': 0, 'y': 0};
	Заметки:

	>dialog - ID диалога с ботом;
	Тип: string;
	Возможные значения: id диалога;
	По умолчанию: '#####';
	Заметки:

	>conditions - массив с условиями и действиями бота;
	Тип: array;
	Возможные значения: см. заметки;
	По умолчанию: [];
	Заметки:
		В массиве находятся след. объекты:
		{
			"condition": new condition(),
			"condParams": {"параметр условия" : "его значение"},
			"actions": new action(),
			"actParams": {"параметр действия" : "его значение"}
		}
*/
function bot(katze = new cat(), id = '#####', position = {x: 0, y: 0}, dialog = '#####', conditions = []){
	this.format = '.bot.serolapy';

	this.cat = katze;
	this.id = id;
	this.position = {};
		this.position.x = position.x;
		if(!position.x){this.position.x = 0;}
		this.position.y = position.y;
		if(!position.y){this.position.y = 0;}
	this.dialog = dialog;

	this.condition = condition;
	this.import = function(data){
		if(data.format != this.format){return false}
		this.cat = data.cat || this.cat;
		this.id = data.id || this.id;
		this.position = data.position || this.position;
		this.dialog = data.dialog || this.dialog;
		this.condition = data.condition || this.condition;

		return true
	}
	this.export = function(){
		return JSON.stringify(this);
	}
}
