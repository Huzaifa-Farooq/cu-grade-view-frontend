import '../assets/css/profile.css';


function StudentProfile(props) {
    return (
        <div className='student-profile-div'>
            <div>
                <b>Registration Number:</b>
                <a> {props.profileData.registrationNumber}</a>
            </div>
            <div>
                <b>Student Name:</b>
                <a> {props.profileData.studentName}</a>
            </div>
        </div>
    );
}

export default StudentProfile;