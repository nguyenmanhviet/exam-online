import ReactDOM from "react-dom";
import { useContext, useRef, useEffect } from "react";

import AuthContext from "../../store/authContext";

import classes from "./ModalEditSubject.module.css";

const ModalEditSubject = (props) => {
  const subjectNameInputRef = useRef();
  const subjectCodeInputRef = useRef();

  const authCtx = useContext(AuthContext);
  const exitLogin = (event) => {
    event.preventDefault();
    props.onExitModalEditSubject();
  };

  const submitHandlee = (event) => {
    event.preventDefault();

    const subjectName = subjectNameInputRef.current.value;
    const subjectCode = subjectCodeInputRef.current.value;

    fetch("http://3.105.183.164:3001/addSubject", {
      method: "POST",
      body: JSON.stringify({
        subjectName: subjectName,
        subjectCode: subjectCode,
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
        props.onExitModalEditSubject();
        window.location.reload(false);
      });
  };

  return ReactDOM.createPortal(
    <div className={classes.modal}>
      <header className={classes.modal__header}>
        <a href="#" onClick={exitLogin} className={classes.close} />
        <div className={classes.search}>
          <p>Chỉnh sửa thông tin học phần</p>
          <div>
            <form>
              <div className={classes.searching}>
                <div className={classes.control}>
                  <label htmlFor="username">Tên học phần: *</label>
                  <input
                    type="text"
                    value={props.subject.hocPhan}
                    ref={subjectNameInputRef}
                  />
                </div>
                <div className={classes.control}>
                  <label htmlFor="username">Mã học phần: *</label>
                  <input
                    type="text"
                    value={props.subject.maHocPhan}
                    ref={subjectCodeInputRef}
                  />
                </div>
              </div>
              <div className={classes.add}>
                <button className="btn" onClick={submitHandlee}>
                  Lưu học phần
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

export default ModalEditSubject;
