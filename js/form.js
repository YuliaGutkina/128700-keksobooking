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

  noticeForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(noticeForm), function () {
      // userDialog.classList.add('hidden');
    });
    evt.preventDefault();
  });

  adCapacity.addEventListener('input', function () {
    window.synchronizeFields(adCapacity, adRoomNumber, setRoomNumber);
  });

  adRoomNumber.addEventListener('input', function () {
    window.synchronizeFields(adRoomNumber, adCapacity, setCapacity);
  });

  adTimeIn.addEventListener('input', function () {
    window.synchronizeFields(adTimeIn, adTimeOut, syncValues);
  });

  adTimeOut.addEventListener('input', function () {
    window.synchronizeFields(adTimeOut, adTimeIn, syncValues);
  });

  adPriceInput.addEventListener('input', function () {
    window.synchronizeFields(adPriceInput, adType, setHouse);
  });

  adType.addEventListener('input', function () {
    window.synchronizeFields(adType, adPriceInput, setPrice);
  });

  function setRoomNumber(field1, field2) {
    switch (field1.value) {
      case ('0') :
        field2.value = '100';
        break;
      case ('1') :
        field2.value = '1';
        break;
      case ('2') :
        field2.value = '2';
        break;
      case ('3') :
        field2.value = '3';
        break;
    }
  }

  function setCapacity(field1, field2) {
    if (field1.value === '100') {
      field2.value = '0';
    }
    if (field1.value === '1') {
      field2.value = '1';
    }
    if ((field1.value === '2') && (+field2.value > +field1.value)) {
      field2.value = '2';
    }
    if ((field1.value === '3') && (+field2.value > +field1.value)) {
      field2.value = '3';
    }
  }

  function syncValues(field1, field2) {
    field2.value = field1.value;
  }

  function setHouse(field1, field2) {
    if (field1.value >= 10000) {
      field2.value = 'palace';
    } else if (field1.value >= 5000) {
      field2.value = 'house';
    } else if (field1.value >= 1000) {
      field2.value = 'flat';
    } else if (field1.value >= 0) {
      field2.value = 'bungalo';
    }
  }

  function setPrice(field1, field2) {
    switch (field1.value) {
      case 'bungalo':
        field2.value = 0;
        break;
      case 'flat':
        field2.value = 1000;
        break;
      case 'house':
        field2.value = 5000;
        break;
      case 'palace':
        field2.value = 10000;
        break;
    }
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
