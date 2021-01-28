//DOM elements
const video_grid = document.querySelector(".video-grid");


//Creating video element dynamically
const myVideo = document.createElement("video");
myVideo.muted = true;

//Getting access to media input devices
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
})
.then(stream=>{
    addVideoStream(myVideo, stream);
})

//Adding video streams
const addVideoStream = (video, stream)=>{
   video.srcObject = stream;
   video.addEventListener("loadedmetadata", ()=>{
       video.play();
       
   })
   video_grid.append(video);
   
}