import classes from "./ExamTeacher.module.css";
import Card from "../UI/Card";
import { Fragment, useState, useEffect, useRef, useContext } from "react";
import { IoIosEye, IoIosCloseCircle } from "react-icons/io";
import AuthContext from "../../store/authContext";
import { formatDateTime } from "../quiz/QuizRow";

const ExamTeacher = (props) => {
  const [exams, setExams] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [years, setYears] = useState([]);
  const [payload, setPayload] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState([]);
  const searchContent = useRef();
  const authCtx = useContext(AuthContext);

  const handleModalAddExam = () => {
    props.onActiveModalAddExam();
  };

  const handleClassSubjectExam = () => {
    props.onActiveModalClassSubjectExam();
  };

  const handleSearch = (event) => {
    event.preventDefault();
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    headers.append("Access-Control-Allow-Origin", "http://3.105.183.164:3001");
    headers.append("Access-Control-Allow-Credentials", "true");
    fetch(
      `http://3.105.183.164:3001/exam/teacher/${authCtx.id}?q=${
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
        setExams(data.items);
      })
      .catch((err) => console.log(err));
  };

  const handleChangePage = (page) => {
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    headers.append("Access-Control-Allow-Origin", "http://3.105.183.164:3001");
    headers.append("Access-Control-Allow-Credentials", "true");
    fetch(
      `http://3.105.183.164:3001/exam/teacher/${authCtx.id}?page=${page}&q=${
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
        setCurrentPage(page);
        setExams(data.items);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    headers.append("Access-Control-Allow-Origin", "http://3.105.183.164:3001");
    headers.append("Access-Control-Allow-Credentials", "true");
    fetch(`http://3.105.183.164:3001/exam/teacher/${authCtx.id}`, {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        const arr = [];
        for (let i = 1; i <= data.meta.totalPages; i = i + 1) {
          console.log(i);
          arr.push(i);
        }
        setTotalPages(arr);
        setExams(data.items);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    headers.append("Access-Control-Allow-Origin", "http://3.105.183.164:3001");
    headers.append("Access-Control-Allow-Credentials", "true");
    fetch(`http://3.105.183.164:3001/year`, {
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
                <div className={classes.control} style={{ marginTop: "10px" }}>
                  <label htmlFor="username">Nội dung</label>
                  <input
                    type="text"
                    placeholder="Nội dung tìm kiếm..."
                    className={classes.input}
                    ref={searchContent}
                  />
                </div>
              </div>

              <div className={classes.actions}>
                <button className="btn" onClick={handleSearch}>
                  Tìm kiếm
                </button>
              </div>
            </form>
          </div>
        </div>
      </Card>
      <Card>
        <div className={classes.search}>
          <button className={classes.addSubject} onClick={handleModalAddExam}>
            Thêm kỳ thi
          </button>
          <p>Danh sách kỳ thi</p>

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
                    <span>Tên kỳ thi</span>
                  </th>
                  <th>
                    <span>Thời gian bắt đầu</span>
                  </th>
                  <th>
                    <span>Thời gian kết thúc</span>
                  </th>
                  <th>
                    <span>Học phần</span>
                  </th>
                  <th>
                    <span>Năm học</span>
                  </th>
                  <th>
                    <span>Học kỳ</span>
                  </th>
                  <th>
                    <span>Lớp học phần thi</span>
                  </th>
                  <th>
                    <span>Sửa</span>
                  </th>
                  <th>
                    <span>Xóa</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {exams &&
                  exams.map((exam) => (
                    <tr>
                      <td className={classes.checkBox}>
                        <div>
                          <input
                            type="checkbox"
                            id="vehicle1"
                            name="vehicle1"
                            value="Bike"
                          />{" "}
                        </div>
                      </td>
                      <td className={classes.lalign}>{exam.kyThi}</td>
                      <td>{formatDateTime(exam.timeStart)}</td>
                      <td>{formatDateTime(exam.timeEnd)}</td>
                      <td>{exam.hocPhan.hocPhan}</td>
                      <td>{exam.namHoc.namHoc}</td>
                      <td>{exam.hocKy.hocKy}</td>
                      <td
                        className={classes.detaile}
                        onClick={() => {
                          props.onActiveModalClassSubjectExam(exam);
                        }}
                      >
                        <button>
                          <IoIosEye />
                        </button>
                      </td>
                      <td
                        className={classes.detaile}
                        onClick={() => {
                          props.onActiveModalEditExam(exam);
                        }}
                      >
                        <button>
                          <IoIosEye />
                        </button>
                      </td>
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
        </div>
      </Card>
    </Fragment>
  );
};

export default ExamTeacher;
