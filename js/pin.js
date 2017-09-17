'use strict';

(function () {
  var pinWidth = 56;
  var pinHeight = 75;

  var util = window.util;
  var showCard = window.showCard;

  var getPinImg = function (src) {
    var img = document.createElement('img');
    img.src = src;
    img.className = 'rounded';
    img.setAttribute('width', 40);
    img.setAttribute('height', 40);
    img.setAttribute('tabindex', 0);

    return img;
  };

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
      pin.appendChild(getPinImg(ad.author.avatar));

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

      pin.dataset.housingType = ad.offer.type;

      if (ad.offer.price < 10000) {
        pin.dataset.housingPrice = 'low';
      } else if (ad.offer.price > 50000) {
        pin.dataset.housingPrice = 'high';
      } else {
        pin.dataset.housingPrice = 'middle';
      }

      pin.dataset.housingRooms = ad.offer.rooms;

      pin.dataset.housingGuests = ad.offer.guests;

      pin.dataset.housingFeatures = ad.offer.features.join(' ');

      pin.classList.add('hidden');

      return pin;
    },
    showPins: function (block, ads) {
      var fragment = document.createDocumentFragment();

      for (var j = 0; j < ads.length; j++) {
        fragment.appendChild(window.pin.generatePin(ads[j]));
      }

      block.appendChild(fragment);
      window.filterElements('.pin');
    },
  };
})();
