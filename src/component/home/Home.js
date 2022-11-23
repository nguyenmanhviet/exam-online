import classes from "./Home.module.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../../store/authContext";

const Home = (props) => {
  const authCtx = useContext(AuthContext);
  const [events, setEvents] = useState([]);

  console.log("events", events);
  useEffect(() => {
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    headers.append("Access-Control-Allow-Origin", "http://3.105.183.164:3001");
    headers.append("Access-Control-Allow-Credentials", "true");
    fetch(`http://3.105.183.164:3001/sv/${authCtx.id}/kythi`, {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.items);
        // if (data.items.length > 0) {
        setEvents((events) =>
          data.items.map((item) => ({
            id: item.id,
            title: item.kyThi + " - " + item.hocPhan.hocPhan,
            start: new Date(item.timeStart),
            end: new Date(),
          }))
        );
        // }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={classes.container}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventBackgroundColor="#354A5E"
        eventBorderColor="#354A5E"
        eventColor="#354A5E"
        eventTextColor="white"
        headerToolbar={{
          left: "prev, next today",
          center: "title",
          right: "dayGridMonth, timeGridWeek, timeGridDay",
        }}
      />
    </div>
  );
};

export default Home;
