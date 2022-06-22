window.addEventListener("DOMContentLoaded", function() {

	if (window.screen.availWidth < 1139) {
		const swiper = new Swiper('.reviews__slider', {
			slidesPerView: 1,
			direction: 'horizontal',
			loop: true,
			allowTouchMove: true,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
		});
	} else {
		const swiper = new Swiper('.reviews__slider', {
			slidesPerView: 2,
			spaceBetween: 30,
			direction: 'horizontal',
			loop: true,
			allowTouchMove: true,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
		});
	}

	const validation = new JustValidate('#promo-form', {
		errorFieldCssClass: 'is-invalid'
	});

	validation
		.addField('#name', [{
			rule: 'required',
			errorMessage: ' '
		}])

	.addField('#phone', [{
			rule: 'required',
			errorMessage: ' '
		}, ])
		.onSuccess((event) => {
			submitHandler(document.querySelector('#promo-form'));
			validation.refresh();
			form.classList.remove('promo-form--active');
			document.querySelector('#promo-form').reset();

			for (let i = 0; i < hiddenInputs.length; i++) {
				hiddenInputs[i].classList.remove('promo-form__input--active');
			}

			for (let i = 0; i < hiddenBlocks.length; i++) {
				hiddenBlocks[i].classList.remove('promo-form__block--active');
			}
		});

	function submitHandler(thisForm) {
		let formData = new FormData(thisForm);

		let xhr = new XMLHttpRequest();

		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					console.log('Отправлено');
				}
			}
		}

		xhr.open('POST', '../mail.php', true);
		xhr.send(formData);
		new GraphModal().open('success');
		thisForm.reset();
	}

	var phoneMask = IMask(
		document.getElementById('consultation__phone'), {
			mask: '+{7} (000) 000 - 00 - 00'
		});

	var phoneMask = IMask(
		document.getElementById('questions__phone'), {
			mask: '+{7} (000) 000 - 00 - 00'
		});

	const validation2 = new JustValidate('#consultation__form', {
		errorFieldCssClass: 'is-invalid'
	});

	const validation3 = new JustValidate('#questions__form', {
		errorFieldCssClass: 'is-invalid'
	});

	validation2
		.addField('#consultation__phone', [{
			rule: 'required',
			errorMessage: ' '
		}, ])
		.onSuccess((event) => {
			submitHandler(document.querySelector('#consultation__form'));
		});

	validation3
		.addField('#questions__phone', [{
			rule: 'required',
			errorMessage: ' '
		}, ])
		.onSuccess((event) => {
			submitHandler(document.querySelector('#questions__form'));
		});

	const tabs = document.querySelector('.tabs');
	const tabsBtn = document.querySelectorAll('.tabs__btn');
	const tabsContent = document.querySelectorAll('.tabs__content');
	if (tabs) {
		tabs.addEventListener('click', (e) => {
			if (e.target.classList.contains('tabs__btn')) {
				const tabsPath = e.target.dataset.tabsPath;
				tabsBtn.forEach(el => {
					el.classList.remove('tabs__btn--active')
				});
				document.querySelector(`[data-tabs-path="${tabsPath}"]`).classList.add('tabs__btn--active');
				tabsHandler(tabsPath);
			}
		});
	}
	const tabsHandler = (path) => {
		tabsContent.forEach(el => {
			el.classList.remove('tabs__content--active')
		});
		document.querySelector(`[data-tabs-target="${path}"]`).classList.add('tabs__content--active');
	};

	function accordion(uniq) {
		let header = document.querySelector(`.accordion__header--${uniq}`);
		let body = document.querySelector(`.accordion__body--${uniq}`);
		let arrow = document.querySelector(`.accordion__header--${uniq} .accordion__arrow`);

		header.addEventListener('click', function() {
			header.classList.toggle('accordion__header--active');
			body.classList.toggle('accordion__body--active');
			arrow.classList.toggle('accordion__arrow--active');
		});
	}

	accordion('apartaments-with-movers');
	accordion('apartaments');
	accordion('office');
	accordion('country-house');

	document.querySelector('#consultation__phone').addEventListener('change', () => {
		document.querySelector('.consultation__phone-wrapper').classList.add('consultation__phone-wrapper--active');

	});

	document.querySelector('#questions__phone').addEventListener('change', () => {
		document.querySelector('.questions__phone-wrapper').classList.add('questions__phone-wrapper--active');

	});

	document.querySelector('.consultation__button').addEventListener('click', () => {
		if ((document.querySelector('#consultation__phone').classList.contains('is-invalid')) == true) {
			document.querySelector('.consultation__phone-wrapper').classList.remove('consultation__phone-wrapper--active');
			document.querySelector('#consultation__phone').placeholder = 'Введите телефон';
		}
	});

	document.querySelector('.questions__button').addEventListener('click', () => {
		if ((document.querySelector('#questions__phone').classList.contains('is-invalid')) == true) {
			document.querySelector('.questions__phone-wrapper').classList.remove('questions__phone-wrapper--active');
			document.querySelector('#questions__phone').placeholder = 'Введите телефон';
		}
	});

	let hiddenInputs = document.querySelectorAll('.promo-form__input--hidden');
	let form = document.querySelector('.promo-form');
	let cleanButton = document.querySelector('.promo-form__clean');
	let inputs = document.querySelectorAll('.promo-form div');
	let hiddenBlocks = document.querySelectorAll('.promo-form__block');

	for (let i = 0; i < inputs.length; i++) {
		inputs[i].addEventListener('click', function() {
			form.classList.add('promo-form--active');

			if (window.screen.availWidth < 1023) {
				document.querySelector('.services').style.paddingTop = '970px';
			} else {
				document.querySelector('.services').style.paddingTop = '453px';
			}

			for (let i = 0; i < hiddenInputs.length; i++) {
				hiddenInputs[i].classList.add('promo-form__input--active');
			}

			for (let i = 0; i < hiddenBlocks.length; i++) {
				hiddenBlocks[i].classList.add('promo-form__block--active');
			}
		});
	}

});
