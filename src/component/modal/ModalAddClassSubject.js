import ReactDOM from "react-dom";
import { useContext, useEffect, useState, useRef } from "react";

import AuthContext from "../../store/authContext";

import classes from "./ModalAddClassSubject.module.css";

const ModalAddClassSubject = (props) => {
  const [years, setYears] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [payload, setPayload] = useState({});
  const tenLopInputRef = useRef();
  const maLopInputRef = useRef();

  const authCtx = useContext(AuthContext);
  const exitLogin = (event) => {
    event.preventDefault();
    props.onExitModalAddClassSubject();
  };

  const handleAddClassSubject = (event) => {
    event.preventDefault();
    const tenLop = tenLopInputRef.current.value;
    const maLop = maLopInputRef.current.value;

    fetch("http://3.105.183.164:3001/addClassSubject", {
      method: "POST",
      body: JSON.stringify({
        tenLop: tenLop,
        maLop: maLop,
        ...payload,
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
        props.onExitModalAddClassSubject();
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
          namHocId: data[0].id,
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
          hocKyId: data[0].id,
        }));
        setSemesters(data);
      })
      .catch((err) => console.log(err));

    fetch(`http://3.105.183.164:3001/teacher`, {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        setPayload((payload) => ({
          ...payload,
          giangVienId: data.items[0].id,
        }));
        setTeachers(data.items);
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
          hocPhanId: data.items[0].id,
        }));
        setSubjects(data.items);
      })
      .catch((err) => console.log(err));
  }, []);

  return ReactDOM.createPortal(
    <div className={classes.modal}>
      <header className={classes.modal__header}>
        <a href="#" onClick={exitLogin} className={classes.close} />
        <div className={classes.search}>
          <p>Thông tin lớp học phần</p>
          <div>
            <form>
              <div className={classes.searching}>
                <div className={classes.control}>
                  <label htmlFor="username">Năm học</label>
                  <select
                    name="year"
                    onChange={(event) => {
                      setPayload((payload) => ({
                        ...payload,
                        namHocId: event.target.value,
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
                  <label htmlFor="password">Học kỳ</label>
                  <select
                    name="semester"
                    onChange={(event) => {
                      setPayload((payload) => ({
                        ...payload,
                        hocKyId: event.target.value,
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
                  <label htmlFor="password">Học phần</label>
                  <select
                    name="subject"
                    onChange={(event) => {
                      setPayload((payload) => ({
                        ...payload,
                        hocPhanId: event.target.value,
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
                  <label htmlFor="password">Giảng viên</label>
                  <select
                    name="teacher"
                    onChange={(event) => {
                      setPayload((payload) => ({
                        ...payload,
                        giangVienId: event.target.value,
                      }));
                    }}
                  >
                    {teachers &&
                      teachers.map((teacher) => (
                        <option value={teacher.id}>{teacher.hoTen}</option>
                      ))}
                  </select>
                </div>
                <div className={classes.control}>
                  <label htmlFor="username">Tên lớp học phần: *</label>
                  <input
                    type="text"
                    placeholder="Học phần"
                    ref={tenLopInputRef}
                  />
                </div>
                <div className={classes.control}>
                  <label htmlFor="username">Mã lớp học phần: *</label>
                  <input
                    type="text"
                    placeholder="Mã học phần"
                    ref={maLopInputRef}
                  />
                </div>
              </div>
              <div className={classes.add}>
                <button className="btn" onClick={handleAddClassSubject}>
                  Thêm mới lớp học phần
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

export default ModalAddClassSubject;
