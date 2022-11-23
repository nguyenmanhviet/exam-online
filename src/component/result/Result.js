import classes from "./Result.module.css";
import Card from "../UI/Card";
import { Fragment, useEffect, useState, useRef } from "react";
import { IoIosEye, IoIosCloseCircle } from "react-icons/io";
import { formatDateTime } from "../quiz/QuizRow";

const Result = (props) => {
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
      `http://3.105.183.164:3001/exportResult?&subjectId=${
        payload.subjectId ?? ""
      }&majorId=${payload.majorId ?? ""}&classId=${
        payload.classId ?? ""
      }&semesterId=${payload.semesterId ?? ""}&examId=${
        payload.examId ?? ""
      }&yearId=${payload.yearId ?? ""}`,
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
      `http://3.105.183.164:3001/result?page=${page}&subjectId=${
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
      `http://3.105.183.164:3001/result?&subjectId=${
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

    fetch(`http://3.105.183.164:3001/result`, {
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
          <p>Điều kiện tìm kiếm</p>
          <div>
            <form>
              <div className={classes.searching}>
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
                    <option value={""}>Tất cả</option>
                    {majors &&
                      majors.map((major) => (
                        <option value={major.id}>{major.khoa}</option>
                      ))}
                  </select>
                </div>
                <div className={classes.control}>
                  <label htmlFor="password">Lớp</label>
                  <select
                    name="year"
                    onChange={(event) => {
                      setPayload((payload) => ({
                        ...payload,
                        classId: event.target.value,
                      }));
                    }}
                  >
                    <option value={""}>Tất cả</option>
                    {classNames &&
                      classNames.map((cla) => (
                        <option value={cla.id}>{cla.tenLop}</option>
                      ))}
                  </select>
                </div>
                <div className={classes.control}>
                  <label htmlFor="password">Học kỳ</label>
                  <select
                    name="year"
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
                  <label htmlFor="password">Năm học</label>
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
                  <label htmlFor="password">Kỳ thi</label>
                  <select
                    name="year"
                    onChange={(event) => {
                      setPayload((payload) => ({
                        ...payload,
                        examId: event.target.value,
                      }));
                    }}
                  >
                    <option value={""}>Tất cả</option>
                    {exams &&
                      exams.map((exam) => (
                        <option value={exam.id}>{exam.kyThi}</option>
                      ))}
                  </select>
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
          <button className={classes.addSubject} onClick={handleExportPDF}>
            Xuất file PDF
          </button>
          <p>Danh sách lịch sử làm bài</p>

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
                    <span>Sinh viên</span>
                  </th>
                  <th>
                    <span>MSSV</span>
                  </th>
                  <th>
                    <span>Học phần</span>
                  </th>
                  <th>
                    <span>Đợt kiểm tra</span>
                  </th>
                  <th>
                    <span>Năm học</span>
                  </th>
                  <th>
                    <span>Học kỳ</span>
                  </th>
                  <th>
                    <span>Nhóm</span>
                  </th>
                  <th>
                    <span>Thời gian làm bài</span>
                  </th>
                  <th>
                    <span>Thời gian nộp bài</span>
                  </th>
                  <th>
                    <span>Tổng số câu hỏi</span>
                  </th>
                  <th>
                    <span>Số câu đúng</span>
                  </th>
                  <th>
                    <span>Số lần vi phạm</span>
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

export default Result;
