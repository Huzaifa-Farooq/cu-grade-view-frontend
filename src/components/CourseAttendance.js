import { Fragment } from 'react';

import '../assets/css/attendance.css';
import VerticalLine from './VerticalLine';


const CourseSectionAttendance = (props) => {
    const attendanceData = props.attendanceData;
    const total = attendanceData.total;
    const present = attendanceData.present;
    const absent = attendanceData.absent;
    // percentage upto 2 decimals
    const percentage = Math.round(((present / total) * 100));
    const is_short = percentage < 85;

    const attendanceDivStyle = props.length === 1 ? { width: '60%' } : {};
    const colSpan = props.length === 1 ? 8 : 6;

    return (
        <div className={`col-md-${colSpan}`}>
            <div className='attendance-table-div'>
                <h3>{attendanceData.attendanceType}</h3>
                <VerticalLine width='100%' />
                <div className='attendance-overview'>
                    <div>
                        <span><b>Total: </b>{total}</span><br />
                        <span><b>Present: </b>{present}</span><br />
                        <span><b>Absent: </b>{absent}</span><br />
                    </div>
                    <div>
                        <span className={is_short ? 'short' : ''}><b>Percentage: </b>{percentage}%</span><br />
                    </div>
                </div>
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
                        {attendanceData.attendance.map((row) => {
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
            </div>

        </div>
    );
};


const CourseAttendance = (props) => {
    if (props.attendance === null || props.attendance.attendanceData.length === 0) {
        return <h4>No Attendance Found</h4>;
    }

    return (
        <Fragment>
            <h3>Attendance</h3>


            <div className='attendance-container row'>
                {
                    // mapping with index
                    props.attendance.attendanceData.map((attendanceData, index) => {
                        return <CourseSectionAttendance
                            length={props.attendance.attendanceData.length}
                            attendanceData={attendanceData}
                        />;
                    })
                }
            </div>

        </Fragment>
    );
};

export default CourseAttendance;