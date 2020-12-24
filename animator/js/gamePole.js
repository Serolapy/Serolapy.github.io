document.addEventListener('DOMContentLoaded', function() {
	$('a, input').click(function(e){
		e.preventDefault();
	});
	alert('Загружено');
});
