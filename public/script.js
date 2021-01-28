//DOM elements references
const video_grid = document.querySelector(".video-grid");

//socket variable
let socket = io('/')

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


//emitting socket event
socket.emit('join-room', ROOM_ID)

socket.on("user-connected", (roomId)=>{
    console.log('user connected', roomId)
})