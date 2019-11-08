import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

import { loadCourses, saveCourse } from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorActions";

import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";

import Spinner from "../common/spinner/Spinner";
import { toast } from "react-toastify";

const ManageCoursePage = ({
  courses,
  authors,
  loadCourses,
  saveCourse,
  loadAuthors,
  history,
  ...props
}) => {
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch(error => {
        console.log("Failed to load courses:" + error);
      });
    } else {
      setCourse({ ...props.course });
    }

    if (authors.length === 0) {
      loadAuthors().catch(error => {
        console.log("Failed to load authors:" + error);
      });
    }
  }, [props.course]);

  function handleChange(event) {
    const { name, value } = event.target;
    setCourse(prevCourse => ({
      ...prevCourse,
      [name]: name === "authorId" ? parseInt(value, 10) : value
    }));
  }

  function isFormValid() {
      const { title, authorId, category } = course;
      const errors = {};
      if(!title) errors.title = "Title is required.";
      if(!authorId) errors.author = "Author is required.";
      if(!category) errors.category = "Category is required.";
      setErrors(errors);
      return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if(!isFormValid()) return;
    setSaving(true);
    saveCourse(course)
      .then(() => {
        toast.success("Successfully saved course!");
        history.push("/courses");
      })
      .catch(error => {
        setSaving(false);
        console.log("Failed");
        setErrors({ onSave: error.message });
      });
  }

  return courses.length === 0 || authors.length === 0 ? (
    <Spinner />
  ) : (
    <CourseForm
      course={course}
      errors={errors}
      authors={authors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    ></CourseForm>
  );
};

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export function getCoursesBySlug(courses, slug) {
  return courses.find(course => course.slug === slug) || null;
}

function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  const course =
    slug && state.courses ? getCoursesBySlug(state.courses, slug) : newCourse;
  return {
    course,
    courses: state.courses,
    authors: state.authors
  };
}

const mapDispatchToProps = {
  loadCourses,
  loadAuthors,
  saveCourse
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageCoursePage);
