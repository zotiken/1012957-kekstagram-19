'use strict';
(function () {

  var IMG_TYPES = ['jpg', 'gif', 'png', 'webp'];

  var imageUpload = document.querySelector('.img-upload__input');
  window.previewImage = document.querySelector('.img-upload__preview').querySelector('img');
  var onImageUpload = function () {
    window.effectLevel.classList.add('hidden');
    var file = imageUpload.files[window.form.ELEMENT_ONE_ARRAY];
    var filename = file.name.toLowerCase();
    var matches = IMG_TYPES.some(function (it) {
      return filename.endsWith(it);
    });
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        window.previewImage.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  };
  imageUpload.addEventListener('change', onImageUpload);

  window.loadImage = {
    imageUpload: imageUpload,
    onImageUpload: onImageUpload,
  };

})();
