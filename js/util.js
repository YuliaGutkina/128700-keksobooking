'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.util = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    ejectRandomElement: function (elements) {
      return elements.splice(Math.floor(Math.random() * (elements.length)), 1)[0];
    },
    getRandomElement: function (elements) {
      return elements[Math.floor(Math.random() * (elements.length))];
    },
    getRandomNumber: function (min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    generateIntegerArray: function (num) {
      var arr = [];
      for (var i = 1; i <= num; i++) {
        arr.push((i < 10) ? '0' + i : i.toString());
      }
      return arr;
    },
    getRandomArray: function (elements) {
      var copyElements = elements.slice(0);
      var newArrayElements = [];
      var newArrayLength = Math.floor(Math.random() * copyElements.length);

      for (var i = 0; i < newArrayLength; i++) {
        newArrayElements.push(window.util.ejectRandomElement(copyElements));
      }
      return newArrayElements;
    }
  };
})();
