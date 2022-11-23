import classes from "./StudentManager.module.css";
import Card from "../UI/Card";
import { Fragment, useEffect, useState, useRef } from "react";
import { IoIosEye, IoIosCloseCircle } from "react-icons/io";

const StudentManager = (props) => {
  const [subjects, setSubjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState([]);
  const [students, setStudents] = useState([]);
  const [payload, setPayload] = useState({});
  const [classNames, setClasses] = useState([]);
  const [majors, setMajors] = useState([]);
  const searchContent = useRef();

  const handleChangePage = (page) => {
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    headers.append("Access-Control-Allow-Origin", "http://3.105.183.164:3001");
    headers.append("Access-Control-Allow-Credentials", "true");
    fetch(
      `http://3.105.183.164:3001/student?page=${page}&q=${
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
      `http://3.105.183.164:3001/student?q=${
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

    fetch(`http://3.105.183.164:3001/student`, {
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
                        <option value={cla.id}>{cla.lop}</option>
                      ))}
                  </select>
                </div>
                <div className={classes.control}>
                  <label htmlFor="username">Nội dung</label>
                  <input
                    type="text"
                    placeholder="Nội dung tìm kiếm..."
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
          <button
            className={classes.addSubject}
            onClick={hanldeModalAddStudent}
          >
            Thêm sinh viên
          </button>
          <p>Danh sách sinh viên</p>

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
                    <span>Mã số sinh viên</span>
                  </th>
                  <th>
                    <span>Lớp</span>
                  </th>
                  <th>
                    <span>Khoa</span>
                  </th>
                  <th>
                    <span>Khóa học</span>
                  </th>
                  <th>
                    <span>Giới tính</span>
                  </th>
                  <th>
                    <span>Số điện thoại</span>
                  </th>
                  <th>
                    <span>Email</span>
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
                {students &&
                  students.map((student) => (
                    <tr>
                      <td className={classes.lalign}>{student.hoTen}</td>
                      <td>{student.mssv}</td>
                      <td>{student.lop.lop}</td>
                      <td>{student.khoa.khoa}</td>
                      <td>{student.khoaHoc}</td>
                      <td>{student.gioiTinh == 1 ? "Nam" : "Nữ"}</td>
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

export default StudentManager;