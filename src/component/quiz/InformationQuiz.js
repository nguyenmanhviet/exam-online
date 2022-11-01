import Countdown from "react-countdown";
import { useNavigate } from "react-router-dom";
import classes from "./InformationQuiz.module.css";
const InformationQuiz = () => {
  const navigate = useNavigate();

  const hanldeDoneQuiz = () => {
    navigate("/done-quiz");
  };

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      navigate("/done-quiz");
    } else {
      // Render a countdown
      return (
        <div className={classes.time}>
          {hours}h:{minutes}':{seconds}s
        </div>
      );
    }
  };
  return (
    <div>
      <p>
        <b>Lớp học phần: </b> 18Nh11A
      </p>
      <p>
        <b>Học phần: </b> Công nghệ phần mềm
      </p>
      <p>
        <b>Năm học: </b> 2020-2021 - Học kỳ 2
      </p>
      <p>
        <b>Bài kiểm tra: </b> Thi kết thúc học phần Kỹ thuật truyền số liệu (Học
        kỳ 2, năm học 2020-2021)
      </p>
      <p>
        <b>Số lượng câu hỏi: </b>40
      </p>
      <p>
        <b>Thời gian còn lại:</b>
        <Countdown date={Date.now() + 99999000} renderer={renderer}></Countdown>
      </p>
      <div className={classes.detaile} onClick={hanldeDoneQuiz}>
        <button>Nộp bài</button>
      </div>
    </div>
  );
};

export default InformationQuiz;
