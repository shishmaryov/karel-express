window.addEventListener('DOMContentLoaded', () => {
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
            elseImg.src = './img/icons/else-active.svg';
        } else {
            elseImg.src = './img/icons/else.svg';
        }
    });
    document.querySelector('.submenu--else').addEventListener('mouseover', function() {
        document.querySelector('.header__else > img').src = 'img/icons/else-active.svg';
    });
    document.querySelector('.submenu--else').addEventListener('mouseout', function() {
        document.querySelector('.header__else > img').src = 'img/icons/else.svg';
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
    let phone;

    function submitHandler2(thisForm) {
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
        phone = document.querySelector('#consultation__phone').value;
        phone = phone.replace(/\D/g, '');
        let arr = Array.from(phone);
        phone = [];
        phone[0] = '+7';
        phone[1] = arr[1] + arr[2] + arr[3];
        phone[2] = arr[4] + arr[5] + arr[6];
        phone[3] = arr[7] + arr[8];
        phone[4] = arr[9] + arr[10];
        phone = phone.join(' ');
        document.querySelector('.auth__form').innerHTML = document.querySelector('#getCode').innerHTML;
        document.querySelector('.auth-form__change-phone').innerHTML = `Мы отправили код подтверждения на номер <br> ${phone} <a href="./auth.html" class="auth-form__change-link">Изменить</a>`
        let timer = setInterval(() => {
            calcTime();
        }, 1000);
        document.querySelector('.auth-form .consultation__button').classList.add('consultation__button--disabled');
        document.querySelector('.consultation__button').addEventListener('click', function() {
            if (document.querySelector('.auth__code-input').value.length == 4) {
                if (document.querySelector('#agreement__checkbox').checked == true) {
                    if (document.querySelector('.agreement__checkmark').classList.contains('is-invalid')) {
                        document.querySelector('.agreement__checkmark').classList.remove('is-invalid');
                    }
                } else {
                    document.querySelector('.agreement__checkmark').classList.add('is-invalid');
                }
            }
        });

        function check() {
            if (document.querySelector('.auth__code-input').value.length == 4 && document.querySelector('#agreement__checkbox').checked == true) {
                if (document.querySelector('.agreement__checkmark').classList.contains('is-invalid')) {
                    document.querySelector('.agreement__checkmark').classList.remove('is-invalid');
                }
                if (document.querySelector('.auth-form .consultation__button').classList.contains('consultation__button--disabled')) {
                    document.querySelector('.auth-form .consultation__button').classList.remove('consultation__button--disabled');
                }
            } else if (document.querySelector('.agreement__checkmark').checked == false) {
                if (document.querySelector('.agreement__checkmark').classList.contains('is-invalid')) {} else {
                    document.querySelector('.agreement__checkmark').classList.add('is-invalid');
                }
                if (document.querySelector('.auth-form .consultation__button').classList.contains('consultation__button--disabled') == false) {
                    document.querySelector('.auth-form .consultation__button').classList.add('consultation__button--disabled');
                }
            } else if (document.querySelector('.auth__code-input').value.length !== 4) {
                if (document.querySelector('.auth-form .consultation__button').classList.contains('consultation__button--disabled') == false) {
                    document.querySelector('.auth-form .consultation__button').classList.add('consultation__button--disabled');
                }
            }
        }

        document.querySelector('.auth__code-input').addEventListener('input', () => {
            check();
        });
        document.querySelector('#agreement__checkbox').addEventListener('click', () => {
            check();
        });

        document.querySelector('.auth-form .consultation__button').addEventListener('click', () => {
            check();
        });


        setTimeout(() => {
            clearInterval(timer);
            document.querySelector('.auth-form__timer').textContent = 'Получить новый код';
            document.querySelector('.auth-form__timer').classList.add('auth-form__timer--active');
            document.querySelector('.auth-form__timer--active').addEventListener('click', () => {
                submitHandler2(document.querySelector('#auth-form'));
            });
        }, 60000);
        const validation3 = new JustValidate('#auth-form-code', {
            errorFieldCssClass: 'is-invalid'
        });
        validation3
            .addField('#consultation__code', [{
                rule: 'required',
                errorMessage: ' '
            }, {
                rule: 'minLength',
                value: 4,
                errorMessage: ' '
            }, ])
            .addField('#agreement__checkbox', [{
                rule: 'required',
                errorMessage: ' '
            }])
            .onSuccess((event) => {
                submitHandler(document.querySelector('#auth-form-code'));
            });
    }
    const validation1 = new JustValidate('#order-call__form', {
        errorFieldCssClass: 'is-invalid'
    });
    validation1
        .addField('#order-call__phone', [{
            rule: 'required',
            errorMessage: ' '
        }])
        .onSuccess((event) => {
            document.querySelector('.graph-modal__container--order-call').classList.remove('graph-modal-open');
            submitHandler(document.querySelector('#order-call__form'));
        });
    const validation2 = new JustValidate('#auth-form', {
        errorFieldCssClass: 'is-invalid'
    });
    validation2
        .addField('#consultation__phone', [{
            rule: 'required',
            errorMessage: ' '
        }, {
            rule: 'minLength',
            value: 8,
            errorMessage: ' '
        }])
        .onSuccess((event) => {
            submitHandler2(document.querySelector('#auth-form'));
        });
    document.querySelector('#order-call__phone').addEventListener('input', () => {
        document.querySelector('.order-call__phone-wrapper').classList.add('consultation__phone-wrapper--active');
    });
    document.querySelector('.order-call__button').addEventListener('click', () => {
        if ((document.querySelector('#order-call__phone').classList.contains('is-invalid')) == true) {
            document.querySelector('.order-call__phone-wrapper').classList.remove('consultation__phone-wrapper--active');
            document.querySelector('#order-call__phone').placeholder = 'Введите телефон';
        }
    });
    ! function(t) {
        var e = {};

        function o(n) {
            if (e[n]) return e[n].exports;
            var i = e[n] = {
                i: n,
                l: !1,
                exports: {}
            };
            return t[n].call(i.exports, i, i.exports, o), i.l = !0, i.exports
        }
        o.m = t, o.c = e, o.d = function(t, e, n) {
            o.o(t, e) || Object.defineProperty(t, e, {
                enumerable: !0,
                get: n
            })
        }, o.r = function(t) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
                value: "Module"
            }), Object.defineProperty(t, "__esModule", {
                value: !0
            })
        }, o.t = function(t, e) {
            if (1 & e && (t = o(t)), 8 & e) return t;
            if (4 & e && "object" == typeof t && t && t.__esModule) return t;
            var n = Object.create(null);
            if (o.r(n), Object.defineProperty(n, "default", {
                    enumerable: !0,
                    value: t
                }), 2 & e && "string" != typeof t)
                for (var i in t) o.d(n, i, function(e) {
                    return t[e]
                }.bind(null, i));
            return n
        }, o.n = function(t) {
            var e = t && t.__esModule ? function() {
                return t.default
            } : function() {
                return t
            };
            return o.d(e, "a", e), e
        }, o.o = function(t, e) {
            return Object.prototype.hasOwnProperty.call(t, e)
        }, o.p = "", o(o.s = 1)
    }([function(t, e, o) {
        "use strict";
        o.d(e, "a", (function() {
            return n
        }));
        class n {
            constructor(t) {
                this.options = Object.assign({
                    isOpen: () => {},
                    isClose: () => {}
                }, t), this.modal = document.querySelector(".graph-modal"), this.speed = 300, this.animation = "fade", this._reOpen = !1, this._nextContainer = !1, this.modalContainer = !1, this.isOpen = !1, this.previousActiveElement = !1, this._focusElements = ["a[href]", "input", "select", "textarea", "button", "iframe", "[contenteditable]", '[tabindex]:not([tabindex^="-"])'], this._fixBlocks = document.querySelectorAll(".fix-block"), this.events()
            }
            events() {
                this.modal && (document.addEventListener("click", function(t) {
                    const e = t.target.closest("[data-graph-path]");
                    if (e) {
                        let t = e.dataset.graphPath,
                            o = e.dataset.graphAnimation,
                            n = e.dataset.graphSpeed;
                        return this.animation = o || "fade", this.speed = n ? parseInt(n) : 300, this._nextContainer = document.querySelector(`[data-graph-target="${t}"]`), void this.open()
                    }
                    t.target.closest(".graph-modal__close") && this.close()
                }.bind(this)), window.addEventListener("keydown", function(t) {
                    27 == t.keyCode && this.isOpen && this.close(), 9 == t.which && this.isOpen && this.focusCatch(t)
                }.bind(this)), document.addEventListener("click", function(t) {
                    t.target.classList.contains("graph-modal") && t.target.classList.contains("is-open") && this.close()
                }.bind(this)))
            }
            open(t) {
                if (this.previousActiveElement = document.activeElement, this.isOpen) return this.reOpen = !0, void this.close();
                this.modalContainer = this._nextContainer, t && (this.modalContainer = document.querySelector(`[data-graph-target="${t}"]`)), this.modal.style.setProperty("--transition-time", this.speed / 1e3 + "s"), this.modal.classList.add("is-open"), document.body.style.scrollBehavior = "auto", document.documentElement.style.scrollBehavior = "auto", this.disableScroll(), this.modalContainer.classList.add("graph-modal-open"), this.modalContainer.classList.add(this.animation), setTimeout(() => {
                    this.options.isOpen(this), this.modalContainer.classList.add("animate-open"), this.isOpen = !0, this.focusTrap()
                }, this.speed)
            }
            close() {
                this.modalContainer && (this.modalContainer.classList.remove("animate-open"), this.modalContainer.classList.remove(this.animation), this.modal.classList.remove("is-open"), this.modalContainer.classList.remove("graph-modal-open"), this.enableScroll(), document.body.style.scrollBehavior = "auto", document.documentElement.style.scrollBehavior = "auto", this.options.isClose(this), this.isOpen = !1, this.focusTrap(), this.reOpen && (this.reOpen = !1, this.open()))
            }
            focusCatch(t) {
                const e = this.modalContainer.querySelectorAll(this._focusElements),
                    o = Array.prototype.slice.call(e),
                    n = o.indexOf(document.activeElement);
                t.shiftKey && 0 === n && (o[o.length - 1].focus(), t.preventDefault()), t.shiftKey || n !== o.length - 1 || (o[0].focus(), t.preventDefault())
            }
            focusTrap() {
                const t = this.modalContainer.querySelectorAll(this._focusElements);
                this.isOpen ? t.length && t[0].focus() : this.previousActiveElement.focus()
            }
            disableScroll() {
                let t = window.scrollY;
                this.lockPadding(), document.body.classList.add("disable-scroll"), document.body.dataset.position = t, document.body.style.top = -t + "px"
            }
            enableScroll() {
                let t = parseInt(document.body.dataset.position, 10);
                this.unlockPadding(), document.body.style.top = "auto", document.body.classList.remove("disable-scroll"), window.scroll({
                    top: t,
                    left: 0
                }), document.body.removeAttribute("data-position")
            }
            lockPadding() {
                let t = window.innerWidth - document.body.offsetWidth + "px";
                this._fixBlocks.forEach(e => {
                    e.style.paddingRight = t
                }), document.body.style.paddingRight = t
            }
            unlockPadding() {
                this._fixBlocks.forEach(t => {
                    t.style.paddingRight = "0px"
                }), document.body.style.paddingRight = "0px"
            }
        }
    }, function(t, e, o) {
        "use strict";
        o.r(e),
            function(t) {
                var e = o(0);
                o(3), o(4);
                t.GraphModal = e.a
            }.call(this, o(2))
    }, function(t, e) {
        var o;
        o = function() {
            return this
        }();
        try {
            o = o || new Function("return this")()
        } catch (t) {
            "object" == typeof window && (o = window)
        }
        t.exports = o
    }, function(t, e) {
        "undefined" != typeof Element && (Element.prototype.matches || (Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector), Element.prototype.closest || (Element.prototype.closest = function(t) {
            var e = this;
            do {
                if (e.matches(t)) return e;
                e = e.parentElement || e.parentNode
            } while (null !== e && 1 === e.nodeType);
            return null
        }))
    }, function(t, e, o) {}]);
    const modal = new GraphModal();
    var phoneMask = IMask(
        document.getElementById('order-call__phone'), {
            mask: '+{7} (000) 000 - 00 - 00'
        });
    var phoneMask = IMask(
        document.getElementById('consultation__phone'), {
            mask: '+{7} (000) 000 - 00 - 00'
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
    document.querySelector('#client').addEventListener('click', () => {
        document.querySelector('.auth__img').innerHTML = document.querySelector('#client-img').innerHTML;
    });
    document.querySelector('#driver').addEventListener('click', () => {
        document.querySelector('.auth__img').innerHTML = document.querySelector('#driver-img').innerHTML;
    });
    let time = 60;

    function calcTime() {
        time--;
        document.querySelector('.auth-form__time').textContent = time;
    }
});
