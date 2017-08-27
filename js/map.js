'use strict';

var offerDialog = document.querySelector('#offer-dialog');
var dialogPanel = document.querySelector('.dialog__panel');
var lodgeTemplate = document.querySelector('#lodge-template').content;
var pinMap = document.querySelector('.tokyo__pin-map');
var simularAds = createSimularAds(8);

showPins(pinMap);
showLodge(simularAds[0]);

function generatePin(ad) {
  var pin = document.createElement('div');
  var realX = ad.location.x; // посчитать
  var realY = ad.location.y; // посчитать
  pin.className = 'pin';
  pin.style = 'left: ' + realX + 'px; ' + 'top: ' + realY + 'px;';
  pin.innerHTML = '<img src=\"' + ad.author.avatar + '\" class="rounded" width="40" height="40">';

  return pin;
}

function showPins(block) {
  var fragment = document.createDocumentFragment();

  for (var j = 0; j < 8; j++) {
    fragment.appendChild(generatePin(simularAds[j]));
  }

  block.appendChild(fragment);
}

function createSimularAds(arrayLength) {
  var ads = [];
  var adParams = {
    titles: ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'],
    types: ['flat', 'house', 'bungalo'],
    times: ['12:00', '13:00', '14:00'],
    authorIDs: [1, 2, 3, 4, 5, 6, 7, 8],
    features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']
  };

  for (var i = 0; i < arrayLength; i++) {
    ads.push(generateSimularAd(adParams));
  }

  return ads;
}

function generateSimularAd(params) {
  var simularAd = {};
  var authorID = '0' + ejectRandomElement(params.authorIDs);

  simularAd.author = {
    avatar: 'img/avatars/user' + authorID + '.png'
  };
  simularAd.location = {
    x: getRandomNumber(300, 900),
    y: getRandomNumber(100, 500)
  };
  simularAd.offer = {
    title: ejectRandomElement(params.titles),
    address: '' + simularAd.location.x + ', ' + simularAd.location.y,
    price: getRandomNumber(1000, 1000000),
    type: ejectRandomElement(params.types),
    rooms: getRandomNumber(1, 5),
    guests: getRandomNumber(1, 100),
    checkin: getRandomElement(params.times),
    checkout: getRandomElement(params.times),
    features: getRandomArray(params.features),
    description: '',
    photos: []
  };

  return simularAd;
}

function showLodge(ad) {
  var lodge = lodgeTemplate.cloneNode(true);
  var offer = ad.offer;
  var author = ad.author;

  lodge.querySelector('.lodge__title').textContent = offer.title;
  lodge.querySelector('.lodge__address').textContent = offer.address;
  lodge.querySelector('.lodge__price').innerHTML = '' + offer.price + '&#x20bd;/ночь';
  lodge.querySelector('.lodge__type').textContent = offer.type; // перевести
  lodge.querySelector('.lodge__rooms-and-guests').innerHTML = 'Для ' + offer.guests + ' гостей в ' + offer.rooms + ' комнатах';
  lodge.querySelector('.lodge__checkin-time').innerHTML = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;
  lodge.querySelector('.lodge__features').innerHTML = 'тут будут спанчики, да';
  lodge.querySelector('.lodge__description').textContent = offer.description;

  offerDialog.querySelector('.dialog__title img').src = author.avatar;

  dialogPanel.classList.add('hidden');
  offerDialog.appendChild(lodge);
  return lodge;
}

// helpers

function getRandomArray(elements) { // что-то пошло не так
  // var newArrayElements = [];
  // var newArrayLength = Math.floor(Math.random() * (elements.length));
  //
  // for (var i = 0; i < newArrayLength; i++) {
  //   newArrayElements.push(ejectRandomElement(elements));
  // }
  //
  // return newArrayElements;
  return elements; // временно
}

function ejectRandomElement(elements) {
  return elements.splice(Math.floor(Math.random() * (elements.length)), 1)[0];
}

function getRandomElement(elements) {
  return elements[Math.floor(Math.random() * (elements.length))];
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
