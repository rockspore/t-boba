function binEncode(data) {
    var binArray = []
    var datEncode = "";

    for (i=0; i < data.length; i++) {
        binArray.push(data[i].charCodeAt(0).toString(2));
    }
    for (j=0; j < binArray.length; j++) {
        var pad = padding_left(binArray[j], '0', 8);
        datEncode += pad + ' ';
    }
    function padding_left(s, c, n) { if (! s || ! c || s.length >= n) {
        return s;
    }
    var max = (n - s.length)/c.length;
    for (var i = 0; i < max; i++) {
        s = c + s; } return s;
    }
    console.log(binArray);
}


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
  
  const webimg = document.getElementById('meme');
  // const meme = document.createElement('img')
  // meme.src = 'meme1.png'
  // fb.appendChild(meme)

  window.setInterval(function(){
    if (screenshotButton.disabled == false) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0);
      // Other browsers will fall back to image/png
      imageURL = canvas.toDataURL('image/jpeg');
      img.src = imageURL;

      const byteString = atob(imageURL.split(',')[1]);
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i += 1) {
        ia[i] = byteString.charCodeAt(i);
      }
      const newBlob = new Blob([ab], {
        type: 'image/jpeg',
      });
      // console.log(newBlob)
      // Making requests
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
             // alert(this.responseText);
             var jobj = JSON.parse(this.responseText);
             if (jobj.length>0) {
                 console.log(jobj[0]);
                 if (jobj[0].faceAttributes.emotion.happiness > 0.9) {
                     webimg.src = 'meme2.png';
                 } 
             }
         }
         //console.log(this.status);
      };
    xhttp.open("POST", "https://eastus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceID=false&returnFaceLandmarks=false&returnFaceAttributes=age,gender,headPose,smile,facialHair,glasses,emotion,makeup,accessories", true);
    xhttp.setRequestHeader("Content-type", "application/octet-stream");
    xhttp.setRequestHeader("Ocp-Apim-Subscription-Key", "dd09200b03b54ab58a6ea35fd000b56d");
    xhttp.send(newBlob);
    }
  }, 5000);

})();
