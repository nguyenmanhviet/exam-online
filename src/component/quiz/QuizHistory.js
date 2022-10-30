import classes from "./QuizHistory.module.css";
import Card from "../UI/Card";
import { Fragment } from "react";
import { IoIosEye } from "react-icons/io";

const QuizHistory = (props) => {
  

  return (
    <Fragment>
      <Card>
        <div className={classes.search}>
          <p>Điều kiện tìm kiếm</p>

          <div>
            <form>
              <div className={classes.searching}>
                <div className={classes.control}>
                  <label htmlFor="username">Năm học</label>
                  <select name="year">
                    <option value="all" selected>
                      Tất cả
                    </option>
                    <option value="">2021-2022</option>
                  </select>
                </div>
                <div className={classes.control}>
                  <label htmlFor="password">Học kỳ</label>
                  <select name="year">
                    <option value="all" selected>
                      Tất cả
                    </option>
                    <option value="">Học kỳ 2</option>
                  </select>
                </div>
                <div className={classes.control}>
                  <label htmlFor="password">Học phần</label>
                  <input />
                </div>
              </div>
              <div className={classes.actions}>
                <button className="btn">Tìm kiếm</button>
              </div>
            </form>
          </div>
        </div>
      </Card>
      <Card>
        <div className={classes.search}>
          <p>Danh sách lớp học phần</p>

          <div>
            <div className={classes.searching}>
              <div className={classes.control}>
                <label htmlFor="username">Hiển thị</label>
                <select name="year" className={classes.show}>
                  <option value="all" selected>
                    10
                  </option>
                  <option value="">5</option>
                </select>
              </div>
            </div>
          </div>

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
                  <td className={classes.lalign}>Phân tích thiết kế hướng đối tượng</td>
                  <td>Cuối kỳ 2 - 2021-2022 - PT & T.kế Hướng đối tượng</td>
                  <td>2021-2022</td>
                  <td>Học kỳ 1</td>
                  <td>18.11. Phân tích và Thiết kế HĐT</td>
                  <td>14:07 10/12/2021</td>
                  <td>14:48 10/12/2021</td>
                  <td>45</td>
                  <td>39</td>
                  <td>2</td>
                </tr>
              </tbody>
            </table>
            <div className={classes.container}>
              <ul className={classes.pagination}>
                <li className={classes.icon}>Pre</li>
                <li>1</li>
                <li className={classes.icon}>Next</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>
    </Fragment>
  );
};

export default QuizHistory;
