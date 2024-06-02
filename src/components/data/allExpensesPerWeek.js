import { format, startOfWeek } from "date-fns";
import RealTimeData from "./realTimeData";

const allExpensesPerWeek = () => {
  let allExpenses = [];

  RealTimeData().forEach((element) => {
    allExpenses.push(element);
  });

  const weeklyExpenses = allExpenses.reduce((acc, expense) => {
    const date = expense.transaction_date;

    // Get the start of the week for the transaction date
    const weekStartDate = startOfWeek(new Date(date), { weekStartsOn: 1 }); // Assuming week starts on Monday
    const formatDate = format(weekStartDate, "yyyy-MM-dd");

    if (!acc[formatDate]) {
      acc[formatDate] = 0;
    }
    acc[formatDate] += parseFloat(expense.transaction_amount);
    return acc;
  }, {});

  // Sort the weekly expenses by date in descending order
  const sortedWeeklyExpenses = Object.fromEntries(
    Object.entries(weeklyExpenses).sort(
      ([dateA], [dateB]) => new Date(dateB) - new Date(dateA)
    )
  );
  return sortedWeeklyExpenses;
};

export default allExpensesPerWeek;
