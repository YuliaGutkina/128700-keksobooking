'use strict';

(function () {
  var noticeForm = document.querySelector('.notice__form');
  var adTitleInput = noticeForm.querySelector('#title');
  var adPriceInput = noticeForm.querySelector('#price');
  var adTimeIn = noticeForm.querySelector('#timein');
  var adTimeOut = noticeForm.querySelector('#timeout');
  var adType = noticeForm.querySelector('#type');
  var adCapacity = noticeForm.querySelector('#capacity');
  var adRoomNumber = noticeForm.querySelector('#room_number');
  var adAddressInput = noticeForm.querySelector('#address');

  var util = window.util;

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
    util.syncValues(adTimeIn, adTimeOut);
  });

  adTimeOut.addEventListener('input', function () {
    util.syncValues(adTimeOut, adTimeIn);
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

  adAddressInput.addEventListener('invalid', function () {
    if (!adAddressInput.validity.valid) {
      if (adAddressInput.validity.valueMissing) {
        adAddressInput.setCustomValidity('Обязательное поле');
      }
    } else {
      adAddressInput.setCustomValidity('');
    }
  });

  adAddressInput.addEventListener('input', function (evt) {
    var target = evt.target;
    target.setCustomValidity('');
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
    if (target.value.length < adTitleInput.minlength) {
      target.setCustomValidity('Заголовок должен содержать не меньше 30 символов');
    } else if (target.value.length > adTitleInput.maxlength) {
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
      }
    } else {
      adPriceInput.setCustomValidity('');
    }
  });

  adPriceInput.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value.length > adPriceInput.max) {
      target.setCustomValidity('Цена на может быть больше 1000000');
    } else if (target.value.length < adPriceInput.min) {
      target.setCustomValidity('Цена на может меньше нуля');
    } else {
      target.setCustomValidity('');
    }
  });

  noticeForm.addEventListener('submit', function () {
    checkFormValidity(noticeForm);
  });

  noticeForm.querySelector('.form__submit').addEventListener('click', function () {
    checkFormValidity(noticeForm);
  });

  function checkFormValidity(form) {
    var fields = form.elements;
    for (var i = 0; i < fields.length; i++) {
      if (!fields[i].validity.valid) {
        fields[i].style = 'outline: 1px solid red';
        fields[i].addEventListener('input', function (evt) {
          var target = evt.target;
          if (target.validity.valid) {
            target.style = 'outline: none;';
          }
        });
      }
    }
  }
})();
