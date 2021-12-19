import { useState } from "react";
import AllStudent from "components/Student/AllStudent.js";
// import ClassForm from "components/Dialog/ClassForm";

import Admin from "layouts/Admin.js";

import use18n from "i18n/use18n";
export default function Student() {
  const t = use18n();

  // const [showModalAddClass, setShowModalAddClass] = useState(false);

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-12/12 px-4">
        { 
          // {showModalAddClass ? (
          //   <ClassForm
          //     showModal={showModalAddClass}
          //     setShowModal={setShowModalAddClass}
          //     page="create"
          //   />
          // ) : null}
            }
        </div>
        <div className="w-full lg:w-12/12 px-4">
          <AllStudent />
        </div>
      </div>
    </>
  );
}

Student.layout = Admin;
