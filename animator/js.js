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
function FamilieGeschichteUndAndere() {
	$('#Mamapole').html($('#Mutter').val());
	$('#Papapole').html($('#Vater').val());
	$('#Bratosisterypole').html($('#MuttGeschwisterer').val());
}