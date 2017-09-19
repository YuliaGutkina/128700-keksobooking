'use strict';

(function () {
  var HOUSES_PRICES = [0, 1000, 5000, 10000];

  var noticeForm = document.querySelector('.notice__form');
  var advertTitleInput = noticeForm.querySelector('#title');
  var advertPriceInput = noticeForm.querySelector('#price');
  var advertTimeIn = noticeForm.querySelector('#timein');
  var advertTimeOut = noticeForm.querySelector('#timeout');
  var advertType = noticeForm.querySelector('#type');
  var advertCapacity = noticeForm.querySelector('#capacity');
  var advertRoomNumber = noticeForm.querySelector('#room_number');
  var advertAddressInput = noticeForm.querySelector('#address');

  var backend = window.backend;

  noticeForm.addEventListener('submit', function (evt) {
    checkFormValidity(noticeForm);
    backend.save(new FormData(noticeForm), onLoad, onError);
    evt.preventDefault();

    function onLoad() {
      noticeForm.reset();
      window.backend.showErrorMsg('данные отправлены');
    }

    function onError(message) {
      window.backend.showErrorMsg(message);
    }
  });


  advertCapacity.addEventListener('input', function () {
    window.synchronizeFields(advertCapacity, advertRoomNumber, setRoomNumber);
  });

  advertRoomNumber.addEventListener('input', function () {
    window.synchronizeFields(advertRoomNumber, advertCapacity, setCapacity);
  });

  advertTimeIn.addEventListener('input', function () {
    window.synchronizeFields(advertTimeIn, advertTimeOut, syncValues);
  });

  advertTimeOut.addEventListener('input', function () {
    window.synchronizeFields(advertTimeOut, advertTimeIn, syncValues);
  });

  advertPriceInput.addEventListener('input', function () {
    window.synchronizeFields(advertPriceInput, advertType, setHouse);
  });

  advertType.addEventListener('input', function () {
    window.synchronizeFields(advertType, advertPriceInput, setPrice);
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
    if (field1.value >= HOUSES_PRICES[3]) {
      field2.value = 'palace';
    } else if (field1.value >= HOUSES_PRICES[2]) {
      field2.value = 'house';
    } else if (field1.value >= HOUSES_PRICES[1]) {
      field2.value = 'flat';
    } else if (field1.value >= HOUSES_PRICES[0]) {
      field2.value = 'bungalo';
    }
  }

  function setPrice(field1, field2) {
    switch (field1.value) {
      case 'bungalo':
        field2.value = HOUSES_PRICES[0];
        break;
      case 'flat':
        field2.value = HOUSES_PRICES[1];
        break;
      case 'house':
        field2.value = HOUSES_PRICES[2];
        break;
      case 'palace':
        field2.value = HOUSES_PRICES[3];
        break;
    }
  }

  advertAddressInput.addEventListener('invalid', function () {
    if (!advertAddressInput.validity.valid) {
      if (advertAddressInput.validity.valueMissing) {
        advertAddressInput.setCustomValidity('Обязательное поле');
      }
    } else {
      advertAddressInput.setCustomValidity('');
    }
  });

  advertAddressInput.addEventListener('input', function (evt) {
    var target = evt.target;
    target.setCustomValidity('');
  });

  advertTitleInput.addEventListener('invalid', function () {
    if (!advertTitleInput.validity.valid) {
      if (advertTitleInput.validity.tooShort) {
        advertTitleInput.setCustomValidity('Заголовок должен содержать не меньше 30 символов');
      } else if (advertTitleInput.validity.tooLong) {
        advertTitleInput.setCustomValidity('Заголовок не должен превышать 100 символов');
      } else if (advertTitleInput.validity.valueMissing) {
        advertTitleInput.setCustomValidity('Обязательное поле');
      }
    } else {
      advertTitleInput.setCustomValidity('');
    }
  });

  advertTitleInput.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value.length < advertTitleInput.minlength) {
      target.setCustomValidity('Заголовок должен содержать не меньше 30 символов');
    } else if (target.value.length > advertTitleInput.maxlength) {
      target.setCustomValidity('Заголовок не должен превышать 100 символов');
    } else {
      target.setCustomValidity('');
    }
  });

  advertPriceInput.addEventListener('invalid', function () {
    if (!advertPriceInput.validity.valid) {
      if (advertPriceInput.validity.rangeUnderflow) {
        advertPriceInput.setCustomValidity('Цена на может меньше нуля');
      } else if (advertPriceInput.validity.rangeOverflow) {
        advertPriceInput.setCustomValidity('Цена на может быть больше 1000000');
      } else if (advertPriceInput.validity.valueMissing) {
        advertPriceInput.setCustomValidity('Обязательное поле');
      }
    } else {
      advertPriceInput.setCustomValidity('');
    }
  });

  advertPriceInput.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value.length > advertPriceInput.max) {
      target.setCustomValidity('Цена на может быть больше 1000000');
    } else if (target.value.length < advertPriceInput.min) {
      target.setCustomValidity('Цена на может меньше нуля');
    } else {
      target.setCustomValidity('');
    }
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
