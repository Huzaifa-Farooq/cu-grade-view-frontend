import { Fragment } from 'react';

import '../assets/css/attendance.css';


const CourseAttendance = (props) => {
    if (props.attendance === null || props.attendance.attendanceData.length === 0){
        return <h4>No Attendance Found</h4>;
    }
    
    return (
        <Fragment>
            <h4>Attendance</h4>
            <table className='attendance-table'>
                <thead>
                    <tr>
                        <th>Topic</th>
                        <th>Attendance</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                    </tr>
                </thead>
                <tbody>
                    {props.attendance.attendanceData[0].attendance.map((row) => {
                        return (
                            <tr className={row.attended ? '' : 'absent'}>
                                <td>{row.topic}</td>
                                <td>{row.attended ? "Present" : "Absent"}</td>
                                <td className='datetime'>{row.start_time}</td>
                                <td className='datetime'>{row.end_time}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </Fragment>
    );
}

export default CourseAttendance;