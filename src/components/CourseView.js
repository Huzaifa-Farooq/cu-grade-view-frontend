import { Fragment } from "react";
import React from "react";

import CourseInfo from "./CourseInfo";
import CourseScoreSection from "./CourseScoreSection";
import VerticalLine from "./VerticalLine";


class CourseView extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            isVisible: true
        }
    }

    render() {
        const courseInfoColumns = this.props.courseInfoColumns;
        const columnsTitles = this.props.columnsTitles;
        const courseData = this.props.courseData;
        const columns = this.props.columns;

        var courseDataRow = Object.values(courseData)[0].data[0];
        const displayStyle = this.state.isVisible ? 'block' : 'none';

        const courseSections = [];
        for (const [sectionTitle, sectionData] of Object.entries(courseData)){
            courseSections.push(
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
            <div style={{display: displayStyle}} className="course-div" data-course-id={courseDataRow.course_id}>
                <h2>{courseDataRow.course_name}</h2>
                <CourseInfo courseDataRow={courseDataRow} courseInfoColumns={courseInfoColumns} columnsTitles={columnsTitles} />
                <VerticalLine />
                {courseSections}
            </div>
        );
    }
}


export default CourseView;