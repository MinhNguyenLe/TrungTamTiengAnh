import React from "react";

// components

import AddClass from "components/Forms/AddCourse.js";
import ClassList from "components/Course/CourseList.js";

// layout for page

import Admin from "layouts/Admin.js";

export default function Classes() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-12/12 px-4">
          <AddClass />
        </div>
        <div className="w-full lg:w-12/12 px-4">
          <ClassList />
        </div>
      </div>
    </>
  );
}

Classes.layout = Admin;
