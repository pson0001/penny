/* eslint-disable react/prop-types */
import c from "./calendar.module.scss";
import {
  differenceInDays,
  endOfMonth,
  startOfMonth,
  sub,
  format,
  add,
  getMonth,
  isSameDay,
  getYear,
  getDaysInMonth,
} from "date-fns";
import Cell from "../cell/Cell";
import calculateExpensesPerDay from "../../../components/data/calculateExpensesPerDay.js";
const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Calendar = ({
  selectedDate,
  onSelectedDateChange,
  selectedMonth,
  onSelectedMonthChange,
  today,
}) => {
  // Display Calendar
  const startDate = startOfMonth(selectedMonth);
  const endDate = endOfMonth(selectedMonth);
  const numberOfDays = differenceInDays(endDate, startDate) + 1;

  const prefixDays = startDate.getDay();
  const numberOfDatesLastMonth = getDaysInMonth(
    sub(selectedMonth, { months: 1 })
  );
  const suffixDays = 6 - endDate.getDay();

  const preMonth = () =>
    onSelectedMonthChange(sub(selectedMonth, { months: 1 }));
  const nextMonth = () =>
    onSelectedMonthChange(add(selectedMonth, { months: 1 }));

  // All displayed dates
  const nextDay = (day, number) => add(day, { days: number });

  let allExpensesPerDate = calculateExpensesPerDay();
  return (
    <>
      <div className={c.calendarContainer}>
        <Cell>{"<<"}</Cell>
        <Cell onClick={preMonth}>{"<"}</Cell>
        <Cell className={c.month}>{format(selectedDate, "d LLL yyyy")}</Cell>
        <Cell onClick={nextMonth}>{">"}</Cell>
        <Cell>{">>"}</Cell>

        {/* Day Name */}
        {dayOfWeek.map((day, i) => (
          <Cell key={i} today={today === day}>
            {day}
          </Cell>
        ))}

        {/* Last Month */}
        {Array.from({ length: prefixDays }, (v, i) => {
          const date = i + 1;
          return (
            <Cell key={date} notCurrentMonth={true}>
              {numberOfDatesLastMonth - prefixDays + i + 1}
            </Cell>
          );
        })}

        {/* Current Month */}
        {Array.from({ length: numberOfDays }, (v, i) => {
          const date = i + 1;

          const newDate = new Date(
            getYear(selectedMonth),
            getMonth(selectedMonth),
            date
          );
          const formatDate = format(new Date(newDate), "yyyy-MM-dd");

          return (
            <Cell
              key={date}
              today={isSameDay(newDate, today)}
              onClick={() => {
                onSelectedDateChange(newDate);
              }}
            >
              <div>{date}</div>
              <label>
                {allExpensesPerDate[formatDate]
                  ? `$${Math.round(allExpensesPerDate[formatDate])}`
                  : null}
              </label>
            </Cell>
          );
        })}

        {/* Next Month */}
        {Array.from({ length: suffixDays }, (v, i) => {
          const date = i + 1;
          return (
            <Cell key={date} notCurrentMonth={true}>
              {date}
            </Cell>
          );
        })}
      </div>
    </>
  );
};

export default Calendar;
