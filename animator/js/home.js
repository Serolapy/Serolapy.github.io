/*
	Вкладка home
*/
 
 
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

