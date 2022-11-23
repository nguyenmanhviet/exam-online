import ReactDOM from "react-dom";
import { useContext, useRef } from "react";

import AuthContext from "../../store/authContext";
import { useNavigate } from "react-router-dom";
import classes from "./ModalQuiz.module.css";

const ModalQuiz = (props) => {
  const authCtx = useContext(AuthContext);
  const passwordInputRef = useRef();
  const navigate = useNavigate();
  const exitModalQuiz = (event) => {
    event.preventDefault();
    props.onExitModalQuiz();
  };

  const handleDoQuiz = () => {
    const enteredPassword = passwordInputRef.current.value;

    if (enteredPassword === props.password) {
      props.onExitModalQuiz();
      navigate("/camera-recognition");
    }
  };

  return ReactDOM.createPortal(
    <div className={classes.modal}>
      <header className={classes.modal__header}>
        <a href="#" onClick={exitModalQuiz} className={classes.close} />
        <div className={classes.search}>
          <p>Nhập mật khẩu bài kiểm tra</p>

          <p className={classes.headera}>Mật khẩu</p>
          <form>
            <input
              type="password"
              className={classes.inputCode}
              ref={passwordInputRef}
            ></input>

            <div className={classes.actions}>
              <div className={classes.btnHolder}>
                <button
                  className={classes.doQuiz}
                  type="button"
                  onClick={handleDoQuiz}
                >
                  Làm bài
                </button>
                <button type="button" onClick={exitModalQuiz}>
                  Thoát
                </button>
              </div>
            </div>
          </form>
        </div>
      </header>
    </div>,
    document.getElementById("modal-root")
  );
};

export default ModalQuiz;
