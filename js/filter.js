'use strict';

(function () {

  var COUNT_RANDOM_PICTURES = 10;
  var ARRAY_CORRECT = 1;
  var filtersForm = document.querySelector('.img-filters__form');
  var makeRandomValue = function (array) {
    return array[Math.round(Math.random() * (array.length - ARRAY_CORRECT))];
  };

  var getPicturesRandom = function (num) {
    var picturesRandom = [];
    for (var i = window.form.ELEMENT_ONE_ARRAY; i < num; i++) {
      picturesRandom.push(makeRandomValue(window.pictures));
    }
    for (var q = window.form.ELEMENT_ONE_ARRAY; q < picturesRandom.length; q++) {
      for (var r = q + ARRAY_CORRECT; r < picturesRandom.length; r++) {
        if (picturesRandom[q] === picturesRandom[r]) {
          picturesRandom[r] = makeRandomValue(window.pictures);
        }
      }
    }
    return picturesRandom;
  };

  var clearActiveButtons = function (parameter) {
    var buttons = parameter.path[window.preview.SURFACING_STEP_ONE].querySelectorAll('.img-filters__button');
    buttons.forEach(function (item, i) {
      buttons[i].classList.remove('img-filters__button--active');
    });
    parameter.target.classList.add('img-filters__button--active');
  };
  var activateFilter = function (i) {
    window.gallery.updateGallery(window.pictures);
    clearActiveButtons(i);
  };

  var onFilterSelect = function (evt) {
    switch (evt.target.id) {
      case 'filter-popular':
        activateFilter(evt);
        window.gallery.sortByLikes(window.pictures);
        break;
      case 'filter-random':
        window.gallery.updateGallery(getPicturesRandom(COUNT_RANDOM_PICTURES));
        clearActiveButtons(evt);
        break;
      case 'filter-discussed':
        activateFilter(evt);
        window.gallery.sortByComments(window.pictures);
        break;
      default:
        activateFilter(evt);
        window.gallery.sortByLikes(window.pictures);
        break;
    }
  };
  filtersForm.addEventListener('click', window.debounce(onFilterSelect));

  window.filter = {
    ARRAY_CORRECT: ARRAY_CORRECT
  };
})();
