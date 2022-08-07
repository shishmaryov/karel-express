document.addEventListener('DOMContentLoaded', () => {
	var phoneMask = IMask(
		document.getElementById('consultation__phone'), {
			mask: '+{7} (000) 000 - 00 - 00'
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

	document.querySelector('#consultation__phone').addEventListener('input', () => {
		document.querySelector('.consultation__phone-wrapper').classList.add('consultation__phone-wrapper--active');

	});
	document.querySelector('.consultation__button').addEventListener('click', () => {
		if ((document.querySelector('#consultation__phone').classList.contains('is-invalid')) == true) {
			document.querySelector('.consultation__phone-wrapper').classList.remove('consultation__phone-wrapper--active');
			document.querySelector('#consultation__phone').placeholder = 'Введите телефон';
		}
	});
});
