import ReactDOM from "react-dom";
import { useContext, useEffect, useState, useRef } from "react";

import AuthContext from "../../store/authContext";

import classes from "./ModalAddStudentManagement.module.css";

const ModalAddStudentManagement = (props) => {
  const [majors, setMajors] = useState([]);
  const [classNames, setClasses] = useState([]);
  const [khoaHocs, setKhoaHocs] = useState([]);
  const [payload, setPayload] = useState({ gender: true });
  const tenInputRef = useRef();
  const maInputRef = useRef();
  const birthDayInputRef = useRef();
  const phoneInputRef = useRef();
  const emailInputRef = useRef();

  const authCtx = useContext(AuthContext);
  const exitLogin = (event) => {
    event.preventDefault();
    props.onExitModalAddStudentManagement();
  };

  const handleAddTeacher = (event) => {
    event.preventDefault();
    const name = tenInputRef.current.value;
    const mssv = maInputRef.current.value;
    const phone = phoneInputRef.current.value;
    const email = emailInputRef.current.value;
    const birthday = birthDayInputRef.current.value;

    fetch("http://3.105.183.164:3001/addStudent", {
      method: "POST",
      body: JSON.stringify({
        name,
        mssv,
        phone,
        email,
        birthday,
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
        props.onExitModalAddStudentManagement();
        window.location.reload(false);
      });
  };

  useEffect(() => {
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    headers.append("Access-Control-Allow-Origin", "http://3.105.183.164:3001");
    headers.append("Access-Control-Allow-Credentials", "true");
    fetch(`http://3.105.183.164:3001/major`, {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        setPayload((payload) => ({
          ...payload,
          majorId: data[0].id,
        }));
        setMajors(data);
      })
      .catch((err) => console.log(err));
    fetch(`http://3.105.183.164:3001/class`, {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        setPayload((payload) => ({
          ...payload,
          classId: data[0].id,
        }));
        setClasses(data);
      })
      .catch((err) => console.log(err));

    fetch(`http://3.105.183.164:3001/khoaHoc`, {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        setPayload((payload) => ({
          ...payload,
          khoaHocId: data[0].id,
        }));
        setKhoaHocs(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return ReactDOM.createPortal(
    <div className={classes.modal}>
      <header className={classes.modal__header}>
        <a href="#" onClick={exitLogin} className={classes.close} />
        <div className={classes.search}>
          <p>Th??ng tin sinh vi??n</p>
          <div>
            <form>
              <div className={classes.searching}>
                <div className={classes.control}>
                  <label htmlFor="username">Khoa</label>
                  <select
                    name="year"
                    onChange={(event) => {
                      setPayload((payload) => ({
                        ...payload,
                        majorId: event.target.value,
                      }));
                    }}
                  >
                    {majors &&
                      majors.map((major) => (
                        <option value={major.id}>{major.khoa}</option>
                      ))}
                  </select>
                </div>
                <div className={classes.control}>
                  <label htmlFor="password">L???p</label>
                  <select
                    name="year"
                    onChange={(event) => {
                      setPayload((payload) => ({
                        ...payload,
                        classId: event.target.value,
                      }));
                    }}
                  >
                    {classNames &&
                      classNames.map((cla) => (
                        <option value={cla.id}>{cla.lop}</option>
                      ))}
                  </select>
                </div>
                <div className={classes.control}>
                  <label htmlFor="password">Kh??a H???c</label>
                  <select
                    name="year"
                    onChange={(event) => {
                      setPayload((payload) => ({
                        ...payload,
                        khoaHocId: event.target.value,
                      }));
                    }}
                  >
                    {khoaHocs &&
                      khoaHocs.map((cla) => (
                        <option value={cla.id}>{cla.khoaHoc}</option>
                      ))}
                  </select>
                </div>
                <div className={classes.control}>
                  <label htmlFor="username">Gi???i t??nh</label>
                  <select
                    name="year"
                    onChange={(event) => {
                      setPayload((payload) => ({
                        ...payload,
                        gender: event.target.value,
                      }));
                    }}
                  >
                    <option value={true}>Nam</option>
                    <option value={false}>N???</option>
                  </select>
                </div>

                <div className={classes.control}>
                  <label htmlFor="username">T??n sinh vi??n: *</label>
                  <input
                    type="text"
                    placeholder="T??n sinh vi??n"
                    ref={tenInputRef}
                  />
                </div>
                <div className={classes.control}>
                  <label htmlFor="username">M?? s??? sinh vi??n: *</label>
                  <input
                    type="text"
                    placeholder="M?? s??? sinh vi??n"
                    ref={maInputRef}
                  />
                </div>
                <div className={classes.control}>
                  <label htmlFor="username">Ng??y sinh: *</label>
                  <input type="date" ref={birthDayInputRef} />
                </div>
                <div className={classes.control}>
                  <label htmlFor="username">S??? ??i???n tho???i: *</label>
                  <input
                    type="text"
                    placeholder="??i???n tho???i"
                    ref={phoneInputRef}
                  />
                </div>
                <div className={classes.control}>
                  <label htmlFor="username">Email: *</label>
                  <input type="text" placeholder="Email" ref={emailInputRef} />
                </div>
              </div>
              <div
                style={{
                  color: "red",
                }}
              >
                L??u ??: Th??m sinh vi??n s??? t??? ?????ng th??m t??i kho???n v???i usename v??
                password l?? m?? s??? sinh vi??n.
              </div>
              <div className={classes.add}>
                <button className="btn" onClick={handleAddTeacher}>
                  Th??m m???i sinh vi??n
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

export default ModalAddStudentManagement;
