function start(){
	$('a, input').click(function(e){
		e.preventDefault();
	});
	alert('Загружено');
}

if(window.jQuery){
	start();
}else{
	console.log('Нет jQuery');
	setTimeout(start, 5000);
}
