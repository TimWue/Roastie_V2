import * as React from "react";
import { useTheme } from "@mui/material/styles";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Title from "../shared/Title";

export default function Chart() {
  const theme = useTheme();

  const data01 = [
    { x: 10, y: 30 },
    { x: 30, y: 200 },
    { x: 45, y: 100 },
    { x: 50, y: 400 },
    { x: 70, y: 150 },
    { x: 100, y: 250 },
  ];
  const data02 = [
    { x: 25, y: 20 },
    { x: 50, y: 180 },
    { x: 75, y: 240 },
    { x: 100, y: 100 },
    { x: 120, y: 190 },
  ];
  return (
    <>
      <Title>Aktuelle Röstung</Title>
      <ResponsiveContainer>
        <LineChart
          width={730}
          height={250}
          margin={{ top: 20, right: 20, bottom: 10, left: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="x"
            name="stature"
            xAxisId={"1"}
            domain={[0, 150]}
            type={"number"}
          />
          <XAxis
            dataKey="x"
            name="stature"
            xAxisId={"2"}
            domain={[0, 150]}
            type={"number"}
            hide
          />
          <YAxis dataKey="y" name="weight" unit="kg" />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Legend />
          <Line
            name="Sensor1"
            data={data01}
            dataKey={"y"}
            xAxisId={"1"}
            type="monotone"
            stroke="#82ca9d"
          />
          <Line
            name="Sensor2"
            data={data02}
            dataKey={"y"}
            xAxisId={"2"}
            type="monotone"
            stroke="#8884d8"
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
