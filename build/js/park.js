document.addEventListener('DOMContentLoaded', () => {

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

    if (window.screen.availWidth < 1023) {

        let switcherSlider1 = new Swiper('.product__img--1', {
            slidesPerView: 1,
            allowTouchMove: true,
            pagination: {
                el: '.swiper-pagination',
            },
        });

        let switcherSlider2 = new Swiper('.product__img--2', {
            slidesPerView: 1,
            allowTouchMove: true,
            pagination: {
                el: '.swiper-pagination',
            },
        });

        let switcherSlider3 = new Swiper('.product__img--3', {
            slidesPerView: 1,
            allowTouchMove: true,
            pagination: {
                el: '.swiper-pagination',
            },
        });

    } else {
        let slides = document.querySelectorAll('.product__img .swiper-slide');

        for (let i = 0; i < slides.length; i++) {
            slides[i].classList.remove('swiper-slide');
        }
    }

    function card(selector) {

        let mySwiper = new Swiper(`.${selector} .slider-block`, {
            slidesPerView: 1,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',

            },
            pagination: {
                el: '.swiper-pagination',
                type: 'custom',
                renderCustom: function(swiper, current, total) {
                    return (current) + ' из ' + (total);
                }
            },
            allowTouchMove: true,
            renderCustom: function(swiper, current, total) {
                return current + ' из ' + total;
            },
            breakpoints: {
                1024: {
                    allowTouchMove: false,
                    pagination: {
                        el: '',
                    },
                }
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
                        item.classList.remove('nav__item--active');
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
                    item.classList.remove('nav__item--active');
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
                    item.classList.remove('nav__item--active');
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
                document.querySelectorAll(`.${selector} .slider-nav__item:nth-child(n+${maxItems + 1})`).forEach(el => {
                    el.style.display = 'none';
                });
            }
        };

        showMore();
    }

    card('card--gaz-black');
    card('card--gaz-green');
    card('card--gaz-white');
});
