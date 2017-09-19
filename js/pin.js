'use strict';

(function () {
  var PIN_WIDTH = 56;
  var PIN_HEIGHT = 75;
  var PIN_IMG_SIZE = 40;
  var LOW_PRICE = 10000;
  var HIGH_PRICE = 50000;

  var util = window.util;
  var showCard = window.showCard;

  var getPinImg = function (src) {
    var img = document.createElement('img');
    img.src = src;
    img.className = 'rounded';
    img.setAttribute('width', PIN_IMG_SIZE);
    img.setAttribute('height', PIN_IMG_SIZE);
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
    generatePin: function (advert) {
      var pin = document.createElement('div');
      var pinX = advert.location.x - PIN_WIDTH / 2;
      var pinY = advert.location.y - PIN_HEIGHT;

      pin.className = 'pin';
      pin.style = 'left: ' + pinX + 'px; ' + 'top: ' + pinY + 'px;';
      pin.appendChild(getPinImg(advert.author.avatar));

      pin.addEventListener('click', function () {
        showCard(advert);
      });

      pin.addEventListener('keydown', function (evt) {
        util.isEnterEvent(evt, function () {
          if (evt.target === document.activeElement) {
            showCard(advert);
          }
        });
      });

      pin.dataset.housingType = advert.offer.type;

      if (advert.offer.price < LOW_PRICE) {
        pin.dataset.housingPrice = 'low';
      } else if (advert.offer.price > HIGH_PRICE) {
        pin.dataset.housingPrice = 'high';
      } else {
        pin.dataset.housingPrice = 'middle';
      }

      pin.dataset.housingRooms = advert.offer.rooms;

      pin.dataset.housingGuests = advert.offer.guests;

      pin.dataset.housingFeatures = advert.offer.features.join(' ');

      pin.classList.add('hidden');

      return pin;
    },
    createPins: function (block, adverts) {
      var fragment = document.createDocumentFragment();

      for (var j = 0; j < adverts.length; j++) {
        fragment.appendChild(window.pin.generatePin(adverts[j]));
      }

      block.appendChild(fragment);
    },
    showPins: function (block, number) {
      var pins = block.querySelectorAll('.pin');
      var pinsArray = [];
      var pinsToShow = [];

      for (var j = 0; j < pins.length; j++) {
        if (!pins[j].classList.contains('pin__main')) {
          pinsArray.push(pins[j]);
        }
      }
      for (var i = 0; i < number; i++) {
        pinsToShow[i] = util.ejectRandomElement(pinsArray);
        pinsToShow[i].classList.remove('hidden');
      }
    }
  };
})();
