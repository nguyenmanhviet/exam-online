import { Fragment, useContext, useState, useEffect } from "react";
import Card from "../UI/Card";
import classes from "./FaceData.module.css";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/authContext";
import LoadingSpin from "react-loading-spin";

const FaceDataInSchool = (props) => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const [isCompleted, setIsCompleted] = useState(false);
  const [student, setStudent] = useState({});
  const [imageUrl, setImageUrl] = useState("");

  const handleDoQuiz = () => {
    navigate("/home");
  };

  useEffect(() => {
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    headers.append("Access-Control-Allow-Origin", "http://3.105.183.164:3001");
    headers.append("Access-Control-Allow-Credentials", "true");
    fetch(`http://3.105.183.164:3001/student/${authCtx.id}`, {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((data1) => {
        setImageUrl(
          `http://cb.dut.udn.vn/imagesv/${data1.lop.lop.substring(0, 2)}/${
            data1.mssv
          }.jpg?fbclid=IwAR2Y-bpbY6gFIi9-8m67GoP6BtkT6UlK7EJpSwtqhseSjubp-UbSQbS06l0`
        );
        setIsCompleted(true);
        setStudent(data1);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Fragment>
      <Card>
        <div className={classes.search}>
          <p>Hình ảnh sinh viên trên hệ thống trường</p>
          {isCompleted && <img alt="face" src={imageUrl} />}
        </div>
      </Card>
    </Fragment>
  );
};

export default FaceDataInSchool;
