import React from "react";
import { Chart } from "react-google-charts";

const function_score = 18;
const efficiency_score = 14;
const readability_score = 11;
const minus_FER = 60 - (function_score + efficiency_score + readability_score);

const copy_score = 40;
const minus_copy = 100 - copy_score;

export const data_FER = [
  ["Test Name", "Score"],
  ["가독성", readability_score],
  ["기능", function_score],
  ["효율", efficiency_score],
  ["", minus_FER],
];

export const options_FER = {
  title: "Overall Score",
  legend: {
    position: "right", //범례 위치
    textStyle: { color: "black", fontSize: 11 /*fontName: "Arial"*/ }, //범례의 색상 및 글씨체 사이즈, 글씨체 변경
    alignment: "center",
  },
  pieSliceText: "value",
  pieSliceTextStyle: { color: "white", fontName: "Arial", fontSize: 16 }, //파이 조각 안의 텍스트 설정
  pieHole: 0.4,
  //is3D:true, 3D 파이로 바뀜
  fontName: "Arial", //title의 글씨체
  fontSize: 30, //title의 글씨체 크기
  pieSliceBorderColor: "white", //파이조각 구분하는 색상 (경계선)
  tooltip: { trigger: "none" },
  slices: {
    0: { color: "#3399ff" }, //첫번째 파이 색
    1: { color: "#00cc66" }, //두번째 파이 색
    2: { color: "#ff9933" },
    3: { color: "transparent" },
  },
};

export const data_copy = [
  ["Copy Rate", "Score"],
  ["copy rate", copy_score],
  ["", minus_copy],
];

export const options_copy = {
  title: "Copy Rate",
  legend: "none",
  pieSliceText: "value",
  pieHole: 0.4,
  fontName: "Arial", //타이틀 글씨
  fontSize: 30, //타이틀 글씨 크기
  pieSliceTextStyle: { color: "white", fontSize: 20 }, //파이 내의 글씨
  tooltip: { trigger: "none" },
  slices: {
    0: { color: "#3399ff" },
    1: { color: "transparent" },
  },
};

export function drawFER() {
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

export function drawCopy() {
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
