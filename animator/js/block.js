if(false){
	$('body').html(`
		Мяу! Страничка временно закрыта по техническим причинам (пришёл Святой Кроль, намазал её на хлеб и съел).
Для получения дополнительной информации Вы можете обратиться к Серолапому в <a href="https://catwar.su/cat982738">CatWar</a> или в <a href="https://vk.com/serolapy">Вк</a>.
Анимационная Студия CatWar скоро вернётся, следите за обновлениями в тематической <a href="https://vk.com/serolapy">группе Вк</a>.
<a href="/">Главная</a>
		`);
	window.stop();
}
var versionBlock = 1
if(localStorage.getItem('CAS_block') != versionBlock){
	$('.scripts').remove();
	$('article, nav').html('');
	$('article').html(`
	Для того, чтобы продолжить пользоваться "Анимационнй студией CatWar", вы должны изучить, принять и соблюдать следующие правила:<br>
	<h3>Запрещается:</h3><br>
	>Создание при помощи этого сайт поддельных скриншотов диалогов, сообщений и прочее.<br>
	>Обман членов админо-модераторского состава, а так же людей, занимающих высокие положения в племени, при помощи этого сайта.<br>
	>Использование в личных целях неисправностей сайта (баги).<br>
	>Публикация скриншотов, картинок и прочих аудио-визуальных элементов сайта в открытых источниках <u>без указания автора сайта и/или его названия и/или ссылки на него.</u><br>
	<h3>Прочие правила</h3><br>
	>Все картинки и прочие элементы принадлежат <a href="https://catwar.su/cat982738">Серолапому</a> и/или администрации сайта catwar.su.<br>
	>На странице стоит сервис Яндекс.Метрики. Уведомляю вас, что "Яндекс не знает и не может знать, какая информация содержится в составе данных, записанных счётчиком на странице сайта".
	<input type="button" id="block" value="Я согласен(-a) и обязуюсь выполнять вышеизложенные правила">
	`);
	$('#block').click(function(){
		localStorage.setItem('CAS_block',versionBlock);
		location.reload();
	});
	
	window.stop();
}