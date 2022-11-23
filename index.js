const start = document.querySelector("#start");
const stop = document.querySelector("#stop");
let stream;
const chunks = [];
let count = 0;
const list = document.querySelector("#recordList");
const h2 = document.querySelector("#h2");

start.addEventListener("click", handleRecord);
stop.addEventListener("click", handleStop);

async function handleRecord() {
  stream = await navigator.mediaDevices.getDisplayMedia({
    video: true,
    audio: true,
  });
  recorder = new MediaRecorder(stream, {
    mimeType: "video/webm; codecs=vp8",
  });
  recorder.addEventListener("dataavailable", pushRec);
  recorder.start();
  h2.innerText = "🚨Recording...";
}

function pushRec(e) {
  chunks.push(e.data);
  const blob = new Blob(chunks, { type: "video/webm; codecs=vp8" });
  count += 1;
  const link = URL.createObjectURL(blob);
  const a = `<li><a href='${link}' download='recording_${count}.webm'}'>video ${count}</a></li>`;
  list.insertAdjacentHTML("beforeend", a);
}

function handleStop() {
  recorder.stop();
  recorder = null;
  const track = stream.getVideoTracks()[0];
  track.stop();
  h2.innerHTML = "&nbsp;";
}
