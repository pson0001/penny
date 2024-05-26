import { format } from "date-fns";
import RealTimeData from "./realTimeData";

const calculateExpensesPerDay = (expenses) => {
  let allExpenses = [];

  RealTimeData().forEach((element) => {
    allExpenses.push(element);
  });
  return allExpenses.reduce((acc, expense) => {
    const date = expense.transaction_date;

    const formatDate = format(new Date(date), "yyyy-MM-dd");
    if (!acc[formatDate]) {
      acc[formatDate] = 0;
    }
    acc[formatDate] += parseFloat(expense.transaction_amount);
    return acc;
  }, {});
};

export default calculateExpensesPerDay;
