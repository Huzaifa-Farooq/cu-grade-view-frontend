import { Fragment } from "react";
import React from "react";
import { useState } from "react";
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
  } from "recharts";

  
const ScoreRadarChart = (props) => {
    const fullMark = props.fullMark;
    const chartTitle = props.chartTitle;
    const data = props.chartData;
    const width = props.width;
    const height = props.height;
  
    return (
        <ResponsiveContainer width={width} height={height}>
            <RadarChart
                title={chartTitle}
                data={data}
                cx="45%"
                cy="35%"
                outerRadius="50%"
            >
                <PolarGrid />
                <PolarAngleAxis tick={{ fontSize: '12px', fill: 'white', dy: 5.5 }} dataKey="name" />
                <PolarRadiusAxis transform="rotate(0)" tick={{ fontSize: '11px' }} domain={[0, fullMark]} />
                <Radar
                    name="Score"
                    dataKey="value"
                    stroke="#1cb495"
                    fill="#1cb495"
                    fillOpacity={0.5}

                />
            </RadarChart>

            </ResponsiveContainer>
    );
};

export default ScoreRadarChart;