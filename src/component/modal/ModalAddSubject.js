import ReactDOM from "react-dom";
import { useContext, useRef } from "react";

import AuthContext from "../../store/authContext";

import classes from "./ModalAddSubject.module.css";

const ModalAddSubject = (props) => {
  const subjectNameInputRef = useRef();
  const subjectCodeInputRef = useRef();

  const authCtx = useContext(AuthContext);
  const exitLogin = (event) => {
    event.preventDefault();
    props.onExitModalAddSubject();
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
        props.onExitModalAddSubject();
        window.location.reload(false);
      });
  };

  return ReactDOM.createPortal(
    <div className={classes.modal}>
      <header className={classes.modal__header}>
        <a href="#" onClick={exitLogin} className={classes.close} />
        <div className={classes.search}>
          <p>Thông tin học phần</p>
          <div>
            <form>
              <div className={classes.searching}>
                <div className={classes.control}>
                  <label>Tên học phần: *</label>
                  <input
                    type="text"
                    placeholder="Học phần"
                    ref={subjectNameInputRef}
                  />
                </div>
                <div className={classes.control}>
                  <label>Mã học phần: *</label>
                  <input
                    type="text"
                    placeholder="Mã học phần"
                    ref={subjectCodeInputRef}
                  />
                </div>
              </div>
              <div className={classes.add}>
                <button className="btn" onClick={submitHandlee}>
                  Thêm mới học phần
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

export default ModalAddSubject;
