/*
	вкладка lData
*/

/*изменение данных полей*/
function FamilieGeschichteUndAndere() {
	/*$(Murr).html($(Serolapy).val())*/
	$('#Mamapole').html($('#Mutter').val());
	$('#Papapole').html($('#Vater').val());
	$('#Bratosisterypole').html($('#MuttGeschwisterer').val());
	$('#ist').html($('#Cathistory').val());
	$('#location').html($('#catLocation').val());
}
$('#Mutter, #Vater, #MuttGeschwisterer, #Cathistory, #catLocation').change(FamilieGeschichteUndAndere);	//при изменении значения в одном из полей


/*изменение действий на поле*/
function deys(){
	var type = $('input[name=machen]:checked').val(),
		mess = $('#block_mess'),
		deys = $('#block_deys');
		
	if (type == 'machen'){
		deys.css('display','none');
		mess.css('display','block');
		
		mess.html($('#meinMachenText').val() + ($('#meinMachenCheckbox').prop('checked') ? ' <a href="#">Отменить</a>' : ''));
	}
	else{
		deys.css('display','block');
		mess.css('display','none');
		
		var machen = $('#'+type+'ID .select_machen'),
			dey = ''
		for(i=0;i<machen.length;i++){
			dey += '<a href="#"><img src="' + machen.eq(i).attr('src') + '"></a>';
		}
		$('#'+type).html(dey);
		if(type=='akten'){
			$('#akten').css('display','block');
			$('#dein').css('display','none');
		}else{
			$('#akten').css('display','none');
			$('#dein').css('display','block');
		}
		
		var mitMachen = $('#mitMachen').val().split(' '),
			options = '<option>Действия с собой</option>';
		for(j=0;j<mitMachen.length;j++){
			options += '<option>'+mitMachen[j]+'</option>';
		}
		$('#mit').html(options);
	}
}
/*выборка действий*/
//клик на изображения
$('.divMachen img').on('click',function(){
    $(this).toggleClass('select_machen');
	deys();
});
//поля ввода
$('input[name=machen], #meinMachenText, #mitMachen, #meinMachenCheckbox').change(deys);


/*параметры и навыки*/
function skills_update(){
	var skills = $('.skills-edit');
	
	for(i=0;i<skills.length;i++){
		var id = skills.eq(i).data('id'),
		//значение:
			value = (!$('.skills-edit:eq('+i+') input:eq(0)').val() || $('.skills-edit:eq('+i+') input:eq(0)').val() < 0 ? '150' : $('.skills-edit:eq('+i+') input:eq(0)').val()),
		//из...
			max = (!$('.skills-edit:eq('+i+') input:eq(1)').val() ||  $('.skills-edit:eq('+i+') input:eq(1)').val() === '0' || $('.skills-edit:eq('+i+') input:eq(1)').val() < 0 ? '150' : $('.skills-edit:eq('+i+') input:eq(1)').val()),
		//уровень навыка
			lvl =  (!($('.skills-edit:eq('+i+') input:eq(2)').val() === '') ? $('.skills-edit:eq('+i+') input:eq(2)').val() : '0');
		
		//изменение значений
		var result_value = (value * 150)/max,
			result_ostatok = 150 - result_value;
		//значение на поле
		if(value > max){
			value = max;
		}
		//значение
		$('#'+id+ ' .parameter td:eq(0)').css('width', result_value + 'px');
		//остаток
		$('#'+id+ '.parameter td:eq(1)').css('width', result_ostatok);
		//уровень
		if($('.skills-edit:eq('+i+')').hasClass('skills-edit-not')){
			$('#'+id+' tr> td:eq(3)').html('&nbsp;<b>'+lvl+'</b>');
		}
		
		if(lvl === '0' && $('.skills-edit:eq('+i+')').hasClass('skills-edit-not')){
			//если "0" в строке, которую разрешено скрыть
			$('#'+id + '_table').css('display','none');
		}
		else if($('.skills-edit:eq('+i+')').hasClass('skills-edit-not')){
			//иначе если значение не '0', но скрыть можно
			$('#'+id + '_table').css('display','block');
		}
	}
}
skills_update();
$('.skills-edit input').change(skills_update);
/*поставьте мне F, пожалуйста...*/