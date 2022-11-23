import ReactDOM from "react-dom";
import { useContext, useState, useEffect, useRef } from "react";
import Card from "../UI/Card";
import AuthContext from "../../store/authContext";
import { IoIosEye, IoIosCloseCircle } from "react-icons/io";
import classes from "./ModalAddStudent.module.css";

const ModalAddStudent = (props) => {
  const [students, setStudents] = useState([]);
  const [result, setResult] = useState([]);
  const [classNames, setClasses] = useState([]);
  const [majors, setMajors] = useState([]);
  const [payload, setPayload] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState([]);
  const searchContent = useRef();
  const authCtx = useContext(AuthContext);
  const exitLogin = (event) => {
    event.preventDefault();
    props.onExitModalAddStudent();
  };

  const handleSearch = (event) => {
    event.preventDefault();
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    headers.append("Access-Control-Allow-Origin", "http://3.105.183.164:3001");
    headers.append("Access-Control-Allow-Credentials", "true");
    fetch(
      `http://3.105.183.164:3001/notInClassSubject/${
        props.classSubject.id
      }/student?q=${searchContent.current.value}&classId=${
        payload.classId ?? ""
      }&majorId=${payload.majorId ?? ""}`,
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
        setStudents(data.items);
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
      `http://3.105.183.164:3001/notInClassSubject/${props.classSubject.id}/student?page=${page}&q=${searchContent.current.value}`,
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

  useEffect(() => {
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    headers.append("Access-Control-Allow-Origin", "http://3.105.183.164:3001");
    headers.append("Access-Control-Allow-Credentials", "true");
    fetch(`http://3.105.183.164:3001/class`, {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        setClasses(data);
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
  }, []);

  const handleAddStudentToClass = () => {
    fetch(
      `http://3.105.183.164:3001/classSubject/${props.classSubject.id}/addStudent`,
      {
        method: "POST",
        body: JSON.stringify({
          studentId: result,
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
        props.onExitModalAddStudent();
      });
  };

  useEffect(() => {
    fetch(
      `http://3.105.183.164:3001/notInClassSubject/${props.classSubject.id}/student`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
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
        setStudents(data.items);
      });
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
                  <label htmlFor="username">Nội dung tìm kiếm</label>
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
          <p>Thêm sinh viên vào lớp học phần</p>
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
                    <span>Mã số sinh viên</span>
                  </th>
                  <th>
                    <span>Họ tên</span>
                  </th>
                  <th>
                    <span>Giới tính</span>
                  </th>
                  <th>
                    <span>Khoa</span>
                  </th>
                  <th>
                    <span>Khóa</span>
                  </th>
                  <th>
                    <span>Lớp</span>
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
                      <td className={classes.checkBox}>
                        <div>
                          <input
                            type="checkbox"
                            value={student.id}
                            onChange={() => {
                              setResult((result) => [...result, student.id]);
                            }}
                          />{" "}
                        </div>
                      </td>
                      <td className={classes.lalign}>{student.mssv}</td>
                      <td>{student.hoTen}</td>
                      <td>{student.gioiTinh == 1 ? "Nam" : "Nữ"}</td>
                      <td>{student.khoa.khoa}</td>
                      <td>{student.khoaHoc}</td>
                      <td>{student.lop.lop}</td>
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
              <button className="btn" onClick={handleAddStudentToClass}>
                Thêm sinh viên vào lớp học phần
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

export default ModalAddStudent;
