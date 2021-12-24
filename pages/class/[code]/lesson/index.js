import { useState } from "react";
// components

import StudentList from "components/Student/StudentList.js";
// layout for page

import Admin from "layouts/Admin.js";

import use18n from "i18n/use18n";
import AddWithEmail from "components/Dialog/Student/AddWithEmail";
export default function Lesson() {
  const t = use18n();
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className="flex flex-wrap">
        
      </div>
    </>
  );
}

Lesson.layout = Admin;
