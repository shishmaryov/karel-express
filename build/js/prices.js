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

        document.querySelector('#promo-form').reset();
        validation.refresh();

    }

    var phoneMask = IMask(
        document.getElementById('consultation__phone'), {
            mask: '+{7} (000) 000 - 00 - 00'
        });



    const validation2 = new JustValidate('#consultation__form', {
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
