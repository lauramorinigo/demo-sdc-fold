(function() {
    let width  = 320;
    let height = 0;

    let streaming = false;
    let photo = null;
    let canvas = null;
    function startup(){
        let video  = document.getElementById('video');
        canvas = document.getElementById('canvas');
        let snip_button = document.getElementById('snap');
        photo  = document.getElementById('photo');

        // Get streaming media video without audio
        navigator.mediaDevices.getUserMedia({video:true, audio: false})
        .then((stream)=>{
            video.srcObject = stream;
            video.play();
        })
        .catch(error => console.error(error));

        // Listen video to start playing
        video.addEventListener('canplay', function(e){
            if(!streaming){
                height = video.videoHeight / (video.videoWidth/width);
                
                //esto puedo obviarlo y poner una medida fija
                video.setAttribute('width', 1280);
                video.setAttribute('height', 400);
                canvas.setAttribute('width', 50);
                canvas.setAttribute('height', 50);
                streaming = true;
            }
        }, false);

        snip_button.addEventListener('click', function(e){
            takePicture();
            e.preventDefault()
        }, false);

        clearPicture();
       
    }

    // Fill the photo with an indication that none has been
    // captured.

    function clearPicture(){
        let context = canvas.getContext('2d');
        context.fillStyle = "#AAA";
        context.fillRect(0, 0, canvas.width, canvas.height);
        
        let data = canvas.toDataURL('image/png');
        photo.setAttribute('src', data);
    }

    // Take Picture

    function takePicture(){
        let context = canvas.getContext('2d');
        if (width && height) {
            canvas.width = width;
            canvas.height = height;
            context.drawImage(video, 0, 0, width, height);
            
            let data = canvas.toDataURL('image/png');
            photo.setAttribute('src', data);
        }else{
            clearPicture();
        }
    }

    //Run startup after loading
    window.addEventListener('load', startup, false);
    

})();