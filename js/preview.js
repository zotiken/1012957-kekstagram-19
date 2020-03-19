'use strict';
(function () {
  var SURFACING_STEP_ONE = 1;
  var COMMENTS_VISIBLE = 5;
  var NUMBER_OF_SINGS = 10;
  var AT_1_SINGS = 1;
  var AT_2_SINGS = 2;

  var body = document.querySelector('body');
  var bigPicture = document.querySelector('.big-picture');
  var socialComment = bigPicture.querySelectorAll('.social__comment');
  var socialComments = bigPicture.querySelector('.social__comments');
  var likesCount = document.querySelector('.likes-count');
  var commentCount = document.querySelector('.comments-count');
  var socialCaption = bigPicture.querySelector('.social__caption');
  var bigPictureImg = bigPicture.querySelector('img');
  var socialCommentLoader = document.querySelector('.social__comments-loader');
  var bigPictureImgCancel = document.querySelector('.big-picture__cancel');

  var socialCommentCount = document.querySelector('.social__comment-count');
  var numberComments = '5 из <span class="comments-count" wfd-id="99">5</span> комментариев';
  var numberCommentsOnePart = '<span class="comments-count" wfd-id="99">';

  var clearListComment = function (parameter) {
    parameter.forEach(function (item) {
      item.remove();
    });
  };

  var generateComment = function (parameter, i, number) {
    var fragment = new DocumentFragment();
    for (var r = number; r < parameter; r++) {
      var copyCommentNode = socialComment[window.form.ELEMENT_ONE_ARRAY].cloneNode(true);
      var socialPicture = copyCommentNode.querySelector('.social__picture');
      var socialText = copyCommentNode.querySelector('.social__text');
      socialPicture.src = window.pictures[i].comments[r].avatar;
      socialPicture.alt = window.pictures[i].comments[r].name;
      socialText.textContent = window.pictures[i].comments[r].message;
      fragment.append(copyCommentNode);
    }
    socialComments.append(fragment);
  };
  var openBigImageTab = function (elem) {
    document.querySelector('.social__comment-count').classList.add('visually-hidden');
    var targetPicture = elem.querySelector('.picture__img').getAttribute('src');
    socialCommentLoader.classList.add('hidden');

    window.pictures.forEach(function (item, i) {
      if (targetPicture === item.url) {
        var socialCommentList = bigPicture.querySelectorAll('.social__comment');
        clearListComment(socialCommentList);
        bigPicture.classList.remove('hidden');
        likesCount.textContent = item.likes;
        bigPictureImg.src = item.url;
        commentCount.textContent = item.comments.length;
        var index = (item.comments.length < COMMENTS_VISIBLE) ? item.comments.length : COMMENTS_VISIBLE;
        socialCommentCount.classList.remove('visually-hidden');
        if (index === SURFACING_STEP_ONE) {
          numberComments = numberCommentsOnePart;
          numberComments += index;
          numberComments += '</span> комментарий</div>';
        } else if (index > SURFACING_STEP_ONE && index < COMMENTS_VISIBLE) {
          numberComments = numberCommentsOnePart;
          numberComments += index;
          numberComments += '</span> комментария</div>';
        } else {
          numberComments = '5 из <span class="comments-count" wfd-id="99">';
          numberComments += item.comments.length;
          numberComments += '</span> комментариев</div>';
        }
        socialCommentCount.innerHTML = numberComments;

        generateComment(index, i, window.form.ELEMENT_ONE_ARRAY);
        socialCaption.textContent = item.description;
        if (item.comments.length >= COMMENTS_VISIBLE) {
          socialCommentLoader.classList.remove('visually-hidden', 'hidden');
        }
      }
    });
  };
  var onSocialCommentLoader = function (evt) {
    var urlImg = evt.path[window.main.ELEMENT_THREE_ARRAY].querySelector('.big-picture__img').querySelector('img').getAttribute('src');
    window.pictures.forEach(function (item, i) {
      if (urlImg === item.url) {
        var comment = bigPicture.querySelectorAll('.social__comment');
        if (comment.length < item.comments.length) {
          var commentHidden = item.comments.length - comment.length;
          if (commentHidden >= COMMENTS_VISIBLE) {
            var index = COMMENTS_VISIBLE;
          } else {
            index = commentHidden;
            socialCommentLoader.classList.add('hidden');
          }
          generateComment(comment.length + index, i, comment.length);
          var text = comment.length < NUMBER_OF_SINGS ? text = numberComments.slice(AT_1_SINGS) : text = numberComments.slice(AT_2_SINGS);
          numberComments = '';
          numberComments += comment.length + index;
          numberComments += text;
          socialCommentCount.innerHTML = numberComments;
        }
      }
    });
  };

  var onOpenBigImage = function (evt) {
    if (evt.target.classList[window.form.ELEMENT_ONE_ARRAY] === 'picture' || evt.target.classList[window.form.ELEMENT_ONE_ARRAY] === 'picture__img') {
      body.classList.add('modal-open');
      var target = (evt.target.classList[window.form.ELEMENT_ONE_ARRAY] === 'picture__img') ? evt.path[SURFACING_STEP_ONE] : evt.target;
      openBigImageTab(target);
    }
    socialCommentLoader.addEventListener('click', onSocialCommentLoader);
    bigPictureImgCancel.addEventListener('click', onCloseBigPicture);
    document.addEventListener('keydown', onCloseBigPictureEsc);
  };

  window.gallery.picturesBlock.addEventListener('click', onOpenBigImage);

  var onCloseBigPicture = function () {
    body.classList.remove('modal-open');
    bigPicture.classList.add('hidden');
    socialCommentLoader.removeEventListener('click', onSocialCommentLoader);
    bigPictureImgCancel.removeEventListener('click', onCloseBigPicture);
    document.removeEventListener('keydown', onCloseBigPictureEsc);
  };

  var onCloseBigPictureEsc = function (i) {
    if (i.keyCode === window.main.ESC_KEY_CODE) {
      onCloseBigPicture();
    }
  };

  window.preview = {
    SURFACING_STEP_ONE: SURFACING_STEP_ONE,
  };
})();
