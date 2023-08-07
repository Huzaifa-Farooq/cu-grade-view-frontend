import CourseScoreTable from "./CourseScoreTable";


function CourseScoreSection(props) {
    const sectionTitle = props.sectionTitle;
    const columns = props.columns;
    const columnsTitles = props.columnsTitles;
    const courseScoreSectionData = props.data;

    const totalMarks = courseScoreSectionData.totalMarks;
    const obtMarks = courseScoreSectionData.marks;
    const percentage = courseScoreSectionData.percentage;


    return (
        <div>
            <h3>{sectionTitle} ({percentage}%)</h3>
            <CourseScoreTable columns={columns} columnsTitles={columnsTitles} data={courseScoreSectionData.data} />
        </div>
    );
}

export default CourseScoreSection;
