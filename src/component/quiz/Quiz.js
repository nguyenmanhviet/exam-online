import classes from "./Quiz.module.css";
import Card from "../UI/Card";
import { Fragment } from "react";
import { IoIosEye, IoLogoHackernews } from "react-icons/io";
import { useEffect, useState, useContext } from "react";
import AuthContext from "../../store/authContext";
import QuizRow from "./QuizRow";

const Quiz = (props) => {
  const [kyThiList, setKyThiList] = useState([]);
  const authCtx = useContext(AuthContext);


  useEffect(() => {
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    headers.append("Access-Control-Allow-Origin", "http://3.105.183.164:3001");
    headers.append("Access-Control-Allow-Credentials", "true");
    fetch(`http://3.105.183.164:3001/sv/${authCtx.id}/kythi`, {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.items);
        setKyThiList(data.items);
      })
      .catch((err) => console.log(err));
  }, []);

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
                    <span>Thời gian kết thúc</span>
                  </th>
                  <th>
                    <span>Làm bài</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {kyThiList &&
                  kyThiList.map((lhp) => (
                    <QuizRow
                      kyThi={lhp}
                      onActiveModalQuiz={props.onActiveModalQuiz}
                    />
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </Fragment>
  );
};

export default Quiz;
