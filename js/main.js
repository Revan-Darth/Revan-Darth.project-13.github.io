// Menu Burger
	// Мега супер крутое бургер меню, просто огонь качать всем без смс и регистрации. 
	document.querySelector('.menu__burger').addEventListener('click', function (e){
		e.preventDefault();

		if(this.classList.contains('active')) {
		   this.classList.remove('active');
		   document.body.classList.remove('lock');
		   document.querySelector('.header__menu').classList.remove('active');
		} else {
		   this.classList.add('active');
		   document.body.classList.add('lock');
		   document.querySelector('.header__menu').classList.add('active');

		}
	});
// Popup
	const popupLinks = document.querySelectorAll('.popup-link');
	const body = document.querySelector('body');
	const lockPadding = document.querySelectorAll('.lock-padding'); // Добавлять элементу, который багается при Lock'е
	let unlock = true;
	const timeout = 200; // Время выполнения transition, как и в CSS

	if (popupLinks.length > 0) {
		for (let index = 0; index < popupLinks.length; index++){
			const popupLink = popupLinks[index];
			popupLink.addEventListener('click', function (e){
				const popupName = popupLink.getAttribute('href').replace('#', '');
				const curentPopup = document.getElementById(popupName);
				popupOpen(curentPopup);
				e.preventDefault();
			});
		}
	}
	const popupCloseIcon = document.querySelectorAll('.popup__close');
	if (popupCloseIcon.length > 0){
		for (let index = 0; index < popupCloseIcon.length; index++){
			const el = popupCloseIcon[index];
			el.addEventListener('click', function (e) {
				popupClose(el.closest('.popup'));
				e.preventDefault();
			});
		}
	}
	function popupOpen(curentPopup) {
		if (curentPopup && unlock){
			const popupActive = document.querySelector('.popup.open');
			if (popupActive) {
				popupClose(popupActive, false);
			} else {
				bodyLock();
			}
			curentPopup.classList.add('open');
			curentPopup.addEventListener('click', function (e) {
				if (!e.target.closest('.popup__content')) {
					popupClose(e.target.closest('.popup'));
				}
			});
		}
	}
	function popupClose(popupActive, doUnlock = true) {
		if (unlock) {
			popupActive.classList.remove('open');
			if (doUnlock){
				bodyUnLock();
			}
		}
	}
	function bodyLock() {
		const lockPaddingValue = window.innerWidth - document.querySelector('body').offsetWidth + 'px';
		if (lockPadding.length > 0){
			for (let index = 0; index < lockPadding.length; index++) {
				const el = lockPadding[index];
				el.style.paddingRight = lockPaddingValue;
			}
		}
		body.style.paddingRight = lockPaddingValue;
		body.classList.add('lock');
		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, timeout);
	}
	function bodyUnLock() {
		setTimeout(function () {
			if (lockPadding.length > 0) {
				for (let index = 0; index < lockPadding.length; index++) {
					const el = lockPadding[index];
					el.style.paddingRight = '0px';
				}
			}
			body.style.paddingRight = '0px';
			body.classList.remove('lock');
		}, timeout);
		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, timeout);
	}
	document.addEventListener('keydown', function (e) {
		if (e.which === 27) {
			const popupActive = document.querySelector('.popup.open');
			popupClose(popupActive);
		}
	});

	(function () {
		if (!Element.prototype.closest) {
			Element.prototype.closest = function (css) {
				var node = this;
				while (node) {
					if (node.matches(css)) return node;
					else node = node.parentElement;
				}
				return null;
			};
		}
	})();
	(function () {
		if (!Element.prototype.matches) {
			Element.prototype.matches = Element.prototype.matchesSelector ||
				Element.prototype.webkitMatchesSelector ||
				Element.prototype.mozMatchesSelector ||
				Element.prototype.msMatchesSelector;
		}
	})();
// Touch Screen
	// Определение тачСкрина
	const isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
		any: function () {
			return (
				isMobile.Android() ||
				isMobile.BlackBerry() ||
				isMobile.iOS() ||
				isMobile.Opera() ||
				isMobile.Windows());
		}
	};
		// Добавление класса на body в зависимости от экрана
	if (isMobile.any()) {
		document.body.classList.add('_touch');

		let menuArrows = document.querySelectorAll('.menu__arrow'); // Тут мы ищем стрелочку у подменю и если она есть, то при клике на неё добавляем класс _active
		if (menuArrows.length > 0 ) {
			for (let index = 0; index < menuArrows.length; index++) {
				const menuArrow = menuArrows[index];
				menuArrow.addEventListener("click", function (e) {
					menuArrow.parentElement.classList.toggle('.active')
				});
			}
		}
	} else {
		document.body.classList.add('_pc'); // Если не тачСкрин то будет класс пк
	}
// Кнопочка показать/скрыть пароль
	function showPassword() {
		const passwdBtn = document.querySelector('.login__form-password--btn');
		const passwdInp = document.querySelector('.login__form-password--inp');

		passwdBtn.addEventListener('click', (e) => {
			e.preventDefault();
			passwdBtn.classList.toggle('active');

			if (passwdInp.getAttribute('type') === 'password') {
				 passwdInp.setAttribute('type', 'text');
			} else {
				 passwdInp.setAttribute('type', 'password');
			}
		})
	}
	showPassword();
// Валидация Email
	// Пример патерна валидации Российского номера
	let validatePhone = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
	// Пример патерна валидации c цифрами
	let validateDigital = /^[0-9]+$/;
	// Пример патерна валидации c only текстом
	let validateText = /^[A-Za-zА-Яа-яЁё]+$/;
	let validateEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	let input = document.querySelector('#log-email');
	let span  = document.querySelector('.error-message');

	document.querySelector('.login__form-btn').onclick = function(e) {
		e.preventDefault();
		if (!validate (validateEmail, input.value)) {
			notValid(input, span, 'Неверный адресс электронной почты');
		} else {
			valid(input, span, '');
		}
	};

	function validate (regex, input) {
		return regex.test(input);
	};

	function notValid (input, el, mess) {
		input.classList.remove('is-valid');
		input.classList.add('is-invalid');
		el.innerHTML = mess;
	};

	function valid (input, el, mess) {
		input.classList.remove('is-invalid');
		input.classList.add('is-valid');
		el.innerHTML = mess;
	};
// Динамический адаптив
	function DynamicAdapt(type) {
		this.type = type;
	}

	DynamicAdapt.prototype.init = function () {
		const _this = this;
		// массив объектов
		this.оbjects = [];
		this.daClassname = "_dynamic_adapt_";
		// массив DOM-элементов
		this.nodes = document.querySelectorAll("[data-da]");

		// наполнение оbjects объктами
		for (let i = 0; i < this.nodes.length; i++) {
			const node = this.nodes[i];
			const data = node.dataset.da.trim();
			const dataArray = data.split(",");
			const оbject = {};
			оbject.element = node;
			оbject.parent = node.parentNode;
			оbject.destination = document.querySelector(dataArray[0].trim());
			оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
			оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
			оbject.index = this.indexInParent(оbject.parent, оbject.element);
			this.оbjects.push(оbject);
		}

		this.arraySort(this.оbjects);

		// массив уникальных медиа-запросов
		this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
			return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
		}, this);
		this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
			return Array.prototype.indexOf.call(self, item) === index;
		});

		// навешивание слушателя на медиа-запрос
		// и вызов обработчика при первом запуске
		for (let i = 0; i < this.mediaQueries.length; i++) {
			const media = this.mediaQueries[i];
			const mediaSplit = String.prototype.split.call(media, ',');
			const matchMedia = window.matchMedia(mediaSplit[0]);
			const mediaBreakpoint = mediaSplit[1];

			// массив объектов с подходящим брейкпоинтом
			const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
				return item.breakpoint === mediaBreakpoint;
			});
			matchMedia.addListener(function () {
				_this.mediaHandler(matchMedia, оbjectsFilter);
			});
			this.mediaHandler(matchMedia, оbjectsFilter);
		}
	};

	DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
		if (matchMedia.matches) {
			for (let i = 0; i < оbjects.length; i++) {
				const оbject = оbjects[i];
				оbject.index = this.indexInParent(оbject.parent, оbject.element);
				this.moveTo(оbject.place, оbject.element, оbject.destination);
			}
		} else {
			for (let i = 0; i < оbjects.length; i++) {
				const оbject = оbjects[i];
				if (оbject.element.classList.contains(this.daClassname)) {
					this.moveBack(оbject.parent, оbject.element, оbject.index);
				}
			}
		}
	};

	// Функция перемещения
	DynamicAdapt.prototype.moveTo = function (place, element, destination) {
		element.classList.add(this.daClassname);
		if (place === 'last' || place >= destination.children.length) {
			destination.insertAdjacentElement('beforeend', element);
			return;
		}
		if (place === 'first') {
			destination.insertAdjacentElement('afterbegin', element);
			return;
		}
		destination.children[place].insertAdjacentElement('beforebegin', element);
	}

	// Функция возврата
	DynamicAdapt.prototype.moveBack = function (parent, element, index) {
		element.classList.remove(this.daClassname);
		if (parent.children[index] !== undefined) {
			parent.children[index].insertAdjacentElement('beforebegin', element);
		} else {
			parent.insertAdjacentElement('beforeend', element);
		}
	}

	// Функция получения индекса внутри родителя
	DynamicAdapt.prototype.indexInParent = function (parent, element) {
		const array = Array.prototype.slice.call(parent.children);
		return Array.prototype.indexOf.call(array, element);
	};

	// Функция сортировки массива по breakpoint и place 
	// по возрастанию для this.type = min
	// по убыванию для this.type = max
	DynamicAdapt.prototype.arraySort = function (arr) {
		if (this.type === "min") {
			Array.prototype.sort.call(arr, function (a, b) {
				if (a.breakpoint === b.breakpoint) {
					if (a.place === b.place) {
						return 0;
					}

					if (a.place === "first" || b.place === "last") {
						return -1;
					}

					if (a.place === "last" || b.place === "first") {
						return 1;
					}

					return a.place - b.place;
				}

				return a.breakpoint - b.breakpoint;
			});
		} else {
			Array.prototype.sort.call(arr, function (a, b) {
				if (a.breakpoint === b.breakpoint) {
					if (a.place === b.place) {
						return 0;
					}

					if (a.place === "first" || b.place === "last") {
						return 1;
					}

					if (a.place === "last" || b.place === "first") {
						return -1;
					}

					return b.place - a.place;
				}

				return b.breakpoint - a.breakpoint;
			});
			return;
		}
	};

	const daAdaptive = new DynamicAdapt("max");
	daAdaptive.init();
// Слайдер
	new Swiper('.main', {
		direction: 'vertical',

		// pagination: {
		// 	el: '.swiper-pagination',
		// 	type: 'progressbar'
		// },

		scrollbar: {
	    	el: '.swiper-scrollbar',
	    	draggable: true,
	  	},

	  	keyboard: {
	  		enabled: true,
	  		onlyInViewport: true,
	  		pageUpDown: true,
	  	},

	  	mousewheel: {
	  		sensitivity: 1,
	  	},
	  	effect: 'flip',
	  	flipEffect: {
	    	slideShadows: false,
	    },
	    autoHeight: true,
	});
	new Swiper('.reviews__wrapper', {
		grabCursor: true,
	    slidesPerView: 1.1,
	    spaceBetween: 20,
	    autoHeight: true,
	    nested: true,
	    slideToClickedSlide: false,
	    a11y: {
	    	prevSlideMessage: 'Previous slide',
	    	nextSlideMessage: 'Next slide',
	    	firstSlideMessage: 	'This is the first slide',
	    	lastSlideMessage: 	'This is the last slide',
	  	},
	  	breakpoints: {
	  		1260:{
	  			slidesPerView: 2.6,
	  		},
	  		992:{
	  			slidesPerView: 2,
	  		},
	  	}
	});

