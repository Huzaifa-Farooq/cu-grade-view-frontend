import { Fragment } from "react";
import React from "react";
import { useState } from "react";

import CourseInfo from "./CourseInfo";
import CourseScoreSection from "./CourseScoreSection";
import VerticalLine from "./VerticalLine";
import CourseAttendance from "./CourseAttendance";
import ScoreRadarChart from "./ScoreRadarChart";
import AttendancePieChart from "./AttendancePieChart";

import { toTitleCase } from "../utils";

import '../assets/css/course-sub-navigation.css';
import '../assets/css/course-view.css';


const AttendanceChartComponent = ({ attendanceChartData }) => {
    const COLORS = {
        'class': ["#1cb495", ""],
        'lab': ["#1cd986", ""],
    };

    return (
        <div className="chart col-md-3">
            <AttendancePieChart
                width={200}
                height={200}
                attendanceChartData={attendanceChartData}
                COLORS={COLORS}
                chartTitle="Attendance"
            />
            <div style={{ display: 'flex', paddingTop: '10px' }}>
                {
                    Object.keys(attendanceChartData).map((key, index) => {
                        const attendanceData = attendanceChartData[key];
                        const present = attendanceData.filter(o => o.name === "Present")[0].value;
                        const absent = attendanceData.filter(o => o.name === "Absent")[0].value;
                        return (
                            <div 
                                style={{ padding: '0px 10px 0px 10px', alignContent: 'center', alignItems: 'center', borderRight: (index === 0 && Object.keys(attendanceChartData).length > 1) ? '1px solid #ccc' : null}}
                            >
                                <div><span style={{ fontSize: '16px', textDecoration: 'underline' }}>{toTitleCase(key)}</span></div>
                                <span><b>Present: </b>{present}</span><br />
                                <span><b>Absent: </b>{absent}</span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

const CourseView = (props) => {
    const [isAttendanceVisible, setAttendanceVisible] = useState(false);

    const courseInfoColumns = props.courseInfoColumns;
    const columnsTitles = props.columnsTitles;
    const attendanceData = props.courseData.attendance;
    const courseData = props.courseData.courseScore;
    const courseAttendance = props.courseData.attendance;
    const columns = props.columns;

    var courseDataRow = Object.values(courseData)[0].data[0];

    const courseScoreSections = [];
    const scoreChartData = [];
    const attendanceChartData = {};
    attendanceData.attendanceData.forEach(e => {
        attendanceChartData[e.attendanceType] = [
            { name: 'Present', value: e.present },
            { name: 'Absent', value: e.absent }
        ];
    });

    for (const [sectionTitle, sectionData] of Object.entries(courseData)) {
        scoreChartData.push({
            name: `${sectionTitle} (${sectionData.percentage}%)`,
            value: sectionData.percentage,
            fullMark: 100
        });

        courseScoreSections.push(
            <Fragment>
                <CourseScoreSection
                    sectionTitle={sectionTitle}
                    columns={columns}
                    columnsTitles={columnsTitles}
                    data={sectionData}
                />
                <VerticalLine />
            </Fragment>
        );
    }

    const handleButtonClick = () => {
        setAttendanceVisible(!isAttendanceVisible);

        // setTimeout(() => {
        // setAttendanceVisible(!isAttendanceVisible);
        //   }, 200);
    }


    return (
        <div style={{ display: 'block' }} className="course-div" data-course-id={courseDataRow.course_id}>
            <h2>{courseDataRow.course_name}</h2>
            <div className="course-overview-div">
                <div className="overview-text col-md-4">
                    <CourseInfo
                        courseDataRow={courseDataRow}
                        courseInfoColumns={courseInfoColumns}
                        columnsTitles={columnsTitles}
                    />
                </div>
                <div className="vl"></div>
                <div className="chart col-md-5">
                    <ScoreRadarChart
                        fullMark={100}
                        chartTitle={courseDataRow.course_name}
                        chartData={scoreChartData}
                        width={500}
                        height={350}
                    />
                </div>
                {
                    attendanceChartData && Object.keys(attendanceChartData).length >= 1 ?
                        <>
                            <div className="vl"></div>
                            <AttendanceChartComponent attendanceChartData={attendanceChartData} />
                        </>
                        :
                        null
                }
            </div>
            <VerticalLine width='100%' />
            <div className="course-sub-nav">
                <ul>
                    <li className={isAttendanceVisible ? null : 'active'} onClick={handleButtonClick}><a>Course Score</a></li>
                    <li className={isAttendanceVisible ? 'active' : null} onClick={handleButtonClick}><a>Attendance</a></li>
                </ul>
            </div>

            {
                isAttendanceVisible ? <CourseAttendance attendance={courseAttendance} />
                    :
                    <div className="score-div">{courseScoreSections}</div>}
        </div>
    );
}


export default CourseView;