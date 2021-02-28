/*
	Основные функции
*/

//переключение по вкладкам
$('.btnPages').on('click', function () {
	$('.pages').css('display', 'none');
	$('#' + $(this).data('id')).css('display', 'block');
});
$('#app a, #app input').click(function(e){
	e.preventDefault();
});


//установка норм размера шапки
const height = 1600;									//высота изображения дефолт
const width = 300;										//ширина изображения дефолт

var windowWidth = parseFloat($("header").css('width')); //ширина хидера
$("header, header > table").css('height', windowWidth/height*width);	//магия


//Функция для таблиц с выборочным колвом строк
//на таблицу класс tbl_plus
//на + класс tbl_plus_add
//на - класс tbl_plus_remove
$('.tbl_plus_add').on('click', function(){
	var plus_btn = $(this);
	var table = $(this).parent().parent().parent().parent();
	var tbody = $(table + ' > tbody');
	//$('.tbl_plus_add').parent().parent().parent().parent().children().eq('0').html()
	
	var tr = '<tr><td><input type="text" class="' + (plus_btn.data('class')? plus_btn.data('class') : '') + '"></td><td><input type="button" value="-" class="tbl_plus_remove"></td></tr>';
	tbody.append(tr);
	
	$('.tbl_plus_remove').on('click', function(){
		var minus_btn = $(this);
		minus_btn.parent().parent().remove();
	});
});

//меню выбора действий в #app .cage
$('.cage').on('contextmenu', function(e){
	e.preventDefault();
	if($(this).hasClass('select_cage')){
		$('.select_cage').removeClass('select_cage');
		$('#cage_menu').css('display', 'none');
		return
		}
	$('.select_cage').removeClass('select_cage');
	$(this).addClass('select_cage');
	
	/*https://coderoad.ru/4909167/*/
	function mouseX(evt) {
		if (evt.pageX) {
			return evt.pageX;
		} else if (evt.clientX) {
		return evt.clientX + (document.documentElement.scrollLeft ?
			document.documentElement.scrollLeft :
			document.body.scrollLeft);
		} else {
			return null;
		}
	}
	
	function mouseY(evt) {
		if (evt.pageY) {
			return evt.pageY;
		} else if (evt.clientY) {
			return evt.clientY + (document.documentElement.scrollTop ?
			document.documentElement.scrollTop :
			document.body.scrollTop);
		} else {
			return null;
		}
	}
	/*end*/
	
	$('#cage_menu').css('top', mouseY(e)).css('left',mouseX(e)).css('display','block');
	$('body').on('click', function(){
		$('#cage_menu').css('display', 'none');
		$('body').off('click');
	});
});
//действия в #cage_menu
$('#cage_menu > a').on('click', function(e){
	e.preventDefault();
	if ($('.select_cage').length == 0){
		$('#cage_menu').css('display', 'none');
		console.error('Клетка в #app не выбрана, но кнопка нажата');
		return
	}
	var funct = $(this).data('function'),
		cage = $('.select_cage');
	
	switch(funct){
		case 'empty':
			cage.html('');
			$('#cage_menu').css('display', 'none');
			$('.select_cage').removeClass('select_cage');
			break;
			
		case 'arrow':
			$('#cage_menu').css('display', 'none');
			
			var cat_arrow = $('.select_cage .arrow'),
				preview_arrow = $('#arrowPreview');
			if(cat_arrow.length){
				//флажок СТРЕЛКА
				$('#arrow_menu_checkAdd').prop('checked',true);
				//угол поворота
				preview_arrow.css('transform','rotate('+ cat_arrow.attr('style').split('rotate(')[1].split(')')[0] +')');
				$('#arrow_menu_rotate').val(parseInt(cat_arrow.attr('style').split('rotate(')[1].split(')')[0]));
				//классы [цвет наконечника]
				preview_arrow.attr('class',cat_arrow.attr('class'));
				$("#arrow_menu_color").val(cat_arrow.attr('class').split(' ')[1]);
				//размеры стрелок
				var size = parseInt(parseInt($('.select_cage .d').css('background-size'))/2);;
					//зеленая часть стрелы
				$('#arrowPreview .arrow_green').css('width',parseInt(parseInt($('.select_cage .arrow_green').css('width'))*50/size) + 'px');
				$('#arrow_menu_energy').val(parseInt(parseInt($('.select_cage .arrow_green').css('width'))*100/size));
					//красная часть стрелы
				$('#arrowPreview .arrow_red').css('width',50-parseInt(parseInt($('.select_cage .arrow_green').css('width'))*50/size) + 'px');
				//успокаивание
				var opacity = $('.select_cage .arrow').css('opacity');
				$('#arrowPreview').css('opacity', opacity);
				$('#arrow_menu_checkOpacity').prop('checked',(opacity === '0.5' ? true:false))
			}else{
				$('#arrow_menu_checkAdd').prop('checked',false);
			}
			$('#arrow_menu').css('display','block');
			break;
	}	
});