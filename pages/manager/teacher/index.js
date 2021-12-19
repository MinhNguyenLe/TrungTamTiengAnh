import { useState } from "react";
import AllTeacher from "components/teacher/AllTeacher.js";
import UserRegisterForm from "components/Dialog/User/UserRegisterForm";

import Admin from "layouts/Admin.js";

import use18n from "i18n/use18n";
export default function Teacher() {
  const t = use18n();

  const [addNew, setAddNew] = useState(false);

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-12/12 px-4">
        <button
        onClick={()=> setAddNew(true)}
        className="relative bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
      >
        {t["175"]}
      </button>
          {addNew ? (
            <UserRegisterForm
              showModal={addNew}
              setShowModal={setAddNew}
            />
          ) : null}
        </div>
        <div className="w-full lg:w-12/12 px-4">
          <AllTeacher />
        </div>
      </div>
    </>
  );
}

Teacher.layout = Admin;
