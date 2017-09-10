'use strict';

(function () {
  var pinMap = document.querySelector('.tokyo__pin-map');
  var dialogClose = document.querySelector('.dialog__close');
  var offerDialog = document.querySelector('#offer-dialog');

  showPins(pinMap);

  function onDialogEscPress(evt) {
    window.util.isEscEvent(evt, closeDialog);
  }

  pinMap.addEventListener('click', function (evt) {
    var target = evt.target;

    while (target !== pinMap) {
      if (target.classList.contains('pin')) {
        window.pin.activatePin(pinMap, target);
        openDialog();
        return;
      }
      target = target.parentNode;
    }
  });

  pinMap.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, function () {
      var target = evt.target;

      while (target !== pinMap) {
        if (target === document.activeElement) {
          target = target.parentNode;
          window.pin.activatePin(pinMap, target);
          openDialog();
          return;
        }
      }
    });
  });

  dialogClose.addEventListener('click', function () {
    closeDialog();
  });

  dialogClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closeDialog);
  });

  function openDialog() {
    offerDialog.classList.remove('hidden');
    document.addEventListener('keydown', onDialogEscPress);
  }

  function closeDialog() {
    window.pin.checkActivePins(pinMap);
    offerDialog.classList.add('hidden');
    document.removeEventListener('keydown', onDialogEscPress);
  }

  function showPins(block) {
    var fragment = document.createDocumentFragment();

    for (var j = 0; j < 8; j++) {
      fragment.appendChild(window.pin.generatePin(window.pin.SimilarAds[j], j));
    }

    block.appendChild(fragment);
  }
})();
