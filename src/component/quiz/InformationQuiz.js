import Countdown from "react-countdown";
import { useNavigate } from "react-router-dom";
import classes from "./InformationQuiz.module.css";
import AuthContext from "../../store/authContext";
import { useContext, useEffect, useMemo, useState } from "react";

const InformationQuiz = (props) => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const [danhSachLopHocPhan, setDanhSachLopHocPhan] = useState([]);
  const [lopHocPhan, setLopHocPhan] = useState({ tenLop: "" });

  const timeStart = new Date();

  const tongThoiGianLamBai = useMemo(() => {
    return Date.now() + props.kyThi.thoiGianLamBai * 60 * 1000;
  }, [props.kyThi.thoiGianLamBai]);

  useEffect(() => {
    fetch(`http://3.105.183.164:3001/sv/${authCtx.id}/lophocphan`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setDanhSachLopHocPhan(data.items);
        const lopHocPhan = data.items.find(
          (lhp) => lhp.hocPhanId == props.kyThi.hocPhanId
        );
        setLopHocPhan(lopHocPhan ?? { tenLop: "" });
      });
    console.log("?????");
  }, []);

  const hanldeDoneQuiz = () => {
    const timeEnd = new Date();
    fetch(`http://3.105.183.164:3001/sv/${authCtx.id}/nopbai`, {
      method: "POST",
      body: JSON.stringify({
        hocPhanId: props.kyThi.hocPhanId,
        tongSoCauHoi: props.kyThi.soCauHoi,
        kyThiId: props.kyThi.id,
        lopHocPhanId: lopHocPhan.id,
        answer: Object.values(props.result),
        hocKyId: props.kyThi.hocKy.id,
        namHocId: props.kyThi.namHoc.id,
        timeStart,
        timeEnd,
        soLanViPham: props.loiViPham,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        props.setKetQua(data);
        props.setIsTurnOffCam(true);
        navigate("/done-quiz");
      });
  };

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      hanldeDoneQuiz();
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
        <b>L???p h???c ph???n: </b> {lopHocPhan.tenLop}
      </p>
      <p>
        <b>H???c ph???n: </b> {props.kyThi.hocPhan.hocPhan}
      </p>
      <p>
        <b>N??m h???c: </b> {props.kyThi.namHoc.namHoc} - {props.kyThi.hocKy.hocKy}
      </p>
      <p>
        <b>B??i ki???m tra: </b> {props.kyThi.kyThi}
      </p>
      <p>
        <b>S??? l?????ng c??u h???i: </b>
        {props.kyThi.soCauHoi}
      </p>
      <p>
        <b>Th???i gian c??n l???i:</b>
        <Countdown date={tongThoiGianLamBai} renderer={renderer} />
      </p>
      <div className={classes.detaile} onClick={hanldeDoneQuiz}>
        <button>N???p b??i</button>
      </div>
    </div>
  );
};

export default InformationQuiz;
