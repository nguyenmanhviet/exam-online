import ReactDOM from "react-dom";
import { useContext, useState, useEffect, useRef } from "react";

import AuthContext from "../../store/authContext";

import classes from "./ModalAddQuestion.module.css";
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const ModalAddQuestion = (props) => {
  const [value, setValue] = useState("");
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState({});
  const [correct, setCorrect] = useState({});
  const [volumeAnswer, setVolumeAnswer] = useState([1]);
  const [subjects, setSubjects] = useState([]);
  const [levels, setLevels] = useState([]);
  const [payload, setPayload] = useState({});
  const questionNameInputRef = useRef();

  // console.log(value);
  // console.log("answer", answers);
  console.log(correct);

  const authCtx = useContext(AuthContext);
  const exitLogin = (event) => {
    event.preventDefault();
    props.onExitModalAddQuestion();
  };

  useEffect(() => {
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    headers.append("Access-Control-Allow-Origin", "http://3.105.183.164:3001");
    headers.append("Access-Control-Allow-Credentials", "true");

    fetch(`http://3.105.183.164:3001/subject`, {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        setPayload((payload) => ({
          ...payload,
          subjectId: data.items[0].id,
        }));
        setSubjects(data.items);
      })
      .catch((err) => console.log(err));

    fetch(`http://3.105.183.164:3001/levelQuestion`, {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        setPayload((payload) => ({
          ...payload,
          levelQuestionId: data[0].id,
        }));
        setLevels(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const hanldeAddQuestion = (event) => {
    event.preventDefault();

    const questionName = questionNameInputRef.current.value;

    const answer = [];

    Object.entries(answers).forEach(([key, value]) => {
      Object.entries(correct).forEach(([key1, value1]) => {
        if (key == key1) {
          answer.push({ answer: value, isCorrect: value1 });
        }
      });
    });

    Object.entries(answers).forEach(([key, value]) => {
      Object.entries(correct).forEach(([key1, value1]) => {
        if (!Object.keys(correct).includes(key)) {
          answer.push({ answer: value, isCorrect: false });
        }
      });
    });

    fetch("http://3.105.183.164:3001/addQuestion", {
      method: "POST",
      body: JSON.stringify({
        ...payload,
        questionName: questionName,
        question: question,
        answers: answer,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        event.preventDefault();
        props.onExitModalAddQuestion();
        window.location.reload(false);
      });
  };

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
                  <select
                    name="year"
                    onChange={(event) => {
                      setPayload((payload) => ({
                        ...payload,
                        subjectId: event.target.value,
                      }));
                    }}
                  >
                    {subjects &&
                      subjects.map((subject) => (
                        <option value={subject.id}>{subject.hocPhan}</option>
                      ))}
                  </select>
                </div>
                <div className={classes.control}>
                  <label htmlFor="username">Tên câu hỏi: *</label>
                  <input
                    type="text"
                    placeholder="Tên câu hỏi"
                    ref={questionNameInputRef}
                  />
                </div>
                <div className={classes.control}>
                  <label htmlFor="username">Nội dung câu hỏi: *</label>
                  <ReactQuill
                    theme="snow"
                    value={question}
                    onChange={setQuestion}
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
                  <select
                    onChange={(event) => {
                      setPayload((payload) => ({
                        ...payload,
                        levelQuestionId: event.target.value,
                      }));
                    }}
                  >
                    {levels &&
                      levels.map((level) => (
                        <option value={level.id}>{level.mucDo}</option>
                      ))}
                  </select>
                </div>
              </div>

              <p>Thông tin đáp án</p>
              <div className={classes.searching}>
                {volumeAnswer &&
                  volumeAnswer.map((volumeAnswer, idx) => (
                    <div className={classes.control}>
                      <label htmlFor="username">Đáp án: *</label>
                      <input
                        type="checkbox"
                        style={{ display: "inline", width: "20px" }}
                        onClick={() => {
                          const corrected = correct[idx] ? !correct[idx] : true;
                          setCorrect((cor) => ({
                            ...correct,
                            [idx]: corrected,
                          }));
                        }}
                      />
                      <ReactQuill
                        theme="snow"
                        // value={value}
                        onChange={(value) => {
                          setValue((values) => value);
                        }}
                        onBlur={() => {
                          setAnswers((answer) => ({ ...answer, [idx]: value }));
                          setValue("");
                        }}
                        // modules={modules}
                        // formats={formats}
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
              <button
                className={classes.addAnswer}
                onClick={(event) => {
                  event.preventDefault();
                  setVolumeAnswer((volumeAnswer) => [...volumeAnswer, 1]);
                }}
              >
                Thêm đáp án
              </button>
              <div className={classes.add}>
                <button className="btn" onClick={hanldeAddQuestion}>
                  Thêm mới câu hỏi
                </button>
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

export default ModalAddQuestion;
