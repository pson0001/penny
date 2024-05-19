import moment from "moment";
import c from "./transactions.module.scss";
import ExpenseCategories from "../../../components/constant/ExpenseCategories";
import { getDatabase, ref, remove, set } from "firebase/database";

import Icon from "../../../components/icon/Icon";
import app from "../../../firebase";

const Transactions = ({ spentItems }) => {
  // Function to get the day of the week from a date string using Moment.js
  const getDayOfWeek = (dateString) => {
    return moment(dateString).format("dddd");
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
    const item = ExpenseCategories.find((item) => item.value === value);
    return item ? item.label : null;
  };
  const findColorByValue = (value) => {
    const item = ExpenseCategories.find((item) => item.value === value);
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

  const handleOnDelete = (id) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this expense?"
    );
    if (userConfirmed) {
      remove(ref(getDatabase(app), `expenses/${id}`));
    }
  };

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
                    <div className={c.amount}>
                      ${transaction.transaction_amount}
                      <button onClick={() => handleOnDelete(transaction.id)}>
                        <Icon.Trash />
                      </button>
                    </div>
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
