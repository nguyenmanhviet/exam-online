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
    navigate('/home')
  });

  const submitHandle = (event) => {
    event.preventDefault();

    const enteredMssv = mssvInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const expirationTime = new Date(new Date().getTime() + 36000000 * 1000);
    authCtx.login("1", token, expirationTime.toISOString());
    navigate("/home");
  };
  return (
    <div className={classes.login}>
      <div className={classes.loginTriangle}></div>

      <h2 className={classes.loginHeader}>Log in</h2>

      <form className={classes.loginContainer} onSubmit={submitHandle}>
        <p>
          <input
            type="text"
            placeholder="Mã số sinh viên"
            required
            ref={mssvInputRef}
          />
        </p>
        <p>
          <input
            type="password"
            placeholder="Password"
            required
            ref={passwordInputRef}
          />
        </p>
        <p>
          <input type="submit" value="Log in" />
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
