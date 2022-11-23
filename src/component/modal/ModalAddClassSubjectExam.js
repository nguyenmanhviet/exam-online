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
          <p>Điều kiện tìm kiếm</p>
          <div>
            <form>
              <div className={classes.searching}>
                <div className={classes.control}>
                  <label htmlFor="username">Năm học</label>
                  <select
                    name="year"
                    onChange={(event) => {
                      setPayload((payload) => ({
                        ...payload,
                        yearId: event.target.value,
                      }));
                    }}
                  >
                    <option value={""}>Tất cả</option>
                    {years &&
                      years.map((year) => (
                        <option value={year.id}>{year.namHoc}</option>
                      ))}
                  </select>
                </div>
                <div className={classes.control}>
                  <label htmlFor="password">Học kỳ</label>
                  <select
                    name="semester"
                    onChange={(event) => {
                      setPayload((payload) => ({
                        ...payload,
                        semesterId: event.target.value,
                      }));
                    }}
                  >
                    <option value={""}>Tất cả</option>
                    {semesters &&
                      semesters.map((semester) => (
                        <option value={semester.id}>{semester.hocKy}</option>
                      ))}
                  </select>
                </div>
                <div className={classes.control}>
                  <label htmlFor="password">Học phần</label>
                  <select
                    name="subject"
                    onChange={(event) => {
                      setPayload((payload) => ({
                        ...payload,
                        subjectId: event.target.value,
                      }));
                    }}
                  >
                    <option value={""}>Tất cả</option>
                    {subjects &&
                      subjects.map((subject) => (
                        <option value={subject.id}>{subject.hocPhan}</option>
                      ))}
                  </select>
                </div>
                <div className={classes.control}>
                  <label htmlFor="username">Tên lớp</label>
                  <input
                    className={classes.noidung}
                    type="text"
                    placeholder="Nội dung tìm kiếm..."
                    ref={searchContent}
                  />
                </div>
              </div>
              <div className={classes.find}>
                <button className="btn" onClick={handleSearch}>
                  Tìm kiếm
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className={classes.search}>
          <p>Thêm lớp học phần vào kỳ thi</p>
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
                    <span>Tên lớp</span>
                  </th>
                  <th>
                    <span>Học phần</span>
                  </th>
                  <th>
                    <span>Mã lớp</span>
                  </th>
                  <th>
                    <span>Giảng viên</span>
                  </th>
                  <th>
                    <span>Năm học</span>
                  </th>
                  <th>
                    <span>Học kỳ</span>
                  </th>
                  <th>
                    <span>Xóa</span>
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
                Thêm lớp học phần vào kỳ thi
              </button>
            </div>
          </div>

          <div className={classes.actions}>
            <div className={classes.btnHolder}>
              <button type="button" onClick={exitLogin}>
                Thoát
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
