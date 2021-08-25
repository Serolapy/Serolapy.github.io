//считывание данных с полей форм

//select`ы действий
const actionsOption = `<option value="teleport">Переход на другую локацию</option>
<option value="dialog" selected>Начать диалог</option>
<option value="addItem">Выдать предмет</option>
<option value="removeItem">Забрать предмет</option>`;
//всё, что связано с данными полей

var questData = {
	'data': {
		'name': 'Очень крутое название',
		'description': 'Очень крутое описание',
		'authors': []
	},
	'locations': [],		//локации
	'bots': [],				//боты
	'dialogs': [],			//диалоги
	'moves': [],			//переходы
	'actions': [],			//действия
	'hauptSpieler': {},		//главный герой
	'items': {				//предметы
		'type': 'catwar',
		'list': []
	}
}

/*
	ВКЛАДКА "КВЕСТ"
*/
//добавление строк авторов
$('#quest-addAuthorBtn').on('click', function(){
	$('#authors').append('<tr><td><input type="text" class="quest-nameAuthor"></td><td><input type="number" class="quest-idAuthor"></td><td><input type="button" class="quest-removeAuthor btnAddRemove" value="-"></td></tr>');

	$('.quest-removeAuthor').off('click');
	$('.quest-removeAuthor').on('click', function(){
		$(this).parents().eq(1).remove();
	});
});

/*
	ВКЛАДКА "ЛОКАЦИИ"
*/
//открыть блок локаций
$('#location-create-new').on('click', function(){
	$('#location-create-new').css('display', 'none');
	$('#location-create-createBlock').css('display', 'block');

	$('#location-create-idLocation').val(generationID(questData.locations));
});

/*
	ВКЛАДКА "БОТЫ"
*/
//открыть блок создания ботов
$('#bots-create-new').on('click', function(){
	$('#bots-create-new').css('display', 'none');
	$('#bots-create-createBlock').css('display', 'block');

	$('#bots-create-idBot').val(generationID(questData.bots));
});

/*
	ВКЛАДКА "ДЕЙСТВИЯ"
*/
//добавить действие
$('#action-addAction').on('click', function(){
	//генерация id
	let id = generationID(questData.actions);
	$('#action-actionsList').append(`
		<tr>
			<td>
				<input class="action-actionID input-id" type="text" readonly value="${id}">
			</td>
			<td>
				<select class="action-selectTypeAction">${actionsOption}</select>
			</td>
			<td class="action-params">
				<ul>
					<li>ID диалога: <input type="text" placeholder="#00000" class="input-id"></li>
				</ul>
			</td>
			<td>
				<input class="action-removeAction btnAddRemove" value="-" type="button">
			</td>
		</tr>
	`);

	//выбор параметров для действий
	//$('.action-selectTypeAction').off('change');
	$('.action-selectTypeAction').change(function(){
		let actionType = $(this).val(),
			params = '<ul>';

		switch (actionType) {
			//диалог
			case 'dialog':
				params += `<li>ID диалога: <input type="text" placeholder="#00000" class="input-id"></li>`;
				break;
			//телепорт
			case 'teleport':
				params += `<li>ID локации: <input type="text" placeholder="#00000" class="input-id"></li>
							<li>Время перехода, сек: <input type="number" placeholder="45" value="45"></li>`;
				break;
			//выдать предмет
			case 'addItem':
				params += `<li>ID предметов: <input type="text" placeholder="#00000 "#00001..."></li>`;
				break;
			//забрать предмет
			case 'removeItem':
				params += `<li>ID предметов: <input type="text" placeholder="#00000 "#00001..."></li>`;
				break;

			default:
				systemError(`Неизвестный тип действия {${actionType}}. Пожалуйста, отправьте скриншот этой ошибки <a href="https://catwar.su/cat982738">Серолапому</a> в ЛС.`)
		}
		params += '</ul>';
		$(this).parents().eq(1).children().eq(2).html(params);


	});

	//удалие действий
	$('.action-removeAction').off('click');
	$('.action-removeAction').on('click', function(){
		$(this).parents().eq(1).remove();
	});
});

/*
	ПРЕДМЕТЫ
*/
//открытие блока добавления предметов вручную
$('input[name=items-typeEnterItems]').change(function(){
	if($(this).val() == 'my'){
		$('#items-blockAddItems').css('display', 'block');
	} else{
		$('#items-blockAddItems').css('display', 'none');
	}
});
//кнопка добавления предметов
$('#items-addItem').on('click', function(){
	let id = generationID(questData.items.list);

	$('#items-blockAddItems tbody').append(`
		<tr>
			<td><input type="text" class="items-itemID input-id" value="${id}" readonly></td>
			<td><input type="text" class="items-itemName" placeholder="Ветка"></td>
			<td><input type="text" class="items-itemLink" placeholder="https://catwar.su/img.png"></td>
			<td><input type="button" class="items-checkItemLink" value="Не проверено"></td>
			<td><input type="button" class="items-removeItem btnAddRemove" value="-"></td>
		</tr>
	`);

	//удаление предмета
	$('.items-removeItem').off('click');
	$('.items-removeItem').on('click', function(){
		$(this).parents().eq(1).remove();
	});

	//проверка ссылок
	$('.items-checkItemLink').off('click');
	$('.items-checkItemLink').on('click', function(){
		let btn = $(this),
			link = btn.parents(1).children().eq(3).children().eq(0).val();
		//если ссылки нет
		if(link == ''){
			btn.val('Ссылки нет');
			setTimeout(function(){
				btn.val('Не проверено');
			}, 3000);
			return
		}

		try{
			$.get(link, function(){
				btn.val('Работает!');
			}).fail(function(){
				btn.val('Не работает!!!');
			});
		} catch{}
	});
	//обнуление показателя, если сменена ссылка
	$('.items-itemLink').change(function(){
		$(this).children().eq(4).children().eq(0).val('Не проверено')
	});
});

/*
	ДИАЛОГИ
*/
var dialogReplicasId = [];	//переменная, хранящая id реплик в текущем диалоге

//открытие
$('#dialogs-create-new').on('click', function(){
	$(this).css('display', 'none');
	$('#dialogs-create-dialogID').val(generationID(questData.dialogs));
	$('#dialog-create-createBlock').css('display', 'block');
});
//создание новой реплики
$('#dialogs-create-replicas-addReplica').on('click', function(){
	let replicaId = generationID(dialogReplicasId);
	dialogReplicasId.push({id : replicaId});	/*запись в переменную ID новой реплики;
												формат {id : replicaId} для generationID()*/

	$('#replicas').append(`<div class="replica">
		<table>
			<thead>
				<tr>
					<td colspan="2">Реплика <input type="text" class="dialogs-create-replicas-replicaID input-id" readonly value="${replicaId}"></td>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Имя бота</td>
					<td><input type="text" class="dialogs-create-replicas-replicaNameBot"></td>
				</tr>
				<tr>
					<td>Текст реплики</td>
					<td><input type="text" class="dialogs-create-replicas-replicaText"></td>
				</tr>
			</tbody>
		</table>
		<table>
			<thead>
				<tr>
					<td colspan="4">Ответы игрока</td>
				</tr>
				<tr>
					<td rowspan="2" width="229px">Текст игрока</td>
					<td colspan="2" width="310px">Действия при выборе</td>
					<td rowspan="2">Параметры</td>
				</tr>
				<tr>
					<td width="216px">Тип</td>
					<td>ID</td>
				</tr>
			</thead>
			<tbody class="dialogs-create-replicas-userReplys"></tbody>
			<tfoot>
				<tr>
					<td colspan="4"><input type="button" value="Добавить" class="dialogs-create-replicas-addUserReply"></td>
				</tr>
			</tfoot>
		</table>
		<input type="button" value="Удалить реплику" class="dialogs-create-replicas-removeReplica">
	</div>`);
	//удаление реплики
	$('.dialogs-create-replicas-removeReplica').off('click');
	$('.dialogs-create-replicas-removeReplica').on('click', function(){
		$(this).parent().remove();
	});
	//строчки выбора ответа
	$('.dialogs-create-replicas-addUserReply').off('click');
	$('.dialogs-create-replicas-addUserReply').on('click', function(){
		$(this).parents().eq(3).children().eq(1).append(`
			<tr>
				<td><input type="text" class="dialogs-create-replicas-text" placeholder="Слова игрока"></td>
				<td>
					<select class="dialogs-create-replicas-typeAction">
						<option value="replica" selected>Реплика..</option>
						<option value="action">Действие</option>
						<option value="end">Закончить диалог</option>
					</select>
				</td>
				<td>
					<input type="text" class="dialogs-create-replicas-actionId input-id" placeholder="#00000">
				</td>
				<td>
					<input type="button" value="-" class="dialogs-create-replicas-removeRepli btnAddRemove">
				</td>
			</tr>
		`);
		//удаление строк
		$('.dialogs-create-replicas-removeRepli').off('click');
		$('.dialogs-create-replicas-removeRepli').on('click', function(){
			$(this).parents().eq(1).remove();
		});
		//блокировка input с ID при выборе "Конец диалога"
		$('.dialogs-create-replicas-typeAction').change(function(){
			let input = $(this).parents().eq(1).children().eq(2).children().eq(0);
			switch ($(this).val()) {
				case 'end':
					input.attr('disabled', 'disabled');
					break;
				default:
					input.removeAttr('disabled')
			}
		});
	});
});

/*
	ЗАПИСЬ ДАННЫХ
*/
/*квест*/
$('#quest-nameQuest').change(function(){
	if($(this).val() == ''){
		systemError('Название не сохранено');
		questData.data.name = '';
		return
	}
	questData.data.name = $(this).val();
});
$('#quest-descriptionQuest').change(function(){
	if($(this).val() == ''){
		systemError('Описание не сохранено');
		questData.data.description = '';
		return
	}
	questData.data.description = $(this).val();
});
$('#quest-saveAuthors').on('click', function(){
	let authors = $('#authors').children(),
		allAuthorsSaved = true;

	//если авторов нет - ошибка
	if(!authors.length){
		systemError('Авторов нет');
		return
	}
	for(let i = 0; i < authors.length; i++){
		let name = $('.quest-nameAuthor').eq(i).val(),
			id = $('.quest-idAuthor').eq(i).val();
		if(!(name && id)){
			allAuthorsSaved = false;
			continue
		}
		questData.data.authors.push({
			'name': name,
			'id': id
		});
	}

	if(!allAuthorsSaved){
		systemError('Сохранены не все авторы')
	}
});
/*диалоги*/
$('#dialogs-create-saveDialog').on('click', function(){
	//заполнены не все поля
	if(	$('#dialogs-create-dialogID').val() === '' ||
		$('#dialogs-create-dialogName').val() === '' ||
		$('#dialogs-create-replicaEnterId').val() === ''
	){
		systemError('Заполенены не все поля! Не сохранено');
		return
	}
	//нет реплик
	if($('.replica').length === 0){
		systemError('Добавьте хотя бы 1 реплику. Не сохранено');
		return
	}

	let replicas = [],				//массив с репликами
		checkRelicaEnter = false;	//проверка поля "реплика ввода"
	for(let i = 0; i < $('.replica').length; i++){
		let r = $('.replica').eq(i);

		if(r.find('.dialogs-create-replicas-replicaID').val() == $('#dialogs-create-replicaEnterId').val()){
			//реплика ввода найдена
			checkRelicaEnter = true;
		}

		//проверка на ввод всех полей реплики
		let id = r.find('.dialogs-create-replicas-replicaID').val(),
			botName = r.find('.dialogs-create-replicas-replicaNameBot').val(),
			botText = r.find('.dialogs-create-replicas-replicaText').val(),
			reply = [];

		//ответы игрока
		for(let j = 0; j < r.find('.dialogs-create-replicas-userReplys').children().length; j++){
			let repl = r.find('.dialogs-create-replicas-userReplys').children().eq(j),
				textPlayer = repl.find('.dialogs-create-replicas-text').val(),
				typeAction = repl.find('.dialogs-create-replicas-typeAction').val(),
				paramsAction = repl.find('.dialogs-create-replicas-actionId').val();

			if(	textPlayer === '' ||
				typeAction != 'end' && paramsAction === ''
			){
				systemError('Введены не все данные в ответах игрока в реплике ' + id + '. Не сохранено');
				return
			}

			reply.push({
				textPlayer : textPlayer,
				typeAction : typeAction,
				paramsAction : paramsAction
			});
		}
		//нет ответов игрока
		if(!reply.length){
			systemError('Добавьте хотя бы 1 ответ игрока в реплике ' + id + '. Не сохранено');
			return
		}
		//проверка на введённые данные
		if(
			botName == '' ||
			botText == ''
		){
			systemError('Введены не все данные в реплике ' + id + '. Не сохранено');
			return
		}
		replicas.push(new replica(
			id,
			reply,
			botName
		));
	}
	//нет реплики ввода
	if(!checkRelicaEnter){
		systemError('Неправильно введено ID реплики ввода. Не сохранено');
		return
	}

	//если всё норм
	questData.dialogs.push(new dialog(
		$('#dialogs-create-dialogID').val(),
		$('#dialogs-create-dialogName').val(),
		$('#dialogs-create-replicaEnterId').val(),
		replicas
	));

	updateDialogsList();
});

/*
	ОБНОВЛЕНИЕ ЛИСТОВ
*/
//диалоги
function updateDialogsList(){
	console.log(questData.dialogs);
}
