import classes from "./LoginForm.module.css";
import { useRef, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/authContext";

const token =
  "eyJraWQiOiI5KzZBMG9Jektaa2R4YjBTc3NXWjZmaE9hWWQ2aERkUGRoenhHWVpKeE9RPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI0NDg1YmYyZi1mZDY0LTRkZDctODAwMi1jZTRlMTMzZDFkYTgiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5hcC1zb3V0aGVhc3QtMi5hbWF6b25hd3MuY29tXC9hcC1zb3V0aGVhc3QtMl9DS3c1WVFnMDMiLCJjb2duaXRvOnVzZXJuYW1lIjoiNDQ4NWJmMmYtZmQ2NC00ZGQ3LTgwMDItY2U0ZTEzM2QxZGE4Iiwib3JpZ2luX2p0aSI6IjJmYzA3YjdhLWU0NzAtNGRkYi1iMmRjLWYwNjg0Yzg5YWI2ZSIsImF1ZCI6IjU1Z2xwaHJsY2M3N2RpOWwzODVtdmg5M3NhIiwiZXZlbnRfaWQiOiI3MzJiYzQxNS03NGI2LTQyYTEtOGY4MS1lNmFjMDFlYmVkYTgiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTY2NTU3Nzg4NiwiZXhwIjoxNjY2NzE3NDI2LCJpYXQiOjE2NjY3MTM4MjYsImp0aSI6IjM2ZDc5NDVhLTJiODktNGExNi04MzE4LWMwNDhmZjY2ZjIzMCIsImVtYWlsIjoia2hvYS5idWlAdGVhbS5lbm91dm8uY29tIn0.ZKwFsCmQDUBbLD2px4Y26GLiyKb4ircEXZ596xq_3kVsdb5KrR4WXSnjWTCLflr-IxMp0fery_O6BPi_yqmerl9Yji2pRV84vGNSrqOAWAHUgeMNfzrWupKptxenfgokcbbFBBs7ulvDXdnoppjE-tNo6M04s2BtE4cQzWY_G9ZDojM2IQvAZHKp-VczFEVo3gGZdJ03V1wTLXAhAHFMlyQoqhpsr2HHA3JV_MqWpJ8f7mJ2LHfaGuAPuA8EYzD0qXv6dLNVM6bP0ghDuTMRCj-y0FVNW4fl_7KMO8kg6oc2GM-K6TIoHHoncXBJqp984YoyiOaaXkWlPscEtsEgJw";

const LoginForm = (props) => {
  const mssvInputRef = useRef();
  const passwordInputRef = useRef();
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    if (authCtx.isLoggedIn) {
      navigate("/home");
    }
  });

  const submitHandle = (event) => {
    event.preventDefault();

    const enteredMssv = mssvInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    console.log(enteredMssv, enteredPassword);

    fetch("http://3.105.183.164:3001/login", {
      method: "POST",
      body: JSON.stringify({
        username: enteredMssv,
        password: enteredPassword,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const expirationTime = new Date(new Date().getTime() + 36000000 * 1000);
        authCtx.login(
          data.userId,
          data.role,
          token,
          expirationTime.toISOString()
        );
        window.location.reload(false);
        navigate("/home");
      });
  };
  return (
    <div>
      <div className={classes.background}>
        <div className={classes.shape}></div>
        <div className={classes.shape}></div>
      </div>
      <form className={classes.formLogin}>
        <h3>Đăng nhập</h3>

        <label for="username">Mã số sinh viên/ giảng viên</label>
        <input
          type="text"
          placeholder="Email or Phone"
          id="username"
          ref={mssvInputRef}
        />

        <label for="password">Mật khẩu</label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          ref={passwordInputRef}
        />

        <button onClick={submitHandle}>Đăng nhập</button>
      </form>
    </div>
  );
};

export default LoginForm;
