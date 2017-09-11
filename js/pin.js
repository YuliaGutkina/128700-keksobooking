'use strict';

(function () {
  var pinWidth = 56;
  var pinHeight = 75;
  var count = 8;

  window.pin = {
    SimilarAds: window.data.createSimilarAds(count),
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
    generatePin: function (ad, index) {
      var pin = document.createElement('div');
      var pinX = ad.location.x - pinWidth / 2;
      var pinY = ad.location.y - pinHeight;

      pin.className = 'pin';
      pin.style = 'left: ' + pinX + 'px; ' + 'top: ' + pinY + 'px;';
      pin.innerHTML = '<img src=\"' + ad.author.avatar + '\" class="rounded" width="40" height="40" tabindex="0">';

      pin.addEventListener('click', function () {
        window.card.fillLodge(window.pin.SimilarAds[index]);
      });

      pin.addEventListener('keydown', function (evt) {
        window.util.isEnterEvent(evt, function () {
          if (evt.target === document.activeElement) {
            window.card.fillLodge(window.pin.SimilarAds[index]);
          }
        });
      });

      return pin;
    }
  };
})();
