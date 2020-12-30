/*
	костюмы и предметы,
	коллекции предметов и костюмов
*/

/*функция, которая вставляет всё в нужные места*/
function idCostumeItem(e,a) {
	$('#id'+a).html(e.attr('src'))
}

const 	COSTUME = 5000,	//сколько генерировать костюмов
		ITEMS = 5000;	//сколько генерировать предметов
/*генерация картинок*/
//костюмы
$('#btnIdCostume').on('click', function () {
	var t = '';
	for (i = 1; i <= COSTUME; i++) {
		t += '<img src="https://catwar.su/cw3/cats/0/costume/' + i + '.png" onclick="idCostumeItem($(this), \'Costume\')">';
	}
	$('#allCostume').html(t);
});
//предметы
$('#btnIdItem').on('click', function () {
	var t = '';
	for (i = 1; i <= ITEMS; i++) {
		t += '<img src="https://catwar.su/cw3/things/' + i + '.png" onclick="idCostumeItem($(this), \'Item\')">';
	}
	$('#allItem').html(t);
});
