'use strict';

(function () {
  var mapWrapper = document.querySelector('.tokyo');
  var pinMap = document.querySelector('.tokyo__pin-map');
  var count = 8;
  var pinHandle = pinMap.querySelector('.pin__main');

  var adAddressInput = document.querySelector('#address');

  var pin = window.pin;
  var dialog = window.dialog;
  var util = window.util;

  pin.showPins(pinMap, count);

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
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      if ((moveEvt.clientX < 300) || (moveEvt.clientX > 900) || (moveEvt.clientY < 100) || (moveEvt.clientY > 500)) {
        shift.x = 0;
        shift.y = 0;
      }

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      pinHandle.style.top = (pinHandle.offsetTop - shift.y) + 'px';
      pinHandle.style.left = (pinHandle.offsetLeft - shift.x) + 'px';

      realCoords.x = (pinHandle.offsetLeft - shift.x) + pinHandle.clientWidth / 2;
      realCoords.y = (pinHandle.offsetTop - shift.y) + pinHandle.clientHeight;

      showAddress(adAddressInput, realCoords.x, realCoords.y);
    };

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
