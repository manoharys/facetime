//DOM elements references
const video_grid = document.querySelector("#video-grid");

//socket variable
const socket = io("/");

//creating a peer
let peer = new Peer();
const peers = {};

//Creating video element dynamically
const myVideo = document.createElement("video");
myVideo.muted = true;

//Getting access to media input devices
navigator.mediaDevices
  .getUserMedia({
    video: true,
    audio: true,
  })
  .then((stream) => {
    addVideoStream(myVideo, stream);

    //answering the call
    peer.on("call", (call) => {
      call.answer(stream); // Answer the call with an A/V stream.
      const video = document.createElement("video");

      call.on("stream", (userVideoStream) => {
        addVideoStream(video, userVideoStream);
      });
    });

    // when other user connects to the stream
    socket.on("user-connected", (userId) => {
      connectToNewUser(userId, stream);
    });
  })
  .catch((err) => console.log(err));

socket.on("user-disconnected", (userId) => {
  if (peers[userId]) peers[userId].close();
});

/*peer connections*/
peer.on("open", (id) => {
  //emitting socket event

  socket.emit("join-room", ROOM_ID, id);
  //console.log("peer id", userId)
});

//Connecting new user
const connectToNewUser = (userId, stream) => {
  var call = peer.call(userId, stream);

  call.on("stream", function (remoteStream) {
    const video = document.createElement("video");
    addVideoStream(video, remoteStream);
  });

  call.on("close", () => {
    video.remove();
  });

  peers[userId] = call;
};

const muteUnmute = () => {
  const enabled = myVideoStream.getAudioTracks()[0].enabled;
  if (enabled) {
    myVideoStream.getAudioTracks()[0].enabled = false;
    setUnmuteButton();
  } else {
    setMuteButton();
    myVideoStream.getAudioTracks()[0].enabled = true;
  }

  const playStop = () => {
    console.log("object");
    let enabled = myVideoStream.getVideoTracks()[0].enabled;
    if (enabled) {
      myVideoStream.getVideoTracks()[0].enabled = false;
      setPlayVideo();
    } else {
      setStopVideo();
      myVideoStream.getVideoTracks()[0].enabled = true;
    }
  };
};
//Adding video streams
const addVideoStream = (video, stream) => {
  video.srcObject = stream;

  video.addEventListener("loadedmetadata", () => {
    video.play();
  });
  video_grid.append(video);
};
