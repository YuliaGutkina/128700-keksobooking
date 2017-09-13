'use strict';

(function () {
  var pinWidth = 56;
  var pinHeight = 75;

  var util = window.util;
  var showCard = window.showCard;
  var data = window.data;

  window.pin = {
    checkActivePins: function (map) {
      var pins = map.querySelectorAll('.pin');
      for (var i = 0; i < pins.length; i++) {
        pins[i].classList.remove('pin--active');
      }
    },
    activatePin: function (map, pin) {
      window.pin.checkActivePins(map);
      pin.classList.add('pin--active');
    },
    generatePin: function (ad) {
      var pin = document.createElement('div');
      var pinX = ad.location.x - pinWidth / 2;
      var pinY = ad.location.y - pinHeight;

      pin.className = 'pin';
      pin.style = 'left: ' + pinX + 'px; ' + 'top: ' + pinY + 'px;';
      pin.innerHTML = '<img src=\"' + ad.author.avatar + '\" class="rounded" width="40" height="40" tabindex="0">';

      pin.addEventListener('click', function () {
        showCard(ad);
      });

      pin.addEventListener('keydown', function (evt) {
        util.isEnterEvent(evt, function () {
          if (evt.target === document.activeElement) {
            showCard(ad);
          }
        });
      });

      return pin;
    },
    showPins: function (block, count) {
      var fragment = document.createDocumentFragment();
      var ads = data.createSimilarAds(count);

      for (var j = 0; j < count; j++) {
        fragment.appendChild(window.pin.generatePin(ads[j]));
      }

      block.appendChild(fragment);
    }
  };
})();
