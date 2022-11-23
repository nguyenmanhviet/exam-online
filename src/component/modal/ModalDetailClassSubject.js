import ReactDOM from "react-dom";
import { useContext, useEffect, useState } from "react";

import AuthContext from "../../store/authContext";

import classes from "./ModalDetailClassSubject.module.css";

const ModalDetailClassSubject = (props) => {
  const [results, setResults] = useState([]);
  const authCtx = useContext(AuthContext);
  const exitLogin = (event) => {
    event.preventDefault();
    props.onExitDetailClassSubject();
  };

  useEffect(() => {
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    headers.append("Access-Control-Allow-Origin", "http://3.105.183.164:3001");
    headers.append("Access-Control-Allow-Credentials", "true");
    fetch(
      `http://3.105.183.164:3001/student/${authCtx.id}/exam/${props.classSubject.id}/result`,
      {
        method: "GET",
        headers: headers,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setResults(data.items);
      })
      .catch((err) => console.log(err));
  }, []);

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
                {results &&
                  results.map((kq) => (
                    <tr>
                      <td className={classes.lalign}>{kq.hocPhan.hocPhan}</td>
                      <td>{kq.kyThi.kyThi}</td>
                      <td>{kq.namHoc.namHoc}</td>
                      <td>{kq.hocKy.hocKy}</td>
                      <td>{kq.lopHocPhan.tenLop}</td>
                      <td>{kq.timeStart}</td>
                      <td>{kq.timeEnd}</td>
                      <td>{kq.tongSoCauHoi}</td>
                      <td>{kq.soCauDung}</td>
                      <td>{kq.soLanViPham}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
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

export default ModalDetailClassSubject;
