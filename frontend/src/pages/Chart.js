import React from "react";
import { Chart } from "react-google-charts";

const function_score = 18;
const efficiency_score = 14;
const readability_score = 11;
const minus_FER = 60 - (function_score + efficiency_score + readability_score);

const copy_score = 40;
const minus_copy = 100 - copy_score;

export const options_FER = {
  title: "Overall Score",
  sliceVisibilityThreshold: 0, // This is equivalent to 0.625 or 62.5% of the chart.
  legend: {
    position: "right", //범례 위치
    textStyle: { color: "black", fontSize: 15 /*fontName: "Arial"*/ }, //범례의 색상 및 글씨체 사이즈, 글씨체 변경
    alignment: "center",
    series: {
      // Gives each series an axis name that matches the Y-axis below.
      0: { axis: "Test Name" },
    },
  },
  pieSliceText: "value",
  pieSliceTextStyle: { color: "white", fontName: "Arial", fontSize: 14 }, //파이 조각 안의 텍스트 설정
  pieHole: 0.4,
  //is3D:true, 3D 파이로 바뀜
  fontName: "Arial", //title의 글씨체
  fontSize: 30, //title의 글씨체 크기
  pieSliceBorderColor: "white", //파이조각 구분하는 색상 (경계선)
  tooltip: { trigger: "none" },
  slices: {
    0: { color: "#9C95F0" }, //첫번째 파이 색
    1: { color: "#6ec059" }, //두번째 파이 색
    2: { color: "#FFE500" },
    3: { color: "transparent" },
  },
};

export const options_copy = {
  title: "Copy Rate",
  legend: {
    position: "right", //범례 위치
    textStyle: { color: "black", fontSize: 14 /*fontName: "Arial"*/ }, //범례의 색상 및 글씨체 사이즈, 글씨체 변경
    alignment: "center",
  },
  sliceVisibilityThreshold: 0,
  pieSliceText: "value",
  pieHole: 0.4,
  fontName: "Arial", //타이틀 글씨
  fontSize: 30, //타이틀 글씨 크기
  pieSliceTextStyle: { color: "#3399ff", fontSize: 15 }, //파이 내의 글씨
  tooltip: { trigger: "none" },
  slices: {
    0: { color: "#3399ff" },
    1: { color: "black" },
  },
};

export function drawFER(data_FER) {
  console.log(data_FER);
  return (
    <Chart
      chartType="PieChart"
      data={data_FER}
      options={options_FER}
      width={"100%"}
      height={"315px"}
      display={"block"}
    />
  );
}

export function drawCopy(data_copy) {
  return (
    <Chart
      chartType="PieChart"
      data={data_copy}
      options={options_copy}
      width={"100%"}
      height={"315px"}
    />
  );
}
