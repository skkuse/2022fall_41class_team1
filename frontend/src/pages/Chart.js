import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Test Name", "Score"],
  ["기능성", 20],
  ["효율성", 12],
  ["가독성", 16],
  ["", 12],
];

export const options = {
  legend: {
    position: "right", //범례 위치
    textStyle: { color: "green", fontSize: 11 },
    alignment: "center",
  },
  pieSliceText: "value",
  pieSliceTextStyle: { color: "black", fontName: "Arial", fontSize: 9 }, //파이 조각 안의 텍스트 설정
  pieHole: 0.4,
  fontName: "Arial",
  fontSize: 11,
  pieSliceBorderColor: "pink", //파이조각 구분하는 색상
  tooltip: { trigger: "none" },
  slices: {
    0: { color: "blue" }, //첫번째 파이 색
    1: { color: "green" },
    2: { color: "orange" },
    3: { color: "transparent", offset: 0.3 },
  },
};

export function App() {
  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"400px"}
    />
  );
}
