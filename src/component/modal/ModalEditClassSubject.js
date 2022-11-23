import ReactDOM from "react-dom";
import { useContext, useEffect, useState } from "react";

import AuthContext from "../../store/authContext";

import classes from "./ModalEditClassSubject.module.css";

const ModalEditClassSubject = (props) => {
  const [years, setYears] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const authCtx = useContext(AuthContext);
  const exitLogin = (event) => {
    event.preventDefault();
    props.onExitModalEditClassSubject();
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

    fetch(`http://3.105.183.164:3001/teacher`, {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        setTeachers(data.items);
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
                  <select name="year">
                    {years &&
                      years.map((year) => (
                        <option
                          value={year.id}
                          selected={year.id == props.classSubject.namHoc.id}
                        >
                          {year.namHoc}
                        </option>
                      ))}
                  </select>
                </div>
                <div className={classes.control}>
                  <label htmlFor="password">Học kỳ</label>
                  <select name="year">
                    {semesters &&
                      semesters.map((semester) => (
                        <option
                          value={semester.id}
                          selected={semester.id == props.classSubject.hocKy.id}
                        >
                          {semester.hocKy}
                        </option>
                      ))}
                  </select>
                </div>
                <div className={classes.control}>
                  <label htmlFor="password">Học phần</label>
                  <select name="year">
                    {subjects &&
                      subjects.map((subject) => (
                        <option
                          value={subject.id}
                          selected={subject.id == props.classSubject.hocPhan.id}
                        >
                          {subject.hocPhan}
                        </option>
                      ))}
                  </select>
                </div>
                <div className={classes.control}>
                  <label htmlFor="password">Giảng viên</label>
                  <select name="year">
                    {teachers &&
                      teachers.map((teacher) => (
                        <option
                          value={teacher.id}
                          selected={teacher.id == props.classSubject.giangVien.id}
                        >
                          {teacher.hoTen}
                        </option>
                      ))}
                  </select>
                </div>
                <div className={classes.control}>
                  <label htmlFor="username">Tên lớp học phần: *</label>
                  <input type="text" value={props.classSubject.tenLop} />
                </div>
                <div className={classes.control}>
                  <label htmlFor="username">Mã lớp học phần: *</label>
                  <input type="text" value={props.classSubject.maLop} />
                </div>
              </div>
              <div className={classes.add}>
                <button className="btn">Lưu thông tin lớp học phần</button>
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

export default ModalEditClassSubject;
