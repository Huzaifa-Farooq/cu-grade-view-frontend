import React from "react";


class CoursesNavigation extends React.Component{
    constructor(props){
        super(props);
        
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleCourseButtonClick = this.handleCourseButtonClick.bind(this);
    }

    handleFormSubmit(e){
        e.preventDefault();
    }

    handleCourseButtonClick(e){
        const courseId = e.target.getAttribute("data-course-id");
        this.props.handleCourseVisibility(courseId);
    }

    render() {
        const courseIds = this.props.courseIds;
        const currentCourseId = this.props.currentCourseId;

        return (
            <form id="form" onSubmit={this.handleFormSubmit}>
                <div id="buttons-container">
                    {
                        courseIds.map((courseId) => {
                            return (
                                <button 
                                    disabled={currentCourseId === courseId}
                                    onClick={this.handleCourseButtonClick} 
                                    className="button" 
                                    data-course-id={courseId}
                                >
                                    {courseId}
                                </button>
                                )
                        })
                    }
                </div>
            </form>
        );
    }
}

export default CoursesNavigation;
