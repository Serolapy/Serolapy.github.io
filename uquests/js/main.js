//Управление поведением страницы

/*
	ОБЩИЕ НАСТРОЙКИ
*/
//переключение по вкладкам
$('nav a').on('click', function(e) {
	e.preventDefault();
	let windowsClass = $(this).parent().data('class');	//data-class у NAV

	$('.' + windowsClass).css('display', 'none');
	$('.' + windowsClass + '[data-id="' + $(this).data('name') + '"]').css('display', 'block');

});

//вывод ошибки
function systemError(text){
	let error = $('<div></div>');
	error.html('<span>Ошибка:</span><br>' + text);
	error.addClass('errorDiv');
	$('#errorPanel').append(error);
	$('#errorPanel').css('right', '0');

	$('#errorPanel').off('click');
	$('#errorPanel').on('click', function(){
		$('#errorPanel').css('right', 'calc(-1 * var(--asideWidth) - 10px)');
		setTimeout(function(){
			$('#errorPanel').html('');
		}, 2000);
	});
}

//генератор ID
function generationID(type){
	//type - это массив с объектами соотв. типа, например, боты
	//минимальное - 1, максимальное - 99999
	let rand = Math.floor(1 + Math.random() * 99999),
		id = '#' + rand;
	for(let i = 0; i < type.length; i++){
		if(id === type[i].id){
			//такой ID уже существует
			return generationID(type)
		}
	}
	//если ID уникален
	return id
}
/*
	ПАНЕЛЬ ЗАГРУЗКИ ФАЙЛОВ
*/
//вывод ошибки во время загрузок
function uploadError(text){
	$('#uploadDiv-errorArea').text(text);
	setTimeout(function(){
		//удаление ошибки
		$('#uploadDiv-errorArea').text('');
	}, 10000);
}
//функция проверки формата файла
function checkFormat(data, format){
	if(data.format == format){
		return true
	}
	else{
		uploadError('Неверный формат файла!');
		return false
	}
}

$('.import').on('click', function(e){
	e.preventDefault();
	$('#uploadDiv').css('display', 'block');

	var input = $(this),
		extension = input.data('extension');

	//строка с подсказкой формата
	$('#uploadDiv-extension').text(extension);

	//кнопки "подтвердить"
	$('.uploadDiv-upload').off('click');
	$('.uploadDiv-upload').on('click', function(){
		let type = $(this).data('type'),
			data = {};

		switch (type) {
			case 'link':
				//ссылка на файл
				$.get($('#uploadDiv-link').val(), function(getData){
					try{
						data = JSON.parse(getData);
					} catch(err){
						uploadError('Ошибка обработки JSON.');
						data = {};
						return
					}
					if(checkFormat(data, extension)){
						input.val(data);
					}
				}).fail(function(e){
					uploadError('Ошибка обработки ссылки.');
					return
				});
				break;

			case 'text':
				let getData = $('#uploadDiv-text').val();
				try{
					data = JSON.parse(getData);
				} catch(err){
					uploadError('Ошибка обработки JSON.');
					data = {};
					return
				}
				if(checkFormat(data, extension)){
					input.val(data);
				}
				break;

			case 'file':
				let files = document.getElementById('uploadDiv-file').files,
					file = files[0],
					reader = new FileReader();
				if(files.length != 1){
					uploadError('Выберите 1 файл!');
					return
				}
				reader.readAsText(file);
				reader.onload = function(){
					try{
						let getData = JSON.parse(reader.result);
						data = getData;
					} catch(err){
						uploadError('Ошибка обработки JSON.');
						data = {};
						return
					}
					if(checkFormat(data, extension)){
						input.val(JSON.stringify(data));
						$('#uploadDiv-close').click();
					}
					else{
						uploadError('Неверный формат.')
					}
				}
				break;
		}
	});
});
//закрытие окна
$('#uploadDiv-close').on('click', function(){
	$('#uploadDiv').css('display', 'none');

	$('#uploadDiv-extension').text('');
	$('#uploadDiv-file').val('');
	$('#uploadDiv-link').val('');
	$('#uploadDiv-text').val('');
});

//открытие-закрытие fieldset
$('legend').on('click', function(){
	$(this).parent().toggleClass('hide');
})
