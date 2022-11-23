import { Fragment, useContext, useState, useEffect } from "react";
import Card from "../UI/Card";
import classes from "./FaceData.module.css";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/authContext";
import LoadingSpin from "react-loading-spin";

const FaceData = (props) => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const [isCompleted, setIsCompleted] = useState(false);
  const [isAllow, setIsAllow] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [student, setStudent] = useState({});
  const [imageInSchoolWeb, setImageInSchoolWeb] = useState("");
  const [isFine, setIsFine] = useState(false);
  var intervalID;
  const handleDoQuiz = () => {
    navigate("/home");
  };

  function _arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

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
      .then((data1) => {
        fetch(
          `http://3.105.183.164:3001/getImage/${
            data1.mssv
          }/${data1.lop.lop.substring(0, 2)}`,
          {
            method: "GET",
            headers: headers,
          }
        )
          .then((res) => res.json())
          .then((data) => {
            setImageInSchoolWeb(_arrayBufferToBase64(data.data));
            fetch(`http://3.105.183.164:3001/sv/${data1.mssv}`, {
              method: "GET",
              headers: headers,
            })
              .then((res) => res.json())
              .then((data) => {
                setIsAllow(data);
                setIsChecking(false);
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
        setStudent(data1);
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

          fetch("http://3.105.183.164:8000/check", {
            method: "POST",
            body: JSON.stringify({
              fileOrigin: imageInSchoolWeb,
              fileCheck: image_data_url,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          })
            .then(function (response) {
              return response.json();
            })
            .then(function (data) {
              if (data) {
                fetch(
                  `http://3.105.183.164:3001/sv/${authCtx.id}/uploadImageS3`,
                  {
                    method: "POST",
                    body: JSON.stringify({
                      files: [
                        {
                          buffer: image_data_url,
                          fileName: `${student.mssv}_${x}.jpeg`,
                          fileType: "image/jpeg",
                        },
                      ],
                    }),
                    headers: {
                      "Content-type": "application/json; charset=UTF-8",
                    },
                  }
                )
                  .then(function (response) {
                    return response.json();
                  })
                  .then(function (data) {
                    console.log(data);
                  });
              } else {
                let headers = new Headers();

                headers.append("Content-Type", "application/json");
                headers.append("Accept", "application/json");

                headers.append(
                  "Access-Control-Allow-Origin",
                  "http://3.105.183.164:3001"
                );
                headers.append("Access-Control-Allow-Credentials", "true");
                fetch(`http://3.105.183.164:3001/sendEmail/${student.mssv}`, {
                  method: "GET",
                  headers: headers,
                }).then();
                window.clearInterval(intervalID);
                setIsFine(true);
                setIsLoading(false);
                vidOff();
              }
            });

          // fetch(`http://3.105.183.164:3001/sv/${authCtx.id}/uploadImageS3`, {
          //   method: "POST",
          //   body: JSON.stringify({
          //     files: [
          //       {
          //         buffer: image_data_url,
          //         fileName: `${student.mssv}_${x}.jpeg`,
          //         fileType: "image/jpeg",
          //       },
          //     ],
          //   }),
          //   headers: {
          //     "Content-type": "application/json; charset=UTF-8",
          //   },
          // })
          //   .then(function (response) {
          //     return response.json();
          //   })
          //   .then(function (data) {
          //     console.log(data);
          //   });

          //   setTimeCapture((timeCapture) => timeCapture + 1);
        }

        // setTimeout(capture, 2000);

        var x = 0;
        intervalID = setInterval(function () {
          // Your logic here
          capture(x);
          if (++x === 20) {
            window.clearInterval(intervalID);
            setIsCompleted(true);
            setIsLoading(false);
            vidOff();
          }
        }, 2000);

        // setInterval(capture, 2000);

        // if (timeCapture === 5) {
        //   fetch(`http://localhost:3001/sv/${authCtx.id}/uploadImageS3`, {
        //     method: "POST",
        //     body: JSON.stringify({
        //       files,
        //     }),
        //     headers: {
        //       "Content-type": "application/json; charset=UTF-8",
        //     },
        //   })
        //     .then(function (response) {
        //       return response.json();
        //     })
        //     .then(function (data) {
        //       console.log(data);
        //     });
        // }

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
          {!isFine && (
            <button
              id="startBtn"
              className={classes.detaile}
              onClick={openCam}
              disabled={isAllow}
              style={{
                backgroundColor: isAllow ? "#f5f5f5" : "#6DA0CB",
                color: isAllow ? "#00000040" : "white",
              }}
            >
              Mở camera
            </button>
          )}
          {/* )} */}
          <text>
            <br />
            {!isFine && isChecking && <LoadingSpin />}
            {isAllow && !isChecking && !isFine
              ? "Sinh viên đã được nhận diện"
              : !isAllow && !isChecking && !isFine
              ? "Sinh viên mở camera và ngồi ngay ngắn trước màn hình và đợi hệ thống lấy dữ liệu hình ảnh"
              : ""}
            {isFine && <text>Sinh viên vi phạm quy chế thi</text>}
          </text>
          <video id="videoCam" className={classes.video}>
            <canvas
              id="canvas1"
              style={{
                width: "100%",
                height: "100%",
              }}
            ></canvas>
          </video>
          <br />
          {isLoading && <LoadingSpin />}
          <br />
          <div>
            <button
              className={classes.doQuiz}
              onClick={handleDoQuiz}
              disabled={!isCompleted}
              style={{
                backgroundColor: !isCompleted ? "#f5f5f5" : "#6DA0CB",
                color: !isCompleted ? "#00000040" : "white",
              }}
            >
              Hoàn thành
            </button>
          </div>
        </div>
      </Card>
    </Fragment>
  );
};

export default FaceData;
