/*
	создание кота
*/
function addCat(pol, name, job, smell, online, color, costume, size, items) {

	//
	// кот
	//

	var cat = '';
	/*костюмы и дефекты*/
	for (i = 0; i < costume.length; i++) {
		cat += '<div style="background-image:url(\''+ costume[i] + '\');background-size:' + size + '%; position: absolute;"></div>';
	}
	/*окрас*/
	cat = '<div style="background-image:url(\'' + color + '\');background-size:' + size + '%;" class="d">' + cat + '</div>';

	//
	//сведения
	//

	var dataCat = '',
		cName = '<u><a href="#">' + name + '</a></u><br>',
		cJob = '<small><i>' + job + '</i></small><br>',
		cSmell = ((pol == 'der') ? 'Его ' : 'Её ') + 'запах:<br><img src="' + smell + '"><br>',
		cOnline = '[';
	switch (online) {
		case 'online':
			cOnline += '<font color="#006400">В игре</font>';
			break;
		case 'offline':
			cOnline += '<font color="#A52A2A">Спит</font>';
			break;
		case 'wait':
			cOnline += '<font color="#333333">Недавно ' + ((pol == 'der') ? 'ушёл' : 'ушла') + '</font>';
			break;
		case 'delete':
			cOnline += '<font color="#333366">На удалении</font>';
			break;
		case 'block':
			cOnline += '<font color="#333366">Заблокирован' + ((pol == 'der') ? '' : 'а') + '</font>';
			break;
	}
	cOnline += ']';
	dataCat = '<span class="cat_tooltip" style="z-index: 9999;padding: 5px; min-width: 80px; background: RGBA(255, 255, 255, 0.9); border: 1px solid gray; border-radius: 6px; color: #930; font-weight: bold; text-align: center;" >' + cName + cJob + cSmell + cOnline + '</span>';

	//
	//сборка кота и данных
	//

	var CatAndData = '<span class="catWithArrow"><span class="cat">' + cat + dataCat + '</span></span>';

	//
	//клетка
	return CatAndData
}

/*сохранение кота*/
$('#saveCat').on('click', function () {
	//
	//local Storage
	//
	var Ls = localStorage.getItem('oldCats');
	if(Ls == null){
		Ls = '';
	}
	// 
	newcat = '<div class="cage_items">' + addCat(
		$('#catPOL').val(),
		$('#catName').val(),
		$('#catJob').val(),
		$('#catSmell').val(),
		$('#catOnline').val(),
		$('#catColor').val(),
		$('#catCostume').val().split(','),
		Number($('#catSize').val())
	) + '</div>';
	if (confirm('Сохранить персонажа?')) {
		Ls += newcat;
	}
	localStorage.setItem('oldCats', Ls);
});
//кнопка превью
$('#previewcatBtn').on('click', function () {
	/*По нажатию на кнопку*/
	$('#previewDataCat').html('<div class="cage_items">' + addCat(
		$('#catPOL').val(),
		$('#catName').val(),
		$('#catJob').val(),
		$('#catSmell').val(),
		$('#catOnline').val(),
		$('#catColor').val(),
		$('#catCostume').val().split(','),
		Number($('#catSize').val())
	) + '</div>');
});
//обновление в >HOME<
$('#oldCatBtn').on('click', function () {
	$('#oldCats').html(localStorage.getItem('oldCats'));
	
	/*выборка кота*/
	$('#oldCats > .cage_items').on('click', function(){
		$('.select').removeClass('select');
		$(this).addClass('select');	
	});
});

//добавка предметов под котом
$('#BtnItemListCAGE').on('click', function(){
	var items = $('#itemListCAGE').val().split(',');
	//
	//предметы в клетке
	//

	var allItems = ''; //все предметы
	for (i = 0; i < items.length && i < 5; i++) {
		let a = '';
		switch (i) {
			case 0:
				a = '0% 0%';
				break;
			case 1:
				a = '100% 0%';
				break;
			case 2:
				a = '0% 100%';
				break;
			case 3:
				a = '100% 100%';
				break;
		}
		allItems += 'url(\'' + items[i] + '\') ' + a + ' no-repeat' + ((i == items.length - 1) ? '' : ',');
	}
	
	//великий Хлебушек во тьме, помоги мне...
	
	//добавление предметов под котов
	if ($('.select').length > 0){
		$('.select').css('background', allItems);
	} else if($('.select').length == 0){
		alert('Нужно выбрать изменяемого кота');
	}
});


/*постановка кота в клетку поля*/

//ЖЕСТКИЙ ДЕБАГ в разделе выборки предметов под котом
$('.cage').on('click', function(){
	//если кот выбран
	if ($('.select').length == 0){
		return
	}
	var type = $('#tdType').val(),
	cat = $('.select'),
	
	cage = $(this);
	
	cat.removeClass('select');
	
	switch (type){
		case 'empty':
			cage.html('');
			break;
		case 'cat':
			var back = cat.css('backgroundImage');
			
			cat.css('backgroundImage','');

			cage.html('<div class="cage_items">'+cat.html()+'</div>');
			cat.css('backgroundImage', back);
			break;
		case 'object':
			cage.html('<div class="cage_items" style=\'background-image:'+cat.css('backgroundImage')+';\'></div>');
			break;
		case 'objectCat':
			cage.html('<div class="cage_items" style=\'background-image:'+cat.css('backgroundImage')+';\'>' + cat.html() + '</div>');
			break;
	}
});