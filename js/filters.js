'use strict';

(function () {
  var formFilters = document.querySelector('.tokyo__filters');
  var housingType = formFilters.querySelector('#housing_type');
  var housingPrice = formFilters.querySelector('#housing_price');
  var housingRooms = formFilters.querySelector('#housing_room-number');
  var housingGuests = formFilters.querySelector('#housing_guests-number');
  var housingFeatures = formFilters.querySelector('#housing_features');

  formFilters.addEventListener('change', getFilters);

  function getFilters() {
    var filters = {};
    var features = housingFeatures.querySelectorAll('input');
    filters.housingFeatures = [];

    for (var i = 0; i < features.length; i++) {

      if (features[i].checked) {
        filters.housingFeatures.push(features[i].value);
      }
    }

    filters.housingType = housingType.value;
    filters.housingGuests = housingGuests.value;
    filters.housingPrice = housingPrice.value;
    filters.housingRooms = housingRooms.value;

    // console.log(filters);
    return filters;
  }

})();
