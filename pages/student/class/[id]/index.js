import { useState } from "react";
// components

import CourseList from "components/Course/CourseList.js";
import CourseForm from "components/Dialog/CourseForm";
import ClassForm from "components/Dialog/ClassForm";
// layout for page

import Admin from "layouts/Admin.js";

import use18n from "i18n/use18n";
export default function StudentClass() {
  const t = use18n();

  const [showModal, setShowModal] = useState(false);
  const [showModalE, setShowModalE] = useState(false);
  const [showModalAddClass, setShowModalAddClass] = useState(false);

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-12/12 px-4">
          <button
            className="relative bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => setShowModal(true)}
          >
            Add new course
          </button>
          {showModal ? (
            <CourseForm
              showModal={showModal}
              setShowModal={setShowModal}
              page="create"
            />
          ) : null}
          {showModalE ? (
            <CourseForm
              showModal={showModalE}
              setShowModal={setShowModalE}
              page="edit"
            />
          ) : null}
          {showModalAddClass ? (
            <ClassForm
              showModal={showModalAddClass}
              setShowModal={setShowModalAddClass}
              page="create"
            />
          ) : null}
        </div>
        <div className="w-full lg:w-12/12 px-4">
          <CourseList
            setShowModalEdit={setShowModalE}
            setShowModalAddClass={setShowModalAddClass}
          />
        </div>
      </div>
    </>
  );
}

StudentClass.layout = Admin;
