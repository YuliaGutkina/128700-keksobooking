'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var offerDialog = document.querySelector('#offer-dialog');
var dialogPanel = document.querySelector('.dialog__panel');
var pinMap = document.querySelector('.tokyo__pin-map');
var count = 8;
var SimilarAds = createSimilarAds(count);
var pinWidth = 56;
var pinHeight = 75;
var dialogClose = document.querySelector('.dialog__close');
var noticeForm = document.querySelector('.notice__form');
var adTitleInput = noticeForm.querySelector('#title');
var adPriceInput = noticeForm.querySelector('#price');
var adTimeIn = noticeForm.querySelector('#timein');
var adTimeOut = noticeForm.querySelector('#timeout');
var adType = noticeForm.querySelector('#type');
var adCapacity = noticeForm.querySelector('#capacity');
var adRoomNumber = noticeForm.querySelector('#room_number');
var adAddressInput = noticeForm.querySelector('#address');

showPins(pinMap);

noticeForm.addEventListener('submit', function () {
  checkValidity(noticeForm);
});

noticeForm.querySelector('.form__submit').addEventListener('click', function () {
  checkValidity(noticeForm);
});

function checkValidity(form) {
  var fields = form.elements;
  for (var i = 0; i < fields.length; i++) {
    if (!fields[i].validity.valid) {
      fields[i].style = 'border: 1px solid red';
    }
  }
}

adCapacity.addEventListener('input', function () {
  switch (adCapacity.value) {
    case ('0') :
      adRoomNumber.value = '100';
      break;
    case ('1') :
      adRoomNumber.value = '1';
      break;
    case ('2') :
      adRoomNumber.value = '2';
      break;
    case ('3') :
      adRoomNumber.value = '3';
      break;
  }
});

adRoomNumber.addEventListener('input', function () {
  if (adRoomNumber.value === '100') {
    adCapacity.value = '0';
  }
  if (adRoomNumber.value === '1') {
    adCapacity.value = '1';
  }
  if ((adRoomNumber.value === '2') && (+adCapacity.value > +adRoomNumber.value)) {
    adCapacity.value = '2';
  }
  if ((adRoomNumber.value === '3') && (+adCapacity.value > +adRoomNumber.value)) {
    adCapacity.value = '3';
  }
});

adTimeIn.addEventListener('input', function () {
  syncValues(adTimeIn, adTimeOut);
});

adTimeOut.addEventListener('input', function () {
  syncValues(adTimeOut, adTimeIn);
});

adPriceInput.addEventListener('input', function () {
  if (adPriceInput.value >= 10000) {
    adType.value = 'palace';
  } else if (adPriceInput.value >= 5000) {
    adType.value = 'house';
  } else if (adPriceInput.value >= 1000) {
    adType.value = 'flat';
  } else if (adPriceInput.value >= 0) {
    adType.value = 'bungalo';
  }
});

adType.addEventListener('input', function () {
  switch (adType.value) {
    case 'bungalo':
      adPriceInput.value = 0;
      break;
    case 'flat':
      adPriceInput.value = 1000;
      break;
    case 'house':
      adPriceInput.value = 5000;
      break;
    case 'palace':
      adPriceInput.value = 10000;
      break;
  }
});

function syncValues(field1, field2) {
  field2.value = field1.value;
}

adAddressInput.addEventListener('invalid', function () {
  if (!adAddressInput.validity.valid) {
    if (adAddressInput.validity.valueMissing) {
      adAddressInput.setCustomValidity('Обязательное поле');
    }
  } else {
    adAddressInput.setCustomValidity('');
  }
});

adTitleInput.addEventListener('invalid', function () {
  if (!adTitleInput.validity.valid) {
    if (adTitleInput.validity.tooShort) {
      adTitleInput.setCustomValidity('Заголовок должен содержать не меньше 30 символов');
    } else if (adTitleInput.validity.tooLong) {
      adTitleInput.setCustomValidity('Заголовок не должен превышать 100 символов');
    } else if (adTitleInput.validity.valueMissing) {
      adTitleInput.setCustomValidity('Обязательное поле');
    }
  } else {
    adTitleInput.setCustomValidity('');
  }
});

adTitleInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < 30) {
    target.setCustomValidity('Заголовок должен содержать не меньше 30 символов');
  } else if (target.value.length > 100) {
    target.setCustomValidity('Заголовок не должен превышать 100 символов');
  } else {
    target.setCustomValidity('');
  }
});

adPriceInput.addEventListener('invalid', function () {
  if (!adPriceInput.validity.valid) {
    if (adPriceInput.validity.rangeUnderflow) {
      adPriceInput.setCustomValidity('Цена на может меньше нуля');
    } else if (adPriceInput.validity.rangeOverflow) {
      adPriceInput.setCustomValidity('Цена на может быть больше 1000000');
    } else if (adPriceInput.validity.valueMissing) {
      adPriceInput.setCustomValidity('Обязательное поле');
    } else {
      adPriceInput.setCustomValidity('');
    }
  }
});

adPriceInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length > 1000000) {
    target.setCustomValidity('Цена на может быть больше 1000000');
  } else if (target.value.length < 0) {
    target.setCustomValidity('Цена на может меньше нуля');
  } else {
    target.setCustomValidity('');
  }
});

function onDialogEscPress(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeDialog();
  }
}

pinMap.addEventListener('click', function (evt) {
  var target = evt.target;

  while (target !== pinMap) {
    if (target.classList.contains('pin')) {
      activatePin(target);
      openDialog();
      return;
    }
    target = target.parentNode;
  }
});

pinMap.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    var target = evt.target;

    while (target !== pinMap) {
      if (target === document.activeElement) {
        target = target.parentNode;
        activatePin(target);
        openDialog();
        return;
      }
    }
  }
});

dialogClose.addEventListener('click', function () {
  closeDialog();
});

dialogClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeDialog();
  }
});

function activatePin(pin) {
  var pins = pinMap.querySelectorAll('.pin');

  for (var i = 0; i < pins.length; i++) {
    pins[i].classList.remove('pin--active');
  }

  pin.classList.add('pin--active');
}

function openDialog() {
  offerDialog.classList.remove('hidden');
  document.addEventListener('keydown', onDialogEscPress);
}

function closeDialog() {
  var pins = pinMap.querySelectorAll('.pin');

  for (var i = 0; i < pins.length; i++) {
    pins[i].classList.remove('pin--active');
  }
  offerDialog.classList.add('hidden');
  document.removeEventListener('keydown', onDialogEscPress);
}

function generatePin(ad, index) {
  var pin = document.createElement('div');
  var pinX = ad.location.x - pinWidth / 2;
  var pinY = ad.location.y - pinHeight;

  pin.className = 'pin';
  pin.style = 'left: ' + pinX + 'px; ' + 'top: ' + pinY + 'px;';
  pin.innerHTML = '<img src=\"' + ad.author.avatar + '\" class="rounded" width="40" height="40" tabindex="0">';

  pin.addEventListener('click', function () {
    fillLodge(SimilarAds[index]);
  });

  pin.addEventListener('keydown', function (evt) {
    if ((evt.keyCode === ENTER_KEYCODE) && (evt.target === document.activeElement)) {
      fillLodge(SimilarAds[index]);
    }
  });

  return pin;
}

function showPins(block) {
  var fragment = document.createDocumentFragment();

  for (var j = 0; j < 8; j++) {
    fragment.appendChild(generatePin(SimilarAds[j], j));
  }

  block.appendChild(fragment);
}

function createSimilarAds(arrayLength) {
  var ads = [];
  var adParams = {
    titles: ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'],
    types: ['flat', 'house', 'bungalo'],
    times: ['12:00', '13:00', '14:00'],
    authorIDs: generateIntegerArray(count),
    features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']
  };

  for (var i = 0; i < arrayLength; i++) {
    ads.push(generateSimilarAd(adParams));
  }

  return ads;
}

function generateSimilarAd(params) {
  var SimilarAd = {};
  var authorID = ejectRandomElement(params.authorIDs);

  SimilarAd.author = {
    avatar: 'img/avatars/user' + authorID + '.png'
  };
  SimilarAd.location = {
    x: getRandomNumber(300, 900),
    y: getRandomNumber(100, 500)
  };
  SimilarAd.offer = {
    title: ejectRandomElement(params.titles),
    address: '' + SimilarAd.location.x + ', ' + SimilarAd.location.y,
    price: getRandomNumber(1000, 1000000),
    type: ejectRandomElement(params.types),
    rooms: getRandomNumber(1, 5),
    guests: getRandomNumber(1, 100),
    checkin: getRandomElement(params.times),
    checkout: getRandomElement(params.times),
    features: getRandomArray(params.features),
    description: '',
    photos: []
  };

  return SimilarAd;
}

function fillLodge(ad) {
  var offer = ad.offer;
  var author = ad.author;

  offerDialog.querySelector('.lodge__title').textContent = offer.title;
  offerDialog.querySelector('.lodge__address').textContent = offer.address;
  offerDialog.querySelector('.lodge__price').innerHTML = '' + offer.price + '&#x20bd;/ночь';
  offerDialog.querySelector('.lodge__type').textContent = translateLodgeType(offer.type);
  offerDialog.querySelector('.lodge__rooms-and-guests').innerHTML = 'Для ' + offer.guests + ' гостей в ' + offer.rooms + ' комнатах';
  offerDialog.querySelector('.lodge__checkin-time').innerHTML = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;
  offerDialog.querySelector('.lodge__features').innerHTML = '';
  offerDialog.querySelector('.lodge__features').appendChild(getLodgeFeatures(offer.features));
  offerDialog.querySelector('.lodge__description').textContent = offer.description;

  offerDialog.querySelector('.dialog__title img').src = author.avatar;
  dialogPanel.classList.remove('hidden');

  function getLodgeFeatures(features) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < features.length; i++) {
      var span = document.createElement('span');
      span.classList.add('feature__image', 'feature__image--' + features[i]);
      fragment.appendChild(span);
    }
    return fragment;
  }

  function translateLodgeType(type) {
    switch (type) {
      case 'house':
        return 'Дом';
      case 'bungalo':
        return 'Бунгало';
      default:
        return 'Квартира';
    }
  }
}

// helpers

function getRandomArray(elements) {
  var copyElements = elements.slice(0);
  var newArrayElements = [];
  var newArrayLength = Math.floor(Math.random() * copyElements.length);

  for (var i = 0; i < newArrayLength; i++) {
    newArrayElements.push(ejectRandomElement(copyElements));
  }

  return newArrayElements;
}

function ejectRandomElement(elements) {
  return elements.splice(Math.floor(Math.random() * (elements.length)), 1)[0];
}

function getRandomElement(elements) {
  return elements[Math.floor(Math.random() * (elements.length))];
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function generateIntegerArray(num) {
  var arr = [];
  for (var i = 1; i <= num; i++) {
    arr.push((i < 10) ? '0' + i : i.toString());
  }
  return arr;
}
