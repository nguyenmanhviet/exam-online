import ReactDOM from "react-dom";
import { useContext } from "react";

import AuthContext from "../../store/authContext";

import classes from "./ModalDetailClassSubject.module.css";

const ModalDetailClassSubject = (props) => {
  const authCtx = useContext(AuthContext);
  const exitLogin = (event) => {
    event.preventDefault();
    props.onExitDetailClassSubject();
  };

  return ReactDOM.createPortal(
    <div className={classes.modal}>
      <header className={classes.modal__header}>
        <a href="#" onClick={exitLogin} className={classes.close} />
        <div className={classes.search}>
          <p>Chi tiết lớp học phần</p>

          <p className={classes.headera}>Bài kiểm tra đã làm</p>
          <div className={classes.wrapper}>
            <table
              className={classes.keywords}
              cellspacing="1"
              cellpadding="3"
              color="#7C95AC"
            >
              <thead>
                <tr>
                  <th>
                    <span>Học phần</span>
                  </th>
                  <th>
                    <span>Đợt kiểm tra</span>
                  </th>
                  <th>
                    <span>Năm học</span>
                  </th>
                  <th>
                    <span>Học kỳ</span>
                  </th>
                  <th>
                    <span>Nhóm</span>
                  </th>
                  <th>
                    <span>Thời gian làm bài</span>
                  </th>
                  <th>
                    <span>Thời gian nộp bài</span>
                  </th>
                  <th>
                    <span>Tổng số câu hỏi</span>
                  </th>
                  <th>
                    <span>Số câu đúng</span>
                  </th>
                  <th>
                    <span>Số lần vi phạm</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={classes.lalign}>Công nghệ phần mềm</td>
                  <td>Thi cuối kỳ 2 (2020-2021) Công nghệ phần mềm</td>
                  <td>2020-2021</td>
                  <td>Học kỳ 2</td>
                  <td>18Nh11A</td>
                  <td>13:02 11/08/2021</td>
                  <td>13:41 11/08/2021</td>
                  <td>60</td>
                  <td>49</td>
                  <td>0</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className={classes.headera}>Bài tập đã làm</p>
          <div className={classes.wrapper}>
            <table
              className={classes.keywords}
              cellspacing="1"
              cellpadding="3"
              color="#7C95AC"
            >
              <thead>
                <tr>
                  <th>
                    <span>Bài tập</span>
                  </th>
                  <th>
                    <span>Học phần</span>
                  </th>
                  <th>
                    <span>Chương</span>
                  </th>
                  <th>
                    <span>Thời gian nhận bài</span>
                  </th>
                  <th>
                    <span>Thời gian nộp bài</span>
                  </th>
                  <th>
                    <span>Đề bài</span>
                  </th>
                  <th>
                    <span>Bài làm</span>
                  </th>
                  <th>
                    <span>Điểm</span>
                  </th>
                </tr>
              </thead>
            </table>
          </div>
          
          <div className={classes.actions}>
            <div className={classes.btnHolder}>
              <button type="button"  onClick={exitLogin}>Thoát</button>
            </div>
          </div>
        </div>
      </header>
    </div>,
    document.getElementById("modal-root")
  );
};

export default ModalDetailClassSubject;
