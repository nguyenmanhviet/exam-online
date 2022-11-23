import ReactDOM from "react-dom";
import { useContext, useState, useEffect, useRef } from "react";

import AuthContext from "../../store/authContext";
import DateTimePicker from "react-datetime-picker";
import classes from "./ModalAddExam.module.css";

const ModalAddExam = (props) => {
  const [timeStart, setTimeStart] = useState(new Date());
  const [timeEnd, setTimeEnd] = useState(new Date());
  const [years, setYears] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const examNameInputRef = useRef();
  const volumeQuestionInputRef = useRef();
  const timeDoQuizInputRef = useRef();
  const turnDoQuizInputRef = useRef();
  const passwordInputRef = useRef();
  const [observations, setObservations] = useState(0);
  const [payload, setPayload] = useState({});

  const authCtx = useContext(AuthContext);

  const exitLogin = (event) => {
    event.preventDefault();
    props.onExitModalAddExam();
  };

  const handleAddExam = (event) => {
    event.preventDefault();

    const examName = examNameInputRef.current.value;
    const volumeQuestion = volumeQuestionInputRef.current.value;
    const timeDoQuiz = timeDoQuizInputRef.current.value;
    const turnDoQuiz = turnDoQuizInputRef.current.value;
    const password = passwordInputRef.current.value;

    fetch("http://3.105.183.164:3001/addExam", {
      method: "POST",
      body: JSON.stringify({
        ...payload,
        examName,
        volumeQuestion,
        timeDoQuiz,
        turnDoQuiz,
        password,
        timeStart,
        timeEnd,
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
        props.onExitModalAddExam();
        window.location.reload(false);
      });
  };

  useEffect(() => {
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    headers.append("Access-Control-Allow-Origin", "http://3.105.183.164:3001");
    headers.append("Access-Control-Allow-Credentials", "true");
    fetch(`http://3.105.183.164:3001/year`, {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        setPayload((payload) => ({
          ...payload,
          yearId: data[0].id,
        }));
        setYears(data);
      })
      .catch((err) => console.log(err));

    fetch(`http://3.105.183.164:3001/semester`, {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        setPayload((payload) => ({
          ...payload,
          semesterId: data[0].id,
        }));
        setSemesters(data);
      })
      .catch((err) => console.log(err));

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

    fetch(`http://3.105.183.164:3001/observation`, {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        setPayload((payload) => ({
          ...payload,
          observationId: data[0].id,
        }));
        setObservations(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return ReactDOM.createPortal(
    <div className={classes.modal}>
      <header className={classes.modal__header}>
        <a href="#" onClick={exitLogin} className={classes.close} />
        <div className={classes.search}>
          <p>Thông tin kì thi</p>
          <div>
            <form>
              <div className={classes.searching}>
                <div className={classes.control}>
                  <label htmlFor="username">Năm học: </label>
                  <select
                    name="year"
                    onChange={(event) => {
                      setPayload((payload) => ({
                        ...payload,
                        yearId: event.target.value,
                      }));
                    }}
                  >
                    {years &&
                      years.map((year) => (
                        <option value={year.id}>{year.namHoc}</option>
                      ))}
                  </select>
                </div>
                <div className={classes.control}>
                  <label htmlFor="username">Học kỳ: </label>
                  <select
                    name="semester"
                    onChange={(event) => {
                      setPayload((payload) => ({
                        ...payload,
                        semesterId: event.target.value,
                      }));
                    }}
                  >
                    {semesters &&
                      semesters.map((semester) => (
                        <option value={semester.id}>{semester.hocKy}</option>
                      ))}
                  </select>
                </div>
                <div className={classes.control}>
                  <label htmlFor="username">Học phần</label>
                  <select
                    name="subject"
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
                <div className={classes.control} style={{ marginTop: "10px" }}>
                  <label htmlFor="username">Tên kỳ thi</label>
                  <input
                    type="text"
                    placeholder="Tên kỳ thi"
                    style={{ width: "1100px" }}
                    className={classes.input}
                    ref={examNameInputRef}
                  />
                </div>
                <div className={classes.control} style={{ marginTop: "10px" }}>
                  <label htmlFor="username">Thời gian bắt đầu</label>
                  <div style={{ marginRight: "20px" }}>
                    <DateTimePicker onChange={setTimeStart} value={timeStart} />
                  </div>
                </div>
                <div className={classes.control}>
                  <label htmlFor="password">Thời gian kết thúc</label>
                  <div style={{ marginRight: "20px" }}>
                    <DateTimePicker
                      onChange={setTimeEnd}
                      value={timeEnd}
                      openWidgetsOnFocus={true}
                    />
                  </div>
                </div>
                <div className={classes.control} style={{ marginTop: "10px" }}>
                  <label htmlFor="username">Số câu hỏi:</label>
                  <input
                    type="number"
                    placeholder="Số câu hỏi"
                    className={classes.input}
                    ref={volumeQuestionInputRef}
                  />
                </div>
                <div className={classes.control} style={{ marginTop: "10px" }}>
                  <label htmlFor="username">Thời gian làm bài:</label>
                  <input
                    type="number"
                    placeholder="Thời gian làm bài"
                    className={classes.input}
                    ref={timeDoQuizInputRef}
                  />
                </div>
                <div className={classes.control} style={{ marginTop: "10px" }}>
                  <label htmlFor="username">Số lượt làm bài:</label>
                  <input
                    type="number"
                    placeholder="Số lượt làm bài"
                    className={classes.input}
                    ref={turnDoQuizInputRef}
                  />
                </div>
              </div>

              <p>Bảo mật và giám sát kỳ thi</p>

              <div className={classes.control}>
                <label htmlFor="username">Mật khẩu làm bài: *</label>
                <input
                  type="text"
                  className={classes.input}
                  ref={passwordInputRef}
                />
              </div>
              <div className={classes.control}>
                <label htmlFor="username">Cách giám sát làm bài:</label>
                <select
                  name="subject"
                  onChange={(event) => {
                    setPayload((payload) => ({
                      ...payload,
                      observationId: event.target.value,
                    }));
                  }}
                >
                  {observations &&
                    observations.map((observation) => (
                      <option value={observation.id}>
                        {observation.cachGiamSat}
                      </option>
                    ))}
                </select>
              </div>
              <div className={classes.add}>
                <button className="btn" onClick={handleAddExam}>
                  Tạo mới kì thi
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

export default ModalAddExam;
