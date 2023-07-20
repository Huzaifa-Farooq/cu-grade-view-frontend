import { Fragment } from "react";

function CourseInfo(props){
    const columns = props.courseInfoColumns;
    const columnsTitles = props.columnsTitles;
    const courseDataRow = props.courseDataRow;
    
    return (
        <Fragment>
            <div>
                {columns.map((column) => {
                    const key = columnsTitles[column];
                    const value = courseDataRow[column];
                    return <Fragment><span><b>{key}: </b>{value}</span><br /></Fragment>
                })
                }
            </div>
            <div>
            </div>
        </Fragment>
    );
}


export default CourseInfo;
