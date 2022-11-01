import { NavLink, Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/authContext";
import { IoIosContact } from "react-icons/io";

const MainNavigation = (props) => {
  const authCtx = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

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
              Xin chào, 102180054
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
      {/* {authCtx.isLoggedIn && (
        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink to="/home" activeClassName={classes.active}>
                Trang chủ
              </NavLink>
            </li>
            <li>
              <NavLink to="/class-subject" activeClassName={classes.active}>
                Lớp học phần
              </NavLink>
            </li>
            <li>
              <NavLink to="/quiz" activeClassName={classes.active}>
                Làm bài kiểm tra
              </NavLink>
            </li>
            <li>
              <NavLink to="/quiz-history" activeClassName={classes.active}>
                Lịch sử làm bài
              </NavLink>
            </li>
            <li>
              <NavLink to="/quotes" activeClassName={classes.active}>
                Bài tập
              </NavLink>
            </li>
          </ul>
        </nav>
      )} */}
      {authCtx.isLoggedIn && (
        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink to="/home" activeClassName={classes.active}>
                Trang chủ
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/subject-management"
                activeClassName={classes.active}
              >
                Quản lý học phần
              </NavLink>
            </li>
            <li>
              <NavLink to="/class-subject-management" activeClassName={classes.active}>
                Quản lý lớp học phần
              </NavLink>
            </li>
            <li>
              <NavLink to="/exam" activeClassName={classes.active}>
                Quản lý kiểm tra
              </NavLink>
            </li>
            <li>
              <NavLink to="/quotes" activeClassName={classes.active}>
                Bài tập
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default MainNavigation;
