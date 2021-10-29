import React from "react";

// components

import ContactCourse from "components/Forms/ContactCourse.js";

// layout for page

import Admin from "layouts/Admin.js";

export default function CoursesEdit() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-12/12 px-4">
          <ContactCourse page="edit" />
        </div>
      </div>
    </>
  );
}

CoursesEdit.layout = Admin;
