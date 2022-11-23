import { Fragment, useEffect } from "react";
import Card from "../UI/Card";
import classes from "./CameraDetection.module.css";
import { useNavigate } from "react-router-dom";

const CameraDetection = (props) => {
  const mood = [];

  useEffect(() => {
    let All_mediaDevices = navigator.mediaDevices;
    if (!All_mediaDevices || !All_mediaDevices.getUserMedia) {
      console.log("getUserMedia() not supported.");
      return;
    }
    All_mediaDevices.getUserMedia({
      video: !props.isTurnOffCam,
    })
      .then(function (vidStream) {
        var video = document.getElementById("videoCam");
        //   video.style.width = "400px";
        //   video.style.height = "400px";

        function vidOff() {
          //clearInterval(theDrawLoop);
          //ExtensionData.vidStatus = 'off';
          video.pause();
          video.src = "";
          vidStream.getTracks()[0].stop();
          console.log("Vid off");
        }

        if (props.isTurnOffCam) {
          vidOff();
        }

        function capture() {
          const canvas1 = document.getElementById("canvas1");
          canvas1
            .getContext("2d")
            .drawImage(video, 0, 0, canvas1.width, canvas1.height);
          var image_data_url = canvas1
            .toDataURL("image/jpeg")
            .replace(/^data:image\/jpeg;base64,/, "");
          // console.log(image_data_url);
          fetch("http://3.105.183.164:8000/detectMood", {
            method: "POST",
            body: JSON.stringify({
              file: image_data_url,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          })
            .then(function (response) {
              return response.json();
            })
            .then(function (data) {
              if (data == 0) {
                props.setLoiViPham((loiViPham) => loiViPham + 1);
              } else {
              }
            });
        }

        setInterval(capture, 2000);

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
  }, [props.isTurnOffCam]);

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
          <text
            style={{
              marginLeft: "20px",
            }}
          >
            - Sinh viên phải ngồi thẳng đầu, nghiêm túc, không xoay, quay đầu
            trái phải, lên xuống.
          </text>
        </div>

        <video id="videoCam" className={classes.video}>
          <canvas id="canvas1"></canvas>
        </video>
        {/* <canvas id="canvas1"></canvas> */}
        <br />
      </div>
    </Fragment>
  );
};

export default CameraDetection;
