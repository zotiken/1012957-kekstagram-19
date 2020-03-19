'use strict';
(function () {
  var CORRECT = 1;
  var ENTER_KEY_CODE = 13;
  var ELEMENT_ONE_ARRAY = 0;
  var SPACE_VALID = 1;
  var MIN_VALUE = 0;
  var MAX_VALUE = 1;
  var REPEAT = 0;
  var TWO = 2;
  var TEN = 10;
  var LETTERS_VALUE = 20;
  var PERSENTAGE = 100;
  var ARRAY_CORRECT = 1;
  var SURFACING_STEP_THREE = 3;
  var HASHTAGS_VALUE_LIMIT = 5;

  var SCALE_MIN = 25;
  var SCALE_MID = 50;
  var SCALE_MAX = 75;

  var PIN_HALF = 2;
  var PIN_NINETY_NINE = 99;

  // filter index

  var GRAYSCALE = 1;
  var SEPIA = TWO;
  var INVERT = 3;
  var BLUR = 4;
  var BRIGHTNESS = 5;

  var effectsPreview = document.querySelectorAll('.effects__item');
  var imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
  var imgUploadForm = document.querySelector('.img-upload__form');
  var filters = [
    {
      name: 'grayscale',
      minValue: MIN_VALUE,
      maxValue: MAX_VALUE,
      measure: ''
    },
    {
      name: 'sepia',
      minValue: MIN_VALUE,
      maxValue: MAX_VALUE,
      measure: ''
    },
    {
      name: 'invert',
      minValue: MIN_VALUE,
      maxValue: PERSENTAGE,
      measure: '%'
    },
    {
      name: 'blur',
      minValue: 1,
      maxValue: 3,
      measure: 'px'
    },
    {
      name: 'brightness',
      minValue: 1,
      maxValue: 3,
      measure: ''
    }
  ];

  //  редактор изображения

  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  window.imgUploadOverlay = imgUploadOverlay;
  // контрол загрузки изображения

  var uploadFile = document.querySelector('#upload-file');

  // иконка закрытия редактор изображения

  var imgUploadCancel = document.querySelector('.img-upload__cancel');
  var scaleValue = document.querySelector('.scale__control--value');

  var transformValues = function (parameter) {
    imgUploadPreview.style.transform = 'scale(' + (parseInt(parameter.value, TEN) / PERSENTAGE) + ')';
  };
  var onDefaultFileValues = function () {
    uploadFile.value = null;
  };


  var removeEventsList = function () {
    imgUploadCancel.removeEventListener('click', onImgUploadOverlayClose);
    textHashTags.removeEventListener('keydown', cancelDefaultEnter);
    textHashTags.removeEventListener('input', onValidInputHashTags);
    textDescription.removeEventListener('keydown', onOffEsc);
    scaleSmaller.removeEventListener('click', onScaleSmaller);
    scaleBigger.removeEventListener('click', onScaleBigger);
    effectLevelPin.removeEventListener('mousedown', onEffectLevel);
    effectsPreview.forEach(function (item) {
      item.removeEventListener('keydown', cancelDefaultEnter);
    });
    imgUpLoadEffects.removeEventListener('input', onImgUpLoadEffects);
    imgUploadForm.removeEventListener('submit', onImgUpload);
    window.loadImage.imageUpload.removeEventListener('change', window.loadImage.onImageUpload);
  };

  var onImgUploadOverlayClose = function () {
    imgUploadOverlay.classList.add('hidden');
    removeEventsList();
  };

  var onImgUploadCancel = function (i) {
    if (i.keyCode === window.main.ESC_KEY_CODE) {
      onImgUploadOverlayClose();
      document.removeEventListener('keydown', onImgUploadCancel);
    }
  };

  var addEventsList = function () {
    document.addEventListener('keydown', onImgUploadCancel);
    imgUploadCancel.addEventListener('click', onImgUploadOverlayClose);
    textHashTags.addEventListener('keydown', cancelDefaultEnter);
    textHashTags.addEventListener('input', onValidInputHashTags);
    textDescription.addEventListener('keydown', onOffEsc);
    scaleSmaller.addEventListener('click', onScaleSmaller);
    scaleBigger.addEventListener('click', onScaleBigger);
    effectLevelPin.addEventListener('mousedown', onEffectLevel);
    effectsPreview.forEach(function (item) {
      item.addEventListener('keydown', cancelDefaultEnter);
    });
    imgUpLoadEffects.addEventListener('input', onImgUpLoadEffects);
    imgUploadForm.addEventListener('submit', onImgUpload);
  };

  var onOpenPopUpForm = function () {
    imgUploadOverlay.classList.remove('hidden');
    transformValues(scaleValue);
    window.previewImage.style.filter = '';
    addEventsList();
  };

  // открытие редактора при изминении контрола загрузки
  uploadFile.addEventListener('click', onDefaultFileValues);
  uploadFile.addEventListener('change', onOpenPopUpForm);

  var hashTags = [];
  var textHashTags = document.querySelector('.text__hashtags');

  var onValidInputHashTags = function () {
    hashTags = textHashTags.value.split(' ');

    hashTags.forEach(function (item, i, arr) {
      if (item[ELEMENT_ONE_ARRAY] !== '#') {
        textHashTags.setCustomValidity('Хэш-тег начинается с символа # (решётка)');
      } else if (indicateNoSpace(item) > SPACE_VALID) {
        textHashTags.setCustomValidity('Хэш-теги разделяются пробелами');
      } else if (item.length < TWO) {
        textHashTags.setCustomValidity('Хеш-тег не может состоять только из одной решётки');
      } else if (item.length < TWO || item.length > LETTERS_VALUE) {
        textHashTags.setCustomValidity('Максимальная длина одного хэш-тега 20 символов, включая решётку');
      } else if (arr.length > HASHTAGS_VALUE_LIMIT) {
        textHashTags.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
      } else if (arr.length > HASHTAGS_VALUE_LIMIT) {
        textHashTags.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
      } else if (lookForDuplicates(arr) > REPEAT) {
        textHashTags.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
      } else {
        textHashTags.setCustomValidity('');
      }
    });
  };

  var cancelDefaultEnter = function (param) {
    if (param.keyCode === ENTER_KEY_CODE) {
      param.preventDefault();
    }
  };

  var lookForDuplicates = function (parameter) {
    var index = MIN_VALUE;
    for (var i = ELEMENT_ONE_ARRAY; i < parameter.length; i++) {
      for (var y = i + CORRECT; y < parameter.length; y++) {
        if (parameter[i].toLowerCase() === parameter[y].toLowerCase()) {
          index++;
        }
      }
    }
    return index;
  };

  var indicateNoSpace = function (parameter) {
    var index = MIN_VALUE;
    for (var v = ELEMENT_ONE_ARRAY; v < parameter.length; v++) {
      if (parameter[v] === '#') {
        index++;
      }
    }
    return index;
  };

  var textDescription = document.querySelector('.text__description');
  var onOffEsc = function (i) {
    if (i.keyCode === window.main.ESC_KEY_CODE) {
      i.stopPropagation();
      document.removeEventListener('keydown', onOffEsc);
    }
  };

  // ---- scale module

  var scaleSmaller = document.querySelector('.scale__control--smaller');
  var scaleBigger = document.querySelector('.scale__control--bigger');
  var imgUploadPreview = document.querySelector('.img-upload__preview').querySelector('img');
  var changeScale = function (parameter) {
    if (parseInt(scaleValue.value, TEN) >= SCALE_MIN && parseInt(scaleValue.value, TEN) <= SCALE_MAX && parameter === '+') {
      scaleValue.value = (parseInt(scaleValue.value, TEN) + SCALE_MIN) + '%';
      transformValues(scaleValue);
    } else if (parseInt(scaleValue.value, TEN) > SCALE_MIN - CORRECT && parseInt(scaleValue.value, TEN) < SCALE_MID && parameter === '-') {
      scaleValue.value = (parseInt(scaleValue.value, TEN) - SCALE_MIN) + '%';
      scaleValue.value = SCALE_MIN + '%';
      transformValues(scaleValue);
    } else if (parseInt(scaleValue.value, TEN) >= SCALE_MID && parseInt(scaleValue.value, TEN) <= PERSENTAGE && parameter === '-') {
      scaleValue.value = (parseInt(scaleValue.value, TEN) - SCALE_MIN) + '%';
      transformValues(scaleValue);
    } else if (parseInt(scaleValue.value, TEN) > SCALE_MAX) {
      scaleValue.value = PERSENTAGE + '%';
      transformValues(scaleValue);
    }
  };
  var onScaleSmaller = function () {
    changeScale('-');
  };
  var onScaleBigger = function () {
    changeScale('+');
  };

  var imgUpLoadEffects = document.querySelector('.img-upload__effects');

  // пин слайдера редактора

  var effectLevelValue = document.querySelector('.effect-level__value').getAttribute('value');
  var effectLevel = document.querySelector('.img-upload__effect-level');
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectsItem = document.querySelectorAll('.effects__radio');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var effectLevelLine = document.querySelector('.effect-level__line');
  // Функция пропорции значения range для фильтра
  var countProportion = function (obj, value) {
    return obj.name + '(' + (((obj.maxValue - obj.minValue) / PERSENTAGE) * value) + obj.measure + ')';
  };

  // --------------------
  var onEffectLevel = function (evt) {
    evt.preventDefault();
    var effectLevelLineCoord = effectLevelLine.getBoundingClientRect().x;
    var effectLevelLineWidth = effectLevelLine.getBoundingClientRect().width;
    var effectLevelPinLineX = effectLevelPin.getBoundingClientRect().x;
    var cursorPositionX = evt.clientX;
    var onMouseMove = function (moveEvt) {

      var shift = cursorPositionX - evt.clientX;
      cursorPositionX = moveEvt.clientX;
      effectLevelPin.style.left = Math.round(((effectLevelPinLineX - effectLevelLineCoord + shift + effectLevelPin.offsetWidth / PIN_HALF) / effectLevelLineWidth) * PERSENTAGE) + '%';

      effectLevelDepth.style.width = effectLevelPin.style.left;

      if (effectLevelPin.style.left <= '0px') {
        effectLevelPin.style.left = ELEMENT_ONE_ARRAY;
        effectLevelDepth.style.width = effectLevelPin.style.left;

      } else if (parseInt(effectLevelPin.style.left, TEN) > PIN_NINETY_NINE) {
        effectLevelPin.style.left = '100%';
        effectLevelDepth.style.width = effectLevelPin.style.left;
      }

      effectLevelValue = parseInt(effectLevelPin.style.left, TEN);

      if (effectsItem[ELEMENT_ONE_ARRAY].checked) {
        window.previewImage.style.filter = '';
      }

      for (var i = CORRECT; i < effectsItem.length; i++) {
        if (effectsItem[i].checked) {
          window.previewImage.style.filter = countProportion(filters[i - ARRAY_CORRECT], effectLevelValue);
        }
      }

    };
    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  var applyFilter = function (parameter) {
    effectLevel.classList.remove('hidden');
    window.previewImage.style.filter = countProportion(filters[parameter - ARRAY_CORRECT], PERSENTAGE);
  };

  var onImgUpLoadEffects = function (evt) {
    effectLevelPin.style.left = '100%';
    effectLevelDepth.style.width = effectLevelPin.style.left;
    switch (evt.target.id) {
      case 'effect-none':
        imgUploadEffectLevel.classList.add('hidden');
        window.previewImage.style.filter = '';
        break;
      case 'effect-chrome':
        applyFilter(GRAYSCALE);
        break;
      case 'effect-sepia':
        applyFilter(SEPIA);
        break;
      case 'effect-marvin':
        applyFilter(INVERT);
        break;
      case 'effect-phobos':
        applyFilter(BLUR);
        break;
      case 'effect-heat':
        applyFilter(BRIGHTNESS);
        break;
    }
  };

  var onSuccessfullySending = function () {
    imgUploadOverlay.classList.add('hidden');
    imgUploadForm.reset();
    effectLevelPin.style.left = '20%';
    effectLevelDepth.style.width = '20%';
    window.main.generateSuccessPopUpBlock();
  };
  var onCloseErrorPopUp = function (elem) {
    elem.remove();
    imgUploadForm.classList.remove('hidden');
    document.removeEventListener('click', onClickErrorWindow);
    document.removeEventListener('keydown', window.gallery.onCloseErrorEsc);

  };
  var onClickErrorWindow = function (evt) {
    if (evt.target.classList[ELEMENT_ONE_ARRAY] === 'error__button') {
      onCloseErrorPopUp(evt.path[SURFACING_STEP_THREE]);
    }
    if (evt.target.classList[ELEMENT_ONE_ARRAY] === 'error') {
      onCloseErrorPopUp(evt.target);
    }
  };

  var onErrorSending = function () {
    imgUploadForm.classList.add('hidden');
    window.main.generateErrorBlock();
    document.addEventListener('click', onClickErrorWindow);
    document.addEventListener('keydown', window.gallery.onCloseErrorEsc);
  };

  var onImgUpload = function (evt) {
    evt.preventDefault();
    window.backend.upLoad('https://js.dump.academy/kekstagram', onSuccessfullySending, onErrorSending, imgUploadForm);
  };

  window.effectLevel = effectLevel;
  window.onCloseErrorPopUp = onCloseErrorPopUp;

  window.form = {
    ELEMENT_ONE_ARRAY: ELEMENT_ONE_ARRAY,
    onClickErrorWindow: onClickErrorWindow
  };
})();
