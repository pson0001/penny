import { useState } from "react";
import Calendar from "./calendar/Calendar";
import c from "./schedule.module.scss";
import { format, nextSunday, sub, add } from "date-fns";
import Icon from "../../components/icon/Icon";

function Schedule() {
  const [today] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const backToTodayHandler = () => {
    setSelectedMonth(today);
  };

  const preWeek = () => setSelectedDate(sub(selectedDate, { weeks: 1 }));
  const nextWeek = () => setSelectedDate(add(selectedDate, { weeks: 1 }));

  // Weekly calendar only
  // const numberOfDisplayDays = 7;

  // Show or hide date picker
  const [showMiniCalendar, setShowMiniCalendar] = useState(false);

  return (
    <>
      <div className={c.scheduleContainer}>
        <div className={c.calendarContainer}>
          <Calendar
            selectedDate={selectedDate}
            onSelectedDateChange={setSelectedDate}
            // numberOfDisplayDays={numberOfDisplayDays}
            selectedMonth={selectedMonth}
            onSelectedMonthChange={setSelectedMonth}
            today={today}
          />
        </div>
      </div>
    </>
  );
}

export default Schedule;
