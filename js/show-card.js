'use strict';

(function () {
  var offerDialog = document.querySelector('#offer-dialog');
  var dialogPanel = document.querySelector('.dialog__panel');

  function getLodgeFeatures(features) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < features.length; i++) {
      var span = document.createElement('span');
      span.classList.add('feature__image', 'feature__image--' + features[i]);
      fragment.appendChild(span);
    }
    return fragment;
  }

  function translateLodgeType(type) {
    switch (type) {
      case 'house':
        return 'Дом';
      case 'bungalo':
        return 'Бунгало';
      default:
        return 'Квартира';
    }
  }

  window.showCard = function (ad) {
    var offer = ad.offer;
    var author = ad.author;
    offerDialog.querySelector('.lodge__title').textContent = offer.title;
    offerDialog.querySelector('.lodge__address').textContent = offer.address;
    offerDialog.querySelector('.lodge__price').innerHTML = '' + offer.price + '&#x20bd;/ночь';
    offerDialog.querySelector('.lodge__type').textContent = translateLodgeType(offer.type);
    offerDialog.querySelector('.lodge__rooms-and-guests').innerHTML = 'Для ' + offer.guests + ' гостей в ' + offer.rooms + ' комнатах';
    offerDialog.querySelector('.lodge__checkin-time').innerHTML = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;
    offerDialog.querySelector('.lodge__features').innerHTML = '';
    offerDialog.querySelector('.lodge__features').appendChild(getLodgeFeatures(offer.features));
    offerDialog.querySelector('.lodge__description').textContent = offer.description;

    offerDialog.querySelector('.dialog__title img').src = author.avatar;
    dialogPanel.classList.remove('hidden');
  };
})();
