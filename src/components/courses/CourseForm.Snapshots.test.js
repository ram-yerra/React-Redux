import React from "react";
import CourseForm from "./CourseForm";
import renderer from "react-test-renderer";
import { courses, authors } from "../../../tools/mockData";

it("should be able to set button label to saving when save button is clicked", () => {
    const tree = renderer.create(<CourseForm 
        course={courses[0]} 
        authors={authors} 
        onSave={jest.fn()} 
        onChange={jest.fn()} 
        saving />);
    expect(tree).toMatchSnapshot();
});

it("should be able to set button label to save when save button is not yet clicked", () => {
    const tree = renderer.create(<CourseForm 
        course={courses[0]} 
        authors={authors} 
        onSave={jest.fn()} 
        onChange={jest.fn()} 
        saving={false} />);
    expect(tree).toMatchSnapshot();
});