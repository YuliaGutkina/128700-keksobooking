'use strict';

(function () {
  var pinMap = document.querySelector('.tokyo__pin-map');
  var count = 8;

  var pin = window.pin;
  var dialog = window.dialog;
  var util = window.util;

  pin.showPins(pinMap, count);

  pinMap.addEventListener('click', function (evt) {
    var target = evt.target;

    while (target !== pinMap) {
      if (target.classList.contains('pin')) {
        pin.activatePin(pinMap, target);
        dialog.openDialog();
        return;
      }
      target = target.parentNode;
    }
  });

  pinMap.addEventListener('keydown', function (evt) {
    util.isEnterEvent(evt, function () {
      var target = evt.target;

      while (target !== pinMap) {
        if (target === document.activeElement) {
          target = target.parentNode;
          pin.activatePin(pinMap, target);
          dialog.openDialog();
          return;
        }
      }
    });
  });
})();
