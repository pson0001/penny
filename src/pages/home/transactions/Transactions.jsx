import moment from "moment";
import c from "./transactions.module.scss";

const Transactions = ({ spentItems }) => {
  const expenseCategories = [
    { value: "Grocery", label: "Grocery", color: "var(--label-blue)" },
    {
      value: "Outside_Eating_or_Order",
      label: "Eat out",
      color: "var(--label-yellow)",
    },
    { value: "Fun_Stuff", label: "Fun Stuff", color: "var(--label-red)" },
    { value: "Ez", label: "IMPORTANT MAN", color: "var(--label-teal)" },
    { value: "Ping", label: "Ping", color: "var(--label-pink)" },
    // { value: "Car_Payment", label: "Car Payment" },
    { value: "OC_Land_Tax", label: "OC", color: "var(--label-blue)" },
    { value: "Mortgage", label: "Mortgage", color: "var(--label-blue)" },
    { value: "Car_Expense", label: "Wheels", color: "var(--label-blue)" },
    { value: "Cat", label: "Cat Town", color: "var(--label-teal)" },
    { value: "Utility", label: "Utility", color: "var(--label-blue)" },
    { value: "Health", label: "Health", color: "var(--label-blue)" },
    // { value: "Insurance", label: "Insurance" },
    { value: "Other", label: "Other", color: "var(--label-blue)" },
  ];

  // Function to get the day of the week from a date string using Moment.js
  const getDayOfWeek = (dateString) => {
    return moment(dateString).format("dddd"); // "Monday", "Tuesday", etc.
  };

  // Group transactions by day of the week
  const groupedTransactions = spentItems.reduce((acc, transaction) => {
    const day = getDayOfWeek(transaction.transaction_date);
    if (!acc[day]) {
      acc[day] = [];
    }
    acc[day].push(transaction);
    return acc;
  }, {});

  const findLabelByValue = (value) => {
    const item = expenseCategories.find((item) => item.value === value);
    return item ? item.label : null;
  };
  const findColorByValue = (value) => {
    const item = expenseCategories.find((item) => item.value === value);
    return item ? item.color : null;
  };
  // Order the days of the week with Sunday first
  const orderedDays = [
    "Sunday",
    "Saturday",
    "Friday",
    "Thursday",
    "Wednesday",
    "Tuesday",
    "Monday",
  ];

  return (
    <div className={c.transactionContainer}>
      {orderedDays.map(
        (day) =>
          groupedTransactions[day] && (
            <div key={day}>
              <div className={c.day}>{day}</div>
              <ul className={c.transactionList}>
                {groupedTransactions[day].map((transaction) => (
                  <li key={transaction.id}>
                    <div className={c.itemTitle}>
                      <div
                        className={c.category}
                        style={{
                          backgroundColor: findColorByValue(
                            transaction.transaction_category
                          ),
                        }}
                      >
                        {findLabelByValue(transaction.transaction_category)}
                      </div>
                      <div>{transaction.transaction_item}</div>
                    </div>
                    <div>${transaction.transaction_amount}</div>
                  </li>
                ))}
              </ul>
            </div>
          )
      )}
    </div>
  );
};
export default Transactions;
