import ReactDOM from "react-dom";
import { useContext, useEffect, useState, useRef } from "react";
import AuthContext from "../../store/authContext";
import { IoIosEye, IoIosCloseCircle } from "react-icons/io";
import classes from "./ModalAddClassSubjectExam.module.css";

const ModalAddClassSubjectExam = (props) => {
  const [classSubjects, setClassSubjects] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [years, setYears] = useState([]);
  const [payload, setPayload] = useState({});
  const searchContent = useRef();
  const [result, setResult] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState([]);
  const authCtx = useContext(AuthContext);
  const exitLogin = (event) => {
    event.preventDefault();
    props.onExitModalAddClassSubjectExam();
  };

  const handleChangePage = (page) => {
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    headers.append("Access-Control-Allow-Origin", "http://3.105.183.164:3001");
    headers.append("Access-Control-Allow-Credentials", "true");
    fetch(
      `http://3.105.183.164:3001/notInExam/${
        props.exam.id
      }/classSubject?page=${page}&q=${searchContent.current.value}&subjectId=${
        payload.subjectId ?? ""
      }&semesterId=${payload.semesterId ?? ""}&yearId=${payload.yearId ?? ""}`,
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

  const handleSearch = (event) => {
    event.preventDefault();
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    headers.append("Access-Control-Allow-Origin", "http://3.105.183.164:3001");
    headers.append("Access-Control-Allow-Credentials", "true");
    fetch(
      `http://3.105.183.164:3001/notInExam/${props.exam.id}/classSubject?q=${
        searchContent.current.value
      }&subjectId=${payload.subjectId ?? ""}&semesterId=${
        payload.semesterId ?? ""
      }&yearId=${payload.yearId ?? ""}`,
      {
        method: "GET",
        headers: headers,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        const arr = [];
        for (let i = 1; i <= data.meta.totalPages; i = i + 1) {
          console.log(i);
          arr.push(i);
        }
        setTotalPages(arr);
        console.log(data.items);
        setClassSubjects(data.items);
      })
      .catch((err) => console.log(err));
  };

  const handleAddClassSubjectInExam = () => {
    fetch(`http://3.105.183.164:3001/exam/${props.exam.id}/addClassSubject`, {
      method: "POST",
      body: JSON.stringify({
        classSubjectId: result,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        props.onExitModalAddClassSubjectExam();
      });
  };

  useEffect(() => {
    fetch(`http://3.105.183.164:3001/notInExam/${props.exam.id}/classSubject`, {
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

  useEffect(() => {
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    headers.append("Access-Control-Allow-Origin", "http://3.105.183.164:3001");
    headers.append("Access-Control-Allow-Credentials", "true");
    fetch(`http://3.105.183.164:3001`, {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        setYears(data);
      })
      .catch((err) => console.log(err));

    fetch(`http://3.105.183.164:3001/semester`, {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        setSemesters(data);
      })
      .catch((err) => console.log(err));

    fetch(`http://3.105.183.164:3001/subject`, {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        setSubjects(data.items);
      })
      .catch((err) => console.log(err));
  }, []);

  return ReactDOM.createPortal(
    <div className={classes.modal}>
      <header className={classes.modal__header}>
        <a href="#" onClick={exitLogin} className={classes.close} />

        <div className={classes.search}>
          <p>??i???u ki???n t??m ki???m</p>
          <div>
            <form>
              <div className={classes.searching}>
                <div className={classes.control}>
                  <label htmlFor="username">N??m h???c</label>
                  <select
                    name="year"
                    onChange={(event) => {
                      setPayload((payload) => ({
                        ...payload,
                        yearId: event.target.value,
                      }));
                    }}
                  >
                    <option value={""}>T???t c???</option>
                    {years &&
                      years.map((year) => (
                        <option value={year.id}>{year.namHoc}</option>
                      ))}
                  </select>
                </div>
                <div className={classes.control}>
                  <label htmlFor="password">H???c k???</label>
                  <select
                    name="semester"
                    onChange={(event) => {
                      setPayload((payload) => ({
                        ...payload,
                        semesterId: event.target.value,
                      }));
                    }}
                  >
                    <option value={""}>T???t c???</option>
                    {semesters &&
                      semesters.map((semester) => (
                        <option value={semester.id}>{semester.hocKy}</option>
                      ))}
                  </select>
                </div>
                <div className={classes.control}>
                  <label htmlFor="password">H???c ph???n</label>
                  <select
                    name="subject"
                    onChange={(event) => {
                      setPayload((payload) => ({
                        ...payload,
                        subjectId: event.target.value,
                      }));
                    }}
                  >
                    <option value={""}>T???t c???</option>
                    {subjects &&
                      subjects.map((subject) => (
                        <option value={subject.id}>{subject.hocPhan}</option>
                      ))}
                  </select>
                </div>
                <div className={classes.control}>
                  <label htmlFor="username">T??n l???p</label>
                  <input
                    className={classes.noidung}
                    type="text"
                    placeholder="N???i dung t??m ki???m..."
                    ref={searchContent}
                  />
                </div>
              </div>
              <div className={classes.find}>
                <button className="btn" onClick={handleSearch}>
                  T??m ki???m
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className={classes.search}>
          <p>Th??m l???p h???c ph???n v??o k??? thi</p>
          <div className={classes.wrapper}>
            <table
              className={classes.keywords}
              cellspacing="1"
              cellpadding="3"
              color="#7C95AC"
            >
              <thead>
                <tr>
                  {" "}
                  <th>
                    <div>
                      <input
                        type="checkbox"
                        id="vehicle1"
                        name="vehicle1"
                        value="Bike"
                      />{" "}
                    </div>
                  </th>
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
                      <td className={classes.checkBox}>
                        <div>
                          <input
                            type="checkbox"
                            value={classSubject.id}
                            onChange={() => {
                              setResult((result) => [
                                ...result,
                                classSubject.id,
                              ]);
                            }}
                          />{" "}
                        </div>
                      </td>
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
            <div className={classes.add}>
              <button className="btn" onClick={handleAddClassSubjectInExam}>
                Th??m l???p h???c ph???n v??o k??? thi
              </button>
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

export default ModalAddClassSubjectExam;
