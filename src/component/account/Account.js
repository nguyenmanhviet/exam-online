import classes from "./Account.module.css";
import Card from "../UI/Card";
import { Fragment, useEffect, useState, useRef } from "react";
import { IoIosEye, IoIosCloseCircle } from "react-icons/io";

const Account = (props) => {
  const [accounts, setAccounts] = useState([]);
  const [roles, setRoles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState([]);
  const [payload, setPayload] = useState({});
  const searchContent = useRef();

  const handleChangePage = (page) => {
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    headers.append("Access-Control-Allow-Origin", "http://3.105.183.164:3001");
    headers.append("Access-Control-Allow-Credentials", "true");
    fetch(
      `http://3.105.183.164:3001/account?page=${page}&q=${
        searchContent.current.value
      }&roleId=${payload.roleId ?? ""}`,
      {
        method: "GET",
        headers: headers,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setCurrentPage(page);
        setAccounts(data.items);
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
      `http://3.105.183.164:3001/account?q=${searchContent.current.value}&roleId=${
        payload.roleId ?? ""
      }`,
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
        setAccounts(data.items);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    headers.append("Access-Control-Allow-Origin", "http://3.105.183.164:3001");
    headers.append("Access-Control-Allow-Credentials", "true");

    fetch(`http://3.105.183.164:3001/account`, {
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
        console.log(data.items);
        setTotalPages(arr);
        setAccounts(data.items);
      })
      .catch((err) => console.log(err));

    fetch(`http://3.105.183.164:3001/role`, {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        // setPayload((payload) => ({
        //   ...payload,
        //   roleId: data[0].id,
        // }));
        setRoles(data);
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
                  <label htmlFor="password">Vai Tr??</label>
                  <select
                    name="subject"
                    onChange={(event) => {
                      setPayload((payload) => ({
                        ...payload,
                        roleId: event.target.value,
                      }));
                    }}
                  >
                    <option value={""}>T???t c???</option>
                    {roles &&
                      roles.map((role) => (
                        <option value={role.id}>{role.vaiTro}</option>
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
          <button
            className={classes.addSubject}
            onClick={hanldeModalAddStudent}
          >
            Th??m t??i kho???n
          </button>
          <p>Danh s??ch t??i kho???n</p>

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
                    <span>Vai Tr??</span>
                  </th>
                  <th>
                    <span>T??n ng?????i d??ng</span>
                  </th>
                  <th>
                    <span>T??n ????ng nh???p</span>
                  </th>
                  <th>
                    <span>M???t kh???u</span>
                  </th>
                  <th>
                    <span>Th??ng tin chi ti???t</span>
                  </th>
                  <th>
                    <span>X??a</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {accounts &&
                  accounts.map((student) => (
                    <tr>
                      <td className={classes.lalign}>
                        {student.taiKhoan.roleId === 1
                          ? "Sinh Vi??n"
                          : "Gi???ng vi??n"}
                      </td>
                      <td className={classes.lalign}>{student.hoTen}</td>
                      <td>{student.taiKhoan.username}</td>
                      <td>{student.taiKhoan.password}</td>
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

export default Account;
