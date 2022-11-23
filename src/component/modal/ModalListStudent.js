import ReactDOM from "react-dom";
import { useContext, useState, useEffect } from "react";

import AuthContext from "../../store/authContext";
import { IoIosEye, IoIosCloseCircle } from "react-icons/io";
import classes from "./ModalListStudent.module.css";

const ModalListStudent = (props) => {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState([]);
  const authCtx = useContext(AuthContext);
  const exitLogin = (event) => {
    event.preventDefault();
    props.onExitModalListStudent();
  };

  const hanldeModalAddStudent = () => {
    props.onActiveModalAddStudent();
  };

  const handleChangePage = (page) => {
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    headers.append("Access-Control-Allow-Origin", "http://3.105.183.164:3001");
    headers.append("Access-Control-Allow-Credentials", "true");
    fetch(
      `http://3.105.183.164:3001/classSubject/${props.classSubject.id}/student?page=${page}`,
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
    fetch(
      `http://3.105.183.164:3001/classSubject/${props.classSubject.id}/student`,
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
          <p>Sinh viên lớp học phần</p>
          <div className={classes.wrapper}>
            <button
              className={classes.addSubject}
              onClick={hanldeModalAddStudent}
            >
              Thêm sinh viên vào lớp học phần
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

export default ModalListStudent;
