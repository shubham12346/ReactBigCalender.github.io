import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import events from "./events";

const localizer = momentLocalizer(moment);
const CustomToolbar = ({ label, onView, onNavigate }) => {
  return (
    <div className="custom-toolbar d-flex ">
      <div></div>
      <div className="d-flex">
        <button onClick={() => onNavigate("PREV")}>Previous</button>
        <h2>{label}</h2>
        <button onClick={() => onNavigate("NEXT")}>Next</button>
      </div>
      <div>
        <button onClick={() => onView("month")}>Month</button>
        <button onClick={() => onView("week")}>Week</button>
        <button onClick={() => onView("day")}>Day</button>
      </div>
    </div>
  );
};

const MyCalendar = () => {
  const [event, setEvents] = useState(events || []);
  const [view, setView] = useState<"month" | "day" | "week" | "agenda">(
    "month"
  );

  const handleSelect = ({ start, end }) => {
    console.log(start, end);
    const title = window.prompt("Enter event title:");
    if (title) {
      const newEvent = {
        title,
        start,
        end
      };
      setEvents([...event, newEvent]);
    }
  };

  const handleEventClick = (event) => {
    console.log("event clicked", event);
    const newDate = new Date(event?.start).getDate();
    console.log("date", newDate);
    setView("day");
  };

  return (
    <div style={{ height: 500 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        components={{
          toolbar: CustomToolbar
        }}
        dayPropGetter={CustomDayPropGetter}
        onSelectEvent={handleEventClick}

        // view ={view}
      />
    </div>
  );
};

export default MyCalendar;

const CustomDayPropGetter = (date) => {
  const day = date.getDay();

  if (day === 0 || day === 6) {
    return {
      className: "weekend-day",
      style: {
        backgroundColor: "#e6e6e6" // Gray background for weekends
      }
    };
  }

  return {
    className: "weekend-day",
    style: {
      backgroundColor: "#fffff" // Gray background for weekends
    }
  };
};
