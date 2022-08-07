document.addEventListener('DOMContentLoaded', () => {

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
	}

	var phoneMask = IMask(
		document.getElementById('service__phone'), {
			mask: '+{7} (000) 000 - 00 - 00'
		});

	var phoneMask = IMask(
		document.getElementById('questions__phone'), {
			mask: '+{7} (000) 000 - 00 - 00'
		});

	const validation3 = new JustValidate('#service__form', {
		errorFieldCssClass: 'is-invalid'
	});

	const validation4 = new JustValidate('#questions__form', {
		errorFieldCssClass: 'is-invalid'
	});

	validation3
		.addField('#service__phone', [{
			rule: 'required',
			errorMessage: ' '
		}, ])
		.onSuccess((event) => {
			submitHandler(document.querySelector('#service__form'));
		});

	validation4
		.addField('#questions__phone', [{
			rule: 'required',
			errorMessage: ' '
		}, ])
		.onSuccess((event) => {
			submitHandler(document.querySelector('#questions__form'));
		});

	document.querySelector('#service__phone').addEventListener('input', () => {
		document.querySelector('.service__phone-wrapper').classList.add('consultation__phone-wrapper--active');

	});

	document.querySelector('.service__button').addEventListener('click', () => {
		if ((document.querySelector('#service__phone').classList.contains('is-invalid')) == true) {
			document.querySelector('.service__phone-wrapper').classList.remove('consultation__phone-wrapper--active');
			document.querySelector('#service__phone').placeholder = 'Введите телефон';
		}
	});

	document.querySelector('#questions__phone').addEventListener('input', () => {
		document.querySelector('.questions__phone-wrapper').classList.add('questions__phone-wrapper--active');

	});

	document.querySelector('.questions__button').addEventListener('click', () => {
		if ((document.querySelector('#questions__phone').classList.contains('is-invalid')) == true) {
			document.querySelector('.questions__phone-wrapper').classList.remove('questions__phone-wrapper--active');
			document.querySelector('#questions__phone').placeholder = 'Введите телефон';
		}
	});

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
});
