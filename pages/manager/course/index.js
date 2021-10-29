import React from "react";

// components

import ContactCourse from "components/Forms/ContactCourse.js";
import ClassList from "components/Course/CourseList.js";

// layout for page

import Admin from "layouts/Admin.js";

import use18n from "i18n/use18n";
export default function Courses() {
  const t = use18n();
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-12/12 px-4">
          <ContactCourse page={t["33"]} />
        </div>
        <div className="w-full lg:w-12/12 px-4">
          <ClassList />
        </div>
      </div>
    </>
  );
}

Courses.layout = Admin;
