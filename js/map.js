'use strict';

(function () {
  var PINS_NUMBER = 3;

  var mapWrapper = document.querySelector('.tokyo');
  var pinMap = document.querySelector('.tokyo__pin-map');
  var pinHandle = pinMap.querySelector('.pin__main');
  var adverts = [];

  var adAddressInput = document.querySelector('#address');

  var pin = window.pin;
  var dialog = window.dialog;
  var util = window.util;
  var backend = window.backend;

  dialog.closeDialog();
  backend.load(onLoad, onError);

  function onLoad(data) {
    adverts = data;
    pin.createPins(pinMap, adverts);
    pin.showPins(pinMap, PINS_NUMBER);
  }

  function onError(message) {
    window.backend.showErrorMsg(message);
  }

  mapWrapper.addEventListener('click', function (evt) {
    launchMapAction(evt.target);
  });

  mapWrapper.addEventListener('keydown', function (evt) {
    util.isEnterEvent(evt, function () {
      launchMapAction(evt.target);
    });
  });

  function launchMapAction(target) {
    while (target !== mapWrapper) {
      if (target.classList.contains('pin')) {
        pin.activatePin(pinMap, target);
        dialog.openDialog();
        return;
      }
      if (target.classList.contains('dialog__close')) {
        pin.checkActivePins(pinMap);
        dialog.closeDialog();
        return;
      }
      target = target.parentNode;
    }
  }

  pinHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var realCoords = {};

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.pageX,
        y: startCoords.y - moveEvt.pageY
      };

      if (checkPinLocation(pinHandle.offsetLeft - shift.x, pinHandle.offsetTop - shift.y)) {
        shift.x = 0;
        shift.y = 0;
      }

      setPinLocation(pinHandle.offsetLeft - shift.x, pinHandle.offsetTop - shift.y);
      showAddress(adAddressInput, realCoords.x, realCoords.y);

      startCoords = {
        x: moveEvt.pageX,
        y: moveEvt.pageY
      };
    };

    function checkPinLocation(x, y) {
      return ((x < 0) || (x > mapWrapper.clientWidth - pinHandle.clientWidth) || (y < 0) || (y > mapWrapper.clientHeight - pinHandle.clientHeight));
    }

    function setPinLocation(x, y) {
      pinHandle.style.left = x + 'px';
      pinHandle.style.top = y + 'px';

      realCoords.x = x + pinHandle.clientWidth / 2;
      realCoords.y = y + pinHandle.clientHeight;
    }

    function showAddress(input, addressX, addressY) {
      input.readOnly = true;
      input.value = 'x: ' + addressX + ', ' + 'y: ' + addressY;
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
