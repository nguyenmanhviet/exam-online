import classes from "./StudentTeacherManagement.module.css";
import Card from "../UI/Card";
import { Fragment, useEffect, useState, useRef, useContext } from "react";
import { IoIosEye, IoIosCloseCircle } from "react-icons/io";
import AuthContext from "../../store/authContext";

const StudentTeacherManager = (props) => {
  const [subjects, setSubjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState([]);
  const [students, setStudents] = useState([]);
  const [payload, setPayload] = useState({});
  const [classNames, setClasses] = useState([]);
  const [majors, setMajors] = useState([]);
  const searchContent = useRef();
  const authCtx = useContext(AuthContext);

  console.log("asdasda", authCtx.id);

  const handleChangePage = (page) => {
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    headers.append("Access-Control-Allow-Origin", "http://3.105.183.164:3001");
    headers.append("Access-Control-Allow-Credentials", "true");
    fetch(
      `http://3.105.183.164:3001/student/teacher/${authCtx.id}?page=${page}&q=${searchContent.current.value}`,
      {
        method: "GET",
        headers: headers,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setCurrentPage(page);
        setStudents(data.items);
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
      `http://3.105.183.164:3001/student/teacher/${authCtx.id}?q=${
        searchContent.current.value
      }&subjectId=${payload.subjectId ?? ""}&majorId=${
        payload.majorId ?? ""
      }&classId=${payload.classId ?? ""}`,
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
        setStudents(data.items);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    headers.append("Access-Control-Allow-Origin", "http://3.105.183.164:3001");
    headers.append("Access-Control-Allow-Credentials", "true");

    fetch(`http://3.105.183.164:3001/student/teacher/${authCtx.id}`, {
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
        setStudents(data.items);
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

    fetch(`http://3.105.183.164:3001/class`, {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        setClasses(data);
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
                        <option value={cla.id}>{cla.lop}</option>
                      ))}
                  </select>
                </div>
                <div className={classes.control}>
                  <label htmlFor="username">N???i dung</label>
                  <input
                    type="text"
                    placeholder="N???i dung t??m ki???m..."
                    ref={searchContent}
                  />
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
          {/* <button
            className={classes.addSubject}
            onClick={hanldeModalAddStudent}
          >
            Th??m sinh vi??n
          </button> */}
          <p>Danh s??ch sinh vi??n</p>

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
                    <span>M?? s??? sinh vi??n</span>
                  </th>
                  <th>
                    <span>L???p</span>
                  </th>
                  <th>
                    <span>Khoa</span>
                  </th>
                  <th>
                    <span>Kh??a h???c</span>
                  </th>
                  <th>
                    <span>Gi???i t??nh</span>
                  </th>
                  <th>
                    <span>S??? ??i???n tho???i</span>
                  </th>
                  <th>
                    <span>Email</span>
                  </th>
                  <th>
                    <span>S???a</span>
                  </th>
                  <th>
                    <span>X??a</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {students &&
                  students.map((student) => (
                    <tr>
                      <td className={classes.lalign}>{student.hoTen}</td>
                      <td>{student.mssv}</td>
                      <td>{student.lop.lop}</td>
                      <td>{student.khoa.khoa}</td>
                      <td>{student.khoaHoc}</td>
                      <td>{student.gioiTinh == 1 ? "Nam" : "N???"}</td>
                      <td>{student.sdt}</td>
                      <td>{student.email}</td>
                      <td
                        className={classes.detaile}
                        onClick={() => {
                          props.onActiveModalEditStudentManagement(student);
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

export default StudentTeacherManager;
