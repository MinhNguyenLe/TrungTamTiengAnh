import { Fragment, useRef, useState } from "react";
// components

import ContactCourse from "components/Forms/ContactCourse.js";
import CourseList from "components/Course/CourseList.js";
import CourseForm from "components/Dialog/CourseForm";

// layout for page

import Admin from "layouts/Admin.js";

import use18n from "i18n/use18n";
export default function Courses() {
  const t = use18n();
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-12/12 px-4">
          <CourseForm page="create" />
        </div>
        <div className="w-full lg:w-12/12 px-4">
          <CourseList />
        </div>
      </div>
    </>
  );
}

Courses.layout = Admin;
