import { Fragment } from "react";
import Card from "../UI/Card";
import classes from "./CameraDetection.module.css";
import { useNavigate } from "react-router-dom";

const CameraDetection = (props) => {
  let All_mediaDevices = navigator.mediaDevices;
  if (!All_mediaDevices || !All_mediaDevices.getUserMedia) {
    console.log("getUserMedia() not supported.");
    return;
  }
  All_mediaDevices.getUserMedia({
    video: true,
  })
    .then(function (vidStream) {
      var video = document.getElementById("videoCam");
      //   video.style.width = "400px";
      //   video.style.height = "400px";
      if ("srcObject" in video) {
        video.srcObject = vidStream;
      } else {
        video.src = window.URL.createObjectURL(vidStream);
      }
      video.onloadedmetadata = function (e) {
        video.play();
        // video.pause();
        // video.src = "";
        // vidStream.getTracks()[0].stop();
      };
    })
    .catch(function (e) {
      console.log(e.name + ": " + e.message);
    });

  return (
    <Fragment>
      <div className={classes.search}>
        <div className={classes.notice}>
          <text
            style={{
              color: "#7C95AC",
            }}
          >
            Sinh viên lưu ý: *
          </text>
          <text style={{
            marginLeft: "20px"
          }}>
            - Sinh viên phải ngồi thẳng đầu, nghiêm túc, không xoay, quay đầu
            trái phải, lên xuống.
          </text>
        </div>

        <video id="videoCam" className={classes.video}></video>
        <br />
      </div>
    </Fragment>
  );
};

export default CameraDetection;
