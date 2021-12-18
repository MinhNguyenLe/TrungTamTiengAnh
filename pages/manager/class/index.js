import { useState } from "react";
// components

import ClassList from "components/Class/ClassList.js";
import CourseForm from "components/Dialog/CourseForm";
import ClassForm from "components/Dialog/ClassForm";

import AddWithEmail from "components/Dialog/Student/AddWithEmail";

import Admin from "layouts/Admin.js";

import use18n from "i18n/use18n";
export default function Classes() {
  const t = use18n();
  const [showModalE, setShowModalE] = useState(false);
  const [addStudentModal, setAddStudentModal] = useState(false);
  const [addTeacherModal, setAddTeacherModal] = useState(false);

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-12/12 px-4">
          {showModalE ? (
            <ClassForm
              showModal={showModalE}
              setShowModal={setShowModalE}
              page="edit"
            />
          ) : null}
          {addStudentModal ? (
            <AddWithEmail
              showModal={addStudentModal}
              setShowModal={setAddStudentModal}
              role="student"
              page="all"
            />
          ) : null}
          {addTeacherModal ? (
            <AddWithEmail
              showModal={addTeacherModal}
              setShowModal={setAddTeacherModal}
              role="teacher"
              page="all"
            />
          ) : null}
        </div>
        <div className="w-full lg:w-12/12 px-4">
          <ClassList
          setAddStudentModal={setAddStudentModal}
          setAddTeacherModal={setAddTeacherModal}
            setShowModalEdit={setShowModalE}
          />
        </div>
      </div>
    </>
  );
}

Classes.layout = Admin;
