/*Проверка на jQuery*/
if(!("jQuery" in window)){let a = document.createElement('script');a.src='//e.catwar.su/js/jquery.js';document.head.appendChild(a);}

var versionML = '0.5.1 BETA';
var	CatWarMod = new mod('CatWarMod','Хвойница','https://openuserjs.org/install/Fredo14/CatWar_Mod.user.js',[]),
	CW_shed = new mod('CW_shed','Ленивый','https://openuserjs.org/install/ReiReiRei/CW_Shed.user.js',[]),
	CW_WhiteSpiderweb = new mod('CW_WhiteSpiderweb','Ленивый','https://openuserjs.org/install/ReReRe/CW_White_Spiderweb.user.js',['https://catwar.su/cw3/']),
    	More_Stickers_Addon = new mod('More_Stickers_Addon', 'Серолапый', 'https://serolapy.github.io/mods/More_Stickers_Addon.js',[]);

var MODS = [CatWarMod,CW_shed,CW_WhiteSpiderweb,More_Stickers_Addon];

if(!localStorage.getItem('versionML')){
	localStorage.setItem('versionML',versionML);
	if("Notification" in window){
		newNotificationML('Версия мода: '+versionML, false);
		}
	else{
		alert('Версия мода: '+versionML+';  уведомления недоступны')
	}
}else if(localStorage.getItem('versionML')!=versionML){			
	newNotificationML('Обновление мода. Текущая версия: '+versionML, false);
	localStorage.setItem('versionML',versionML);
}

function mod(check,author,link,site /*имя в Локал с, автор мода, ссылка на скрипт, разрешенные сайты*/){
	/*проверка на разрешение сайта разработчиком мода*/
	var siteCheck = false;
	for(i=0;i<site.length;i++){
		if(window.location.href==site[i]){
			siteCheck=true
	}}
	if(site.length==0 || siteCheck){
		var checkMod = localStorage.getItem(check);
		if(checkMod==null){
			/*дефолтные значения*/
			checkMod = false;
			localStorage.setItem(check,false);
		}
		if(checkMod=='true'){
			/*если мод разрешён*/
			let script = document.createElement("script");
			script.src = link;
			document.getElementsByTagName("head")[0].appendChild(script);
		}
	}
	this.check = localStorage.getItem(check);
	this.author = author;
	this.link = link;
	this.site = site;
	this.name = check;
}

/*
	обновление и добавление данных о персонаже
*/
async function MyCharacterNew(){
    var name = '';
	/*установка имени кота*/
	if(window.location.href=='https://catwar.su/'){
		name = $('#education').data('login');
	}else{
		name = prompt("Введите имя персонажа");
		if(name == null){return}
	}
	/*установка ID перса; о-очень честно стырено у @ara2am*/
	var	id = parseInt(await $.post("https://catwar.su/ajax/top_cat", {name: name}).promise()),
	/*промежуточный объект и заполнение в память*/
		a = {
			login: name,
			id: id
		};
	localStorage.setItem ("myCatML", JSON.stringify(a));
}

/*если нет данных*/
if(!localStorage.getItem('myCatML')){
	MyCharacterNew();
}
/*начало консоли*/
$('head').append($('<style><\/style>').html(`.MLconsole{
		background-color:#696969;
		color:#FFF;
		width:700px;
		height:400px;
		position:fixed;
		bottom:10px;
		right:10px;
		margin: 0px;
		border: solid black 10px;
		border-radius: 10px;
		transition:0.5s;
		transform:translateX(102%);
		font-family:Arial;
		z-index:10000;
	}
	.MLconsole_active{
		transform:translateX(0%);
	}
	#MLcommand input[type="text"]{
		resize:none;
		margin:5px;
		border:solid 1px black;
		width:640px;
		height:2em;
		font-size:1em;
	}
	#MLCwindows{
		margin:3px;
		display:block;
	}
	#MainMenu{
		background: url(https://serolapy.github.io/mods/img/symbol.png), rgb(105,105,105);
		background-size: auto 100%;
		background-repeat: no-repeat;
		background-position: 50% 50%;
	}
	#MLcommand input[type="button"]{
		width:40px;
		background:none;
		color:white;
		height:2em;
		font-size:1em;
		margin:2.5px;
		border:none;
		display:inline;
		padding:0;
	}
	.bottomLine{
		background-color:black;
		position:absolute;
		bottom:-3px;
		margin:0;
		display:block;
		width:100%;
		left:0px;
	}
	.MLCwindow{
		height:100%;
	}
	.MLCwindow h1{
		font-size: 36px;
		margin: 0px;
		text-align: center;
		font-family: Arial;
	}
	.menu{
		color:#fff;
		text-decoration:none;
		border: solid 2px white;
		margin: 6px;
		height: 66px;
		width: 66px;
		font-size: 20px;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		border-radius:10px;
	}
	.menu:hover{
		color:#7FFFD4;
		border-color:#7FFFD4;
	}
	.MLCbutton_exit{
		display:block;
		position:absolute;
		left:-45px;
		bottom:0px;
		height:30px;
		width:30px;
		background-color:black;
		border-radius:50%;
	}
	.MLCbutton_exit span,
	.MLCbutton_exit span::before,
	.MLCbutton_exit span::after{
		position:absolute;
		top:50%; margin-top:-1px;
		left:50%; margin-left:-7.5px;
		background-color:white;
		width:15px;
		height:2px;
	}
	.MLCbutton_exit span::before,
	.MLCbutton_exit span::after{
		content:'';
		transition:0.5s;
	}
	.MLCbutton_exit span::before{
		transform:translateY(-5px);
	}
	.MLCbutton_exit span::after{
		transform:translateY(5px);
	}
	.MLCbutton_exit_active span::before{
		transform: rotate(45deg);
		
	}
	.MLCbutton_exit_active span::after{
		transform: rotate(-45deg);
	}
	.MLCbutton_exit_active span{
		height:0px;
	}
	.to_house{
		display:flex;
		position:absolute;
		left:-45px;
		bottom:0px;
		height:30px;
		width:30px;
		background-color:black;
		border-radius:50%;
		color:white;
		justify-content: center;
		align-items: center;
		text-decoration:none;
		transition:1s;
		filter:opacity(0%);
	}
	.to_house_active{
		bottom:40px;
		filter:opacity(100%);
	}
	.desktopML1{
		display:flex;
		position:absolute;
		left:-45px;
		bottom:0px;
		height:30px;
		width:30px;
		background-color:black;
		border-radius:50%;
		color:white;
		justify-content: center;
		align-items: center;
		text-decoration:none;
		transition:1s;
		filter:opacity(0%);
	}
	.desktopML1_active{
		bottom:80px;
		filter:opacity(100%);
	}
	.MLCnot_window_ON{
		position:absolute;
		right:0;
		text-decoration:none;
		color:#EB8D8D;
	}
	.MLCnot_window_new{
		position:absolute;
		right:0;
		text-decoration:none;
		color:white;
	}
	.window_table{
		table-layout:fixed;
		width:100%;
		border-collapse:collapse;
		border:2px solid white;
		color:black;
	}
	.window_table th, .window_table td{
		padding:5px;
		border: 1.5px solid white;
	}
	.MLCmods_window_table_button_class{
		color:#EB8D8D;
	}
	/*Сайзы айконсов*/
	.material-icons.md-56 { font-size: 56px; }
	.material-icons.md-24 { font-size: 24px; }
	/*Цвета-классы*/
	.true{color:#00FF7F;border-color:#00FF7F;}
	.false{color:#EB8D8D;border-color:#EB8D8D;}
	/*
	МОБИЛЬНАЯ ВЕРСИЯ
	*/
	@media only all and (max-width: 730px){
		.MLconsole_active{
			width: 100%;
			bottom: 0;
			right: 0;
			border: 0;
			height: 100%;
			border-radius: 0;
		}
		.to_house_active{
			transition:0s;
			top: 0;
			color: white;
			border-color: white;
			text-decoration: none;
			margin: 0;
			left: 50%;
			width: 50%;
			border-radius: 0;
			border: 1px solid white;
		}
		.MLCbutton_exit_active{
			top: 0;
			color: white;
			text-decoration: none;
			margin: 0;
			left: 0;
			width: 50%;
			border-radius: 0;
			border: 1px solid white;
		}
		.MLCwindow{
			padding-top: 30px;
		}
	}
	.desktopMLconsole{
		width: 100%;
		bottom: 0;
		right: 0;
		border: 0;
		height: 100%;
		border-radius: 0;
	}
	.to_housedesctop{
		transition:0s;
		top: 0;
		color: white;
		border-color: white;
		text-decoration: none;
		margin: 0;
		left: 50%;
		width: 50%;
		border-radius: 0;
		border: 1px solid white;
	}
	.MLCbutton_exitdesctop{
		top: 0;
		color: white;
		text-decoration: none;
		margin: 0;
		left: 0;
		width: 50%;
		border-radius: 0;
		border: 1px solid white;
	}
	.MLCwindowdesctop{
		padding-top: 30px;
	}
	#TCstage2 table{
	border: 1px solid black;    
	border-collapse: collapse;
	width:100%;
	}
	#TCstage2 tr, #TCstage2 td{
	border: 1px solid black;
	}
	`))
	$('head').append($('<link>').attr('href','https://fonts.googleapis.com/icon?family=Material+Icons').attr('rel','stylesheet'));
$('body').append(`<div id="MLconsole" class="MLconsole">
	<a href="#" id="desktopML1" style="color:white;border-color:white;text-decoration:none;" class="desktopML1"><span class="material-icons" style="color:white">laptop</span>
	<a href="#" id="to_house" class="to_house" style="color:white;border-color:white;text-decoration:none;"><span class="material-icons md-24">home</span></a>
	<a href="#" id="MLCbutton_exit" class="MLCbutton_exit"><span></span></a>
	<div id="MLCwindows">
		<!--MainMenu-->
		<div id="MainMenu" class="MLCwindow">
			<h1>Mod Launcher version 0.5.0.2 BETA</h1>
			<a href="#" class="menu" data-id="MLCaccount"style="color:white;border-color:white;text-decoration:none;"><span class="material-icons md-56">perm_identity</span></a>
			<a href="#" class="menu" data-id="MLCcode"style="color:white;border-color:white;text-decoration:none;"><span class="material-icons md-56">code</span></a>
			<a href="#" class="menu" data-id="MLCmods"style="color:white;border-color:white;text-decoration:none;"><span class="material-icons md-56">settings</span></a>
			<a href="#" class="menu" id="MLCnot" data-id="MLCnot_window"style="color:white;border-color:white;text-decoration:none;"><span class="material-icons md-56">notifications</span></a>
			<a href="#" class="menu" data-id="settings_ML"style="color:white;border-color:white;text-decoration:none;"><span class="material-icons md-56">app_settings_alt</span></a>
			<a href="#" id="TableCreatorbtn" data-id="TableCreator" class="menu" style="color:white;border-color:white;text-decoration:none;"><span class="material-icons md-56">border_all</span></a>
			<a href="#" id="cancelML" class="menu" style="color:white;border-color:#EB8D8D;text-decoration:none;"><span class="material-icons md-56">cancel</span></a>
		</div>
		
		<!--Windows-->
		<!--Аккаунт-->
		<div id="MLCaccount" style="display:none;" class="MLCwindow">
			<table class="window_table">
				<tr>
					<td><b>Имя: </b><span id="namecatml">Гость</span></td>
					<td rowspan="2" style="text-align:center"><img id="avatarcatml" alt="Аватарка" src="/"  onerror="avatarML(MY_CAT_ML.id,eml)" style="max-width:250px;max-height:150px;"></td>
				</tr>
				<tr>
					<td><b>ID: </b><span id="idcatml">Нет</span></td>
				</tr>
			</table>
		</div>
		
		<!--TableCreator-->
		<div id="TableCreator" style="display:none;" class="MLCwindow">
			<table class="window_table">
				<tr>
					<td>
						Количество строк: 
					</td>
					<td>
						<input type="number" id="TCstolb" style="width:100%">
					</td>
				</tr>
				<tr>
					<td>
						Количество ячеек: 
					</td>
					<td>
						<input type="number" id="TCstrok" style="width:100%">
					</td>
				</tr>
				
				<tr>
					<td>
						Цвет заливки таблицы + наличие рамки
						(стандарт - оставить пустым; без рамки - 0; цвет заливки - цвет):
					</td>
					<td>
						<input type="text" id="TCcolor" style="width:100%">
					</td>
				</tr>
				<tr>
					<td colspan="2" style="text-align:center"><input type="button" id="TCgo1" value="2 этап" style="width:40%"></td>
				</tr>
				<tr>
					<td colspan="2"><textarea id="TCtext" style="width:100%"></textarea></td>
				</tr>
				<tr>
					<td colspan="2" style="text-align:center"><div id="TCstage2"></div></td>
				</tr>
				<tr>
					<td colspan="2" style="text-align:center"><input type="button" id="TCgo2" value="3 этап" style="display:none; width:40%"></td>
				</tr>
				<tr>
					<td colspan="2" style="text-align:center"><div id="TCstage3"></div></td>
				</tr>
				<tr>
					<td colspan="2" style="text-align:center"><div id="TCpreviewText"></div></td>
				</tr>
				
			</table>
		</div>
		
		<!--Моды-->
		<div id="MLCmods" style="display:none;" class="MLCwindow">
			<table id="MLCmods_window_table" class="window_table">
				<thead>
					<tr>
						<th style="width:75%">Модификация</th>
						<th style="width:25%">Состояние</th>
					</tr>
				</thead>
				<tbody></tbody>
			</table>
		
		</div>
		
		<!--Настройки системы-->
		<div id="settings_ML" style="display:none;" class="MLCwindow">
			<table class="window_table">
			
				<tr>
					<td>
						На весь экран (не работает на телефоне) 
					</td>
					<td>
						<span id="desktopML" class="material-icons" style="color:white">laptop</span>
					</td>
				</tr>
				<tr>
					<td>
						Версия мода:
					</td>
					<td>
						<span id="versonML">~</span>
					</td>
				</tr>
				
				
			</table>
		</div>
		<!--Коды-->
		<div id="MLCcode" style="display:none;" class="MLCwindow">
			<h1>Режим разработчика</h1>
			<div id="MLCcommand_text"></div>
			<div id="MLcommand" class="bottomLine">
				<input type="text" id="MLCsubmit_text"><input type="button" value=">" id="MLCsubmit_button">
			</div>
		</div>
		
		<!--Уведомления-->
		<div id="MLCnot_window" style="display:none;" class="MLCwindow">
			<h1>Уведомления</h1>
			<table id="MLCnot_window_table" class="window_table">
				<thead>
					<tr>
						<th style="width:80%">
							Текст
						</th>
						<th style="width:20%">
							Время
						</th>
					</tr>
				</thead>
				<tbody></tbody>
			</table>
			<div class="bottomLine">Показ уведомлений: <a href="#" id="MLCnot_window_ON" class="MLCnot_window_ON" style="color:#EB8D8D;border-color:#EB8D8D;text-decoration:none;"><span class="material-icons">toggle_off</span></a><br>
			Создать уведомление: <a href="#" id="MLCnot_window_new" class="MLCnot_window_new" style="color:white;border-color:white;text-decoration:none;"><span class="material-icons">settings_applications</span></a>
			
			</div>
		</div>
	</div>
</div>
`);
$(function(){
	/*
		ГЛАВНОЕ МЕНЮ
	*/
	/*Активация консоли*/
	$('#MLCbutton_exit').on('click',function(e){
		$('#MLconsole').toggleClass('MLconsole_active');
		$('#to_house').toggleClass('to_house_active');
		e.preventDefault();
		$(this).toggleClass('MLCbutton_exit_active');
		$('#MLconsole').removeClass('desktopMLconsole');
		$('#to_house').removeClass('to_housedesctop');
		$('#MLCbutton_exit').removeClass('MLCbutton_exitdesctop');
		$('.MLCwindow').removeClass('MLCwindowdesctop');
		$('#desktopML1').toggleClass('desktopML1_active');
	});
	
	/*Кнопка домой*/
	$('#to_house').on('click', function(e){
		e.preventDefault();
		/*Очистка окна*/
		$(".MLCwindow").css("display","none");
		/*Вкл. домашнего окна*/
		$('#MainMenu').css("display","block");
	});
	
	/*нажатие на кнопку в главном меню*/
	$('.menu').click(function(e){
		e.preventDefault();
		/*Очистка поля*/
		$(".MLCwindow").css("display","none");
		/* Выборка нового окна и постановка ему display:block 
		через data-id кнопки. id(окна)=data-id(кнопки)*/
		$("#"+$(this).data('id')).css('display','block');
	});
	
	
	/*
		ФУНКЦИИ
	*/
	/*написание функции*/
	$('#MLCsubmit_button').on('click',function(e){
		e.preventDefault();
		var script = $('<script><\/script>').html($('#MLCsubmit_text').val()),
			div = $('<div><\/div>').html($('#MLCsubmit_text').val() + '<br>');
		div.addClass("function_text_button");
		div.append(script);
		$('#MLCcommand_text').append(div);
	});
	
	/*
		УВЕДОМЛЕНИЯ
	*/
	/*Значок уведомлений*/
	if(localStorage.getItem('MLNotifications')=='true'){
		$('#MLCnot').children().eq(0).html('notifications');
		$('#MLCnot_window_ON').children().eq(0).html('toggle_on');
		$('#MLCnot_window_ON').css("color","#00FF7F");
	} else{
	$('#MLCnot_window_ON').css("color","#EB8D8D");
	$('#MLCnot').css({'color':'#EB8D8D','border-color':'#EB8D8D'});
	$('#MLCnot').children().eq(0).html('notifications_off');
	$('#MLCnot_window_ON').children().eq(0).html('toggle_off');
	}
	
	/*Вкл показа уведомлений*/
	$('#MLCnot_window_ON').on('click',function(e){
		e.preventDefault();
		if(localStorage.getItem('MLNotifications')=='false'){
			localStorage.setItem('MLNotifications',true);
			$('#MLCnot').children().eq(0).html('notifications');
			$('#MLCnot').css({'color':'white','border-color':'white'});
			$('#MLCnot_window_ON').children().eq(0).html('toggle_on');
			$('#MLCnot_window_ON').css('color','#00FF7F');
		}
		else{
			localStorage.setItem('MLNotifications',false);
			$('#MLCnot').children().eq(0).html('notifications_off');
			$('#MLCnot').css({'color':'#EB8D8D','border-color':'#EB8D8D'});
			$('#MLCnot_window_ON').css('color','#EB8D8D');
			$('#MLCnot_window_ON').children().eq(0).html('toggle_off');
		}
	});
	
	/*Приудительный показ*/
	$('#MLCnot_window_new').on('click',function(e){
		e.preventDefault();
		var title = prompt('Введите заголовок'),
			text = prompt('Введите текст уведомления');
			newNotification(title, text);
	});
	
	/*
		МОДЫ
	*/
	/*
	MODS - Массив с модами;
	
	Свойства объектов модов:
	.name - имя мода;
	.check - состояние мода (true/false);
	.author - аффтор мода;
	.link - ссылка на внешний скрипт с модом;
	.site - сайты, где работает мод;
	*/
	
	/*Создание списка модов*/
	for(i=0;i<MODS.length;i++){
		var tr = $('<tr><\/tr'),
		td1 = $('<td><\/td'),
		td2 = $('<td><\/td'),
		a='';
		td1.append(MODS[i].name + '<br><b>Автор: </b>' + MODS[i].author);
		if(MODS[i].check=='true'){a='toggle_on';}
		else{a='toggle_off';};
		var b = $('<a><\/a>').attr('href','#').attr('id','a_'+MODS[i].name).html("<span class='material-icons'>"+a+"<\/span>").addClass("MLCmods_window_table_button_class").attr("data-id",MODS[i].name).css('color','#EB8D8D');
		if(MODS[i].check=='true'){b.css('color','#00FF7F');}
		td2.append(b);
		tr.append(td1,td2);
		$("#MLCmods_window_table tbody").append(tr);
	}
	
	/*Вкл/откл модов*/
	$(".MLCmods_window_table_button_class").on('click',function(e){
		e.preventDefault();
		
		var MOD = $(this).attr("data-id");
		if(localStorage.getItem(MOD)=='true'){
			localStorage.setItem(MOD,false);
			$('#a_'+MOD).children().eq(0).html('toggle_off');
			$('#a_'+MOD).css('color','#EB8D8D');
		}else{
			localStorage.setItem(MOD,true);
			$('#a_'+MOD).children().eq(0).html('toggle_on');
			$('#a_'+MOD).css('color','#00FF7F');
		}
	});
});
function newNotification(title = 'CatWar', text = 'Новое уведомление', site = '#', icon = 'https://catwar.su/favicon.ico',dir = 'auto'){
/*(Заголовок, текст, ссылка при клике, направление текста)*/
	var a = {
		/*Тело уведомления*/
		body:text,
		icon:icon,
		dir:dir
	};
	if(localStorage.getItem('MLNotifications')=='true'){
		/*проверка браузера*/
		if (!("Notification" in window)) {
			alert('Ваш браузер не поддерживает уведомления.');
		}
		/*если права есть*/
		else if (Notification.permission == "granted") {
			var notification = new Notification(title, a);
			notification.onclick = function(){
				window.open(site);
				notification.close();
			}
			/*добавление в списочек*/
			var d = new Date();
			$('#MLCnot_window_table tbody').append($('<tr><\/tr>').append($('<td><\/td>').html('<b>'+title+'<\/b><br>'+text),$('<td><\/td>').html(d.getHours()+':'+d.getMinutes())));
		}
		/*получаем права*/
		else if (Notification.permission != 'denied') {
			Notification.requestPermission(function (permission) {
				/* Если права успешно получены, отправляем уведомление*/
				if (permission == "granted") {
				newNotification();
				} else {
					alert('Вы запретили показывать уведомления. Включить показ всегда можно в настройках мода.');
				}
			});
		}else {/*Отклонено*/}
	}
}
function newNotificationML(text, siteCH, site){
	if(!siteCH){
		site = '#';
	}
	newNotification('Mod Launcher | CatWar',text,site,'https://avatars0.githubusercontent.com/u/65182656');
}

/*общедоступные переменные*/
var MY_CAT_ML = JSON.parse(localStorage.getItem('myCatML'));
/* 	MY_CAT_ML.login - имя
	MY_CAT_ML.id - ID 
*/

/*поиск аватара*/
var eml='';
function avatarML(id,a){
	switch (a){
		case ".jpg":
			eml = ".png";
			break;
		case ".png":
			eml = ".gif";
			break;
		case ".gif":
			eml = ".ERROR";
			break;
		case ".ERROR":
			eml = "";
	}
	if(eml){
		$('#avatarcatml').attr('src','https://e.catwar.su/avatar/'+id+a);
	}else{
		$('#avatarcatml').attr('src','https://serolapy.github.io/mods/img/symbol.png');
	}
}
/*установка данных в консоле на странице кота*/
avatarML(MY_CAT_ML.id,'.jpg');
$('#namecatml').html(MY_CAT_ML.login);
$('#idcatml').html(MY_CAT_ML.id);

/*закрытие окна модов*/
$('#cancelML').on('click',function(e){
	e.preventDefault();
	$('#MLconsole').css('display','none');
});

/*на весь экран*/
function MobileML(){
	$('#MLconsole').toggleClass('desktopMLconsole');
	$('#to_house').toggleClass('to_housedesctop');
	$('#MLCbutton_exit').toggleClass('MLCbutton_exitdesctop');
	$('.MLCwindow').toggleClass('MLCwindowdesctop');
}
$('#desktopML').on('click',MobileML);
$('#desktopML1').on('click',MobileML);

/*версии модов на экран настройки*/
$('#versonML').html(versionML);

/*Тэйбл креатор+*/
async function preview(text){
	return await $.post("https://catwar.su/preview",{text:text});
}
	
$('#TCgo1').on('click',function(){
	var result='';
	for(i=0;i<parseInt($('#TCstolb').val());i++){
		var strok='';
		for(j=0;j<parseInt($('#TCstrok').val());j++){
			strok+='<td class="TCtd"></td>';
		}
		result+='<tr>'+strok+'</tr>';
	}
	result = '<table id="TCtable1">'+result+'</table>';
	
	$('#TCstage2').html(result);
	$('.TCtd').on('click', function(){
		$(this).html(($('#TCtext').val()!=''? $('#TCtext').val():' '));
	});
	$('#TCgo2').css('display','block');
});
$('#TCgo2').on('click',async function(){
	var resultBBcode = '[table'+($('#TCcolor').val()==''?'':'='+$('#TCcolor').val())+']';
	for(tr=0;tr<$('#TCtable1').children().eq(0).children().length;tr++){
		/*для строчек*/
		resultBBcode+='[tr]';
		for(td=0;td<$('#TCtable1').children().eq(0).children().eq(tr).children().length;td++){
			/*для каждй ячейки*/
			resultBBcode+='[td]';
			/*текст ячейки*/
			resultBBcode+=$('#TCtable1').children().eq(0).children().eq(tr).children().eq(td).html();
			resultBBcode+='[/td]';
		}
		resultBBcode+='[/tr]';
	}
	resultBBcode+='[/table]';
	
	/*вывод, чёрт возьми*/
	$('#TCstage3').html(await preview(resultBBcode));
	$('#TCpreviewText').text(resultBBcode);
});
