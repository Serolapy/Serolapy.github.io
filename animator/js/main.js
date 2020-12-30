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