import { Fragment } from "react";
import React from "react";
import { useState } from "react";

import CourseInfo from "./CourseInfo";
import CourseScoreSection from "./CourseScoreSection";
import VerticalLine from "./VerticalLine";
import CourseAttendance from "./CourseAttendance";

import '../assets/css/course-sub-navigation.css';


const CourseView = (props) => {
    const [isAttendanceVisible, setAttendanceVisible] = useState(false);

    const courseInfoColumns = props.courseInfoColumns;
    const columnsTitles = props.columnsTitles;
    const courseData = props.courseData.courseScore;
    const courseAttendance = props.courseData.attendance;
    const columns = props.columns;

    var courseDataRow = Object.values(courseData)[0].data[0];

    const courseScoreSections = [];
        
    for (const [sectionTitle, sectionData] of Object.entries(courseData)){
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


    return (
        <div style={{display: 'block'}} className="course-div" data-course-id={courseDataRow.course_id}>
            <h2>{courseDataRow.course_name}</h2>
            <CourseInfo courseDataRow={courseDataRow} courseInfoColumns={courseInfoColumns} columnsTitles={columnsTitles} />
            <VerticalLine />
            <div className="course-sub-nav">
                <ul>
                    <li className={isAttendanceVisible ? null : 'active'} onClick={() => setAttendanceVisible(!isAttendanceVisible)}><a>Course Score</a></li>
                    <li className={isAttendanceVisible ? 'active' : null} onClick={() => setAttendanceVisible(!isAttendanceVisible)}><a>Attendance</a></li>
                </ul>
            </div>
            
            {isAttendanceVisible ? <CourseAttendance attendance={courseAttendance} /> : courseScoreSections}
        </div>
    );
}


export default CourseView;