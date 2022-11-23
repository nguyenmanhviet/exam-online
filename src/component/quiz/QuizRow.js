import classes from "./Quiz.module.css";
import Card from "../UI/Card";
import { Fragment } from "react";
import { IoIosEye, IoLogoHackernews } from "react-icons/io";
import { useEffect, useState, useContext } from "react";
import AuthContext from "../../store/authContext";

export const formatDateTime = (date) => {
  const m = new Date(date);
  return (
    ("0" + m.getUTCHours()).slice(-2) +
    ":" +
    ("0" + m.getUTCMinutes()).slice(-2) +
    " " +
    ("0" + m.getUTCDate()).slice(-2) +
    "/" +
    ("0" + (m.getUTCMonth() + 1)).slice(-2) +
    "/" +
    m.getUTCFullYear()
  );
};

const QuizRow = (props) => {
  const authCtx = useContext(AuthContext);
  const [isAllow, setIsAllow] = useState(false);

  useEffect(() => {
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    headers.append("Access-Control-Allow-Origin", "http://3.105.183.164:3001");
    headers.append("Access-Control-Allow-Credentials", "true");
    fetch(
      `http://3.105.183.164:3001/student/${authCtx.id}/exam/${props.kyThi.id}/result`,
      {
        method: "GET",
        headers: headers,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("data ket qua", data);
        if (
          data.items.length < props.kyThi.soLuotLamBai &&
          new Date(
            new Date(props.kyThi.timeStart).getTime() - 7 * 60 * 60 * 1000
          ).getTime() < new Date().getTime() &&
          new Date(
            new Date(props.kyThi.timeEnd).getTime() - 7 * 60 * 60 * 1000
          ).getTime() > new Date().getTime()
        ) {
          setIsAllow(true);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleQuiz = () => {
    props.onActiveModalQuiz(props.kyThi.password, props.kyThi);
  };

  return (
    <Fragment>
      <tr>
        <td className={classes.lalign}>{props.kyThi.hocPhan.hocPhan}</td>
        <td>{props.kyThi.kyThi}</td>
        <td>{props.kyThi.soCauHoi} (câu)</td>
        <td>{props.kyThi.thoiGianLamBai} (phút)</td>
        <td>{formatDateTime(props.kyThi.timeStart)}</td>
        <td>{formatDateTime(props.kyThi.timeEnd)}</td>
        <td className={classes.detaile}>
          {isAllow && <button onClick={handleQuiz}>Làm bài</button>}
          {/* {!isAllow && } */}
        </td>
      </tr>
    </Fragment>
  );
};

export default QuizRow;
