function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

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

  window.setInterval(function(){
    if (screenshotButton.disabled == false) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0);
      // Other browsers will fall back to image/png
      img.src = canvas.toDataURL('image/webp');
      // Making requests
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
             alert(this.responseText);
         }
      };
    xhttp.open("POST", "https://eastus.api.cognitive.microsoft.com/face/v1.0/detect", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("Ocp-Apim-Subscription-Key", "dd09200b03b54ab58a6ea35fd000b56d");
    xhttp.send(JSON.stringigy({url: "https://upload.wikimedia.org/wikipedia/commons/3/37/Dagestani_man_and_woman.jpg"}));
    }
  }, 5000);

})();
