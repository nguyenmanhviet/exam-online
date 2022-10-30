import classes from "./Quiz.module.css";
import Card from "../UI/Card";
import { Fragment } from "react";
import { IoIosEye } from "react-icons/io";

const Quiz = (props) => {
  const handleQuiz = () => {
    props.onActiveModalQuiz();
  };

  return (
    <Fragment>
      <Card>
        <div className={classes.search}>
          <p>Danh sách bài kiểm tra</p>
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
                    <span>Bài kiểm tra</span>
                  </th>
                  <th>
                    <span>Số lượng câu hỏi</span>
                  </th>
                  <th>
                    <span>Thời gian làm bài</span>
                  </th>
                  <th>
                    <span>Thời gian bắt đầu</span>
                  </th>
                  <th>
                    <span>Thời gian kết quả</span>
                  </th>
                  <th>
                    <span>Làm bài</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={classes.lalign}>Kỹ thuật truyền số liệu</td>
                  <td>
                    Thi kết thúc học phần Kỹ thuật truyền số liệu (Học kỳ 2, năm
                    học 2020-2021)
                  </td>
                  <td>60 (câu)</td>
                  <td>45 (phút)</td>
                  <td></td>
                  <td></td>
                  <td className={classes.detaile}>
                    <button onClick={handleQuiz}>Làm bài</button>
                  </td>
                </tr>
                <tr>
                  <td className={classes.lalign}>Kỹ thuật truyền số liệu</td>
                  <td>
                    Thi kết thúc học phần Kỹ thuật truyền số liệu (Học kỳ 2, năm
                    học 2020-2021)
                  </td>
                  <td>60 (câu)</td>
                  <td>45 (phút)</td>
                  <td></td>
                  <td></td>
                  <td className={classes.detaile}>
                    <button onClick={handleQuiz}>Làm bài</button>
                  </td>
                </tr>
                <tr>
                  <td className={classes.lalign}>Kỹ thuật truyền số liệu</td>
                  <td>
                    Thi kết thúc học phần Kỹ thuật truyền số liệu (Học kỳ 2, năm
                    học 2020-2021)
                  </td>
                  <td>60 (câu)</td>
                  <td>45 (phút)</td>
                  <td></td>
                  <td></td>
                  <td className={classes.detaile}>
                    <button onClick={handleQuiz}>Làm bài</button>
                  </td>
                </tr>
                <tr>
                  <td className={classes.lalign}>Kỹ thuật truyền số liệu</td>
                  <td>
                    Thi kết thúc học phần Kỹ thuật truyền số liệu (Học kỳ 2, năm
                    học 2020-2021)
                  </td>
                  <td>60 (câu)</td>
                  <td>45 (phút)</td>
                  <td></td>
                  <td></td>
                  <td className={classes.detaile}>
                    <button onClick={handleQuiz}>Làm bài</button>
                  </td>
                </tr>
                <tr>
                  <td className={classes.lalign}>Kỹ thuật truyền số liệu</td>
                  <td>
                    Thi kết thúc học phần Kỹ thuật truyền số liệu (Học kỳ 2, năm
                    học 2020-2021)
                  </td>
                  <td>60 (câu)</td>
                  <td>45 (phút)</td>
                  <td></td>
                  <td></td>
                  <td className={classes.detaile}>
                    <button onClick={handleQuiz}>Làm bài</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </Fragment>
  );
};

export default Quiz;
