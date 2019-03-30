function hasGetUserMedia() {
  return !!(navigator.mediaDevices &&
    navigator.mediaDevices.getUserMedia);
}

if (hasGetUserMedia()) {
  // Good to go!
} else {
  alert('getUserMedia() is not supported by your browser');
}

function handleError(error) {
  console.error('navigator.getUserMedia error: ', error);
}
const constraints = {video: true};

(function() {
  const video = document.querySelector('#basic video');
  const captureVideoButton = document.querySelector('#basic .capture-button');
  let localMediaStream;

  function handleSuccess(stream) {
    localMediaStream = stream;
    video.srcObject = stream;
  }

  captureVideoButton.onclick = function() {
    navigator.mediaDevices.getUserMedia(constraints).
      then(handleSuccess).catch(handleError);
  };

  document.querySelector('#stop-button').onclick = function() {
    video.pause();
    localMediaStream.stop();
  };
})();

(function() {
  const captureVideoButton =
    document.querySelector('#screenshot .capture-button');
  const screenshotButton = document.querySelector('#screenshot-button');
  const img = document.querySelector('#screenshot img');
  const video = document.querySelector('#screenshot video');

  const canvas = document.createElement('canvas');

  captureVideoButton.onclick = function() {
    navigator.mediaDevices.getUserMedia(constraints).
      then(handleSuccess).catch(handleError);
  };

  screenshotButton.onclick = video.onclick = function() {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    // Other browsers will fall back to image/png
    img.src = canvas.toDataURL('image/webp');
  };

  function handleSuccess(stream) {
    screenshotButton.disabled = false;
    video.srcObject = stream;
  }
})();

(function() {
  const captureVideoButton =
    document.querySelector('#cssfilters .capture-button');
  const cssFiltersButton = document.querySelector('#cssfilters-apply');
  const video = document.querySelector('#cssfilters video');

  let filterIndex = 0;
  const filters = [
    'grayscale',
    'sepia',
    'blur',
    'brightness',
    'contrast',
    'hue-rotate',
    'hue-rotate2',
    'hue-rotate3',
    'saturate',
    'invert',
    ''
  ];

  captureVideoButton.onclick = function() {
    navigator.mediaDevices.getUserMedia(constraints).
      then(handleSuccess).catch(handleError);
  };

  cssFiltersButton.onclick = video.onclick = function() {
    video.className = filters[filterIndex++ % filters.length];
  };

  function handleSuccess(stream) {
    video.srcObject = stream;
  }
})();