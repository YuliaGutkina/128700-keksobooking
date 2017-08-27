'use strict';

var offerDialog = document.querySelector('#offer-dialog');
var dialogPanel = document.querySelector('.dialog__panel');
var lodgeTemplate = document.querySelector('#lodge-template').content;
var pinMap = document.querySelector('.tokyo__pin-map');
var count = 8;
var SimilarAds = createSimilarAds(count);
var pinWidth = 56;
var pinHeight = 75;

showPins(pinMap);
showLodge(SimilarAds[0]);

function generatePin(ad) {
  var pin = document.createElement('div');
  var pinX = ad.location.x - pinWidth / 2;
  var pinY = ad.location.y - pinHeight;
  pin.className = 'pin';
  pin.style = 'left: ' + pinX + 'px; ' + 'top: ' + pinY + 'px;';
  pin.innerHTML = '<img src=\"' + ad.author.avatar + '\" class="rounded" width="40" height="40">';

  return pin;
}

function showPins(block) {
  var fragment = document.createDocumentFragment();

  for (var j = 0; j < 8; j++) {
    fragment.appendChild(generatePin(SimilarAds[j]));
  }

  block.appendChild(fragment);
}

function createSimilarAds(arrayLength) {
  var ads = [];
  var adParams = {
    titles: ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'],
    types: ['flat', 'house', 'bungalo'],
    times: ['12:00', '13:00', '14:00'],
    authorIDs: generateIntegerArray(count),
    features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']
  };

  for (var i = 0; i < arrayLength; i++) {
    ads.push(generateSimilarAd(adParams));
  }

  return ads;
}

function generateSimilarAd(params) {
  var SimilarAd = {};
  var authorID = ejectRandomElement(params.authorIDs);

  SimilarAd.author = {
    avatar: 'img/avatars/user' + authorID + '.png'
  };
  SimilarAd.location = {
    x: getRandomNumber(300, 900),
    y: getRandomNumber(100, 500)
  };
  SimilarAd.offer = {
    title: ejectRandomElement(params.titles),
    address: '' + SimilarAd.location.x + ', ' + SimilarAd.location.y,
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

  return SimilarAd;
}

function showLodge(ad) {
  var lodge = lodgeTemplate.cloneNode(true);
  var offer = ad.offer;
  var author = ad.author;

  lodge.querySelector('.lodge__title').textContent = offer.title;
  lodge.querySelector('.lodge__address').textContent = offer.address;
  lodge.querySelector('.lodge__price').innerHTML = '' + offer.price + '&#x20bd;/ночь';
  lodge.querySelector('.lodge__type').textContent = translateLodgeType(offer.type);
  lodge.querySelector('.lodge__rooms-and-guests').innerHTML = 'Для ' + offer.guests + ' гостей в ' + offer.rooms + ' комнатах';
  lodge.querySelector('.lodge__checkin-time').innerHTML = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;
  lodge.querySelector('.lodge__features').appendChild(getLodgeFeatures(offer.features));
  lodge.querySelector('.lodge__description').textContent = offer.description;

  offerDialog.querySelector('.dialog__title img').src = author.avatar;

  dialogPanel.classList.add('hidden');
  offerDialog.appendChild(lodge);

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

  return lodge;
}

// helpers

function getRandomArray(elements) {
  var copyElements = elements.slice(0);
  var newArrayElements = [];
  var newArrayLength = Math.floor(Math.random() * copyElements.length);

  for (var i = 0; i < newArrayLength; i++) {
    newArrayElements.push(ejectRandomElement(copyElements));
  }

  return newArrayElements;
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

function generateIntegerArray(num) {
  var arr = [];
  for (var i = 1; i <= num; i++) {
    arr.push((i < 10) ? '0' + i : i.toString());
  }
  return arr;
}
