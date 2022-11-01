import { Fragment } from "react";
import Card from "../UI/Card";
import classes from "./CameraFaceRecognition.module.css";
import { useNavigate } from "react-router-dom";

const CameraFaceRecognition = (props) => {
  const navigate = useNavigate();

  const handleDoQuiz = () => {
    navigate("/do-quiz");
  };

  const handleGoBack = () => {
    navigate("/quiz");
  };
  const openCam = () => {
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
        if ("srcObject" in video) {
          video.srcObject = vidStream;
        } else {
          video.src = window.URL.createObjectURL(vidStream);
        }
        video.onloadedmetadata = function (e) {
          video.play();
        };
      })
      .catch(function (e) {
        console.log(e.name + ": " + e.message);
      });
  };
  return (
    <Fragment>
      <Card>
        <div className={classes.search}>
          <p>Nhận diện sinh viên</p>
          <button id="startBtn" className={classes.detaile} onClick={openCam}>
            Nhận diện
          </button>
          <br />
          <text>
            Sinh viên phải mở camera lên để hệ thống xác nhận mới được phép vào
            làm bài !!!
          </text>
          <br />
          <video id="videoCam" className={classes.video}></video>
          <br />
          <div>
            <button className={classes.doQuiz} onClick={handleDoQuiz}>
              Làm bài
            </button>
            <button className={classes.undoQuiz} onClick={handleGoBack}>
              Quay lại
            </button>
          </div>
        </div>
      </Card>
    </Fragment>
  );
};

export default CameraFaceRecognition;
