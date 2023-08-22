import { Fragment } from "react";
import React from "react";
import { useState } from "react";

import CourseInfo from "./CourseInfo";
import CourseScoreSection from "./CourseScoreSection";
import VerticalLine from "./VerticalLine";
import CourseAttendance from "./CourseAttendance";
import ScoreRadarChart from "./ScoreRadarChart";
import AttendancePieChart from "./AttendancePieChart";

import '../assets/css/course-sub-navigation.css';
import '../assets/css/course-view.css';


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
    const attendanceChartData = attendanceData.overview;
    
    for (const [sectionTitle, sectionData] of Object.entries(courseData)){
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
        <div style={{display: 'block'}} className="course-div" data-course-id={courseDataRow.course_id}>
            <h2>{courseDataRow.course_name}</h2>
            <div className="course-overview-div">
                <div className="overview-text">
                    <CourseInfo 
                        courseDataRow={courseDataRow} 
                        courseInfoColumns={courseInfoColumns} 
                        columnsTitles={columnsTitles}
                    />
                </div>
                <div className="vl"></div>
                <div className="chart" style={{ minWidth: '25%' }}>
                    <ScoreRadarChart
                        fullMark={100} 
                        chartTitle={courseDataRow.course_name}
                        chartData={scoreChartData} 
                        width={500} 
                        height={350}
                    />
                </div>
                {
                    attendanceChartData.present ? 
                    <>
                    <div className="vl"></div>
                    <div className="chart" style={{ minWidth: '25%' }}>
                        <AttendancePieChart
                            width={200}
                            height={200}
                            present={attendanceChartData.present}
                            absent={attendanceChartData.absent}
                            chartTitle="Attendance"
                        />
                        <span><b>Present: </b>{attendanceChartData.present}</span><br />
                        <span><b>Absent: </b>{attendanceChartData.absent}</span>
                    </div>
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