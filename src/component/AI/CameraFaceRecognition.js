import { Fragment, useContext, useState, useEffect } from "react";
import Card from "../UI/Card";
import classes from "./CameraFaceRecognition.module.css";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/authContext";
import LoadingSpin from "react-loading-spin";

const CameraFaceRecognition = (props) => {
  const authCtx = useContext(AuthContext);
  const [student, setStudent] = useState({});
  const [result, setResult] = useState("");
  const [isRecognitioned, setIsRecognitioned] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const mood = [];
  const canvas1 = document.getElementById("canvas1");

  const handleDoQuiz = () => {
    navigate("/do-quiz");
  };

  const handleGoBack = () => {
    navigate("/quiz");
  };

  useEffect(() => {
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    headers.append("Access-Control-Allow-Origin", "http://3.105.183.164:3001");
    headers.append("Access-Control-Allow-Credentials", "true");
    fetch(`http://3.105.183.164:3001/student/${authCtx.id}`, {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setStudent(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const openCam = () => {
    setIsLoading(true);
    let All_mediaDevices = navigator.mediaDevices;
    if (!All_mediaDevices || !All_mediaDevices.getUserMedia) {
      console.log("getUserMedia() not supported.");
      return;
    }
    All_mediaDevices.getUserMedia({
      video: true,
      audio: false,
    })
      .then(function (vidStream) {
        var video = document.getElementById("videoCam");

        function vidOff() {
          //clearInterval(theDrawLoop);
          //ExtensionData.vidStatus = 'off';
          video.pause();
          video.src = "";
          vidStream.getTracks()[0].stop();
          console.log("Vid off");
        }

        function capture(x) {
          const canvas1 = document.getElementById("canvas1");
          canvas1.width = 640;
          canvas1.height = 480;
          canvas1
            .getContext("2d")
            .drawImage(video, 0, 0, canvas1.width, canvas1.height);
          var image_data_url = canvas1
            .toDataURL("image/jpeg")
            .replace(/^data:image\/jpeg;base64,/, "");
          console.log(image_data_url);
          //   setFiles((file) => [
          //     ...file,
          //     {
          //       buffer: image_data_url,
          //       fileName: "test",
          //       fileType: "image/jpeg",
          //     },
          //   ]);

          fetch("http://3.105.183.164:8000/predict", {
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
              console.log(data);
              if (student.mssv == data) setIsRecognitioned(true);
            });
          //   setTimeCapture((timeCapture) => timeCapture + 1);
        }

        // setTimeout(capture, 2000);

        var x = 0;
        var intervalID = setInterval(function () {
          // Your logic here
          capture(x);
          if (++x === 5) {
            window.clearInterval(intervalID);
            setIsLoading(false);
            vidOff();
          }
        }, 2000);

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
          <video id="videoCam" className={classes.video}>
            <canvas id="canvas1"></canvas>
          </video>
          <br />
          {isLoading && <LoadingSpin />}
          <br />
          <div>
            <button
              className={classes.doQuiz}
              onClick={handleDoQuiz}
              disabled={!isRecognitioned}
              style={{
                backgroundColor: !isRecognitioned ? "#f5f5f5" : "#6DA0CB",
                color: !isRecognitioned ? "#00000040" : "white",
              }}
            >
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
