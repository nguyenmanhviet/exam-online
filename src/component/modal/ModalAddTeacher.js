import ReactDOM from "react-dom";
import { useContext, useEffect, useState, useRef } from "react";

import AuthContext from "../../store/authContext";

import classes from "./ModalAddTeacher.module.css";

const ModalAddTeacher = (props) => {
  const [majors, setMajors] = useState([]);
  const [payload, setPayload] = useState({ gender: true });
  const tenInputRef = useRef();
  const maInputRef = useRef();
  const birthDayInputRef = useRef();
  const phoneInputRef = useRef();
  const emailInputRef = useRef();

  const authCtx = useContext(AuthContext);
  const exitLogin = (event) => {
    event.preventDefault();
    props.onExitModalAddTeacher();
  };

  const handleAddTeacher = (event) => {
    event.preventDefault();
    const name = tenInputRef.current.value;
    const mssv = maInputRef.current.value;
    const phone = phoneInputRef.current.value;
    const email = emailInputRef.current.value;
    const birthday = birthDayInputRef.current.value;

    fetch("http://3.105.183.164:3001/addTeacher", {
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
        props.onExitModalAddTeacher();
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
  }, []);

  return ReactDOM.createPortal(
    <div className={classes.modal}>
      <header className={classes.modal__header}>
        <a href="#" onClick={exitLogin} className={classes.close} />
        <div className={classes.search}>
          <p>Thông tin giảng viên</p>
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
                  <label htmlFor="username">Giới tính</label>
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
                    <option value={false}>Nữ</option>
                  </select>
                </div>

                <div className={classes.control}>
                  <label htmlFor="username">Tên giảng viên: *</label>
                  <input
                    type="text"
                    placeholder="Tên giảng viên"
                    ref={tenInputRef}
                  />
                </div>
                <div className={classes.control}>
                  <label htmlFor="username">Mã số giáo viên: *</label>
                  <input
                    type="text"
                    placeholder="Mã số giáo viên"
                    ref={maInputRef}
                  />
                </div>
                <div className={classes.control}>
                  <label htmlFor="username">Ngày sinh: *</label>
                  <input type="date" ref={birthDayInputRef} />
                </div>
                <div className={classes.control}>
                  <label htmlFor="username">Số điện thoại: *</label>
                  <input
                    type="text"
                    placeholder="Điện thoại"
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
                Lưu ý: Thêm giảng viên sẽ tự động thêm tài khoản với usename và
                password là mã số giảng viên.
              </div>
              <div className={classes.add}>
                <button className="btn" onClick={handleAddTeacher}>
                  Thêm mới giảng viên
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

export default ModalAddTeacher;
