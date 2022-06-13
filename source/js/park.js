document.addEventListener('DOMContentLoaded', () => {
const products = document.querySelectorAll('.product');

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

	let mySwiper = new Swiper('.slider-block', {
		slidesPerView: 1,
		navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  }
	})

	const maxItems = 5;
	const sliderNavItems = document.querySelectorAll('.slider-nav__item');
	const sliderNav = document.querySelector('.slider-nav');

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

	const showMore = () => {
		let childenLength = sliderNav.children.length;
		console.log(childenLength)
		if (childenLength > maxItems) {
			sliderNav.insertAdjacentHTML('beforeend', `
				<div class="btn-center">
					<button class="modal-open">Еще ${childenLength - maxItems}</button>
				</div>
			`);
			document.querySelectorAll(`.slider-nav__item:nth-child(n+${maxItems + 1})`).forEach(el => {el.style.display = 'none';});
		}

		const modalOpen = document.querySelector('.modal-open');
		modalOpen.addEventListener('click', () => {new GraphModal().open('one');});
	};

	showMore();

document.querySelector('.product').addEventListener('click', () => {
	document.querySelector('.gallery').classList.add('gallery--active');
});
});
