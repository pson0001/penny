import c from "./overview.module.scss";

const Overview = ({ spent, budget }) => {
  return (
    <div className={c.overviewContainer}>
      <div className={c.numberContainer}>
        <div className={c.numberItem}>
          <div className={c.number}>{spent}</div> <div>Since Monday</div>
        </div>
        <div className={c.numberItem}>
          <div className={c.number}>{budget - spent}</div>
          <div>Budget left</div>
        </div>
      </div>
      {/* <div className={c.chartContainer}></div> */}
    </div>
  );
};
export default Overview;
