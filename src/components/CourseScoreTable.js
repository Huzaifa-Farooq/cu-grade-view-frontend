import React from 'react';


function CourseScoreTable(props) {
    const columns = props.columns.filter((column) => column !== 'section_title');
    const columnsTitles = props.columnsTitles;
    const courseScoreTableData = props.data;

    return (
        <div className='col-md-5 col-sm-10'>

            <table style={{ width: '100%' }}>
                <CourseScoreTableHeader columns={columns} columnsTitles={columnsTitles} />
                <tbody>
                    {
                        courseScoreTableData.map(
                            (rowData, index) => <CourseScoreTableRow key={index} columns={columns} rowData={rowData} />)
                    }
                </tbody>
            </table>
        </div>
    );
}


function CourseScoreTableHeader(props) {
    return (
        <thead>
            <tr>
                {
                    props.columns.map((column) => <th>{props.columnsTitles[column]}</th>)
                }
            </tr>
        </thead>
    );
}


function CourseScoreTableRow(props) {
    return (
        <tr>
            {
                props.columns.map((column) => <td>{props.rowData[column]}</td>)
            }
        </tr>
    );
}

export default CourseScoreTable;