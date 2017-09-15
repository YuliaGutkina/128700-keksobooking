'use strict';

(function () {
  var loadUrl = 'https://1510.dump.academy/keksobooking/data';
  var saveUrl = 'https://1510.dump.academy/keksobooking';
  var errors = [];

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();

      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = 10000; // 10s

      xhr.open('GET', loadUrl);
      xhr.send();
    },

    save: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError(xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = 10000; // 10s

      xhr.open('POST', saveUrl);
      xhr.send(data);
    },
    showErrorMsg: function (message) {
      var block = document.createElement('div');
      block.style = 'position: fixed; top: 50px; right: 50px; padding: 20px; background-color: white; border-radius: 2px; transform: ease-out 1s;z-index: 10';
      errors.push(message);
      for (var i = 0; i < errors.length; i++) {
        block.innerHTML = '<p>' + errors[i] + '</p>';
      }
      document.body.appendChild(block);
    }
  };
})();
