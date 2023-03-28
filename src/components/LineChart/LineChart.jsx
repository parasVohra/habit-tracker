import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto"
const LineChart = ({ chartData }) => {
    return (
        <div>
            <Line data={chartData} />
        </div>
    );
};

export default LineChart;
