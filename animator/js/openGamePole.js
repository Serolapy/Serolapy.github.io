$('#openGamePole').on('click', function(){
	$('#openGamePole').val('Синхронизировать');
	//создание окна
	var gamePole = window.open('','gamePole','top=0, left=0, width=1000, height=500');
	
	if(gamePole.document.body.innerHTML == ''){	//то есть если до этого не было создано или было закрыто
		//meta
		var meta = gamePole.document.createElement('meta');
		meta.charset = "UTF-8";
		gamePole.document.head.appendChild(meta);
		
		
		//подключаем стили
		var links = [
			'https://e.catwar.su/css/blank.css',
			'https://e.catwar.su/css/cw3/jquery-ui.css',
			'https://serolapy.github.io/animator/css/gamePole_1.css',
			]	//массив с ссылками на стили
		for(i=0;i<links.length;i++){
			var a = gamePole.document.createElement('link');
			a.rel = 'stylesheet';
			a.href = links[i];
			gamePole.document.head.appendChild(a);
		}
		
		
		//title
		var title = gamePole.document.createElement('title');
		title.innerText = 'Игровая / Catwar';
		gamePole.document.head.appendChild(title);
		
		
		//создание div#app с хтмл как в материнском окне
		var t = gamePole.document.createElement('div');
		t.id = 'app';
		t.innerHTML = window.document.getElementById('app').innerHTML;
		gamePole.document.body.appendChild(t);
		
		
		//библиотеки
		var scripts = [
			'https://serolapy.github.io/js/jQuery.js',		//jQuery
			'https://serolapy.github.io/js/html2canvas.js',	//скриншоты
			]
		for(i=0;i<scripts.length;i++){
			var a = gamePole.document.createElement('script');
			a.src = scripts[i];
			gamePole.document.head.appendChild(a);
		}
		
		//после загрузки
		$(gamePole.document).ready(function() {
			//исполнение функций
			var scripts = [
				'https://serolapy.github.io/animator/js/gamePole.js',
				]
			for(i=0;i<scripts.length;i++){
				var a = gamePole.document.createElement('script');
				a.src = scripts[i];
				gamePole.document.head.appendChild(a);
			}
		});
	} else{	//если открыто
		gamePole.document.getElementById('app').innerHTML = window.document.getElementById('app').innerHTML;
	}
});