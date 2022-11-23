import { NavLink, Link, useLocation } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/authContext";
import {
  IoIosHome,
  IoIosJournal,
  IoIosListBox,
  IoIosArchive,
  IoIosPaper,
  IoMdToday,
  IoIosDocument,
  IoIosPerson,
  IoIosPeople,
  IoLogoBuffer,
} from "react-icons/io";

const MainNavigation = (props) => {
  const authCtx = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [student, setStudent] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  console.log("location ", location.pathname);
  useEffect(() => {
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    headers.append("Access-Control-Allow-Origin", "http://3.105.183.164:3001");
    headers.append("Access-Control-Allow-Credentials", "true");
    fetch(`http://3.105.183.164:3001/student/${authCtx.id}`, {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setStudent(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    authCtx.logout();
    navigate("/");
  };
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link to="/">
          <img
            className={classes.logoImage}
            src="http://sv.dut.udn.vn/Styles/images/logo.png"
            alt="Roomless"
          ></img>
        </Link>
        {authCtx.isLoggedIn && (
          <div className={classes.dropdown}>
            <img
              className={classes.logoImage}
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="Roomless"
            ></img>
            <button onClick={handleOpen} className={classes.user}>
              {student.hoTen ?? "admin"}
            </button>
            {open ? (
              <ul className={classes.menu}>
                <li className={classes.menuItem}>
                  <button>Thông tin cá nhân</button>
                </li>
                <li className={classes.menuItem}>
                  <button onClick={handleLogout}>Đăng xuất</button>
                </li>
              </ul>
            ) : null}
          </div>
        )}
      </div>
      {authCtx.isLoggedIn && authCtx.role === "Sinh viên" && (
        <nav className={classes.nav}>
          <ul>
            <li
              style={{
                backgroundColor:
                  location?.pathname === "/home" ? "white" : "#354A5E",
                color: location?.pathname === "/home" ? "black" : "white",
              }}
            >
              <NavLink to="/home" activeClassName={classes.active}>
                <IoIosHome /> Trang chủ
              </NavLink>
            </li>
            <li
              style={{
                backgroundColor:
                  location?.pathname === "/class-subject" ? "white" : "#354A5E",
                color:
                  location?.pathname === "/class-subject" ? "black" : "white",
              }}
            >
              <NavLink to="/class-subject" activeClassName={classes.active}>
                <IoIosJournal /> Lớp học phần
              </NavLink>
            </li>
            <li
              style={{
                backgroundColor:
                  location?.pathname === "/quiz" ? "white" : "#354A5E",
                color: location?.pathname === "/quiz" ? "black" : "white",
              }}
            >
              <NavLink to="/quiz" activeClassName={classes.active}>
                <IoIosListBox /> Làm bài kiểm tra
              </NavLink>
            </li>
            <li
              style={{
                backgroundColor:
                  location?.pathname === "/quiz-history" ? "white" : "#354A5E",
                color:
                  location?.pathname === "/quiz-history" ? "black" : "white",
              }}
            >
              <NavLink to="/quiz-history" activeClassName={classes.active}>
                <IoIosArchive /> Lịch sử làm bài
              </NavLink>
            </li>
            <li
              style={{
                backgroundColor:
                  location?.pathname === "/get-face-data" ? "white" : "#354A5E",
                color:
                  location?.pathname === "/get-face-data" ? "black" : "white",
              }}
            >
              <NavLink to="/get-face-data" activeClassName={classes.active}>
                <IoIosArchive /> Nhận diện khuôn mặt
              </NavLink>
            </li>
            <li
              style={{
                backgroundColor:
                  location?.pathname === "/face-data" ? "white" : "#354A5E",
                color: location?.pathname === "/face-data" ? "black" : "white",
              }}
            >
              <NavLink to="/face-data" activeClassName={classes.active}>
                <IoIosArchive /> Dữ liệu
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
      {authCtx.isLoggedIn && authCtx.role === "admin" && (
        <nav className={classes.nav}>
          <ul>
            <li
              style={{
                backgroundColor:
                  location?.pathname === "/home" ? "white" : "#354A5E",
                color: location?.pathname === "/home" ? "black" : "white",
              }}
            >
              <NavLink to="/home" activeClassName={classes.active}>
                <IoIosHome /> Trang chủ
              </NavLink>
            </li>
            <li
              style={{
                backgroundColor:
                  location?.pathname === "/subject-management"
                    ? "white"
                    : "#354A5E",
                color:
                  location?.pathname === "/subject-management"
                    ? "black"
                    : "white",
              }}
            >
              <NavLink
                to="/subject-management"
                activeClassName={classes.active}
              >
                <IoIosPaper /> Quản lý học phần
              </NavLink>
            </li>
            <li
              style={{
                backgroundColor:
                  location?.pathname === "/class-subject-management"
                    ? "white"
                    : "#354A5E",
                color:
                  location?.pathname === "/class-subject-management"
                    ? "black"
                    : "white",
              }}
            >
              <NavLink
                to="/class-subject-management"
                activeClassName={classes.active}
              >
                <IoIosJournal /> Quản lý lớp học phần
              </NavLink>
            </li>
            <li
              style={{
                backgroundColor:
                  location?.pathname === "/question-pool" ? "white" : "#354A5E",
                color:
                  location?.pathname === "/question-pool" ? "black" : "white",
              }}
            >
              <NavLink to="/question-pool" activeClassName={classes.active}>
                <IoMdToday /> Ngân hàng câu hỏi
              </NavLink>
            </li>
            <li
              style={{
                backgroundColor:
                  location?.pathname === "/exam-management"
                    ? "white"
                    : "#354A5E",
                color:
                  location?.pathname === "/exam-management" ? "black" : "white",
              }}
            >
              <NavLink to="/exam-management" activeClassName={classes.active}>
                <IoIosDocument /> Quản lý kiểm tra
              </NavLink>
            </li>
            <li
              style={{
                backgroundColor:
                  location?.pathname === "/teacher-management"
                    ? "white"
                    : "#354A5E",
                color:
                  location?.pathname === "/teacher-management"
                    ? "black"
                    : "white",
              }}
            >
              <NavLink
                to="/teacher-management"
                activeClassName={classes.active}
              >
                <IoIosPerson /> Quản lý giảng viên
              </NavLink>
            </li>
            <li
              style={{
                backgroundColor:
                  location?.pathname === "/student-management"
                    ? "white"
                    : "#354A5E",
                color:
                  location?.pathname === "/student-management"
                    ? "black"
                    : "white",
              }}
            >
              <NavLink
                to="/student-management"
                activeClassName={classes.active}
              >
                <IoIosPeople /> Quản lý sinh viên
              </NavLink>
            </li>
            <li
              style={{
                backgroundColor:
                  location?.pathname === "/account-management"
                    ? "white"
                    : "#354A5E",
                color:
                  location?.pathname === "/account-management"
                    ? "black"
                    : "white",
              }}
            >
              <NavLink
                to="/account-management"
                activeClassName={classes.active}
              >
                <IoLogoBuffer /> Quản lý tài khoản
              </NavLink>
            </li>
            <li
              style={{
                backgroundColor:
                  location?.pathname === "/result-management"
                    ? "white"
                    : "#354A5E",
                color:
                  location?.pathname === "/result-management"
                    ? "black"
                    : "white",
              }}
            >
              <NavLink to="/result-management" activeClassName={classes.active}>
                <IoIosArchive /> Quản lý kết quả làm bài
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
      {authCtx.isLoggedIn && authCtx.role === "Giảng viên" && (
        <nav className={classes.nav}>
          <ul>
            <li
              style={{
                backgroundColor:
                  location?.pathname === "/home" ? "white" : "#354A5E",
                color: location?.pathname === "/home" ? "black" : "white",
              }}
            >
              <NavLink to="/home" activeClassName={classes.active}>
                <IoIosHome /> Trang chủ
              </NavLink>
            </li>
            <li
              style={{
                backgroundColor:
                  location?.pathname === "/class-subject-teacher-management"
                    ? "white"
                    : "#354A5E",
                color:
                  location?.pathname === "/class-subject-teacher-management"
                    ? "black"
                    : "white",
              }}
            >
              <NavLink
                to="/class-subject-teacher-management"
                activeClassName={classes.active}
              >
                <IoIosJournal /> Quản lý lớp học phần
              </NavLink>
            </li>
            <li
              style={{
                backgroundColor:
                  location?.pathname === "/question-pool-teacher"
                    ? "white"
                    : "#354A5E",
                color:
                  location?.pathname === "/question-pool-teacher"
                    ? "black"
                    : "white",
              }}
            >
              <NavLink
                to="/question-pool-teacher"
                activeClassName={classes.active}
              >
                <IoMdToday /> Ngân hàng câu hỏi
              </NavLink>
            </li>
            <li
              style={{
                backgroundColor:
                  location?.pathname === "/exam-management-teacher"
                    ? "white"
                    : "#354A5E",
                color:
                  location?.pathname === "/exam-management-teacher"
                    ? "black"
                    : "white",
              }}
            >
              <NavLink
                to="/exam-management-teacher"
                activeClassName={classes.active}
              >
                <IoIosDocument /> Quản lý kiểm tra
              </NavLink>
            </li>
            <li
              style={{
                backgroundColor:
                  location?.pathname === "/result-management-teacher"
                    ? "white"
                    : "#354A5E",
                color:
                  location?.pathname === "/result-management-teacher"
                    ? "black"
                    : "white",
              }}
            >
              <NavLink
                to="/result-management-teacher"
                activeClassName={classes.active}
              >
                <IoIosArchive /> Quản lý kết quả làm bài
              </NavLink>
            </li>
            <li
              style={{
                backgroundColor:
                  location?.pathname === "/student-management-teacher"
                    ? "white"
                    : "#354A5E",
                color:
                  location?.pathname === "/student-management-teacher"
                    ? "black"
                    : "white",
              }}
            >
              <NavLink
                to="/student-management-teacher"
                activeClassName={classes.active}
              >
                <IoIosPerson /> Quản lý sinh viên
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default MainNavigation;
