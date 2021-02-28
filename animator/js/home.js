/*
	Вкладка home
*/
 

/*Изменение времени, неба и времени года; фона поля*/
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
$('#FonPolya').change(function(){
	let src = $('#FonPolya').val(),
		type = $('input[name=fonPolya]:checked').val();
	//type - тип, чтобы юзер сам выбрал, что ему ставить на фон - ссылку или картинку
	$('#cages_div').css('background', (type=='link')? ('url("'+src+'")') : src);
});

function SkyTimeSeasons() {
	$('#sky').css('background-image', 'url("https://catwar.su/cw3/sky/' + $('#editSky').val() + '.png")');
	$('#hour').html('<img src="https://catwar.su/cw3/symbole/hours/' + $('#editTime').val() + '.png">');
	$('#seasonPOLE').html('<img src="https://catwar.su/cw3/symbole/season' + $('#editSeason').val() + '.png">');
}
$('#editSky,#editTime,#editSeason').change(SkyTimeSeasons);	//при изменении значения в одном из полей

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
	
	//удаление событий по нажалию по ссылке
	$('.msg_report').on('click', function(e){
		e.preventDefault();
		$(this).parent().parent().parent().parent().parent().remove();
	});
});

/*стрелка*/
//синхронизация поле -> кот
function synchronCat(){
	if(!$('.select_cage .catWithArrow').length){
		//ежели клетка не выбрана или нет кота
		return
	}
	var cat_size = parseInt($('.select_cage .d').css('background-size'));
	//energy
		var value = $('#arrow_menu_energy').val();
		if(value<0){value = 0}
		else if(value>100){value = 100}
		$('.select_cage .arrow .arrow_green').css('width',parseInt(value*cat_size/200) + 'px');
		$('.select_cage .arrow .arrow_red').css('width',parseInt(cat_size/2) - parseInt(value*cat_size/200) + 'px');
	//rotate arrow
		$('.select_cage .arrow').css('transform','rotate('+$('#arrow_menu_rotate').val()+'deg');
	//arrow color
		$('.select_cage .arrow').attr('class', 'arrow ' + $('#arrow_menu_color').val());
	//opacity
		if($('#arrow_menu_checkOpacity').prop('checked')){
			//успокаивается
			$('.select_cage .arrow').css('opacity','0.5');
		}else{
			$('.select_cage .arrow').css('opacity','1');
		}
}
//energy
$('#arrow_menu_energy').change(function(){
    var value = $('#arrow_menu_energy').val();
    if(value<0){value = 0}
    else if(value>100){value = 100}
	$('#arrowPreview .arrow_green').css('width',parseInt(value/2) + 'px');
	$('#arrowPreview .arrow_red').css('width',50 - parseInt(value/2) + 'px');
});
//rotate arrow
$('#arrow_menu_rotate').change(function(){
    $('#arrowPreview').css('transform','rotate('+$(this).val()+'deg');
});
//arrow color
$('#arrow_menu_color').change(function(){
	$('#arrowPreview').attr('class', 'arrow ' + $('#arrow_menu_color').val());
});
//opacity
$('#arrow_menu_checkOpacity').change(function(){
	if($('#arrow_menu_checkOpacity').prop('checked')){
		//успокаивается
		$('#arrowPreview').css('opacity','0.5');
	}else{
		$('#arrowPreview').css('opacity','1');
	}
});
//arrow in cat
$('#arrow_menu_checkAdd').change(function(){
	if(!$('.select_cage .catWithArrow').length){
		//ежели клетка не выбрана или нет кота
		return
	}
	if(!$('#arrow_menu_checkAdd').prop('checked')){
		//убрать стрелу
		$('.select_cage .arrow').parent().remove();
	}
	else{
		//если кот есть, qwq
		if($('.select_cage .catWithArrow').children().length === 1){
			//стрелы нет
			var cat_size = parseInt($('.select_cage .d').css('background-size'));
			$('.select_cage .catWithArrow').prepend('<div style="position: relative;"><div class="arrow arrow-paws" style="top: '+ parseInt(1.5*cat_size/2) +'px;transform: rotate(0deg);opacity: 1;"><table style="border-collapse: collapse;width: '+ cat_size +'px;"><tbody><tr><td class="arrow_red" style="width: 0px;"></td><td class="arrow_green" style="width: '+ parseInt(cat_size/2) +'px;"></td><td class="arrow_empty" style="width: '+ parseInt(cat_size/2) +'px;"></td></tr></tbody></table></div></div>');
		}
		synchronCat();
	}
});
$('#arrow_menu_energy, #arrow_menu_rotate, #arrow_menu_color, #arrow_menu_checkOpacity').change(synchronCat);