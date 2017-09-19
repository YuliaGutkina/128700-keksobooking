'use strict';

(function () {
  var offerDialog = document.querySelector('#offer-dialog');

  var util = window.util;

  function onDialogEscPress(evt) {
    util.isEscEvent(evt, window.dialog.closeDialog);
  }

  window.dialog = {
    openDialog: function () {
      offerDialog.classList.remove('hidden');
      document.addEventListener('keydown', onDialogEscPress);
    },
    closeDialog: function () {
      offerDialog.classList.add('hidden');
      document.removeEventListener('keydown', onDialogEscPress);
    }
  };
})();
