import ReactDOM from "react-dom";
import { useContext, useState, useEffect } from "react";

import AuthContext from "../../store/authContext";
import { IoIosEye, IoIosCloseCircle } from "react-icons/io";
import classes from "./ModalClassSubjectExam.module.css";

const ModalClassSubjectExam = (props) => {
  const [classSubjects, setClassSubjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState([]);
  const authCtx = useContext(AuthContext);
  const exitLogin = (event) => {
    event.preventDefault();
    props.onExitModalClassSubjectExam();
  };

  const hanldeModalAddClassSubjectExam = () => {
    props.onActiveModalAddClassSubjectExam();
  };

  const handleChangePage = (page) => {
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    headers.append("Access-Control-Allow-Origin", "http://3.105.183.164:3001");
    headers.append("Access-Control-Allow-Credentials", "true");
    fetch(
      `http://3.105.183.164:3001/exam/${props.exam.id}/classSubject?page=${page}`,
      {
        method: "GET",
        headers: headers,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setCurrentPage(page);
        setClassSubjects(data.items);
      })
      .catch((err) => console.log(err));
  };


  useEffect(() => {
    fetch(`http://3.105.183.164:3001/exam/${props.exam.id}/classSubject`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const arr = [];
        for (let i = 1; i <= data.meta.totalPages; i = i + 1) {
          console.log(i);
          arr.push(i);
        }
        setTotalPages(arr);
        setClassSubjects(data.items);
      });
  }, []);

  return ReactDOM.createPortal(
    <div className={classes.modal}>
      <header className={classes.modal__header}>
        <a href="#" onClick={exitLogin} className={classes.close} />

        <div className={classes.search}>
          <p>L???p h???c ph???n thi k??? thi</p>
          <div className={classes.wrapper}>
            <button
              className={classes.addSubject}
              onClick={hanldeModalAddClassSubjectExam}
            >
              Th??m l???p h???c ph???n v??o k?? thi
            </button>
            <table
              className={classes.keywords}
              cellspacing="1"
              cellpadding="3"
              color="#7C95AC"
            >
              <thead>
                <tr>
                  <th>
                    <span>T??n l???p</span>
                  </th>
                  <th>
                    <span>H???c ph???n</span>
                  </th>
                  <th>
                    <span>M?? l???p</span>
                  </th>
                  <th>
                    <span>Gi???ng vi??n</span>
                  </th>
                  <th>
                    <span>N??m h???c</span>
                  </th>
                  <th>
                    <span>H???c k???</span>
                  </th>
                  <th>
                    <span>X??a</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {classSubjects &&
                  classSubjects.map((classSubject) => (
                    <tr>
                      <td className={classes.lalign}>{classSubject.tenLop}</td>
                      <td>{classSubject.hocPhan.hocPhan}</td>
                      <td>{classSubject.maLop}</td>
                      <td>{classSubject.giangVien.hoTen}</td>
                      <td>{classSubject.namHoc.namHoc}</td>
                      <td>{classSubject.hocKy.hocKy}</td>
                      <td className={classes.delete}>
                        <button>
                          <IoIosCloseCircle />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div className={classes.container}>
              <ul className={classes.pagination}>
                <li className={classes.icon}>Pre</li>
                {totalPages &&
                  totalPages.map((page) => (
                    <li
                      onClick={() => {
                        handleChangePage(page);
                      }}
                      style={{
                        backgroundColor:
                          page == currentPage ? "rgb(37, 79, 115)" : "#ccc",
                      }}
                    >
                      {page}
                    </li>
                  ))}
                <li className={classes.icon}>Next</li>
              </ul>
            </div>
          </div>

          <div className={classes.actions}>
            <div className={classes.btnHolder}>
              <button type="button" onClick={exitLogin}>
                Tho??t
              </button>
            </div>
          </div>
        </div>
      </header>
    </div>,
    document.getElementById("modal-root")
  );
};

export default ModalClassSubjectExam;
