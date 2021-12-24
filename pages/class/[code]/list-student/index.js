import { useState } from "react";
// components

import StudentList from "components/Student/StudentList.js";
// layout for page

import Admin from "layouts/Admin.js";
import { useDispatch, useSelector } from "react-redux";
import use18n from "i18n/use18n";
import AddWithEmail from "components/Dialog/Student/AddWithEmail";
export default function ListStudentClass() {
  const t = use18n();
  const [showModal, setShowModal] = useState(false);
  const account = useSelector((state) => state.user.account);
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-12/12 px-4">
        {account.user.permission != 3 ? (
          <>
          <button
            className="relative bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => setShowModal(true)}
          >
            {t["91"]}
          </button>
          </>
        ):null}
          {showModal ? (
            <AddWithEmail
              showModal={showModal}
              setShowModal={setShowModal}
              role="student"
            />
          ) : null}
        </div>
        <div className="w-full lg:w-12/12 px-4">
          <StudentList />
        </div>
      </div>
    </>
  );
}

ListStudentClass.layout = Admin;
