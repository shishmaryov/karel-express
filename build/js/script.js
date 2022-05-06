document.querySelector('.submenu--else').addEventListener('mouseover', function () {
	document.querySelector('.header__else > img').src = 'img/icons/else-active.svg';
});

document.querySelector('.submenu--else').addEventListener('mouseout', function () {
	document.querySelector('.header__else > img').src = 'img/icons/else.svg';
});

let burger = document.querySelector('.header__burger');

burger.addEventListener('click', function () {
	burger.classList.toggle('header__burger--active');
	document.querySelector('.header--mobile .header__bottom').classList.toggle('header__bottom--active');
});

function submenu(title, menu) {
	document.querySelector(title).addEventListener('click', function () {
		document.querySelector(menu + '> .header__sublist').classList.toggle('header__sublist--active');
		document.querySelector(title).classList.toggle('submenu__title--active');
		document.querySelector(menu + '> .menu__link').classList.toggle('menu__link--active');
	});
}

submenu(('.header--mobile .submenu__title--geo'), ('.header--mobile .submenu--geo'));
submenu(('.header--mobile .submenu__title--services'), ('.header--mobile .submenu--services'));

let sublistElse = document.querySelector('.header--mobile  .header__sublist--else'),
	elseImg = document.querySelector('.header--mobile .submenu--else img');

document.querySelector('.header--mobile .header__else').addEventListener('click', function () {
	sublistElse.classList.toggle('header__sublist--active');

	elseImg.classList.toggle('active');

	if (elseImg.classList.contains('active')) {
		elseImg.src = '../img/icons/else-active.svg';
	} else {
		elseImg.src = '../img/icons/else.svg';
	}


});
