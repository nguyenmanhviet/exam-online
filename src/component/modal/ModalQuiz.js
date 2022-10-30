import ReactDOM from "react-dom";
import { useContext } from "react";

import AuthContext from "../../store/authContext";

import classes from "./ModalQuiz.module.css";

const ModalQuiz = (props) => {
  const authCtx = useContext(AuthContext);
  const exitLogin = (event) => {
    event.preventDefault();
    props.onExitModalQuiz();
  };

  return ReactDOM.createPortal(
    <div className={classes.modal}>
      <header className={classes.modal__header}>
        <a href="#" onClick={exitLogin} className={classes.close} />
        <div className={classes.search}>
          <p>Nhập mật khẩu bài kiểm tra</p>

          <p className={classes.headera}>Mật khẩu</p>
          <form>
            <input type="password"></input>

            <div className={classes.actions}>
              <div className={classes.btnHolder}>
                <button
                  className={classes.doQuiz}
                  type="button"
                  onClick={exitLogin}
                >
                  Làm bài
                </button>
                <button type="button" onClick={exitLogin}>
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
