import classes from "./DoneQuiz.module.css";
import Card from "../UI/Card";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

const DoneQuiz = (props) => {
  const navigate = useNavigate();

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
