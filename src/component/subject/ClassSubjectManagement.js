import classes from "./ClassSubjectManagement.module.css";
import Card from "../UI/Card";
import { Fragment } from "react";
import { IoIosEye, IoIosCloseCircle } from "react-icons/io";

const ClassSubjectManagement = (props) => {
  const hanldeModalAddSubject = () => {
    props.onActiveModalAddSubject();
  };

  const handleEdit = () => {
    props.onActiveModalEditSubject();
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
                  <input className={classes.hocphan} />
                </div>
                <div className={classes.control}>
                  <label htmlFor="username">Nội dung</label>
                  <input
                    className={classes.noidung}
                    type="text"
                    placeholder="Học phần"
                  />
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
          <button
            className={classes.addSubject}
            onClick={hanldeModalAddSubject}
          >
            Thêm lớp học phần
          </button>
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
                    <span>Tên lớp</span>
                  </th>
                  <th>
                    <span>Học phần</span>
                  </th>
                  <th>
                    <span>Mã lớp</span>
                  </th>
                  <th>
                    <span>Giảng viên</span>
                  </th>
                  <th>
                    <span>Năm học</span>
                  </th>
                  <th>
                    <span>Học kỳ</span>
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
                <tr>
                  <td className={classes.lalign}>18Nh11A</td>
                  <td>Phân tích thiết kế hướng đối tượng</td>
                  <td>7131278Hn1298AQW</td>
                  <td>Đặng Hoài Phương</td>
                  <td>2022-2023</td>
                  <td>Học kỳ 1</td>
                  <td className={classes.detaile} onClick={handleEdit}>
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
                <tr>
                  <td className={classes.lalign}>18Nh11A</td>
                  <td>Phân tích thiết kế hướng đối tượng</td>
                  <td>7131278Hn1298AQW</td>
                  <td>Đặng Hoài Phương</td>
                  <td>2022-2023</td>
                  <td>Học kỳ 1</td>
                  <td className={classes.detaile} onClick={handleEdit}>
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
                <tr>
                  <td className={classes.lalign}>18Nh11A</td>
                  <td>Phân tích thiết kế hướng đối tượng</td>
                  <td>7131278Hn1298AQW</td>
                  <td>Đặng Hoài Phương</td>
                  <td>2022-2023</td>
                  <td>Học kỳ 1</td>
                  <td className={classes.detaile} onClick={handleEdit}>
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
                <tr>
                  <td className={classes.lalign}>18Nh11A</td>
                  <td>Phân tích thiết kế hướng đối tượng</td>
                  <td>7131278Hn1298AQW</td>
                  <td>Đặng Hoài Phương</td>
                  <td>2022-2023</td>
                  <td>Học kỳ 1</td>
                  <td className={classes.detaile} onClick={handleEdit}>
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
                <tr>
                  <td className={classes.lalign}>18Nh11A</td>
                  <td>Phân tích thiết kế hướng đối tượng</td>
                  <td>7131278Hn1298AQW</td>
                  <td>Đặng Hoài Phương</td>
                  <td>2022-2023</td>
                  <td>Học kỳ 1</td>
                  <td className={classes.detaile} onClick={handleEdit}>
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

export default ClassSubjectManagement;
