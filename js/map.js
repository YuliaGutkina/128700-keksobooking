'use strict';

(function () {
  var mapWrapper = document.querySelector('.tokyo');
  var pinMap = document.querySelector('.tokyo__pin-map');
  var count = 8;

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
})();
