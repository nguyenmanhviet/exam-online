import ReactDOM from "react-dom";
import { useContext } from "react";

import AuthContext from "../../store/authContext";

import classes from "./ModalEditSubject.module.css";

const ModalEditSubject = (props) => {
  const authCtx = useContext(AuthContext);
  const exitLogin = (event) => {
    event.preventDefault();
    props.onExitModalEditSubject();
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
                    value="Phân tích thiết kế hướng đối tượng"
                  />
                </div>
                <div className={classes.control}>
                  <label htmlFor="username">Mã học phần: *</label>
                  <input type="text" value="PTTK_HDT" />
                </div>
              </div>
              <div className={classes.add}>
                <button className="btn">Lưu học phần</button>
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
