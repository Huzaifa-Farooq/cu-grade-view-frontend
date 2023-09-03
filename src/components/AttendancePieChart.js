
import { Fragment } from "react";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell, Legend, Text } from "recharts";


import { toTitleCase } from '../utils';

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`class 99%`}
    </text>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
    console.log("Tooltop called");
    if (active && payload && payload.length) {
        if (label instanceof Date) {
            label = label.toLocaleDateString();
        }
        return (
            <div className="custom-tooltip gray-bg white-text" >
                <span className="label">{label}</span>
                <div>
                    {
                        payload.map((pld) => {
                            return (
                                <><span style={{ color: pld.fill }}>{pld.dataKey}: {pld.value}</span><br /></>
                            );
                        })
                    }
                </div>
            </div>
        );
    }

    return null;
};

const CustomLegend = (props) => {
    const {classColor, labColor} = props;
    const colors = [
        {
        name: 'Class',
        color: classColor
    },
    {
        name: 'Lab',
        color: labColor
    }
]

    const colorBoxStyle = {
        minHeight: '15px',
        minWidth: '15px',
        maxHeight: '15px',
        maxWidth: '15px',
        marginRight:'3px'
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center', padding: '20px 0px 0px 0px' }}>
            {
                colors.map((c) => {
                    const { name, color } = c;
                    return (
                        <div style={{ display: 'flex', alignContent: 'center', alignItems: 'center', marginRight: '10px' }}>
                            <div style={{ ...colorBoxStyle, backgroundColor: color }}></div>
                            <div>{name}</div>
                        </div>
                    );
                })
            }
        </div>
    )
  };
  

const AttendancePieChart = ({ COLORS, chartTitle, width, height, attendanceChartData }) => {
    const attendanceDataLabels = Object.keys(attendanceChartData);

    return (
        <ResponsiveContainer width={width} height={height}>
            <PieChart>
                <text
                    fill="white"
                    fontSize={18}
                    x={width / 2}
                    y={20}
                    textAnchor="middle"
                >
                    {chartTitle}
                </text>
                {
                    attendanceDataLabels.map((label) => {
                        const attendanceData = attendanceChartData[label];
                        const present = attendanceData.filter(o => o.name === "Present")[0].value;
                        const absent = attendanceData.filter(o => o.name === "Absent")[0].value;
                        const percentage = Math.round(((present / (present + absent)) * 100));

                        return (
                            <Fragment>
                                <text
                                    fontSize={14}
                                    fill={COLORS[label][0]}
                                    x={(width / 2)}
                                    y={(height / 2) + (label === 'class' ? 25 : 45) + 2}
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                >
                                    {toTitleCase(label)} - {percentage}%
                                </text>
                                <Legend 
                                    content={<CustomLegend classColor={COLORS['class'][0]} labColor={COLORS['lab'][0]} />} 
                                    verticalAlign="top" 
                                />
                                <Pie
                                    data={attendanceData}
                                    dataKey="value"
                                    innerRadius={label === 'class' ? 70 : 50}
                                    outerRadius={label === 'class' ? 87 : '90%'}
                                    fill="green"
                                    startAngle={180}
                                    endAngle={0}
                                    cy={100}
                                    paddingAngle={1.5}
                                    animationDuration={300}
                                    blendStroke
                                >
                                    <Tooltip content={<CustomTooltip />} />
                                    {
                                        attendanceData.map((entry, index) => <Cell fill={COLORS[label][index]} />)
                                    }
                                </Pie>
                            </Fragment>
                        );
                    })
                }

            </PieChart>
        </ResponsiveContainer>
    );
};

export default AttendancePieChart;