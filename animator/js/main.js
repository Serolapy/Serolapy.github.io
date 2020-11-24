const catwar = 'https://catwar.su';

/*вкладки*/
$('.btnPages').on('click', function () {
	$('.pages').css('display', 'none');
	$('#' + $(this).data('id')).css('display', 'block');
});
/*Выбор типажа клетки*/
$('#tdType').change(function(){
	let v = $(this).val(),
		cat = $('#editCat'),
		object = $('#editObjects');
	switch(v){
		case "empty":
			cat.css('display','none');
			object.css('display','none');
			break;
		case "cat":
			cat.css('display','block');
			object.css('display','none');
			break;
		case "object":
			cat.css('display','none');
			object.css('display','block');
			break;
		case "objectCat":
			cat.css('display','block');
			object.css('display','block');
			break;
	}
});

$('#editSky').change(function(){
	let s = $(this).val();
	$('#editSkyPreview').attr('src','https://catwar.su/cw3/sky/'+s+'.png');
});
$('#editTime').change(function(){
	let s = $(this).val();
	$('#editTimePreview').attr('src','https://catwar.su/cw3/symbole/hours/'+s+'.png');
});
$('#editSeason').change(function(){
	let s = $(this).val();
	$('#editSeasonPreview').attr('src','https://catwar.su/cw3/symbole/season'+s+'.png');
});

function SkyTimeSeasons() {
	$('#sky').css('background-image', 'url("https://catwar.su/cw3/sky/' + $('#editSky').val() + '.png")');
	$('#hour').html('<img src="https://catwar.su/cw3/symbole/hours/' + $('#editTime').val() + '.png">');
	$('a[href="/time"]').eq(1).html('<img src="https://catwar.su/cw3/symbole/season' + $('#editSeason').val() + '.png">');
}
$('#editSky,#editTime,#editSeason').change(SkyTimeSeasons);

/*изменение данных полей*/
function FamilieGeschichteUndAndere() {
	/*$(Murr).html($(Serolapy).val())*/
	$('#Mamapole').html($('#Mutter').val());
	$('#Papapole').html($('#Vater').val());
	$('#Bratosisterypole').html($('#MuttGeschwisterer').val());
	$('#ist').html($('#Cathistory').val());
	$('#location').html($('#catLocation').val());
}
$('#Mutter, #Vater, #MuttGeschwisterer, #Cathistory, #catLocation').change(FamilieGeschichteUndAndere);

/*Отправка сообщений*/
$('#newMessBtn').on('click', function () {
	//text = $('newMessText').val().replace($('#newMessName').val(), '<span class="myname">' + $('#newMessName').val() + '</span>');
	var t = $('#newMessText').val().split(' '),
		text = '';
	for (var _ in t) {
		text += t[_].replace($('#newMessName').val(), '<span class="myname">' + $('#newMessName').val() + '</span>');
		text += ' ';
	}
	$('#chat_msg').prepend('<span><hr><table width="100%"><tbody><tr><td style="width: 90%"><span class="chat_text vlm' + $('#editVolume').val() + '"><span>' + text + '</span> - <b class="nick">' + $('#newMessCat').val() + '</b></span></td><td style="width: 10%"><a href="#">➝</a> | <a href="#" class="msg_report">X</a></td></tr></tbody></table></span>');
});

/*edit cats DATA!!!*/
function EdCdata(pol, name, job, smell, online) {
	var cName = '<u><a href="#">' + name + '</a></u><br>',
		cJob = '<small><i>' + job + '</i></small><br>',
		cSmell = (pol == 'der') ? 'Его ' : 'Её ' + 'запах:<br><img src="' + smell + '"><br>',
		cOnline = '[';
	switch (online) {
		case 'online':
			cOnline += '<font color="#006400">В игре</font>';
			break;
		case 'offline':
			cOnline += '<font color="#A52A2A">Спит</font>';
			break;
		case 'wait':
			cOnline += '<font color="#333333">Недавно ушёл</font>' ;
			break;
		case 'delete':
			cOnline += '<font color="#333366">На удалении</font>';
			break;
		case 'block':
			cOnline += '<font color="#333366">Заблокирован' + (pol == 'der') ? '' : 'а' + '</font>';
			break;
	}
	cOnline += ']';
	return '<span class="cat_tooltip" style="display:block;z - index: 9999;padding: 5px; min - width: 80px; background: RGBA(255, 255, 255, 0.9); border: 1px solid gray; border - radius: 6px; color: #930; font - weight: bold; text - align: center;" >' + cName + cJob + cSmell + cOnline + '</span>'
}
$('#previewcatBtn').on('click', function () {
	/*По нажатию на кнопку*/
	$('#previewDataCat').html(EdCdata($('#catPOL').val(), $('#catName').val(), $('#catJob').val(), $('#catSmell').val(), $('#catOnline').val()));
});

/*костюмы и предметы*/
function idCostumeItem(e,a) {
	$('#id'+a).html(e.attr('src'))
}
$('#btnIdCostume').on('click', function () {
	var t = '';
	for (i = 1; i <= 5000; i++) {
		t += '<img src="https://catwar.su/cw3/cats/0/costume/' + i + '.png" onclick="idCostumeItem($(this), \'Costume\')">';
	}
	$('#allCostume').html(t);
});
$('#btnIdItem').on('click', function () {
	var t = '';
	for (i = 1; i <= 5000; i++) {
		t += '<img src="https://catwar.su/cw3/things/' + i + '.png" onclick="idCostumeItem($(this), \'Item\')">';
	}
	$('#allItem').html(t);
});

/*создание кота*/
function addCat(pol, name, job, smell, online, color, costume, size, items) {

	//
	// кот
	//

	var cat = '';
	/*костюмы и дефекты*/
	for (i = 0; i < costume.length; i++) {
		cat += '<div style="background-image:url(\'' + catwar + costume[i]+'\');background-size:' + size + '; position: absolute;"></div>';
	}
	/*окрас*/
	cat += '<div style="background-image:url(\'' + catwar + color + '\');background-size:' + size + ';" class="d">';

	//
	//сведения
	//

	var dataCat = '',
		cName = '<u><a href="#">' + name + '</a></u><br>',
		cJob = '<small><i>' + job + '</i></small><br>',
		cSmell = (pol == 'der') ? 'Его ' : 'Её ' + 'запах:<br><img src="' + smell + '"><br>',
		cOnline = '[';
	switch (online) {
		case 'online':
			cOnline += '<font color="#006400">В игре</font>';
			break;
		case 'offline':
			cOnline += '<font color="#A52A2A">Спит</font>';
			break;
		case 'wait':
			cOnline += '<font color="#333333">Недавно ' + (pol == 'der') ? 'ушёл' : 'ушла'+'</font>';
			break;
		case 'delete':
			cOnline += '<font color="#333366">На удалении</font>';
			break;
		case 'block':
			cOnline += '<font color="#333366">Заблокирован' + (pol == 'der') ? '' : 'а' + '</font>';
			break;
	}
	cOnline += ']';
	dataCat = '<span class="cat_tooltip" style="display:block;z - index: 9999;padding: 5px; min - width: 80px; background: RGBA(255, 255, 255, 0.9); border: 1px solid gray; border - radius: 6px; color: #930; font - weight: bold; text - align: center;" >' + cName + cJob + cSmell + cOnline + '</span>';

	//
	//сборка кота и данных
	//

	var CatAndData = '<span class="catWithArrow"><span class="cat">' + cat + dataCat + '</span></span>';

	//
	//предметы в клетке
	//

	var allItems = (items.length > 0) ? 'background: ' : '';
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
		allItems += 'url("' + items[i] + '") ' + a + ' no-repeat' + (i == items.length - 1) ? ';' : ',';
	}

	//
	//клетка
	//

	var td = '<div class="cage_items" style="' + allItems + '">' + CatAndData + '</div>';
	return td
	//великий Хлебушек во тьме, помоги мне...
}
$('#previewcatBtn').on('click', function () {
	/*По нажатию на кнопку*/
	$('#previewDataCat').html(addCat(
		$('#catPOL').val(),
		$('#catName').val(),
		$('#catJob').val(),
		$('#catSmell').val(),
		$('#catOnline').val(),
		$('#catColor').val(),
		Number($('#catSize').val()),
		''
	));
});
