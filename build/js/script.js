window.addEventListener('DOMContentLoaded', () => {
	var anchors = [].slice.call(document.querySelectorAll('a[href*="#"]')),
		animationTime = 500,
		framesCount = 60;

	anchors.forEach(function(item) {
		item.addEventListener('click', function(e) {
			e.preventDefault();
			var coordY = document.querySelector(item.getAttribute('href')).getBoundingClientRect().top + window.pageYOffset;
			var scroller = setInterval(function() {
				var scrollBy = coordY / framesCount;
				if (scrollBy > window.pageYOffset - coordY && window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
					window.scrollBy(0, scrollBy);
				} else {
					window.scrollTo(0, coordY);
					clearInterval(scroller);
				}
			}, animationTime / framesCount);
		});
	});

	let burger = document.querySelector('.header__burger');
	burger.addEventListener('click', function() {
		burger.classList.toggle('header__burger--active');
		document.querySelector('.header--mobile .header__bottom').classList.toggle('header__bottom--active');
	});

	function submenu(title, menu) {
		document.querySelector(title).addEventListener('click', function() {
			document.querySelector(menu + '> .header__sublist').classList.toggle('header__sublist--active');
			document.querySelector(title).classList.toggle('submenu__title--active');
			document.querySelector(menu + '> .menu__link').classList.toggle('menu__link--active');
		});
	}

	submenu(('.header--mobile .submenu__title--geo'), ('.header--mobile .submenu--geo'));
	submenu(('.header--mobile .submenu__title--services'), ('.header--mobile .submenu--services'));
	submenu(('footer .submenu__title--services'), ('footer .submenu--services'));

	let geoTitle = ('.footer .submenu__title--geo');
	let geoList = ('.footer .submenu--geo');
	document.querySelector(geoTitle).addEventListener('click', function() {
		document.querySelector(geoList + '> .footer__sublist').classList.toggle('footer__sublist--active');
		document.querySelector(geoTitle).classList.toggle('submenu__title--active');
		document.querySelector(geoList + '> .menu__link').classList.toggle('menu__link--active');
	})


	let sublistElse = document.querySelector('.header--mobile  .header__sublist--else'),
		elseImg = document.querySelector('.header--mobile .submenu--else img');
	document.querySelector('.header--mobile .header__else').addEventListener('click', function() {
		sublistElse.classList.toggle('header__sublist--active');
		elseImg.classList.toggle('active');
		if (elseImg.classList.contains('active')) {
			elseImg.src = '../img/icons/else-active.svg';
		} else {
			elseImg.src = '../img/icons/else.svg';
		}
	});

	let div1 = document.createElement('div');
	div1.innerHTML = document.querySelector('#promo-form__name-phone').innerHTML;
	div1.classList.add('promo-form__way');
	div1.classList.add('promo-form__way--no-icon');


	let div2 = document.createElement('div');
	div2.innerHTML = document.querySelector('#promo-form__car-insert').innerHTML;
	div2.classList.add('promo-form__block');


	if (window.screen.availWidth < 1023) {
		document.querySelector('#promo-form').insertBefore(div1, document.querySelector('#promo-form').children[3]);
		document.querySelector('#promo-form').insertBefore(div2, document.querySelector('#promo-form').children[5]);


	} else {
		document.querySelector('#promo-form').insertBefore(div1, document.querySelector('#promo-form').children[5]);
		document.querySelector('#promo-form').insertBefore(div2, document.querySelector('#promo-form').children[6]);

	}

	const CLASS_NAME_SELECT = 'select';
	const CLASS_NAME_ACTIVE = 'select_show';
	const CLASS_NAME_SELECTED = 'select__option_selected';
	const SELECTOR_ACTIVE = '.select_show';
	const SELECTOR_DATA = '[data-select]';
	const SELECTOR_DATA_TOGGLE = '[data-select="toggle"]';
	const SELECTOR_OPTION_SELECTED = '.select__option_selected';
	class CustomSelect {
		constructor(target, params) {
			this._elRoot = typeof target === 'string' ? document.querySelector(target) : target;
			this._params = params || {};
			this._onClickFn = this._onClick.bind(this);
			if (this._params['options']) {
				this._elRoot.classList.add(CLASS_NAME_SELECT);
				this._elRoot.innerHTML = CustomSelect.template(this._params);
			}
			this._elToggle = this._elRoot.querySelector(SELECTOR_DATA_TOGGLE);
			this._elRoot.addEventListener('click', this._onClickFn);
		}
		_onClick(e) {
			const target = e.target;
			const type = target.closest(SELECTOR_DATA).dataset.select;
			switch (type) {
				case 'toggle':
					this.toggle();
					break;
				case 'option':
					this._changeValue(target);
					break;
			}
		}
		_update(option) {
			option = option.closest('.select__option');
			const selected = this._elRoot.querySelector(SELECTOR_OPTION_SELECTED);
			if (selected) {
				selected.classList.remove(CLASS_NAME_SELECTED);
			}
			option.classList.add(CLASS_NAME_SELECTED);
			this._elToggle.textContent = option.textContent;
			this._elToggle.value = option.dataset['value'];
			this._elToggle.dataset.index = option.dataset['index'];
			this._elRoot.dispatchEvent(new CustomEvent('select.change'));
			this._params.onSelected ? this._params.onSelected(this, option) : null;
			return option.dataset['value'];
		}
		_reset() {
			const selected = this._elRoot.querySelector(SELECTOR_OPTION_SELECTED);
			if (selected) {
				selected.classList.remove(CLASS_NAME_SELECTED);
			}
			this._elToggle.textContent = 'Выберите из списка';
			this._elToggle.value = '';
			this._elToggle.dataset.index = -1;
			this._elRoot.dispatchEvent(new CustomEvent('select.change'));
			this._params.onSelected ? this._params.onSelected(this, null) : null;
			return '';
		}
		_changeValue(option) {
			if (option.classList.contains(CLASS_NAME_SELECTED)) {
				return;
			}
			this._update(option);
			this.hide();
		}
		show() {
			document.querySelectorAll(SELECTOR_ACTIVE).forEach(select => {
				select.classList.remove(CLASS_NAME_ACTIVE);
			});
			this._elRoot.classList.add(CLASS_NAME_ACTIVE);
		}
		hide() {
			this._elRoot.classList.remove(CLASS_NAME_ACTIVE);
		}
		toggle() {
			if (this._elRoot.classList.contains(CLASS_NAME_ACTIVE)) {
				this.hide();
			} else {
				this.show();
			}
		}
		dispose() {
			this._elRoot.removeEventListener('click', this._onClickFn);
		}
		get value() {
			return this._elToggle.value;
		}
		set value(value) {
			let isExists = false;
			this._elRoot.querySelectorAll('.select__option').forEach((option) => {
				if (option.dataset['value'] === value) {
					isExists = true;
					return this._update(option);
				}
			});
			if (!isExists) {
				return this._reset();
			}
		}
		get selectedIndex() {
			return this._elToggle.dataset['index'];
		}
		set selectedIndex(index) {
			const option = this._elRoot.querySelector(`.select__option[data-index="${index}"]`);
			if (option) {
				return this._update(option);
			}
			return this._reset();
		}
	}

	CustomSelect.template = params => {
		const name = params['name'];
		const options = params['options'];
		const targetValue = params['targetValue'];
		let items = [];
		let selectedIndex = -1;
		let selectedValue = '';
		let selectedContent = 'Выберите из списка';
		options.forEach((option, index) => {
			let selectedClass = '';
			if (option[0] === targetValue) {
				selectedClass = ' select__option_selected';
				selectedIndex = index;
				selectedValue = option[0];
				selectedContent = option[1];
			}
			items.push(`<li class="select__option${selectedClass}" data-select="option" data-value="${option[0]}" data-index="${index}">${option[1]}</li>`);
		});

		return `<button type="button" class="select__toggle" name="${name}" value="${selectedValue}" data-select="toggle" data-index="${selectedIndex}">${selectedContent}</button>
	<div class="select__dropdown">
	<ul class="select__options">${items.join('')}</ul>
</div>`;
	};

	document.addEventListener('click', (e) => {
		if (!e.target.closest('.select')) {
			document.querySelectorAll(SELECTOR_ACTIVE).forEach(select => {
				select.classList.remove(CLASS_NAME_ACTIVE);
			});
		}
	});

	const select1 = new CustomSelect('#select-1', {
		name: 'weight', // значение атрибута name у кнопки
		targetValue: '1,5 tons', // значение по умолчанию
		options: [
			['1,5 tons', 'До 1,5 тонн'],
			['2 tons', 'До 2 тонн'],
			['5 tons', 'До 5 тонн']
		], // опции
	});

	const select2 = new CustomSelect('#select-2', {
		name: 'length', // значение атрибута name у кнопки
		targetValue: '3 m', // значение по умолчанию
		options: [
			['3 m', '3 m'],
			['4 m', '4 m']
		], // опции
	});

	const select3 = new CustomSelect('#select-3', {
		name: 'heigth', // значение атрибута name у кнопки
		targetValue: '1,6 m', // значение по умолчанию
		options: [
			['1,6 m', '1,6 m'],
			['1,8 m', '1,8 m'],
			['2,2 m', '2,2 m']
		], // опции
	});

	const select4 = new CustomSelect('#select-4', {
		name: 'passengers', // значение атрибута name у кнопки
		targetValue: '0', // значение по умолчанию
		options: [
			['0', 'Нет'],
			['1', '1'],
			['2', '2']
		], // опции
	});

	const select5 = new CustomSelect('#select-5', {
		name: 'movers', // значение атрибута name у кнопки
		targetValue: '0', // значение по умолчанию
		options: [
			['0', 'Нет'],
			['1', '1'],
			['2', '2']
		], // опции
	});

	const select6 = new CustomSelect('#select-6');
	document.querySelector('.submenu--else').addEventListener('mouseover', function() {
		document.querySelector('.header__else > img').src = 'img/icons/else-active.svg';
	});

	document.querySelector('.submenu--else').addEventListener('mouseout', function() {
		document.querySelector('.header__else > img').src = 'img/icons/else.svg';
	});

	const select7 = new CustomSelect('#select-7', {
		name: 'urgency', // значение атрибута name у кнопки
		targetValue: '20 min', // значение по умолчанию
		options: [
			['20 min', 'От 20 минут'],
			['1 hour', '1 час'],
			['2 hours', '2 часа'],
			['other', 'Другое']
		], // опции
	});

	const select8 = new CustomSelect('#select-8', {
		name: 'duration', // значение атрибута name у кнопки
		targetValue: '1 hour', // значение по умолчанию
		options: [
			['1 hour', '1 час'],
			['2 hours', '2 часа'],
			['3 hours', '3 часа']
		],
	});


	document.querySelector('.promo-form__actual-link').addEventListener('click', function() {
		document.querySelector('#select-6').classList.toggle('select--active');
		document.querySelector('.promo-form__actual-link').classList.toggle('promo-form__actual-link--absolute');
		if (document.querySelector('#select-6').classList.contains('select--active')) {
			document.querySelector('.promo-form__actual-link').textContent = 'Вернуться';
		} else {
			document.querySelector('.promo-form__actual-link').textContent = 'Выбрать из списка';
		}
	});

	document.querySelector('#select-6 .select__toggle').addEventListener('click', function() {
		document.querySelector('.promo-form__actual-link').classList.toggle('promo-form__actual-link--absolute');
	});

	document.querySelector('#time').placeholder = new Date().toLocaleTimeString('en-US', {
		hour12: false,
		hour: "numeric",
		minute: "numeric"
	});



	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();
	today = mm + '.' + dd + '.' + yyyy;
	document.querySelector('#date').placeholder = today;

	var phoneMask = IMask(
		document.getElementById('phone'), {
			mask: '+{7} (000) 000 - 00 - 00'
		});

	var phoneMask = IMask(
        document.getElementById('order-call__phone'), {
            mask: '+{7} (000) 000 - 00 - 00'
        });

	let hiddenInputs = document.querySelectorAll('.promo-form__input--hidden');
	let form = document.querySelector('.promo-form');
	let cleanButton = document.querySelector('.promo-form__clean');
	let inputs = document.querySelectorAll('.promo-form div');
	let hiddenBlocks = document.querySelectorAll('.promo-form__block');

	for (let i = 0; i < inputs.length; i++) {
		inputs[i].addEventListener('click', function() {
			form.classList.add('promo-form--active');

			for (let i = 0; i < hiddenInputs.length; i++) {
				hiddenInputs[i].classList.add('promo-form__input--active');
			}

			for (let i = 0; i < hiddenBlocks.length; i++) {
				hiddenBlocks[i].classList.add('promo-form__block--active');
			}
		});
	}

	cleanButton.addEventListener('click', function() {
		if (window.screen.availWidth < 1023) {
			document.querySelector('.services').style.paddingTop = '390px';
		} else {
			document.querySelector('.services').style.paddingTop = '150px';
		}
		form.classList.remove('promo-form--active');
		document.querySelector('#promo-form').reset()

		for (let i = 0; i < hiddenInputs.length; i++) {
			hiddenInputs[i].classList.remove('promo-form__input--active');
		}

		for (let i = 0; i < hiddenBlocks.length; i++) {
			hiddenBlocks[i].classList.remove('promo-form__block--active');
		}

		validation.refresh();


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
	}

	document.getElementById('time').addEventListener('click', function() {
		var numberMask = IMask(document.getElementById('time'), {
			mask: '00{:}00',
			lazy: false,
		});
	});

	if (window.screen.availWidth < 1023) {
		new AirDatepicker('#date', {
			isMobile: true,
		});
	} else {
		new AirDatepicker('#date', {
			position: "bottom right"
		});
	}

	const validation = new JustValidate('#promo-form', {
		errorFieldCssClass: 'is-invalid'
	});

	const validation2 = new JustValidate('#order-call__form', {
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

			for (let i = 0; i < hiddenInputs.length; i++) {
				hiddenInputs[i].classList.remove('promo-form__input--active');
			}

			for (let i = 0; i < hiddenBlocks.length; i++) {
				hiddenBlocks[i].classList.remove('promo-form__block--active');
			}
		});

		validation2
        .addField('#order-call__phone', [{
            rule: 'required',
            errorMessage: ' '
        }, ])
        .onSuccess((event) => {
        	document.querySelector('graph-modal__container--order-call').classList.remove('graph-modal-open');
            submitHandler(document.querySelector('#order-call__form'));
        });

        document.querySelector('#order-call__phone').addEventListener('change', () => {
        document.querySelector('.order-call__phone-wrapper').classList.add('consultation__phone-wrapper--active');

    });

        document.querySelector('.order-call__button').addEventListener('click', () => {
        if ((document.querySelector('#order-call__phone').classList.contains('is-invalid')) == true) {
            document.querySelector('.order-call__phone-wrapper').classList.remove('consultation__phone-wrapper--active');
            document.querySelector('#order-call__phone').placeholder = 'Введите телефон';
        }
    });

	document.querySelector('.promo-form__button').addEventListener('click', function() {
		setTimeout(function() {
			if ((document.querySelector('#name').classList.contains('is-invalid')) == true) {
				document.querySelector('#name').placeholder = 'Введите имя';
			}

			if ((document.querySelector('#phone').classList.contains('is-invalid')) == true) {
				document.querySelector('#phone').placeholder = 'Введите телефон';
			}
		}, 500);
	});

	document.querySelector('.promo-form__add-adress').addEventListener('click', function() {
		let div = document.createElement('div');
		div.innerHTML = document.querySelector('#middleStop').innerHTML;
		document.querySelector('.promo-form__stops').insertBefore(div, document.querySelector('.promo-form__stops').children[1]);
		$(".promo-form__input--address").suggestions({
			token: "3b5a250afeed87ba3c5782b639296f750d220161",
			type: "ADDRESS",
			/* Вызывается, когда пользователь выбирает одну из подсказок */
			onSelect: function(suggestion) {
				console.log(suggestion);
			}
		});
	});


	$(".promo-form__input--address").suggestions({
		token: "3b5a250afeed87ba3c5782b639296f750d220161",
		type: "ADDRESS",
		/* Вызывается, когда пользователь выбирает одну из подсказок */
		onSelect: function(suggestion) {
			console.log(suggestion);
		}
	});

	!function(t){var e={};function o(n){if(e[n])return e[n].exports;var i=e[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,o),i.l=!0,i.exports}o.m=t,o.c=e,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)o.d(n,i,function(e){return t[e]}.bind(null,i));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",o(o.s=1)}([function(t,e,o){"use strict";o.d(e,"a",(function(){return n}));class n{constructor(t){this.options=Object.assign({isOpen:()=>{},isClose:()=>{}},t),this.modal=document.querySelector(".graph-modal"),this.speed=300,this.animation="fade",this._reOpen=!1,this._nextContainer=!1,this.modalContainer=!1,this.isOpen=!1,this.previousActiveElement=!1,this._focusElements=["a[href]","input","select","textarea","button","iframe","[contenteditable]",'[tabindex]:not([tabindex^="-"])'],this._fixBlocks=document.querySelectorAll(".fix-block"),this.events()}events(){this.modal&&(document.addEventListener("click",function(t){const e=t.target.closest("[data-graph-path]");if(e){let t=e.dataset.graphPath,o=e.dataset.graphAnimation,n=e.dataset.graphSpeed;return this.animation=o||"fade",this.speed=n?parseInt(n):300,this._nextContainer=document.querySelector(`[data-graph-target="${t}"]`),void this.open()}t.target.closest(".graph-modal__close")&&this.close()}.bind(this)),window.addEventListener("keydown",function(t){27==t.keyCode&&this.isOpen&&this.close(),9==t.which&&this.isOpen&&this.focusCatch(t)}.bind(this)),document.addEventListener("click",function(t){t.target.classList.contains("graph-modal")&&t.target.classList.contains("is-open")&&this.close()}.bind(this)))}open(t){if(this.previousActiveElement=document.activeElement,this.isOpen)return this.reOpen=!0,void this.close();this.modalContainer=this._nextContainer,t&&(this.modalContainer=document.querySelector(`[data-graph-target="${t}"]`)),this.modal.style.setProperty("--transition-time",this.speed/1e3+"s"),this.modal.classList.add("is-open"),document.body.style.scrollBehavior="auto",document.documentElement.style.scrollBehavior="auto",this.disableScroll(),this.modalContainer.classList.add("graph-modal-open"),this.modalContainer.classList.add(this.animation),setTimeout(()=>{this.options.isOpen(this),this.modalContainer.classList.add("animate-open"),this.isOpen=!0,this.focusTrap()},this.speed)}close(){this.modalContainer&&(this.modalContainer.classList.remove("animate-open"),this.modalContainer.classList.remove(this.animation),this.modal.classList.remove("is-open"),this.modalContainer.classList.remove("graph-modal-open"),this.enableScroll(),document.body.style.scrollBehavior="auto",document.documentElement.style.scrollBehavior="auto",this.options.isClose(this),this.isOpen=!1,this.focusTrap(),this.reOpen&&(this.reOpen=!1,this.open()))}focusCatch(t){const e=this.modalContainer.querySelectorAll(this._focusElements),o=Array.prototype.slice.call(e),n=o.indexOf(document.activeElement);t.shiftKey&&0===n&&(o[o.length-1].focus(),t.preventDefault()),t.shiftKey||n!==o.length-1||(o[0].focus(),t.preventDefault())}focusTrap(){const t=this.modalContainer.querySelectorAll(this._focusElements);this.isOpen?t.length&&t[0].focus():this.previousActiveElement.focus()}disableScroll(){let t=window.scrollY;this.lockPadding(),document.body.classList.add("disable-scroll"),document.body.dataset.position=t,document.body.style.top=-t+"px"}enableScroll(){let t=parseInt(document.body.dataset.position,10);this.unlockPadding(),document.body.style.top="auto",document.body.classList.remove("disable-scroll"),window.scroll({top:t,left:0}),document.body.removeAttribute("data-position")}lockPadding(){let t=window.innerWidth-document.body.offsetWidth+"px";this._fixBlocks.forEach(e=>{e.style.paddingRight=t}),document.body.style.paddingRight=t}unlockPadding(){this._fixBlocks.forEach(t=>{t.style.paddingRight="0px"}),document.body.style.paddingRight="0px"}}},function(t,e,o){"use strict";o.r(e),function(t){var e=o(0);o(3),o(4);t.GraphModal=e.a}.call(this,o(2))},function(t,e){var o;o=function(){return this}();try{o=o||new Function("return this")()}catch(t){"object"==typeof window&&(o=window)}t.exports=o},function(t,e){"undefined"!=typeof Element&&(Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector),Element.prototype.closest||(Element.prototype.closest=function(t){var e=this;do{if(e.matches(t))return e;e=e.parentElement||e.parentNode}while(null!==e&&1===e.nodeType);return null}))},function(t,e,o){}]);


	const modal = new GraphModal();
});
