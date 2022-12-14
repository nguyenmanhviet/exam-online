import ReactDOM from "react-dom";
import { useContext, useState, useEffect, useRef } from "react";

import AuthContext from "../../store/authContext";
import DateTimePicker from "react-datetime-picker";
import classes from "./ModalEditExam.module.css";

const ModalEditExam = (props) => {
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
    props.onExitModalEditExam();
  };

  const handleAddExam = (event) => {
    event.preventDefault();

    const examName = examNameInputRef.current.value;
    const volumeQuestion = volumeQuestionInputRef.current.value;
    const timeDoQuiz = timeDoQuizInputRef.current.value;
    const turnDoQuiz = turnDoQuizInputRef.current.value;
    const password = passwordInputRef.current.value;

    const answer = [];

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
        props.onExitModalEditExam();
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
        setYears(data);
      })
      .catch((err) => console.log(err));

    fetch(`http://3.105.183.164:3001/semester`, {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        setSemesters(data);
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

    fetch(`http://3.105.183.164:3001/observation`, {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        setObservations(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return ReactDOM.createPortal(
    <div className={classes.modal}>
      <header className={classes.modal__header}>
        <a href="#" onClick={exitLogin} className={classes.close} />
        <div className={classes.search}>
          <p>Th??ng tin k?? thi</p>
          <div>
            <form>
              <div className={classes.searching}>
                <div className={classes.control}>
                  <label htmlFor="username">N??m h???c: </label>
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
                        <option
                          value={year.id}
                          selected={props.exam.namHoc.id == year.id}
                        >
                          {year.namHoc}
                        </option>
                      ))}
                  </select>
                </div>
                <div className={classes.control}>
                  <label htmlFor="username">H???c k???: </label>
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
                        <option
                          value={semester.id}
                          selected={props.exam.hocKy.id == semester.id}
                        >
                          {semester.hocKy}
                        </option>
                      ))}
                  </select>
                </div>
                <div className={classes.control}>
                  <label htmlFor="username">H???c ph???n</label>
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
                        <option
                          value={subject.id}
                          selected={props.exam.hocPhan.id == subject.id}
                        >
                          {subject.hocPhan}
                        </option>
                      ))}
                  </select>
                </div>
                <div className={classes.control} style={{ marginTop: "10px" }}>
                  <label htmlFor="username">T??n k??? thi</label>
                  <input
                    type="text"
                    placeholder="T??n k??? thi"
                    style={{ width: "1100px" }}
                    className={classes.input}
                    value={props.exam.kyThi}
                    ref={examNameInputRef}
                  />
                </div>
                <div className={classes.control} style={{ marginTop: "10px" }}>
                  <label htmlFor="username">Th???i gian b???t ?????u</label>
                  <div style={{ marginRight: "20px" }}>
                    <DateTimePicker onChange={setTimeStart} value={props.exam.timeStart} />
                  </div>
                </div>
                <div className={classes.control}>
                  <label htmlFor="password">Th???i gian k???t th??c</label>
                  <div style={{ marginRight: "20px" }}>
                    <DateTimePicker
                      onChange={setTimeEnd}
                      value={props.exam.timeEnd}
                      openWidgetsOnFocus={true}
                    />
                  </div>
                </div>
                <div className={classes.control} style={{ marginTop: "10px" }}>
                  <label htmlFor="username">S??? c??u h???i:</label>
                  <input
                    type="number"
                    placeholder="S??? c??u h???i"
                    className={classes.input}
                    ref={volumeQuestionInputRef}
                    value={props.exam.soCauHoi}
                  />
                </div>
                <div className={classes.control} style={{ marginTop: "10px" }}>
                  <label htmlFor="username">Th???i gian l??m b??i:</label>
                  <input
                    type="number"
                    placeholder="Th???i gian l??m b??i"
                    className={classes.input}
                    ref={timeDoQuizInputRef}
                    value={props.exam.thoiGianLamBai}
                  />
                </div>
                <div className={classes.control} style={{ marginTop: "10px" }}>
                  <label htmlFor="username">S??? l?????t l??m b??i:</label>
                  <input
                    type="number"
                    placeholder="S??? l?????t l??m b??i"
                    className={classes.input}
                    ref={turnDoQuizInputRef}
                    value={props.exam.soLuotLamBai}
                  />
                </div>
              </div>

              <p>B???o m???t v?? gi??m s??t k??? thi</p>

              <div className={classes.control}>
                <label htmlFor="username">M???t kh???u l??m b??i: *</label>
                <input
                  type="text"
                  className={classes.input}
                  ref={passwordInputRef}
                  value={props.exam.password}
                />
              </div>
              <div className={classes.control}>
                <label htmlFor="username">C??ch gi??m s??t l??m b??i:</label>
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
                      <option value={observation.id} selected={props.exam.cachThucGiamSat.id == observation.id}>
                        {observation.cachGiamSat}
                      </option>
                    ))}
                </select>
              </div>
              <div className={classes.add}>
                <button className="btn" onClick={handleAddExam}>
                  Ch???nh s???a k?? thi
                </button>
              </div>
            </form>
          </div>

          <div className={classes.actions}>
            <div className={classes.btnHolder}>
              <button type="button" onClick={exitLogin}>
                Tho??t
              </button>
            </div>
          </div>
        </div>
      </header>
    </div>,
    document.getElementById("modal-root")
  );
};

export default ModalEditExam;
