import React, { useEffect, useState, useRef, useContext } from "react";
import CameraDetection from "../AI/CameraDetection";
import classes from "./doQuiz.module.css";
import InformationQuiz from "./InformationQuiz";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/authContext";

const DoQuiz = (props) => {
  const navigate = useNavigate();
  const query = matchMedia("all and (display-mode: fullscreen");
  const [cauHoiList, setCauHoiList] = useState([]);
  const [result, setResult] = useState({});
  const wrapperRef = useRef(null);
  const labelDapAn = ["A", "B", "C", "D", "E", "F"];
  const [loiViPham, setLoiViPham] = useState(0);
  const [lopHocPhan, setLopHocPhan] = useState({ tenLop: "" });
  const [isTurnOffCam, setIsTurnOffCam] = useState(false);
  const authCtx = useContext(AuthContext);

  // query.onchange = (e) => {
  //   if (!query.matches) {
  //     navigate("/home");
  //   }
  // };

  // if (!props.kyThi) {
  //   console.log("chay qua ma");
  //   navigate("/home");
  // }

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setLoiViPham((loiViPham) => loiViPham + 1);
        }
      }
      // Bind the event listener
      document.addEventListener("mouseout", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mouseout", handleClickOutside);
      };
    }, [ref]);
  }

  useOutsideAlerter(wrapperRef);

  useEffect(() => {
    fetch("http://3.105.183.164:3001/sv/kythi/cauhoi", {
      method: "POST",
      body: JSON.stringify({
        hocPhanId: props.kyThi.hocPhanId,
        soLuongCauHoi: props.kyThi.soCauHoi,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCauHoiList(data);
      });
  }, []);

  return (
    <div className={classes.container} ref={wrapperRef}>
      <div className={classes.containerQuiz}>
        <div className={classes.answerCheck}>
          {cauHoiList &&
            cauHoiList.map((cauHoi, idx) => (
              <button
                className={classes.checkAnswer}
                style={{
                  backgroundColor: Object.keys(result).includes(
                    cauHoi.id.toString()
                  )
                    ? "green"
                    : "#6DA0CB",
                }}
              >
                {idx + 1}
              </button>
            ))}
        </div>
        {cauHoiList &&
          cauHoiList.map((cauHoi, idx) => (
            <div className={classes.quiz}>
              <div className={classes.itemNo}>Câu {idx + 1}:</div>
              <div className={classes.mainRow}>
                <div className={classes.wrapperQuestion}>
                  <p className={classes.question}>{cauHoi.cauHoi}</p>
                </div>
              </div>
              <form>
                {cauHoi.dapAn &&
                  cauHoi.dapAn.map((dapAn, idx) => (
                    <div className={classes.row}>
                      <div className={classes.dapAn}>
                        <input
                          type="radio"
                          className={classes.tickBox}
                          name={`${dapAn.cauHoiId}`}
                          value={dapAn.id}
                          onChange={() => {
                            setResult((result) => ({
                              ...result,
                              [dapAn.cauHoiId]: dapAn.id,
                            }));
                          }}
                        />
                        <label for="vehicle1">
                          <b>{labelDapAn[idx]}. </b> {dapAn.dapAn}
                        </label>
                        <br />
                      </div>
                    </div>
                  ))}
              </form>
            </div>
          ))}
      </div>
      <div className={classes.informationCamera}>
        <div className={classes.informationQuiz}>
          <InformationQuiz
            kyThi={props.kyThi}
            result={result}
            setKetQua={props.setKetQua}
            loiViPham={loiViPham}
            setIsTurnOffCam={setIsTurnOffCam}
          />
        </div>
        <div className={classes.camera}>
          <CameraDetection
            setLoiViPham={setLoiViPham}
            isTurnOffCam={isTurnOffCam}
          />
        </div>
      </div>
    </div>
  );
};

export default DoQuiz;
