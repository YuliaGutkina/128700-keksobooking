'use strict';

(function () {
  var mapLeftTopCorner = {
    x: 300,
    y: 100
  };
  var mapRightBottomCorner = {
    x: 900,
    y: 500
  };

  var util = window.util;

  function generateSimilarAd(params) {
    var SimilarAd = {};
    var authorID = util.ejectRandomElement(params.authorIDs);

    SimilarAd.author = {
      avatar: 'img/avatars/user' + authorID + '.png'
    };
    SimilarAd.location = {
      x: util.getRandomNumber(mapLeftTopCorner.x, mapRightBottomCorner.x),
      y: util.getRandomNumber(mapLeftTopCorner.y, mapRightBottomCorner.y)
    };
    SimilarAd.offer = {
      title: util.ejectRandomElement(params.titles),
      address: '' + SimilarAd.location.x + ', ' + SimilarAd.location.y,
      price: util.getRandomNumber(1000, 1000000),
      type: util.ejectRandomElement(params.types),
      rooms: util.getRandomNumber(1, 5),
      guests: util.getRandomNumber(1, 100),
      checkin: util.getRandomElement(params.times),
      checkout: util.getRandomElement(params.times),
      features: util.getRandomArray(params.features),
      description: '',
      photos: []
    };
    return SimilarAd;
  }


  window.data = {
    mapLeftTopCorner: mapLeftTopCorner,
    mapRightBottomCorner: mapRightBottomCorner,
    createSimilarAds: function (arrayLength) {
      var ads = [];
      var adParams = {
        titles: ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'],
        types: ['flat', 'house', 'bungalo'],
        times: ['12:00', '13:00', '14:00'],
        authorIDs: util.generateIntegerArray(arrayLength),
        features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']
      };
      for (var i = 0; i < arrayLength; i++) {
        ads.push(generateSimilarAd(adParams));
      }
      return ads;
    }
  };
})();
