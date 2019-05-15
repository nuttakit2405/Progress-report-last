/* eslint-disable */
var connection = new RTCMultiConnection();

connection.socketURL = process.env.PROGRESS_REPORT_SERVICE
connection.session = {
  audio: true,
  video: true
};

var RMCMediaTrack = {
  cameraStream: null,
  cameraTrack: null,
  screen: null
};

export function openRoom(roomid, callback) {
  connection.videosContainer = document.getElementById('videos-container');
  beforeOpenOrJoin(roomid, function() {
    connection.open(roomid, function(isRoomOpen) {
        if (callback) {
          callback(isRoomOpen)
        }
        afterOpenOrJoin();
    });
  });
}

export function joinRoom(roomid) {
  connection.videosContainer = document.getElementById('videos-container');
  beforeOpenOrJoin(roomid, function() {
    connection.join(roomid, function() {
        afterOpenOrJoin();
    });
  });
}

function beforeOpenOrJoin(roomid, callback) {
  connection.socketCustomEvent = roomid;
  callback();
}

function afterOpenOrJoin() {
  connection.socket.on(connection.socketCustomEvent, function(message) {
      if (message.userid === connection.userid) return; // ignore self messages

      if (message.justSharedMyScreen === true) {
          var video = document.getElementById(message.userid);
          if (video) {
              // video.querySelector('video').srcObject = null;
          }
      }

      if (message.justStoppedMyScreen === true) {
          var video = document.getElementById(message.userid);
          if (video) {
              video.querySelector('video').srcObject = null;
          }
      }
  });
}

export function closeLocalVideo(roomid) {
  connection.getAllParticipants().forEach(function(pid) {
    connection.disconnectWith(pid);
  });

  // stop all local cameras
  connection.attachStreams.forEach(function(localStream) {
    localStream.stop();
  });

  // close socket.io connection
  connection.closeSocket();
}


export function mute() {
  var localStream = connection.attachStreams[0];
  localStream.mute('audio');
}

export function unmute() {
  var localStream = connection.attachStreams[0];
  localStream.unmute('audio');
}

connection.onstream = function(event) {
  var existing = document.getElementById(event.streamid);
  if(existing && existing.parentNode) {
    existing.parentNode.removeChild(existing);
  }

  if(event.type === 'local' && event.stream.isVideo) {
    RMCMediaTrack.cameraStream = event.stream;
    RMCMediaTrack.cameraTrack = event.stream.getVideoTracks()[0];
  }

  var parentNode = connection.videosContainer;

  var div = document.createElement('div')
  div.className = "flex-vid player"
  div.id = "div-" + event.streamid

  var video = event.mediaElement
  video.className = "video"

  try {
    video.setAttributeNode(document.createAttribute('autoplay'));
    video.setAttributeNode(document.createAttribute('playsinline'));
    video.setAttributeNode(document.removeAttribute('controls'));
  } catch (e) {
    video.setAttribute('autoplay', true);
    video.setAttribute('playsinline', true);
    video.controls = false
  }

  if(event.type === 'local') {
    video.className = video.className + " localVideo"
    video.volume = 0;
    try {
      video.setAttributeNode(document.createAttribute('muted'));
    } catch (e) {
      video.setAttribute('muted', true);
    }
  }
  video.srcObject = event.stream;

  var button = document.createElement('button')
  button.innerHTML = `<i class="fas fa-expand"></i>`
  button.className = "button"
  button.onclick = function () {
    var element = document.getElementById(event.streamid);
    if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullScreen) {
      element.webkitRequestFullScreen();
    }
  }

  var innerdiv = document.createElement('div')
  innerdiv.className = "control-vid"
  innerdiv.appendChild(button)

  div.appendChild(video)
  div.appendChild(innerdiv)
  parentNode.insertBefore(div, parentNode.firstChild);
  var played = event.mediaElement.play();

  if(event.type === 'local') {
    RMCMediaTrack.selfVideo = event.mediaElement;
  }

  if (typeof played !== 'undefined') {
      played.catch(function() {
          /*** iOS 11 doesn't allow automatic play and rejects ***/
      }).then(function() {
          setTimeout(function() {
              event.mediaElement.play();
          }, 2000);
      });
      return;
  }

  setTimeout(function() {
      event.mediaElement.play();
  }, 2000);
};


// connection.onstream = function(event) {
//   console.log("''''''event.streamid", event.streamid)
//   var existing = document.getElementById(event.streamid);
//   if(existing && existing.parentNode) {
//     existing.parentNode.removeChild(existing);
//   }

//   if(event.type === 'local' && event.stream.isVideo) {
//     RMCMediaTrack.cameraStream = event.stream;
//     RMCMediaTrack.cameraTrack = event.stream.getVideoTracks()[0];
//   }

//   event.mediaElement.removeAttribute('src');
//   event.mediaElement.removeAttribute('srcObject');
//   event.mediaElement.muted = true;
//   event.mediaElement.volume = 0;

//   var video = document.createElement('video');

//   try {
//       video.setAttributeNode(document.createAttribute('autoplay'));
//       video.setAttributeNode(document.createAttribute('playsinline'));
//   } catch (e) {
//       video.setAttribute('autoplay', true);
//       video.setAttribute('playsinline', true);
//   }

//   if(event.type === 'local') {
//     video.volume = 0;
//     try {
//         video.setAttributeNode(document.createAttribute('muted'));
//     } catch (e) {
//         video.setAttribute('muted', true);
//     }
//   }
//   video.srcObject = event.stream;

//   var width = parseInt(connection.videosContainer.clientWidth / 3) - 20;
//   var mediaElement = getHTMLMediaElement(video, {
//       title: event.userid,
//       buttons: ['full-screen'],
//       width: width,
//       showOnMouseEnter: false
//   });

//   connection.videosContainer.appendChild(mediaElement);

//   setTimeout(function() {
//       mediaElement.media.play();
//   }, 5000);

//   mediaElement.id = event.streamid;

//   if(event.type === 'local') {
//     RMCMediaTrack.selfVideo = mediaElement.media;
//   }

//   // to keep room-id in cache
//   localStorage.setItem(connection.socketMessageEvent, connection.sessionid);
// };

connection.onstreamended = function(event) {
  var mediaElement = document.getElementById("div-" + event.streamid);
  if (mediaElement) {
      mediaElement.parentNode.removeChild(mediaElement);
  }
};

// connection.onMediaError = function(e) {
//   if (e.message === 'Concurrent mic process limit.') {
//       if (DetectRTC.audioInputDevices.length <= 1) {
//           alert('Please select external microphone. Check github issue number 483.');
//           return;
//       }

//       var secondaryMic = DetectRTC.audioInputDevices[1].deviceId;
//       connection.mediaConstraints.audio = {
//           deviceId: secondaryMic
//       };

//       connection.join(connection.sessionid);
//   }
// };


export function openScreen2() {
  getScreenStream(function(screen) {
      var isLiveSession = connection.getAllParticipants().length > 0;
      if (isLiveSession) {
          replaceTrack(RMCMediaTrack.screen);
      }

      // now remove old video track from "attachStreams" array
      // so that newcomers can see screen as well
      connection.attachStreams.forEach(function(stream) {
          stream.getVideoTracks().forEach(function(track) {
              stream.removeTrack(track);
          });

          // now add screen track into that stream object
          stream.addTrack(RMCMediaTrack.screen);
      });
  });
};


function getScreenStream(callback) {
  getScreenId(function(error, sourceId, screen_constraints) {
      navigator.mediaDevices.getUserMedia(screen_constraints).then(function(screen) {
          console.log("RMCMediaTrack", RMCMediaTrack)
          RMCMediaTrack.screen = screen.getVideoTracks()[0];

          RMCMediaTrack.selfVideo.srcObject = screen;

          // in case if onedned event does not fire
          (function looper() {
              // readyState can be "live" or "ended"
              if (RMCMediaTrack.screen.readyState === 'ended') {
                  RMCMediaTrack.screen.onended();
                  return;
              }
              setTimeout(looper, 1000);
          })();

          var firedOnce = false;
          RMCMediaTrack.screen.onended = RMCMediaTrack.screen.onmute = RMCMediaTrack.screen.oninactive = function() {
              if (firedOnce) return;
              firedOnce = true;

              if (RMCMediaTrack.cameraStream.getVideoTracks()[0].readyState) {
                  RMCMediaTrack.cameraStream.getVideoTracks().forEach(function(track) {
                      RMCMediaTrack.cameraStream.removeTrack(track);
                  });
                  RMCMediaTrack.cameraStream.addTrack(RMCMediaTrack.cameraTrack);
              }

              RMCMediaTrack.selfVideo.srcObject = RMCMediaTrack.cameraStream;

              connection.socket && connection.socket.emit(connection.socketCustomEvent, {
                  justStoppedMyScreen: true,
                  userid: connection.userid
              });

              // share camera again
              replaceTrack(RMCMediaTrack.cameraTrack);

              // now remove old screen from "attachStreams" array
              connection.attachStreams = [RMCMediaTrack.cameraStream];

          };

          connection.socket && connection.socket.emit(connection.socketCustomEvent, {
              justSharedMyScreen: true,
              userid: connection.userid
          });

          callback(screen);
      });
  });
}

function replaceTrack(videoTrack) {
  if (!videoTrack) return;
  if (videoTrack.readyState === 'ended') {
      alert('Can not replace an "ended" track. track.readyState: ' + videoTrack.readyState);
      return;
  }
  connection.getAllParticipants().forEach(function(pid) {
      var peer = connection.peers[pid].peer;
      if (!peer.getSenders) return;

      var trackToReplace = videoTrack;

      peer.getSenders().forEach(function(sender) {
          if (!sender || !sender.track) return;

          if (sender.track.kind === 'video' && trackToReplace) {
              sender.replaceTrack(trackToReplace);
              trackToReplace = null;
          }
      });
  });
}