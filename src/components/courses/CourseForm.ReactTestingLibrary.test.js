import React from "react";
import { cleanup, render } from "react-testing-library";
import CourseForm from "./CourseForm";

afterEach(cleanup);

function renderCourseForm(args) {
    let defaultProps = {
        authors: [],
        course: {},
        saving: false,
        errors: {},
        onSave: () => {},
        onChange: () => {}
    };

    const props = { ...defaultProps, ...args };
    return render(<CourseForm {...props} />);
}

it('should render Add Course header', () => {
    const { getByText } = renderCourseForm();
    getByText('Add Course');
});

it('button label should be save when save button is not clicked', () => {
    const { getByText } = renderCourseForm();
    getByText('Save');
});

it('button label should be saving when save button is clicked', () => {
    const { getByText } = renderCourseForm({saving: true});
    getByText('Saving...');
});

