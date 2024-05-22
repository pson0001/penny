import PageContainer from "../../components/pageContainer/PageContainer";
import Overview from "./overview/Overview.jsx";
import Transactions from "./transactions/Transactions.jsx";
import RealTimeData from "../../components/data/realTimeData.js";
import moment from "moment";

const Home = () => {
  let spentItems = [];
  let spent = 0;
  let allExpenses = [];
  // Use budget
  const spentCategories = [
    "Grocery",
    "Outside_Eating_or_Order",
    "Fun_Stuff",
    "Ez",
    "Ping",
    "Other",
  ];

  // Not use budget
  const notSpentCategories = [
    "OC_Land_Tax",
    "Mortgage",
    "Car_Expense",
    "Cat",
    "Utility",
    "Health",
  ];

  RealTimeData().forEach((element) => {
    if (
      (element.transaction_date.isSame(moment().startOf("isoWeek")) ||
        element.transaction_date.isAfter(moment().startOf("isoWeek"))) &&
      spentCategories.includes(element.transaction_category)
    ) {
      spentItems.push(element);
      spent += Math.round(+element.transaction_amount);
    }
  });

  RealTimeData().forEach((element) => {
    if (
      element.transaction_date.isSame(moment().startOf("isoWeek")) ||
      element.transaction_date.isAfter(moment().startOf("isoWeek"))
    ) {
      allExpenses.push(element);
      // spent += Math.round(+element.transaction_amount);
    }
  });

  return (
    <PageContainer>
      <Overview spent={spent} budget={600} />
      <Transactions spentItems={allExpenses} />
    </PageContainer>
  );
};
export default Home;
