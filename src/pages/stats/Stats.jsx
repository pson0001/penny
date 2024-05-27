import { useState } from "react";
import PageContainer from "../../components/pageContainer/PageContainer";
import PieChart from "./PieChart";
import RealTimeData from "../../components/data/realTimeData";
import moment from "moment";
import { Flex, Radio } from "antd";
import c from "./stats.module.scss";
const Stats = () => {
  const [chartType, setChartType] = useState("pie");
  const [duration, setDuration] = useState(7);

  const durationOptions = [7, 30, 365];
  const chartOptions = ["Pie"];

  const onChange = (e) => {
    setDuration(e.target.value);
  };
  let allExpenses = [];
  RealTimeData().forEach((element) => {
    if (
      element.transaction_date.isAfter(new moment().subtract(duration, "d")) &
      element.transaction_date.isBefore(new moment()) &
      (element.transaction_type === "out")
    ) {
      allExpenses.push(element);
    }
  });

  const categorySums = allExpenses?.reduce((acc, transaction) => {
    const category = transaction.transaction_category;
    const amount = parseFloat(transaction.transaction_amount);

    if (!acc[category]) {
      acc[category] = 0;
    }

    acc[category] += parseInt(amount);
    return acc;
  }, {});

  const result = Object.entries(categorySums).map(([id, value]) => ({
    id,
    value,
  }));

  return (
    <PageContainer>
      <div className={c.optionsContainer}>
        <Flex vertical gap="middle">
          <Radio.Group onChange={onChange} defaultValue={7}>
            {durationOptions.map((option) => (
              <Radio.Button value={option}>{option}</Radio.Button>
            ))}
          </Radio.Group>
        </Flex>
      </div>
      <div className={c.chartContainer}>
        {result.length > 0 && <PieChart data={result} />}
      </div>
    </PageContainer>
  );
};
export default Stats;
