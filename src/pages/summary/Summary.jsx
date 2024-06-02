import allExpensesPerWeek from "../../components/data/allExpensesPerWeek";
import PageContainer from "../../components/pageContainer/PageContainer";
import c from "./summary.module.scss";
const Summary = () => {
  let perWeek = allExpensesPerWeek();
  return (
    <PageContainer>
      <ul className={c.expenseContainer}>
        {Object.entries(perWeek).map(([weekStartDate, amount]) => (
          <li key={weekStartDate} className={c.expenseRow}>
            <div> {weekStartDate}</div>
            <div>${amount.toFixed(2)}</div>

            <div>${(3700 - amount - 1750).toFixed(2)}</div>
          </li>
        ))}
      </ul>
    </PageContainer>
  );
};
export default Summary;
