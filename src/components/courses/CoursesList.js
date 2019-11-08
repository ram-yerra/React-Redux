import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const CoursesList = ({ courses, onDeleteClick }) => {
  return (
    <>
      <div className="list-header">
        <div></div>
        <div>Title</div>
        <div>Author</div>
        <div>Category</div>
        <div></div>
      </div>
      {courses.map(course => (
        <div key={course.id} className="list-content">
          <div>
            <a
              className="btn btn-light"
              href={"http://pluralsight.com/courses" + course.slug}
            >
              Watch
            </a>
          </div>
          <div>
            <Link to={"/course/" + course.slug}>{course.title}</Link>
          </div>
          <div>{course.authorName}</div>
          <div>{course.category}</div>
          <div>
            <button className="btn btn-outline-danger" onClick={() => onDeleteClick(course)}>Delete</button>
          </div>
        </div>
      ))}
      ;
    </>
  );
};

CoursesList.propTypes = {
  courses: PropTypes.isRequired,
  onDeleteClick: PropTypes.func.isRequired
};

export default CoursesList;
