import classes from "./Home.module.css";

const Home = (props) => {
  return (
    <div className={classes.container}>
      <div className={classes.calendarcontainer}>
        <header>
          <div className={classes.day}>18</div>
          <div className={classes.month}>August</div>
        </header>

        <table className={classes.calendar}>
          <thead>
            <tr>
              <td>Mon</td>
              <td>Tue</td>
              <td>Wed</td>
              <td>Thu</td>
              <td>Fri</td>
              <td>Sat</td>
              <td>Sun</td>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className={classes.prevmonth}>29</td>
              <td className={classes.prevmonth}>30</td>
              <td className={classes.prevmonth}>31</td>
              <td className={classes.dayTime}>1</td>
              <td className={classes.dayTime}>2</td>
              <td className={classes.dayTime}>3</td>
              <td className={classes.dayTime}>4</td>
            </tr>

            <tr>
              <td className={classes.dayTime}>5</td>
              <td className={classes.dayTime}>6</td>
              <td className={classes.dayTime}>7</td>
              <td className={classes.dayTime}>8</td>
              <td className={classes.dayTime}>9</td>
              <td className={classes.dayTime}>10</td>
              <td className={classes.dayTime}>11</td>
            </tr>

            <tr>
              <td className={classes.dayTime}>12</td>
              <td className={classes.dayTime}>13</td>
              <td className={classes.dayTime}>14</td>
              <td className={classes.dayTime}>15</td>
              <td className={classes.dayTime}>16</td>
              <td className={classes.dayTime}>17</td>
              <td className={classes.currentday}>18</td>
            </tr>

            <tr>
              <td className={classes.dayTime}>19</td>
              <td className={classes.dayTime}>20</td>
              <td className={classes.dayTime}>21</td>
              <td className={classes.dayTime}>22</td>
              <td className={classes.dayTime}>23</td>
              <td className={classes.dayTime}>24</td>
              <td className={classes.dayTime}>25</td>
            </tr>

            <tr>
              <td className={classes.dayTime}>26</td>
              <td className={classes.dayTime}>27</td>
              <td className={classes.dayTime}>28</td>
              <td className={classes.dayTime}>29</td>
              <td className={classes.dayTime}>30</td>
              <td className={classes.dayTime}>31</td>
              <td className={classes.nextmonth}>1</td>
            </tr>
          </tbody>
        </table>

        <div className={classes.ringleft}></div>
        <div className={classes.ringright}></div>
      </div>
    </div>
  );
};

export default Home;
