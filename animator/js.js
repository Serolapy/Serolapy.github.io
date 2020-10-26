import { cssNumber } from "jquery";

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
	let text = $('newMessText').val().replace($('#newMessName').val(), '<span class="myname">' + $('#newMessName').val() + '</span>');
	$('#chat_msg').prepend('<span><hr><table width="100%"><tbody><tr><td style="width: 90%"><span class="chat_text vlm' + $('#editVolume').val() + '"><span>' + text + '</span> - <b class="nick">' + $('#newMessCat').val() + '</b></span></td><td style="width: 10%"><a href="#">➝</a> | <a href="#" class="msg_report">X</a></td></tr></tbody></table></span>');
})

/*edit cats DATA!!!*/
function EdCdata(pol, name, job, smell, online) {
	var cName = '<u><a href="#">' + name + '</a></u><br>',
		cJob = '<small><i>' + job + '</i></small><br>',
		cSmell = (pol == 'der') ? 'Его' : 'Её' + 'запах:<br><img src="' + smell + '"><br>',
		cOnline = '[' + (online == 'online') ? '<font color="#006400">В игре</font>' : (online == 'offline') ? '<font color="#A52A2A">Спит</font>' : (online == 'wait') ? '<font color="#333333">Недавно ушёл</font>' : (online == 'delete') ? '<font color="#333366">На удалении</font>' : '<font color="#333366">Заблокирован</font>' + ']';
	return '<span class="cat_tooltip">' + cName + cJob + cSmell + cOnline + '</span>'
}
$('#previewcatBtn').on('click', function () {
	/*По нажатию на кнопку*/
	$('#previewDataCat').html(EdCdata($('catPOL').val(), $('#catName').val(), $('#catJob').val(), $('#catSmell').val(), $('#catOnline').val()));
})