/*
	ИТОГОВОЕ СОХРАНЕНИЕ ДАННЫХ

	- Квест
	- Предметы
	- Сбор типов и ид действий
	- Диалоги (добавить выделение жёлтым имени перса!)
	- Действия
	- Боты
	- Локации
*/
$('#save-saveButton').on('click', async function(){
	//открытие окна
	$('#save-logList').css('display', 'block');
	// TODO: очистка формы

	/*ОБЩИЕ ДАННЫЕ*/
	let data = questData['data'];
	switch ('') {
		case data.name:
			saveError('Неправильно введено название квеста.');
			return
		case data.description:
			saveError('Неправильно введено описание квеста.');
			return
	}
	if(data.authors.length == 0){
		saveError('Не указано ни одного автора.');
		return
	}
	for(let i = 0; i < data.authors.length; i++){
		let author = data.authors[i];
		if(!author.name){
			saveError('У автора №' + (i + 1) + ' не указано имя.');
			return
		}
		if(!author.id){
			saveError('У автора №' + (i + 1) + ' не указан ID.');
			return
		}
	}
	sectionSaved('quest');


	/*ПРЕДМЕТЫ*/
	let typeImage = $('input[name="items-typeEnterItems"]:checked').val(),
		items = $('#items-blockAddItems > table > tbody');
	if(typeImage === 'my'){
		let itemsList = [];
		//юзеровские предметы
		/*
			{
			'id':
			'name':
			'link':
			}
		*/
		for(let i = 0; i < items.length; i++){
			let tr = items.eq(i),
				link = tr.find('.items-itemLink').val();
			if(await checkImg(link, typeImage)){
				itemsList.push({
					'id': tr.find('.items-itemID').val(),
					'name': tr.find('.items-itemName').val(),
					'link': link
				});
			}
			//ДОБАВИТЬ В КВЕСТДАТА
		}
		questData.items.list = itemsList;
	}
	questData.items.type = typeImage;

	/*СБОР ИД ДЕЙСТВИЙ И ИХ ТИПОВ*/
	let dataSave = {
		'actionsId' : []
	}	//данные для работы только во время сборки

	let actionsIdsForm = $('#action-actionsList').children();
	for(let i = 0; i < actionsIdsForm.length; i++){
		let id = actionsIdsForm.eq(i).find('.action-actionID').val();
		if(id){
			dataSave.actionsId.push(id);
		} else {
			saveError('Произошла ошибка записи ID действий.');
			return
		}
	}

	/*ДИАЛОГИ -> РЕПЛИКИ*/
	/*	ворнинг:
		1. Сначала проверю тут правильность ввода ИД действий и соберу все ИД реплик и обращения к ним при выборе юзером "Тип действия":"Реплика..";
		2. Проверю введенные ИД реплик на их наличие
	*/
	let dialogs = questData.dialogs;
	for(let i = 0; i < dialogs.length; i++){
		let replicas = dialogs[i].replicas,	//реплики одного диалога
			replicasIdList = [],			//ид всех реплик диалога
			replysReplicasIdList = [];		//ид реплик, к которым обращаются через действия
		//(1)
		replysReplicasIdList.push(dialogs.replicaEnterId);	//реплика ввода
		for(let j = 0; j < replicas.length; j++){
			//у каждой реплики
			let replica = replicas[j];	//объект replica
			replicasIdList.push(replica.id);

			for(let k = 0; k < replica.reply.length; k++){
				let reply = replica.reply[k],
					typeAction = reply.typeAction,
					paramsAction = reply.paramsAction;
				switch (typeAction) {
					case 'action':
						if(dataSave.actionsId.indexOf(paramsAction) === -1){
							//такого ИД нет
							saveError(`Не найден ID действия ${paramsAction}`);
							return
						}
						//всё хорошо
						break;
					case 'replica':
						//запись к обращаемым ID
						replysReplicasIdList.push(paramsAction);
						break;
					case 'end':
						//выход из диалога
					default:
						saveError(`Тип действия не найден: <i>${typeAction}</i>`);
						return
				}
			}
		}

		//(2)
		//проверка ID реплик, к которым обращаются через действия
		for(let i = 0; i < replysReplicasIdList.length; i++){
			if(replicasIdList.indexOf(replysReplicasIdList[i]) === -1){
				//реплики не найдено
				saveError(`В диалоге ${dialogs.id} не найдена реплика ${replysReplicasIdList[i]}, к которой было произведено обращение`);
				return
			}
		}
	}

});

//ошибка юзера во время сборки
function saveError(text){
	console.log(text);
}

//отметки о выполненной проверке части данных
function sectionSaved(type){
	$(`#save-logList > li[data-type="${type}"]`).addClass('sectionSaved');
}

//проверка картинки на наличие
async function checkImg(link, typeImage){
	//typeImage == 'my' || 'catwar'
	if(typeImage == 'catwar'){
		link = `https://catwar.su/cw3/things/${link}.png`;
	}
    let img = await fetch(link);	//https://learn.javascript.ru/fetch
    return img.ok
}
