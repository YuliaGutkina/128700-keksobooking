'use strict';

(function () {
  function generateSimilarAd(params) {
    var SimilarAd = {};
    var authorID = window.util.ejectRandomElement(params.authorIDs);

    SimilarAd.author = {
      avatar: 'img/avatars/user' + authorID + '.png'
    };
    SimilarAd.location = {
      x: window.util.getRandomNumber(300, 900),
      y: window.util.getRandomNumber(100, 500)
    };
    SimilarAd.offer = {
      title: window.util.ejectRandomElement(params.titles),
      address: '' + SimilarAd.location.x + ', ' + SimilarAd.location.y,
      price: window.util.getRandomNumber(1000, 1000000),
      type: window.util.ejectRandomElement(params.types),
      rooms: window.util.getRandomNumber(1, 5),
      guests: window.util.getRandomNumber(1, 100),
      checkin: window.util.getRandomElement(params.times),
      checkout: window.util.getRandomElement(params.times),
      features: window.util.getRandomArray(params.features),
      description: '',
      photos: []
    };
    return SimilarAd;
  }


  window.data = {
    createSimilarAds: function (arrayLength) {
      var ads = [];
      var adParams = {
        titles: ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'],
        types: ['flat', 'house', 'bungalo'],
        times: ['12:00', '13:00', '14:00'],
        authorIDs: window.util.generateIntegerArray(arrayLength),
        features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']
      };
      for (var i = 0; i < arrayLength; i++) {
        ads.push(generateSimilarAd(adParams));
      }
      return ads;
    }
  };
})();
