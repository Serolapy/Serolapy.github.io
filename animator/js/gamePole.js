function start(){
	$('a, input').click(function(e){
		e.preventDefault();
	});
	
	$(document).mousedown(function(e){
		if (e.which == 3 && confirm('Сделать скриншот?')){
			//гугл - это как смысл жизни
			
			//плавное перемещение вверх
			$('html, body').stop().animate({
				scrollTop: $('#app').offset().top
			}, 1);
			
			//получение даты и времени
			
			var date = new Date(),
				resDate = 'CW_Anim_St/' + date.getDate() + '/' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
				
			//скриншот
			html2canvas($('#app')[0]).then(canvas=>{
				var link = document.createElement("a");
				link.href = canvas.toDataURL('image/png');
				link.download = resDate + '.png';
				link.click();
			})
		}
	});
}

if(window.jQuery){
	start();
}else{
	console.log('Нет jQuery');
	setTimeout(start, 5000);
}

