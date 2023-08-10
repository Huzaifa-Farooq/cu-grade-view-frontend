
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";


const AttendancePieChart = (props) => {
    const chartTitle = props.chartTitle;
    // const data = props.chartData;
    const width = props.width;
    const height = props.height;

    const data = [
        { name: "Present", value: props.present },
        { name: "Absent", value: props.absent },
    ];
    const percentage = Math.round(((props.present / (props.present + props.absent)) * 100));

    const COLORS = ["#1cb495", "red"];

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
                <text
                    fill="white"
                    fontSize={30}
                    x={width / 2}
                    y={(height / 2) + 25}
                    textAnchor="middle"
                    dominantBaseline="middle"
                >
                    {percentage}%
                </text>
                <Pie
                    data={data}
                    dataKey="value"
                    innerRadius="80%"
                    outerRadius="100%"
                    fill="green"
                    startAngle={180}
                    endAngle={0}
                    cy={130}
                    paddingAngle={1.5}
                    animationDuration={300}
                    blendStroke
                >
                    <Tooltip />
                    {
                        data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]} />)
                    }
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );
};

export default AttendancePieChart;