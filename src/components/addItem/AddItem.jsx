import { createPortal } from "react-dom";
import c from "./add-item.module.scss";
import Icon from "../icon/Icon";
import { getDatabase, ref, push } from "firebase/database";
import { DatePicker } from "antd";
import { useState } from "react";
import app from "../../firebase";
import ExpenseCategories from "../constant/ExpenseCategories";

const AddItem = ({ onClose }) => {
  const [formData, setFormData] = useState({
    transaction_amount: "",
    transaction_category: ExpenseCategories[0].value,
    transaction_date: "",
    transaction_item: "",
    transaction_type: "out",
  });

  const [selectedOption, setSelectedOption] = useState(
    formData.transaction_category
  );

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setFormData({
      ...formData,
      transaction_category: event.target.value,
    });
  };

  const [selectedDate, setSelectedDate] = useState(null);

  const onDateChange = (date) => {
    setSelectedDate(date);
    setFormData({
      ...formData,
      transaction_date: new Date(date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
    });
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    push(ref(getDatabase(app), `expenses`), formData)
      .then(() => {
        setFormData({
          transaction_amount: "",
          transaction_category: ExpenseCategories[0].value,
          transaction_date: "",
          transaction_item: "",
          transaction_type: "out",
        });
        setSelectedDate(null);
        setSelectedOption(ExpenseCategories[0].value);

        alert("Expense Submitted!");
      })
      .catch((error) => {
        console.error(error);
        alert("There is a problem!");
      });
  };
  return createPortal(
    <div className={c.background}>
      <div className={c.card}>
        <div className={c.titleContainer}>
          <div className={c.title}>Add expense</div>
          <button onClick={onClose}>
            <Icon.X />
          </button>
        </div>
        <form className={c.cardContent} onSubmit={handleSubmit}>
          <div className={c.fieldsContainer}>
            <div className={c.field}>
              <span>Amount</span>
              <input
                className={c.customInput}
                name="transaction_amount"
                type="number"
                step="any"
                value={formData.transaction_amount}
                onChange={handleChange}
                required
              />
            </div>
            <div className={c.field}>
              <span>Categories</span>
              <div className={c.categoryContainer}>
                {ExpenseCategories.map((category) => {
                  return (
                    <label
                      key={category.value}
                      className={c.category}
                      style={{
                        backgroundColor:
                          selectedOption === category.value
                            ? category.color
                            : null,
                        borderColor:
                          selectedOption !== category.value
                            ? category.color
                            : null,
                      }}
                    >
                      {selectedOption === category.value ? (
                        <Icon.Check />
                      ) : null}
                      <input
                        type="radio"
                        value={category.value}
                        checked={selectedOption === category.value}
                        onChange={handleOptionChange}
                      />
                      {category.label}
                    </label>
                  );
                })}
              </div>
            </div>
            <div className={c.field}>
              <span>Date</span>
              <DatePicker
                name="transaction_date"
                onChange={onDateChange}
                value={selectedDate}
                className={c.customInput}
                required
              />
            </div>
            <div className={c.field}>
              <span>Detail</span>
              <input
                className={c.customInput}
                name="transaction_item"
                value={formData.transaction_item}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className={c.buttonContainer}>
            <button className={c.primaryButton}>
              <Icon.Plus />
              Add
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById("root")
  );
};

export default AddItem;
