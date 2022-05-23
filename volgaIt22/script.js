const glassesQuizWidget_imgUrl = 'img/';
;(function() {
	/*
		Создание наполнение виджета
	*/
	glassesQuizWidgetPage(0);
	
})();
var glassesQuizWidget_answers = {},
	glassesQuizWidget_backPageNums = [0];
	
function glassesQuizWidget_backPage(){
	//выводит предпоследнюю страницу и удаляет последнюю из списка
	glassesQuizWidget_backPageNums.pop()
	return glassesQuizWidget_backPageNums[glassesQuizWidget_backPageNums.length - 1]
}

function glassesQuizWidget_SetRes(key, val){
	glassesQuizWidget_answers[key] = val;
	console.log(glassesQuizWidget_answers);
}

function glassesQuizWidgetPage(number){
	/* 	number - номер новой страницы;
	 */

	//генерация нестандартных страниц
	if(number == 0){
		//очистка истории
		glassesQuizWidget_backPageNums = [0];
		ReactDOM.render((
			<>
				<div className="glasses-quiz-widget-header_mobile glasses-quiz-widget-header">
					<a className="glasses-quiz-widget-mobile_logo" href="#" />
					<a className="glasses-quiz-widget-mobile_arrowRight" href="#" onClick={function(){glassesQuizWidgetPage(1)}}>
						<img src={glassesQuizWidget_imgUrl + "arrow_right.svg"} alt="Next Page" />
					</a>
				</div>
				<div id="glasses-quiz-widget-body">
					<div className="glasses-quiz-widget-body-content_mobile">
						<img
							src={glassesQuizWidget_imgUrl + "mobile.svg"}
							alt="OPTIMAX DEV"
							className="glasses-quiz-widget-body-content_mobile-img"
						/>
						<span className="glasses-quiz-widget-body-content_mobile-h1">
							Let’s find your perfect pair!
						</span>
						<span className="glasses-quiz-widget-body-content_mobile-text">
							Take the quiz to easily discover your perfect fit from thousands of styles
						</span>
						<button className="glasses-quiz-widget-body-content_mobile-button" onClick={function(){glassesQuizWidgetPage(1,0)}}>
							Start Now
						</button>
					</div>
				</div>
			</>
		), document.getElementById('glasses-quiz-widget'));
		return
	}
	else if(number == 11){
		ReactDOM.render((
			<>
				<div className="glasses-quiz-widget-header">
					<a className="glasses-quiz-widget-11_logo" href="#" />
					<a className="glasses-quiz-widget-header-x" href="#"  onClick={function(){glassesQuizWidgetPage(0)}}>
						<img src={glassesQuizWidget_imgUrl + "x.svg"} alt="Start Page" />
					</a>
					<div className="glasses-quiz-widget-header-statusBar">
						<span
							className="glasses-quiz-widget-header-statusBar-action"
							style={{ left: 0 }}
						/>
					</div>
				</div>
				<div className="glasses-quiz-widget-body">
					<div className="glasses-quiz-widget-body_11">
						<div className="glasses-quiz-widget-body_11-img">
							<div>
								<img src={glassesQuizWidget_imgUrl + "present.png"} alt="Present" />
							</div>
						</div>
						<h2>We've found some awesome frames for you!</h2>
						<span className="glasses-quiz-widget-body_11-text">
							Send the results to your email to receive
							<br />
							special discounts.
						</span>
						<button className="glasses-quiz-widget-body-content_mobile-button" onClick={function(){
							let url = document.getElementById('glasses-quiz-widget').dataset.source + '?',
								keys = Object.keys(glassesQuizWidget_answers);
							for (let i = 0; i < keys.length; i++){
								let answer = glassesQuizWidget_answers[keys[i]];
								if (answer){
									if (url != document.getElementById('glasses-quiz-widget').dataset.source + '?') {
										//нет еще ответов
										url += '&';
									}
									url += `${keys[i]}=${answer}`;
								}
							}
							console.log('URL: '+url);
						}}>
							Send
						</button>
						<span className="glasses-quiz-widget-body_11-policy">
							By clicking ‘Send’ you agree to our Terms of Use &amp;
							<br />
							Privacy Policy and receiving promotion emails
						</span>
					</div>
				</div>
			</>

		), document.getElementById('glasses-quiz-widget'));
		return
	}
	
	//номера некоторых страниц зависят от предыдущих ответов
	if(number == 5){
		if(glassesQuizWidget_answers['eyewear_type'] == 211){
			number = '5s';
		} else{
			number = '5e';
		}
	}
	else if(number == 6){
		if(glassesQuizWidget_answers['gender'] == 4){
			number = '6m';
		} else if (glassesQuizWidget_answers['gender'] == 5){
			number = '6w';
		} else{
			number = '6b'
		}
	}
	
	let body, header, Comp, questKey;
	//устанока этих переменных ^ в зависимости от номера страницы
	switch(number){
		case 1:
			questKey = 'gender';
			header = <Header number="1/10" statusBar="-93.3%"/>;
			body = (
				<div className="glasses-quiz-widget-body">
					<div className="glasses-quiz-widget-body-question">
						<div className="glasses-quiz-widget-body-question-text">
							You are looking for
						</div>
						<div
							className="glasses-quiz-widget-body-question-buttons glasses-quiz-widget-body-question-buttons_h138"
							style={{ marginTop: 24 }}
						>
							<div className="glasses-quiz-widget-body-question-buttons-button" onClick={function(){glassesQuizWidget_SetRes('gender', 5); glassesQuizWidgetPage('2w');}}>
								<div className="glasses-quiz-widget-body-question-buttons-button-content">
									<img
										src={glassesQuizWidget_imgUrl + "Women.svg"}
										alt="Women's Styles"
										style={{ marginBottom: 16 }}
									/>
									<br />
									Women's Styles
								</div>
							</div>
							<div className="glasses-quiz-widget-body-question-buttons-button" onClick={function(){glassesQuizWidget_SetRes('gender', 4); glassesQuizWidgetPage('2m');} }>
								<div className="glasses-quiz-widget-body-question-buttons-button-content">
									<img
										src={glassesQuizWidget_imgUrl + "Men.svg"}
										alt="Men's Styles"
										style={{ marginBottom: 13 }}
									/>
									<br />
									Men's Styles
								</div>
							</div>
						</div>
					</div>
					<a className="glasses-quiz-widget-body-skip" href="#" onClick={function(){glassesQuizWidget_SetRes('gender', ''); glassesQuizWidgetPage('2m');} }>
						I'd like to see both
					</a>
				</div>
			);
			break;
		//страница 2
		case '2m':
			questKey = 'eyewear_type';
			header = <Header number="2/10" statusBar="-82.66%"/>;
			body = (
				<div className="glasses-quiz-widget-body">
					<div className="glasses-quiz-widget-body-question">
						<div className="glasses-quiz-widget-body-question-text">
							What type of glasses are
							<br />
							you looking for?
						</div>
						<div className="glasses-quiz-widget-body-question-buttons glasses-quiz-widget-body-question-buttons_h138">
							<div className="glasses-quiz-widget-body-question-buttons-button" onClick={function(){glassesQuizWidget_SetRes('eyewear_type', 210); glassesQuizWidgetPage('2b');}}>
								<div className="glasses-quiz-widget-body-question-buttons-button-content">
									<img src={glassesQuizWidget_imgUrl + "2m1.svg"} alt="Eyeglasses" />
									<br />
									Eyeglasses
								</div>
							</div>
							<div className="glasses-quiz-widget-body-question-buttons-button" onClick={function(){glassesQuizWidget_SetRes('eyewear_type', 211); glassesQuizWidgetPage('2b');}}>
								<div className="glasses-quiz-widget-body-question-buttons-button-content">
									<img src={glassesQuizWidget_imgUrl + "2m2.svg"} alt="Sunglasses" />
									<br />
									Sunglasses
								</div>
							</div>
						</div>
					</div>
					<a className="glasses-quiz-widget-body-skip" href="#" onClick={function(){glassesQuizWidget_SetRes('eyewear_type', ''); glassesQuizWidgetPage('2b');}}>
						I want to see both
					</a>
				</div>
			);
			break;
		case '2w':
			questKey = 'eyewear_type';
			header = <Header number="2/10" statusBar="-82.66%"/>;
			body = (
				<div className="glasses-quiz-widget-body">
					<div className="glasses-quiz-widget-body-question">
						<div className="glasses-quiz-widget-body-question-text">
							What type of glasses are
							<br />
							you looking for?
						</div>
						<div className="glasses-quiz-widget-body-question-buttons glasses-quiz-widget-body-question-buttons_h138">
							<div className="glasses-quiz-widget-body-question-buttons-button" onClick={function(){glassesQuizWidget_SetRes('eyewear_type', 210); glassesQuizWidgetPage('2b');}}>
								<div className="glasses-quiz-widget-body-question-buttons-button-content">
									<img src={glassesQuizWidget_imgUrl + "2w1.svg"} alt="Eyeglasses" />
									<br />
									Eyeglasses
								</div>
							</div>
							<div className="glasses-quiz-widget-body-question-buttons-button" onClick={function(){glassesQuizWidget_SetRes('eyewear_type', 211); glassesQuizWidgetPage('2b');}}>
								<div className="glasses-quiz-widget-body-question-buttons-button-content">
									<img src={glassesQuizWidget_imgUrl + "2w2.svg"} alt="Sunglasses" />
									<br />
									Sunglasses
								</div>
							</div>
						</div>
					</div>
					<a className="glasses-quiz-widget-body-skip" href="#" onClick={function(){glassesQuizWidget_SetRes('eyewear_type', ''); glassesQuizWidgetPage('2b');}}>
						I want to see both
					</a>
				</div>
			);
			break;
		//страница 3
		case '2b':
			header = <Header number="2/10" statusBar="-82.66%"/>;
			body = (
				<div className="glasses-quiz-widget-body">
					<div className="glasses-quiz-widget-body_between">
						<div className="glasses-quiz-widget-body_between-img">
							<div>
								<img src={glassesQuizWidget_imgUrl + "like.svg"} alt="Like" />
							</div>
						</div>
						<h2>Let's get to know you!</h2>
					</div>
				</div>
			);
			setTimeout(glassesQuizWidgetPage, 2000, '3.1');
			break;

		case '3.1':
			header = <Header number="3/10" statusBar="-72%"/>
			body = (
				<div className="glasses-quiz-widget-body">
					<div className="glasses-quiz-widget-body-question">
						<div className="glasses-quiz-widget-body-question-text">
							Do you need vision correction?
						</div>
						<div className="glasses-quiz-widget-body-question-buttons glasses-quiz-widget-body-question-buttons_h120">
							<div className="glasses-quiz-widget-body-question-buttons-button" onClick={function(){glassesQuizWidgetPage('3.2');}}>
								<div className="glasses-quiz-widget-body-question-buttons-button-content">
									Yes
								</div>
							</div>
							<div className="glasses-quiz-widget-body-question-buttons-button" onClick={function(){glassesQuizWidgetPage('4.1');}}>
								<div className="glasses-quiz-widget-body-question-buttons-button-content">
									No
								</div>
							</div>
						</div>
					</div>
					<a className="glasses-quiz-widget-body-skip" href="#" onClick={function(){glassesQuizWidgetPage('4.1');}}>
						Skip
					</a>
				</div>
			);
			break;
		case '3.2':
			questKey = 'lenstype';
			header = <Header number="3/10" statusBar="-72%"/>
			body = (
				<div className="glasses-quiz-widget-body">
					<div className="glasses-quiz-widget-body-question">
						<div className="glasses-quiz-widget-body-question-text">
							What do you need your glasses for?
						</div>
						<div
							className="glasses-quiz-widget-body-question-buttons glasses-quiz-widget-body-question-buttons_32"
							style={{ marginTop: 23 }}
						>
							<div className="glasses-quiz-widget-body-question-buttons-button" onClick={function(){glassesQuizWidget_SetRes('lenstype', 6); glassesQuizWidgetPage('4.1');}}>
								<div className="glasses-quiz-widget-body-question-buttons-button-content">
									Near Vision
								</div>
							</div>
							<div className="glasses-quiz-widget-body-question-buttons-button" onClick={function(){glassesQuizWidget_SetRes('lenstype', 6); glassesQuizWidgetPage('4.1');}}>
								<div className="glasses-quiz-widget-body-question-buttons-button-content">
									Distance Vision
								</div>
							</div>
							<div className="glasses-quiz-widget-body-question-buttons-button" onClick={function(){glassesQuizWidget_SetRes('lenstype', 7); glassesQuizWidgetPage('4.1');}}>
								<div className="glasses-quiz-widget-body-question-buttons-button-content">
									Multifocal / Progressive
								</div>
							</div>
						</div>
					</div>
					<a className="glasses-quiz-widget-body-skip" href="#" onClick={function(){glassesQuizWidget_SetRes('lenstype', ''); glassesQuizWidgetPage('4.1');}}>
						Skip
					</a>
				</div>
			);
			break;

		case '4.1':
			questKey = 'frame_size';
			header = <Header number="4/10" statusBar="-61.33%"/>;
			body = (
				<div className="glasses-quiz-widget-body">
					<div className="glasses-quiz-widget-body-question">
						<div className="glasses-quiz-widget-body-question-text">
							What’s your current
							<br />
							frame size?
						</div>
						<img
							src={glassesQuizWidget_imgUrl + "4.1.svg"}
							alt="Frame size"
							style={{ height: "20.63%", margin: "38px auto 0 auto" }}
						/>
						<div
							className="glasses-quiz-widget-body-question-buttons glasses-quiz-widget-body-question-buttons_41"
							style={{ marginTop: 35 }}
						>
							<div className="glasses-quiz-widget-body-question-buttons-button" onClick={function(){glassesQuizWidget_SetRes('frame_size', 68); glassesQuizWidgetPage(5);}}>
								<div className="glasses-quiz-widget-body-question-buttons-button-content">
									Small <span>42-48 mm</span>
								</div>
							</div>
							<div className="glasses-quiz-widget-body-question-buttons-button" onClick={function(){glassesQuizWidget_SetRes('frame_size', 67); glassesQuizWidgetPage(5);}}>
								<div className="glasses-quiz-widget-body-question-buttons-button-content">
									Medium <span>49-53 mm</span>
								</div>
							</div>
							<div className="glasses-quiz-widget-body-question-buttons-button" onClick={function(){glassesQuizWidget_SetRes('frame_size', 66); glassesQuizWidgetPage(5);}}>
								<div className="glasses-quiz-widget-body-question-buttons-button-content">
									Large <span>54-58 mm</span>
								</div>
							</div>
						</div>
					</div>
					<a className="glasses-quiz-widget-body-skip" href="#" onClick={function(){glassesQuizWidgetPage('4between');}}>
						I don’t know
					</a>
				</div>

			);
			break;
		case '4between':
			header = <Header number="4/10" statusBar="-61.33%"/>
			body = (
				<div className="glasses-quiz-widget-body">
					<div className="glasses-quiz-widget-body_between">
						<div className="glasses-quiz-widget-body_between-img">
							<div>
								<img src={glassesQuizWidget_imgUrl + "like.svg"} alt="Like" />
							</div>
						</div>
						<h2>No worries, we’ve got you!</h2>
					</div>
				</div>
			);
			setTimeout(glassesQuizWidgetPage, 2000, '4.2');
			break;
		case '4.2':
			questKey = 'frame_size';
			header = <Header number="4/10" statusBar="-61.33%"/>
			body = (
				<div className="glasses-quiz-widget-body">
					<div className="glasses-quiz-widget-body-question">
						<div className="glasses-quiz-widget-body-question-text">
							How wide would you
							<br />
							say your face is?
						</div>
						<div className="glasses-quiz-widget-body-question-buttons glasses-quiz-widget-body-question-buttons_42">
							<div className="glasses-quiz-widget-body-question-buttons-button" onClick={function(){glassesQuizWidget_SetRes('frame_size', 66); glassesQuizWidgetPage(5);}}>
								<div className="glasses-quiz-widget-body-question-buttons-button-content">
									Wider Than Average
								</div>
							</div>
							<div className="glasses-quiz-widget-body-question-buttons-button" onClick={function(){glassesQuizWidget_SetRes('frame_size', 67); glassesQuizWidgetPage(5);}}>
								<div className="glasses-quiz-widget-body-question-buttons-button-content">
									Average
								</div>
							</div>
							<div className="glasses-quiz-widget-body-question-buttons-button" onClick={function(){glassesQuizWidget_SetRes('frame_size', 68); glassesQuizWidgetPage(5);}}>
								<div className="glasses-quiz-widget-body-question-buttons-button-content">
									Narrower Than Average
								</div>
							</div>
						</div>
					</div>
					<a
						className="glasses-quiz-widget-body-skip"
						href="#"
						style={{ bottom: "6.3%" }}
						onClick={function(){glassesQuizWidget_SetRes('frame_size', ''); glassesQuizWidgetPage(5);}}
					>
						I’m not sure
					</a>
				</div>
			);
			break;

		case '5e':
			glassesQuizWidget_answers['shade'] = '';
			glassesQuizWidget_answers['blue_light'] = '';
			
			header = <Header number="5/10" statusBar="-50.66%"/>
			body = (
				<div className="glasses-quiz-widget-body">
					<div className="glasses-quiz-widget-body-question">
						<div className="glasses-quiz-widget-body-question-text">
							Would you like to protect your eyes
							<br />
							from light emanating from screens?
						</div>
						<div className="glasses-quiz-widget-body-question-buttons glasses-quiz-widget-body-question-buttons_h138">
							<div className="glasses-quiz-widget-body-question-buttons-button" onClick={function(){glassesQuizWidget_SetRes('blue_light', 'true'); glassesQuizWidget_SetRes('shade', ''); glassesQuizWidgetPage(6);}}>
								<div className="glasses-quiz-widget-body-question-buttons-button-content">
									Yes
								</div>
							</div>
							<div className="glasses-quiz-widget-body-question-buttons-button" onClick={function(){glassesQuizWidget_SetRes('blue_light', 'false'); glassesQuizWidget_SetRes('shade', ''); glassesQuizWidgetPage(6);}}>
								<div className="glasses-quiz-widget-body-question-buttons-button-content">
									No
								</div>
							</div>
						</div>
					</div>
				</div>
			);
			break;
		case '5s':
			glassesQuizWidget_answers['shade'] = '';
			glassesQuizWidget_answers['blue_light'] = '';
			
			header = <Header number="5/10" statusBar="-50.66%"/>
			body = (
				<div className="glasses-quiz-widget-body">
					<div className="glasses-quiz-widget-body-question">
						<div className="glasses-quiz-widget-body-question-text">
							When you’re out and about, which
							<br />
							shade of lenses do you prefer?
						</div>
						<div className="glasses-quiz-widget-body-question-buttons glasses-quiz-widget-body-question-buttons_5s">
							<div className="glasses-quiz-widget-body-question-buttons-button" onClick={function(){glassesQuizWidget_SetRes('blue_light', ''); glassesQuizWidget_SetRes('shade', 'dark'); glassesQuizWidgetPage(6);}}>
								<div className="glasses-quiz-widget-body-question-buttons-button_line" />
								<img src={glassesQuizWidget_imgUrl + "5s1.svg"} alt="Dark Shade" />
								<span>Dark Shade</span>
							</div>
							<div className="glasses-quiz-widget-body-question-buttons-button" onClick={function(){glassesQuizWidget_SetRes('blue_light', ''); glassesQuizWidget_SetRes('shade', 'light'); glassesQuizWidgetPage(6);}}>
								<div className="glasses-quiz-widget-body-question-buttons-button_line" />
								<img src={glassesQuizWidget_imgUrl + "5s2.svg"} alt="Light Shade" />
								<span>Light Shade</span>
							</div>
							<div className="glasses-quiz-widget-body-question-buttons-button" onClick={function(){glassesQuizWidget_SetRes('blue_light', ''); glassesQuizWidget_SetRes('shade', 'transition'); glassesQuizWidgetPage(6);}}>
								<div className="glasses-quiz-widget-body-question-buttons-button_line" />
								<img
									src={glassesQuizWidget_imgUrl + "5s3.svg"}
									alt="Transitioning Shade"
									style={{ left: "7.9%" }}
								/>
								<span>Transitioning Shade</span>
							</div>
						</div>
					</div>
				</div>
			);
			break;


		case '6m':
			questKey = 'face_shape';
			header = <Header number="6/10" statusBar="-50.66%"/>
			body = (
				<>
					<div className="glasses-quiz-widget-body">
						<div className="glasses-quiz-widget-body-question">
							<div className="glasses-quiz-widget-body-question-text">
								Every face shape has a<br />
								perfect fit. What’s yours?
							</div>
							<div className="glasses-quiz-widget-body-question-buttons glasses-quiz-widget-body-question-buttons_6m">
								<div className="glasses-quiz-widget-body-question-buttons-button" onClick={function(){glassesQuizWidget_SetRes('face_shape', 'long'); glassesQuizWidgetPage(7);}}>
									<div className="glasses-quiz-widget-body-question-buttons-button_line" />
									<img src={glassesQuizWidget_imgUrl + "6m1.svg"} alt="I have a long face" />
									<span>I have a long face</span>
								</div>
								<div className="glasses-quiz-widget-body-question-buttons-button" onClick={function(){glassesQuizWidget_SetRes('face_shape', 'round'); glassesQuizWidgetPage(7);}}>
									<div className="glasses-quiz-widget-body-question-buttons-button_line" />
									<img src={glassesQuizWidget_imgUrl + "6m2.svg"} alt="I have a round face" />
									<span>I have a round face</span>
								</div>
								<div className="glasses-quiz-widget-body-question-buttons-button" onClick={function(){glassesQuizWidget_SetRes('face_shape', 'between'); glassesQuizWidgetPage(7);}}>
									<div className="glasses-quiz-widget-body-question-buttons-button_line" />
									<img src={glassesQuizWidget_imgUrl + "6m3.svg"} alt="In between" />
									<span>In between</span>
								</div>
							</div>
						</div>
					</div>
					<a className="glasses-quiz-widget-body-skip" href="#" onClick={function(){glassesQuizWidget_SetRes('face_shape', ''); glassesQuizWidgetPage(7);}}>
						I don’t know
					</a>
				</>

			);
			break;
		case '6w':
			questKey = 'face_shape';
			header = <Header number="6/10" statusBar="-50.66%"/>
			body = (
				<>
					<div className="glasses-quiz-widget-body">
						<div className="glasses-quiz-widget-body-question">
							<div className="glasses-quiz-widget-body-question-text">
								Every face shape has a<br />
								perfect fit. What’s yours?
							</div>
							<div className="glasses-quiz-widget-body-question-buttons glasses-quiz-widget-body-question-buttons_6w">
								<div className="glasses-quiz-widget-body-question-buttons-button" onClick={function(){glassesQuizWidget_SetRes('face_shape', 'long'); glassesQuizWidgetPage(7);}}>
									<div className="glasses-quiz-widget-body-question-buttons-button_line" />
									<img src={glassesQuizWidget_imgUrl + "6w1.svg"} alt="I have a long face" />
									<span>I have a long face</span>
								</div>
								<div className="glasses-quiz-widget-body-question-buttons-button" onClick={function(){glassesQuizWidget_SetRes('face_shape', 'round'); glassesQuizWidgetPage(7);}}>
									<div className="glasses-quiz-widget-body-question-buttons-button_line" />
									<img src={glassesQuizWidget_imgUrl + "6w2.svg"} alt="I have a round face" />
									<span>I have a round face</span>
								</div>
								<div className="glasses-quiz-widget-body-question-buttons-button" onClick={function(){glassesQuizWidget_SetRes('face_shape', 'between'); glassesQuizWidgetPage(7);}}>
									<div className="glasses-quiz-widget-body-question-buttons-button_line" />
									<img src={glassesQuizWidget_imgUrl + "6w3.svg"} alt="In between" />
									<span>In between</span>
								</div>
							</div>
						</div>
					</div>
					<a className="glasses-quiz-widget-body-skip" href="#" onClick={function(){glassesQuizWidget_SetRes('face_shape', ''); glassesQuizWidgetPage(7);}}>
						I don’t know
					</a>
				</>
			);
			break;
		case '6b':
			header = <Header number="6/10" statusBar="-50.66%"/>
			body = (
				<>
					<div className="glasses-quiz-widget-body">
						<div className="glasses-quiz-widget-body-question">
							<div className="glasses-quiz-widget-body-question-text">
								Every face shape has a<br />
								perfect fit. What’s yours?
							</div>
							<div className="glasses-quiz-widget-body-question-buttons glasses-quiz-widget-body-question-buttons_6b">
								<div className="glasses-quiz-widget-body-question-buttons-button" onClick={function(){glassesQuizWidget_SetRes('face_shape', 'long'); glassesQuizWidgetPage(7);}}>
									<div className="glasses-quiz-widget-body-question-buttons-button_line" />
									<img src={glassesQuizWidget_imgUrl + "6b1.svg"} alt="I have a long face" />
									<span>I have a long face</span>
								</div>
								<div className="glasses-quiz-widget-body-question-buttons-button" onClick={function(){glassesQuizWidget_SetRes('face_shape', 'round'); glassesQuizWidgetPage(7);}}>
									<div className="glasses-quiz-widget-body-question-buttons-button_line" />
									<img src={glassesQuizWidget_imgUrl + "6b2.svg"} alt="I have a round face" />
									<span>I have a round face</span>
								</div>
								<div className="glasses-quiz-widget-body-question-buttons-button" onClick={function(){glassesQuizWidget_SetRes('face_shape', 'between'); glassesQuizWidgetPage(7);}}>
									<div className="glasses-quiz-widget-body-question-buttons-button_line" />
									<img src={glassesQuizWidget_imgUrl + "6b3.svg"} alt="In between" />
									<span>In between</span>
								</div>
							</div>
						</div>
					</div>
					<a className="glasses-quiz-widget-body-skip" href="#" onClick={function(){glassesQuizWidget_SetRes('face_shape', ''); glassesQuizWidgetPage(7);}}>
						I don’t know
					</a>
				</>
			);
			break
		case 7:
			questKey = 'facial_features';
			header = <Header number="7/10" statusBar="-34.66%"/>
			body = (
				<div className="glasses-quiz-widget-body">
					<div className="glasses-quiz-widget-body-question">
						<div className="glasses-quiz-widget-body-question-text">
							How would you define
							<br />
							your facial features?
						</div>
						<div className="glasses-quiz-widget-body-question-buttons glasses-quiz-widget-body-question-buttons_7">
							<div className="glasses-quiz-widget-body-question-buttons-button" onClick={function(){glassesQuizWidget_SetRes('facial_features', 'sharp'); glassesQuizWidgetPage(8);}}>
								<div className="glasses-quiz-widget-body-question-buttons-button-content">
									Sharp
								</div>
							</div>
							<div className="glasses-quiz-widget-body-question-buttons-button" onClick={function(){glassesQuizWidget_SetRes('facial_features', 'rounded'); glassesQuizWidgetPage(8);}}>
								<div className="glasses-quiz-widget-body-question-buttons-button-content">
									Rounded
								</div>
							</div>
							<div className="glasses-quiz-widget-body-question-buttons-button" onClick={function(){glassesQuizWidget_SetRes('facial_features', 'between'); glassesQuizWidgetPage(8);}}>
								<div className="glasses-quiz-widget-body-question-buttons-button-content">
									In between
								</div>
							</div>
						</div>
					</div>
					<a className="glasses-quiz-widget-body-skip" href="#" onClick={function(){glassesQuizWidget_SetRes('facial_features', ''); glassesQuizWidgetPage(8);}}>
						I don’t know
					</a>
				</div>
			);
			break;
		case 8:
			questKey = 'shape';
			header = <Header number="8/10" statusBar="-24%"/>
			Comp = function(){
				React.useEffect(function(){
					let mass = document.getElementsByClassName('glasses-quiz-widget-body_10-td');
					for(let i = 0; i < mass.length; i++){
						let elem = mass[i];
						elem.onclick = function(){
							if(elem.classList.contains('glassesQuizWidget_active')){
								elem.classList.remove('glassesQuizWidget_active');
							}else {
								elem.classList.add('glassesQuizWidget_active');
							}
							//elem.classList.toggle('glassesQuizWidget_active');
							if(document.getElementsByClassName('glassesQuizWidget_active').length != 0){
								document.getElementsByClassName('glasses-quiz-widget-body_10-button')[0].classList.add('glassesQuizWidget_ok');
							} else{
								document.getElementsByClassName('glasses-quiz-widget-body_10-button')[0].classList.remove('glassesQuizWidget_ok');
							}
						};
					}
					document.getElementsByClassName('glasses-quiz-widget-body_10-button')[0].onclick = function(){
						if(!document.getElementsByClassName('glasses-quiz-widget-body_10-button')[0].classList.contains('glassesQuizWidget_ok')){
							return
						}
						let list = document.getElementsByClassName('glassesQuizWidget_active'),
							res = '';
						for(let i = 0; i < list.length; i++){
							if(i != 0){ res += ','}
							res += list[i].dataset.value;
						}
						glassesQuizWidget_SetRes('shape', res);
						if (number == 8){
							glassesQuizWidgetPage(9);
						} else{
							glassesQuizWidgetPage(11);
						}
					}
				//скроллинг колёсиком мыши, потому что я с CSS поработал в тот момент недостаточно, а переделывать уже поздно
				document.getElementsByClassName('glasses-quiz-widget-body_10-box')[0].addEventListener('wheel', function(event) {
					if (event.deltaMode == event.DOM_DELTA_PIXEL) {
						var modifier = 1;
					} else if (event.deltaMode == event.DOM_DELTA_LINE) {
						var modifier = parseInt(getComputedStyle(this).lineHeight);
					} else if (event.deltaMode == event.DOM_DELTA_PAGE) {
						var modifier = this.clientHeight;
					}
					if (event.deltaY != 0) {
						this.scrollLeft += modifier * event.deltaY;
						event.preventDefault();
					}
				});
				}, []);
				return (
				<div className="glasses-quiz-widget-body">
					<div className="glasses-quiz-widget-body-question" style={{ top: "5.24%" }}>
						<div className="glasses-quiz-widget-body-question-text">
							Which frame style are you looking for?
						</div>
					</div>
					<div className="glasses-quiz-widget-body_10-text">
						You can pick more than one.
					</div>
					<div className="glasses-quiz-widget-body_10-box slide_8">
						<div className="glasses-quiz-widget-body_10-tr">
							<div className="glasses-quiz-widget-body_10-td" data-value="rectangle">
								<img src={glassesQuizWidget_imgUrl + "8/rectangle.svg"} />
								<span>Rectangle</span>
							</div>
							<div className="glasses-quiz-widget-body_10-td" data-value="browline">
								<img src={glassesQuizWidget_imgUrl + "8/browline.svg"} />
								<span>Browline</span>
							</div>
							<div className="glasses-quiz-widget-body_10-td" data-value="aviator">
								<img src={glassesQuizWidget_imgUrl + "8/aviator.svg"} />
								<span>Aviator</span>
							</div>
							<div className="glasses-quiz-widget-body_10-td" data-value="geometric">
								<img src={glassesQuizWidget_imgUrl + "8/geometric.svg"} />
								<span>Geometric</span>
							</div>
						</div>
						<div className="glasses-quiz-widget-body_10-tr">
							<div className="glasses-quiz-widget-body_10-td" data-value="wayframe">
								<img src={glassesQuizWidget_imgUrl + "8/wayframe.svg"} />
								<span>Wayframe</span>
							</div>
							<div className="glasses-quiz-widget-body_10-td" data-value="round">
								<img src={glassesQuizWidget_imgUrl + "8/round.svg"} />
								<span>Round</span>
							</div>
							<div className="glasses-quiz-widget-body_10-td" data-value="oval">
								<img src={glassesQuizWidget_imgUrl + "8/oval.svg"} />
								<span>Oval</span>
							</div>
							<div className="glasses-quiz-widget-body_10-td" data-value="oversized">
								<img src={glassesQuizWidget_imgUrl + "8/oversized.svg"} />
								<span>Oversized</span>
							</div>
						</div>
						<div className="glasses-quiz-widget-body_10-tr">
							<div className="glasses-quiz-widget-body_10-td" data-value="cat_eye">
								<img src={glassesQuizWidget_imgUrl + "8/cateye.svg"} />
								<span>Cat Eye</span>
							</div>
							<div className="glasses-quiz-widget-body_10-td" data-value="rimless">
								<img src={glassesQuizWidget_imgUrl + "8/rimless.svg"} />
								<span>Rimless</span>
							</div>
							<div className="glasses-quiz-widget-body_10-td" data-value="square">
								<img src={glassesQuizWidget_imgUrl + "8/square.svg"} />
								<span>Square</span>
							</div>
							<div className="glasses-quiz-widget-body_10-td" data-value="wrap">
								<img src={glassesQuizWidget_imgUrl + "8/wrap.svg"} />
								<span>Wrap</span>
							</div>
						</div>
					</div>
					<button className="glasses-quiz-widget-body_10-button">Continue</button>
				</div>
			)
			}
			break;
		case 9:
			
			header = <Header number="9/10" statusBar="-13.33%"/>;
			body = (
				<div className="glasses-quiz-widget-body">
					<div className="glasses-quiz-widget-body-question">
						<div className="glasses-quiz-widget-body-question-text">
							Are you looking for any
							<br />
							particular eyewear brands?
						</div>
						<div className="glasses-quiz-widget-body-question-buttons glasses-quiz-widget-body-question-buttons_h120">
							<div className="glasses-quiz-widget-body-question-buttons-button" onClick={function(){ glassesQuizWidgetPage(10);}}>
								<div className="glasses-quiz-widget-body-question-buttons-button-content">
									Yes, I have some in mind
								</div>
							</div>
							<div className="glasses-quiz-widget-body-question-buttons-button" onClick={function(){glassesQuizWidgetPage(11);}}>
								<div className="glasses-quiz-widget-body-question-buttons-button-content">
									No, brand isn't important
								</div>
							</div>
						</div>
					</div>
				</div>
			);
			break;
		case 10:
			questKey = 'brand';
			header = <Header number="10/10" statusBar="-5.3%"/>;
			Comp = function(){
				React.useEffect(function(){
					let mass = document.getElementsByClassName('glasses-quiz-widget-body_10-td');
					for(let i = 0; i < mass.length; i++){
						let elem = mass[i];
						elem.onclick = function(){
							if(elem.classList.contains('glassesQuizWidget_active')){
								elem.classList.remove('glassesQuizWidget_active');
							}else {
								elem.classList.add('glassesQuizWidget_active');
							}
							//elem.classList.toggle('glassesQuizWidget_active');
							if(document.getElementsByClassName('glassesQuizWidget_active').length != 0){
								document.getElementsByClassName('glasses-quiz-widget-body_10-button')[0].classList.add('glassesQuizWidget_ok');
							} else{
								document.getElementsByClassName('glasses-quiz-widget-body_10-button')[0].classList.remove('glassesQuizWidget_ok');
							}
						};
					}
					document.getElementsByClassName('glasses-quiz-widget-body_10-button')[0].onclick = function(){
						if(!document.getElementsByClassName('glasses-quiz-widget-body_10-button')[0].classList.contains('glassesQuizWidget_ok')){
							return
						}
						let list = document.getElementsByClassName('glassesQuizWidget_active'),
							res = '';
						for(let i = 0; i < list.length; i++){
							if(i != 0){ res += ','}
							res += list[i].dataset.value;
						}
						glassesQuizWidget_SetRes('brand', res);
						if (number == 8){
							glassesQuizWidgetPage(9);
						} else{
							glassesQuizWidgetPage(11);
						}
					}
					document.getElementsByClassName('glasses-quiz-widget-body_10-box')[0].addEventListener('wheel', function(event) {
					if (event.deltaMode == event.DOM_DELTA_PIXEL) {
						var modifier = 1;
					} else if (event.deltaMode == event.DOM_DELTA_LINE) {
						var modifier = parseInt(getComputedStyle(this).lineHeight);
					} else if (event.deltaMode == event.DOM_DELTA_PAGE) {
						var modifier = this.clientHeight;
					}
					if (event.deltaY != 0) {
						this.scrollLeft += modifier * event.deltaY;
						event.preventDefault();
					}
					});
				}, []);
				
				return (
					<div className="glasses-quiz-widget-body">
						<div className="glasses-quiz-widget-body-question" style={{ top: "5.24%" }}>
							<div className="glasses-quiz-widget-body-question-text">
								Choose your favorite brands
							</div>
						</div>
						<div className="glasses-quiz-widget-body_10-text">
							You can pick more than one.
						</div>
						<div className="glasses-quiz-widget-body_10-box">
							<div className="glasses-quiz-widget-body_10-tr">
								<div className="glasses-quiz-widget-body_10-td" data-value="ray_ban">
									<img src={glassesQuizWidget_imgUrl + "10/RayBan.svg"} alt="Ray Ban" />
								</div>
								<div className="glasses-quiz-widget-body_10-td"  data-value="oakley">
									<img src={glassesQuizWidget_imgUrl + "10/Oakley.svg"} alt="OAKLEY" />
								</div>
								<div className="glasses-quiz-widget-body_10-td"  data-value="gucci">
									<img src={glassesQuizWidget_imgUrl + "10/Gucci.svg"} alt="Gucci" />
								</div>
								<div className="glasses-quiz-widget-body_10-td"  data-value="armani_exchange">
									<img src={glassesQuizWidget_imgUrl + "10/ArmaniExchange.svg"} alt="Armani Exchange" />
								</div>
							</div>
							<div className="glasses-quiz-widget-body_10-tr">
								<div className="glasses-quiz-widget-body_10-td"  data-value="hilary_duff">
									<img src={glassesQuizWidget_imgUrl + "10/HilaryDuff.svg"} alt="Hilary Duff" />
								</div>
								<div className="glasses-quiz-widget-body_10-td"  data-value="prada">
									<img src={glassesQuizWidget_imgUrl + "10/Prada.svg"} alt="Prada" />
								</div>
								<div className="glasses-quiz-widget-body_10-td"  data-value="versace">
									<img src={glassesQuizWidget_imgUrl + "10/Versace.svg"} alt="Versace" />
								</div>
								<div className="glasses-quiz-widget-body_10-td"  data-value="vogue_eyewear">
									<img src={glassesQuizWidget_imgUrl + "10/VogueEyewear.svg"} alt="Vogue Eyewear" />
								</div>
							</div>
							<div className="glasses-quiz-widget-body_10-tr">
								<div className="glasses-quiz-widget-body_10-td"  data-value="michael_kors">
									<img src={glassesQuizWidget_imgUrl + "10/MichaelKors.svg"} alt="Michael Kors" />
								</div>
								<div className="glasses-quiz-widget-body_10-td"  data-value="coach">
									<img src={glassesQuizWidget_imgUrl + "10/Coach.svg"} alt="Coach" />
								</div>
								<div className="glasses-quiz-widget-body_10-td"  data-value="tory_burch">
									<img src={glassesQuizWidget_imgUrl + "10/ToryBurch.svg"} alt="Tory Burch" />
								</div>
								<div className="glasses-quiz-widget-body_10-td"  data-value="burberry">
									<img src={glassesQuizWidget_imgUrl + "10/Burberry.svg"} alt="Burberry" />
								</div>
							</div>
						</div>
						<button className="glasses-quiz-widget-body_10-button">Continue</button>
					</div>
				)
			}
			break;
	}
	//обнулить ответ на текущей странице
	if(questKey){
		glassesQuizWidget_answers[questKey] = '';
	}
	//рендеринг. Почему так? Чтобы на страницах 8 и 10 использовать useEffect()
	if (number != 8 && number != 10){
		ReactDOM.render(<>{header}{body}</>, document.getElementById('glasses-quiz-widget'));
	} else{
		ReactDOM.render(<>{header}<Comp /></>, document.getElementById('glasses-quiz-widget'));
	}
		 
	//добавляем страницу в историю
	if(number != '2b' && number != '4between' && number != glassesQuizWidget_backPageNums[glassesQuizWidget_backPageNums.length - 1]){
		glassesQuizWidget_backPageNums.push(number);
	}


}
function Header(props){
	/* 	number - текст, где номер страницы
	 *	statusBar - отклонение голубой линии влево
	*/
	return (
			<div className="glasses-quiz-widget-header_mobile glasses-quiz-widget-header">
				<a className="glasses-quiz-widget-header-arrowLeft" href="#" onClick={function(){glassesQuizWidgetPage(glassesQuizWidget_backPage())}}>
					<img src={glassesQuizWidget_imgUrl + "arrow_left.svg"} alt="Back Page" />
				</a>
				<div className="glasses-quiz-widget-header-numPage">
				{props.number}
				</div>
				<a className="glasses-quiz-widget-header-x" href="#" onClick={function(){glassesQuizWidgetPage(0)}}>
					<img src={glassesQuizWidget_imgUrl + "x.svg"} alt="Start Page" />
				</a>
				<div className="glasses-quiz-widget-header-statusBar">
				<span className="glasses-quiz-widget-header-statusBar-action" style={{ left: props.statusBar}} />
				</div>
			</div>
		)
}