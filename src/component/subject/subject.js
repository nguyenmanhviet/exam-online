import classes from "./subject.module.css";
import Card from "../UI/Card";
import { Fragment } from "react";
import { IoIosEye, IoIosCloseCircle } from "react-icons/io";

const Subject = (props) => {
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
                  <label htmlFor="username">Nội dung</label>
                  <input type="text" placeholder="Học phần" />
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
            Thêm học phần
          </button>
          <p>Danh sách học phần</p>

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
                    <span>Học phần</span>
                  </th>
                  <th>
                    <span>Mã học phần</span>
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
                  <td className={classes.lalign}>
                    Phân tích thiết kế hướng đối tượng
                  </td>
                  <td>PTTK_HDT</td>
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
                  <td className={classes.lalign}>
                    Phân tích thiết kế hướng đối tượng
                  </td>
                  <td>PTTK_HDT</td>
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
                  <td className={classes.lalign}>
                    Phân tích thiết kế hướng đối tượng
                  </td>
                  <td>PTTK_HDT</td>
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
                  <td className={classes.lalign}>
                    Phân tích thiết kế hướng đối tượng
                  </td>
                  <td>PTTK_HDT</td>
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
                  <td className={classes.lalign}>
                    Phân tích thiết kế hướng đối tượng
                  </td>
                  <td>PTTK_HDT</td>
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

export default Subject;
