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

const products = document.querySelectorAll('.product__item');
if (products) {
	products.forEach(el => {
		let currentProduct = el;
		const imageSwitchItems = currentProduct.querySelectorAll('.image-switch__item');
		const imagePagination = currentProduct.querySelector('.image-pagination');
		if (imageSwitchItems.length > 1) {
			imageSwitchItems.forEach((el, index) => {
				el.setAttribute('data-index', index);
				imagePagination.innerHTML += `<li class="image-pagination__item ${index == 0 ? 'image-pagination__item--active' : ''}" data-index="${index}"></li>`;
				el.addEventListener('mouseenter', (e) => {
					currentProduct.querySelectorAll('.image-pagination__item').forEach(el => {
						el.classList.remove('image-pagination__item--active')
					});
					currentProduct.querySelector(`.image-pagination__item[data-index="${e.currentTarget.dataset.index}"]`).classList.add('image-pagination__item--active');
				});

				el.addEventListener('mouseleave', (e) => {
					currentProduct.querySelectorAll('.image-pagination__item').forEach(el => {
						el.classList.remove('image-pagination__item--active')
					});
					currentProduct.querySelector(`.image-pagination__item[data-index="0"]`).classList.add('image-pagination__item--active');
				});
			});
		}
	});
}


function card (selector) {
	let mySwiper = new Swiper(`.${selector} .slider-block`, {
		slidesPerView: 1,
		allowTouchMove: false,
		navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  }
	});

	const maxItems = 5;
	const sliderNavItems = document.querySelectorAll(`.${selector} .slider-nav__item`);
	const sliderNav = document.querySelector(`.${selector} .slider-nav`);

	sliderNavItems.forEach((el, index) => {
		el.setAttribute('data-index', index);

		el.addEventListener('click', (e) => {
			const index = parseInt(e.currentTarget.dataset.index);
			for (let item of sliderNavItems) {
				if (item.classList.contains('nav__item--active')) {
					item.classList.remove ('nav__item--active');
				}
			}
			el.classList.add('nav__item--active');
			mySwiper.slideTo(index);
		});
	});

	let presentItem = 0;
	document.querySelector(`.${selector} .swiper-button-next`).addEventListener('click', () => {
		for (let i = 0; i < sliderNavItems.length; i++) {
			if (sliderNavItems[i].classList.contains('nav__item--active')) {
				presentItem = i;
			}
		}

		for (let item of sliderNavItems) {
				if (item.classList.contains('nav__item--active')) {
					item.classList.remove ('nav__item--active');
				}
			}

				presentItem++;
				sliderNavItems[presentItem].classList.add('nav__item--active');
	});

document.querySelector(`.${selector} .swiper-button-prev`).addEventListener('click', () => {
		for (let i = 0; i < sliderNavItems.length; i++) {
			if (sliderNavItems[i].classList.contains('nav__item--active')) {
				presentItem = i;
			}
		}

		for (let item of sliderNavItems) {
				if (item.classList.contains('nav__item--active')) {
					item.classList.remove ('nav__item--active');
				}
			}

				presentItem--;
				sliderNavItems[presentItem].classList.add('nav__item--active');
	});

	const showMore = () => {
		let childenLength = sliderNav.children.length;
		if (childenLength > maxItems) {
			sliderNav.insertAdjacentHTML('beforeend', `
				<div class="btn-center">
					<button class="modal-open">Еще ${childenLength - maxItems}</button>
				</div>
			`);
			document.querySelectorAll(`.${selector} .slider-nav__item:nth-child(n+${maxItems + 1})`).forEach(el => {el.style.display = 'none';});
		}
	};

	showMore();
}

card('card--gaz-black');
card('card--gaz-green');
card('card--gaz-white');

if (window.screen.availWidth < 1023) {
		let delList = document.querySelectorAll('.park__img-wrapper');

		for (let i = 0; i < delList.length; i++) {
			delList[i].removeAttribute('data-graph-path');
		}
	}
});
