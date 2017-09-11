'use strict';

(function () {
  var dialogClose = document.querySelector('.dialog__close');
  var offerDialog = document.querySelector('#offer-dialog');

  var util = window.util;

  function onDialogEscPress(evt) {
    util.isEscEvent(evt, window.dialog.closeDialog);
  }

  dialogClose.addEventListener('click', function () {
    window.dialog.closeDialog();
  });

  dialogClose.addEventListener('keydown', function (evt) {
    util.isEnterEvent(evt, window.dialog.closeDialog);
  });

  window.dialog = {
    openDialog: function () {
      offerDialog.classList.remove('hidden');
      document.addEventListener('keydown', onDialogEscPress);
    },
    closeDialog: function () {
      // pin.checkActivePins(pinMap);
      offerDialog.classList.add('hidden');
      document.removeEventListener('keydown', onDialogEscPress);
    }
  };
})();
