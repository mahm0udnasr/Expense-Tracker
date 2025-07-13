import React, { useEffect, useState } from "react";
import { prepareExpenseBarCharData } from "../../utils/helper";
import CustomBarChar from "../Charts/CustomBarChar";

const Last30DaysExpenses = ({ data }) => {
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    const result = prepareExpenseBarCharData(data);
    setChartData(result);
  }, [data]);
  return (
    <div className="card col-span-1">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Last 30 Days Expenses</h5>
      </div>
      <CustomBarChar data={chartData} />
    </div>
  );
};

export default Last30DaysExpenses;
