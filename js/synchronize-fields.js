'use strict';

(function () {
  window.synchronizeFields = function (field1, field2, callback) {

    if (typeof callback === 'function') {
      callback(field1, field2);
    }
  };
})();
