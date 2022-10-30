import classes from "./classSubject.module.css";
import Card from "../UI/Card";
import { Fragment } from "react";
import { IoIosEye } from "react-icons/io";

const ClassSubject = (props) => {
  const handleSeeDetail = () => {
    props.onActiveDetailClassSubject();
  };

  return (
    <Fragment>
      <Card>
        <div className={classes.search}>
          <p>Điều kiện tìm kiếm</p>

          <div>
            <form>
              <div className={classes.searching}>
                <div className={classes.control}>
                  <label htmlFor="username">Năm học</label>
                  <select name="year">
                    <option value="all" selected>
                      Tất cả
                    </option>
                    <option value="">2021-2022</option>
                  </select>
                </div>
                <div className={classes.control}>
                  <label htmlFor="password">Học kỳ</label>
                  <select name="year">
                    <option value="all" selected>
                      Tất cả
                    </option>
                    <option value="">Học kỳ 2</option>
                  </select>
                </div>
                <div className={classes.control}>
                  <label htmlFor="password">Học phần</label>
                  <input />
                </div>
              </div>
              <div className={classes.actions}>
                <button className="btn">Tìm kiếm</button>
              </div>
            </form>
          </div>
        </div>
      </Card>
      <Card>
        <div className={classes.search}>
          <p>Danh sách lớp học phần</p>

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
                    <span>Lớp học phần</span>
                  </th>
                  <th>
                    <span>Mã lớp học phần</span>
                  </th>
                  <th>
                    <span>Học phần</span>
                  </th>
                  <th>
                    <span>Năm học</span>
                  </th>
                  <th>
                    <span>Học kỳ</span>
                  </th>
                  <th>
                    <span>Giảng viên</span>
                  </th>
                  <th>
                    <span>Chi tiết</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={classes.lalign}>18Nh11A</td>
                  <td>2020202102CNPM18NH11A</td>
                  <td>Công nghệ phần mềm</td>
                  <td>2020-2021</td>
                  <td>Học kỳ 2</td>
                  <td>Nguyễn Thanh Bình</td>
                  <td className={classes.detaile}>
                    <button onClick={handleSeeDetail}>
                      <IoIosEye />
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className={classes.lalign}>18Nh11A</td>
                  <td>2020202102CNPM18NH11A</td>
                  <td>Công nghệ phần mềm</td>
                  <td>2020-2021</td>
                  <td>Học kỳ 2</td>
                  <td>Nguyễn Thanh Bình</td>
                  <td className={classes.detaile}>
                    <button onClick={handleSeeDetail}>
                      <IoIosEye />
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className={classes.lalign}>18Nh11A</td>
                  <td>2020202102CNPM18NH11A</td>
                  <td>Công nghệ phần mềm</td>
                  <td>2020-2021</td>
                  <td>Học kỳ 2</td>
                  <td>Nguyễn Thanh Bình</td>
                  <td className={classes.detaile}>
                    <button onClick={handleSeeDetail}>
                      <IoIosEye />
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className={classes.lalign}>18Nh11A</td>
                  <td>2020202102CNPM18NH11A</td>
                  <td>Công nghệ phần mềm</td>
                  <td>2020-2021</td>
                  <td>Học kỳ 2</td>
                  <td>Nguyễn Thanh Bình</td>
                  <td className={classes.detaile}>
                    <button onClick={handleSeeDetail}>
                      <IoIosEye />
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className={classes.lalign}>18Nh11A</td>
                  <td>2020202102CNPM18NH11A</td>
                  <td>Công nghệ phần mềm</td>
                  <td>2020-2021</td>
                  <td>Học kỳ 2</td>
                  <td>Nguyễn Thanh Bình</td>
                  <td className={classes.detaile}>
                    <button onClick={handleSeeDetail}>
                      <IoIosEye />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className={classes.container}>
              <ul className={classes.pagination}>
                <li className={classes.icon}>Pre</li>
                <li>1</li>
                <li className={classes.icon}>Next</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>
    </Fragment>
  );
};

export default ClassSubject;
