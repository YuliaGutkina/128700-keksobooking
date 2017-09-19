'use strict';

(function () {
  var TIMEOUT = 10000;

  var loadUrl = 'https://1510.dump.academy/keksobooking/data';
  var saveUrl = 'https://1510.dump.academy/keksobooking';

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
        onError('Запрос не успел выполниться за ' + TIMEOUT + 'мс');
      });

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
        onError('Запрос не успел выполниться за ' + TIMEOUT + 'мс');
      });

      xhr.open('POST', saveUrl);
      xhr.send(data);
    },
    showErrorMsg: function (message) {
      if (!errorBlock) {
        var errorBlock = document.createElement('div');
        errorBlock.style = 'position: fixed; top: 50px; right: 50px; padding: 20px; background-color: white; border-radius: 2px; transform: ease-out 1s;z-index: 10';
        document.body.appendChild(errorBlock);
        errorBlock.classList.remove('hidden');
      }

      var newMessage = document.createElement('p');
      newMessage.textContent = message;
      errorBlock.appendChild(newMessage);

      setTimeout(function () {
        errorBlock.classList.add('hidden');
      }, 10000);
    }
  };
})();
