(function() {
  'use strict';

  var stage = document.getElementById('stage');
  var ctx;
  var count = 0;
  var dim;
  var size;
  var answer = [];
  var isPlaying = true;

  function init() {
    dim = Math.floor(count / 3) + 2;
    size = Math.floor(stage.width / dim);
    answer = [
      Math.floor(Math.random() * dim),
      Math.floor(Math.random() * dim)
    ];
  }

  function draw() {
    var x;
    var y;
    var offset = 2;
    var baseColor;
    var answerColor;
    var hue;
    var lightness;

    hue = Math.random() * 360;
    baseColor = 'hsl(' + hue + ', 80%, 50%)';
    lightness = Math.max(75 - count, 53);
    answerColor = 'hsl(' + hue + ', 80%, ' + lightness + '%)';

    ctx.clearRect(0, 0, stage.width, stage.height);

    for (x = 0; x < dim; x++) {
      for (y = 0; y < dim; y++) {
        if (answer[0] === x && answer[1] === y) {
          ctx.fillStyle = answerColor;
        } else {
          ctx.fillStyle = baseColor;
        }
        ctx.fillRect(
          // 0, 50, 100, ...
          size * x + offset,
          size * y + offset,
          size - offset * 2,
          size - offset * 2
        );
      }
    }
  }

  if (typeof stage.getContext === 'undefined') {
    return;
  }
  ctx = stage.getContext('2d');

  stage.addEventListener('click', function(e) {
    var rect;
    var x;
    var y;
    var replay = document.getElementById('replay');
    if (isPlaying === false) {
      return;
    }
    rect = e.target.getBoundingClientRect();
    x = e.pageX - rect.left - window.scrollX;
    y = e.pageY - rect.top - window.scrollY;
    if (
      answer[0] === Math.floor(x / size) &&
      answer[1] === Math.floor(y / size)
    ) {
      count++;
      init();
      draw();
    } else {
      alert('Your score: ' + count);
      isPlaying = false;
      replay.className = '';
    }
  });

  init();
  draw();
})();
