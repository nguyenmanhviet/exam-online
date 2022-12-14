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
                  <button>Th??ng tin c?? nh??n</button>
                </li>
                <li className={classes.menuItem}>
                  <button onClick={handleLogout}>????ng xu???t</button>
                </li>
              </ul>
            ) : null}
          </div>
        )}
      </div>
      {authCtx.isLoggedIn && authCtx.role === "Sinh vi??n" && (
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
                <IoIosHome /> Trang ch???
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
                <IoIosJournal /> L???p h???c ph???n
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
                <IoIosListBox /> L??m b??i ki???m tra
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
                <IoIosArchive /> L???ch s??? l??m b??i
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
                <IoIosArchive /> Nh???n di???n khu??n m???t
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
                <IoIosArchive /> D??? li???u
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
                <IoIosHome /> Trang ch???
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
                <IoIosPaper /> Qu???n l?? h???c ph???n
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
                <IoIosJournal /> Qu???n l?? l???p h???c ph???n
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
                <IoMdToday /> Ng??n h??ng c??u h???i
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
                <IoIosDocument /> Qu???n l?? ki???m tra
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
                <IoIosPerson /> Qu???n l?? gi???ng vi??n
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
                <IoIosPeople /> Qu???n l?? sinh vi??n
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
                <IoLogoBuffer /> Qu???n l?? t??i kho???n
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
                <IoIosArchive /> Qu???n l?? k???t qu??? l??m b??i
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
      {authCtx.isLoggedIn && authCtx.role === "Gi???ng vi??n" && (
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
                <IoIosHome /> Trang ch???
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
                <IoIosJournal /> Qu???n l?? l???p h???c ph???n
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
                <IoMdToday /> Ng??n h??ng c??u h???i
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
                <IoIosDocument /> Qu???n l?? ki???m tra
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
                <IoIosArchive /> Qu???n l?? k???t qu??? l??m b??i
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
                <IoIosPerson /> Qu???n l?? sinh vi??n
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default MainNavigation;
