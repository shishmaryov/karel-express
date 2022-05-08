window.addEventListener("DOMContentLoaded", function() {

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

    document.getElementById('time').addEventListener('click', function() {
        var numberMask = IMask(document.getElementById('time'), {
            mask: '00{:}00',
            lazy: false,
        });
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

    if (window.screen.availWidth < 1023) {
        new AirDatepicker('#date', {
            isMobile: true,
        });
    } else {
        new AirDatepicker('#date');
    }


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
        form.classList.remove('promo-form--active');
        document.querySelector('#promo-form').reset();

        for (let i = 0; i < hiddenInputs.length; i++) {
            hiddenInputs[i].classList.remove('promo-form__input--active');
        }

        for (let i = 0; i < hiddenBlocks.length; i++) {
            hiddenBlocks[i].classList.remove('promo-form__block--active');
        }
    });


});
