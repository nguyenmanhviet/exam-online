import ReactDOM from "react-dom";
import { useContext } from "react";

import AuthContext from "../../store/authContext";

import classes from "./ModalAddSubject.module.css";

const ModalAddSubject = (props) => {
  const authCtx = useContext(AuthContext);
  const exitLogin = (event) => {
    event.preventDefault();
    props.onExitModalAddSubject();
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
                  <label htmlFor="username">Tên học phần: *</label>
                  <input type="text" placeholder="Học phần" />
                </div>
                <div className={classes.control}>
                  <label htmlFor="username">Mã học phần: *</label>
                  <input type="text" placeholder="Mã học phần" />
                </div>
              </div>
              <div className={classes.add}>
                <button className="btn">Thêm mới học phần</button>
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
