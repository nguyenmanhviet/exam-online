import ReactDOM from "react-dom";
import { useContext, useState, useEffect, useRef } from "react";

import AuthContext from "../../store/authContext";

import classes from "./ModalEditQuestion.module.css";
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const ModalEditQuestion = (props) => {
  const [subjects, setSubjects] = useState([]);
  const [levels, setLevels] = useState([]);
  const [answers, setAnswers] = useState([]);
  const authCtx = useContext(AuthContext);
  const exitLogin = (event) => {
    event.preventDefault();
    props.onExitModalEditQuestion();
  };

  useEffect(() => {
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    headers.append("Access-Control-Allow-Origin", "http://3.105.183.164:3001");
    headers.append("Access-Control-Allow-Credentials", "true");

    fetch(`http://3.105.183.164:3001/question/${props.question.id}/answer`, {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        setAnswers(data);
      })
      .catch((err) => console.log(err));

    fetch(`http://3.105.183.164:3001/subject`, {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        setSubjects(data.items);
      })
      .catch((err) => console.log(err));

    fetch(`http://3.105.183.164:3001/levelQuestion`, {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        setLevels(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return ReactDOM.createPortal(
    <div className={classes.modal}>
      <header className={classes.modal__header}>
        <a href="#" onClick={exitLogin} className={classes.close} />
        <div className={classes.search}>
          <div className={classes.inforExam}>
            <p>Thông tin câu hỏi</p>
            <form>
              <div className={classes.searching}>
                <div className={classes.control}>
                  <label htmlFor="username">Thuộc học phần: *</label>
                  <select name="year">
                    {subjects &&
                      subjects.map((subject) => (
                        <option
                          value={subject.id}
                          selected={subject.id == props.question.hocPhan.id}
                        >
                          {subject.hocPhan}
                        </option>
                      ))}
                  </select>
                </div>
                <div className={classes.control}>
                  <label htmlFor="username">Tên câu hỏi: *</label>
                  <input type="text" value={props.question.tenCauHoi} />
                </div>
                <div className={classes.control}>
                  <label htmlFor="username">Nội dung câu hỏi: *</label>
                  <ReactQuill
                    theme="snow"
                    value={props.question.cauHoi}
                    // onChange={setQuestion}
                    style={{
                      width: "625px",
                      border: "1px solid #254F73",
                      borderRadius: "10px",
                      color: "#254F73",
                      fontSize: "12px",
                    }}
                  />
                </div>
                <div className={classes.control}>
                  <label htmlFor="username">Mức độ</label>
                  <select name="year">
                    {levels &&
                      levels.map((level) => (
                        <option
                          value={level.id}
                          selected={level.id == props.question.mucDoCauHoiId}
                        >
                          {level.mucDo}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <p>Thông tin đáp án</p>
              <div className={classes.searching}>
                {answers &&
                  answers.map((answer) => (
                    <div className={classes.control}>
                      <label htmlFor="username">Đáp án : *</label>
                      <input
                        type="checkbox"
                        style={{ display: "inline", width: "20px" }}
                        checked={answer.dapAnDung == 1}
                      />
                      <ReactQuill
                        theme="snow"
                        value={answer.dapAn}
                        // onChange={setQuestion}
                        style={{
                          width: "625px",
                          border: "1px solid #254F73",
                          borderRadius: "10px",
                          color: "#254F73",
                          fontSize: "12px",
                        }}
                      />
                    </div>
                  ))}
              </div>
              <div className={classes.add}>
                <button className="btn">Chỉnh sửa câu hỏi</button>
              </div>
            </form>
          </div>

          <div className={classes.actions}>
            <div className={classes.btnHolder}>
              <button type="button" onClick={exitLogin}>
                Thoát
              </button>
            </div>
          </div>
        </div>
      </header>
    </div>,
    document.getElementById("modal-root")
  );
};

export default ModalEditQuestion;
