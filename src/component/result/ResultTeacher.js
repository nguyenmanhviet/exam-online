import classes from "./Result.module.css";
import Card from "../UI/Card";
import { Fragment, useEffect, useState, useRef, useContext } from "react";
import AuthContext from "../../store/authContext";
import { IoIosEye, IoIosCloseCircle } from "react-icons/io";
import { formatDateTime } from "../quiz/QuizRow";

const ResultTeacher = (props) => {
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [exams, setExams] = useState([]);
  const [years, setYears] = useState([]);
  const [payload, setPayload] = useState({});
  const [classNames, setClasses] = useState([]);
  const [majors, setMajors] = useState([]);
  const searchContent = useRef();
  const authCtx = useContext(AuthContext);

  const downloadFromURI = (uri, name) =>
    fetch(uri)
      .then((resp) => resp.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = name ?? uri;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      });

  const handleExportPDF = () => {
    fetch(
      `http://3.105.183.164:3001/teacher/${
        authCtx.id
      }/exportResult?&subjectId=${payload.subjectId ?? ""}&majorId=${
        payload.majorId ?? ""
      }&classId=${payload.classId ?? ""}&semesterId=${
        payload.semesterId ?? ""
      }&examId=${payload.examId ?? ""}&yearId=${payload.yearId ?? ""}`,
      {
        method: "POST",
        body: JSON.stringify({
          filename: "KetQua.pdf",
          type: "application/pdf",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        downloadFromURI(data.Location, data.key);
        // const pdfWindow = window.open();
        // pdfWindow.location.href = data.Location;
        // pdfWindow.location.download = data.Location;
      });
  };

  const handleChangePage = (page) => {
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    headers.append("Access-Control-Allow-Origin", "http://3.105.183.164:3001");
    headers.append("Access-Control-Allow-Credentials", "true");
    fetch(
      `http://3.105.183.164:3001/teacher/${
        authCtx.id
      }/result?page=${page}&subjectId=${payload.subjectId ?? ""}&majorId=${
        payload.majorId ?? ""
      }&classId=${payload.classId ?? ""}&semesterId=${
        payload.semesterId ?? ""
      }&examId=${payload.examId ?? ""}&yearId=${payload.yearId ?? ""}`,
      {
        method: "GET",
        headers: headers,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setCurrentPage(page);
        setResults(data.items);
      })
      .catch((err) => console.log(err));
  };

  const hanldeModalAddStudent = () => {
    props.onActiveModalAddStudentManagement();
  };

  const handleSearch = (event) => {
    event.preventDefault();
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    headers.append("Access-Control-Allow-Origin", "http://3.105.183.164:3001");
    headers.append("Access-Control-Allow-Credentials", "true");
    fetch(
      `http://3.105.183.164:3001/teacher/${authCtx.id}/result?&subjectId=${
        payload.subjectId ?? ""
      }&majorId=${payload.majorId ?? ""}&classId=${
        payload.classId ?? ""
      }&semesterId=${payload.semesterId ?? ""}&examId=${
        payload.examId ?? ""
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
          arr.push(i);
        }
        console.log(data.items);
        setTotalPages(arr);
        setResults(data.items);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    headers.append("Access-Control-Allow-Origin", "http://3.105.183.164:3001");
    headers.append("Access-Control-Allow-Credentials", "true");

    fetch(`http://3.105.183.164:3001/teacher/${authCtx.id}/result`, {
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
        setResults(data.items);
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

    fetch(`http://3.105.183.164:3001/major`, {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        setMajors(data);
      })
      .catch((err) => console.log(err));

    fetch(`http://3.105.183.164:3001/exam`, {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        setExams(data.items);
      })
      .catch((err) => console.log(err));

    fetch(`http://3.105.183.164:3001/classSubject`, {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        setClasses(data.items);
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

    fetch(`http://3.105.183.164:3001/year`, {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        setYears(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Fragment>
      <Card>
        <div className={classes.search}>
          <p>??i???u ki???n t??m ki???m</p>
          <div>
            <form>
              <div className={classes.searching}>
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
                  <label htmlFor="username">Khoa</label>
                  <select
                    name="year"
                    onChange={(event) => {
                      setPayload((payload) => ({
                        ...payload,
                        majorId: event.target.value,
                      }));
                    }}
                  >
                    <option value={""}>T???t c???</option>
                    {majors &&
                      majors.map((major) => (
                        <option value={major.id}>{major.khoa}</option>
                      ))}
                  </select>
                </div>
                <div className={classes.control}>
                  <label htmlFor="password">L???p</label>
                  <select
                    name="year"
                    onChange={(event) => {
                      setPayload((payload) => ({
                        ...payload,
                        classId: event.target.value,
                      }));
                    }}
                  >
                    <option value={""}>T???t c???</option>
                    {classNames &&
                      classNames.map((cla) => (
                        <option value={cla.id}>{cla.tenLop}</option>
                      ))}
                  </select>
                </div>
                <div className={classes.control}>
                  <label htmlFor="password">H???c k???</label>
                  <select
                    name="year"
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
                  <label htmlFor="password">N??m h???c</label>
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
                  <label htmlFor="password">K??? thi</label>
                  <select
                    name="year"
                    onChange={(event) => {
                      setPayload((payload) => ({
                        ...payload,
                        examId: event.target.value,
                      }));
                    }}
                  >
                    <option value={""}>T???t c???</option>
                    {exams &&
                      exams.map((exam) => (
                        <option value={exam.id}>{exam.kyThi}</option>
                      ))}
                  </select>
                </div>
              </div>
              <div className={classes.actions}>
                <button className="btn" onClick={handleSearch}>
                  T??m ki???m
                </button>
              </div>
            </form>
          </div>
        </div>
      </Card>
      <Card>
        <div className={classes.search}>
          <button className={classes.addSubject} onClick={handleExportPDF}>
            Xu???t file PDF
          </button>
          <p>Danh s??ch l???ch s??? l??m b??i</p>

          <div>
            <div className={classes.searching}>
              <div className={classes.control}>
                <label htmlFor="username">Hi???n th???</label>
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
                    <span>Sinh vi??n</span>
                  </th>
                  <th>
                    <span>MSSV</span>
                  </th>
                  <th>
                    <span>H???c ph???n</span>
                  </th>
                  <th>
                    <span>?????t ki???m tra</span>
                  </th>
                  <th>
                    <span>N??m h???c</span>
                  </th>
                  <th>
                    <span>H???c k???</span>
                  </th>
                  <th>
                    <span>Nh??m</span>
                  </th>
                  <th>
                    <span>Th???i gian l??m b??i</span>
                  </th>
                  <th>
                    <span>Th???i gian n???p b??i</span>
                  </th>
                  <th>
                    <span>T???ng s??? c??u h???i</span>
                  </th>
                  <th>
                    <span>S??? c??u ????ng</span>
                  </th>
                  <th>
                    <span>S??? l???n vi ph???m</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {results &&
                  results.map((result) => (
                    <tr>
                      <td>{result.sinhVien.hoTen}</td>
                      <td>{result.sinhVien.mssv}</td>
                      <td className={classes.lalign}>
                        {result.hocPhan.hocPhan}
                      </td>
                      <td>{result.kyThi.kyThi}</td>
                      <td>{result.namHoc.namHoc}</td>
                      <td>{result.hocKy.hocKy}</td>
                      <td>{result.lopHocPhan.tenLop}</td>
                      <td>{formatDateTime(result.timeStart)}</td>
                      <td>{formatDateTime(result.timeEnd)}</td>
                      <td>{result.tongSoCauHoi}</td>
                      <td>{result.soCauDung}</td>
                      <td>{result.soLanViPham}</td>
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

export default ResultTeacher;
