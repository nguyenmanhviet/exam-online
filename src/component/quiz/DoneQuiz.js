import classes from "./DoneQuiz.module.css";
import Card from "../UI/Card";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

const DoneQuiz = (props) => {
  const navigate = useNavigate();

  if (document.exitFullscreen) document.exitFullscreen();

  const handleBack = () => {
    navigate("/home");
  };

  return (
    <Fragment>
      <Card>
        <div className={classes.search}>
          <p className={classes.headera}>Kết quả làm bài</p>
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
                  <td className={classes.lalign}>
                    {props.ketQua.hocPhan.hocPhan}
                  </td>
                  <td>{props.ketQua.kyThi.kyThi}</td>
                  <td>{props.ketQua.namHoc.namHoc}</td>
                  <td>{props.ketQua.hocKy.hocKy}</td>
                  <td>{props.ketQua.lopHocPhan.tenLop}</td>
                  <td>{props.ketQua.timeStart}</td>
                  <td>{props.ketQua.timeEnd}</td>
                  <td>{props.ketQua.tongSoCauHoi}</td>
                  <td>{props.ketQua.soCauDung}</td>
                  <td>{props.ketQua.soLanViPham}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <div className={classes.detaile} onClick={handleBack}>
              <button>Trở về trang chủ</button>
            </div>
          </div>
        </div>
      </Card>
    </Fragment>
  );
};

export default DoneQuiz;
