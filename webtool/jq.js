var j = jQuery.noConflict();
j(document).ready(function(){
    j('.class').event(function(){

        alert("asdf");
        var params = {
            // Request parameters
            "returnFaceId": "true",
            "returnFaceLandmarks": "false",
        };

        $.ajax({
            url: "https://eastus.api.cognitive.microsoft.com/face/v1.0/detect?" + $.param(params),
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","dd09200b03b54ab58a6ea35fd000b56d");
            },
            type: "POST",
            // Request body
            data: {
               imgBase64: dataURL
            },
        })
        .done(function(data) {
            alert("success");
        })
        .fail(function() {
            alert("error");
        });

    });
  });
