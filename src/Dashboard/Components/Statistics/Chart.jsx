import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const Chart = ({ data, isTimeSpent }) => {
  // If it's time spent data, render bar chart
  if (isTimeSpent) {
    return (
      <div className="chart">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={Object.entries(data).map(([key, value]) => ({
              name: key,
              value,
            }))}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8949FF" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  // For course progress, render pie chart
  const progress = data.progress || 0;
  const pieData = [
    { name: "Completed", value: progress },
    { name: "Remaining", value: 100 - progress }
  ];

  return (
    <div className="chart">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={80}
            dataKey="value"
            label={({ value }) => `${value.toFixed(1)}%`}
          >
            {/* <Cell fill="#82ca9d" /> */}
            <Cell fill="#16C024" />
            <Cell fill="red" />
          </Pie>
          <Tooltip formatter={(value) => `${value.toFixed(1)}%`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;