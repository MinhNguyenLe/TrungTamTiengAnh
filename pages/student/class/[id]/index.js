import { useState } from "react";

import ListNoti from "components/Noti/ListNoti";

import ClassLayout from "layouts/ClassLayout.js";

import use18n from "i18n/use18n";
export default function StudentClass() {
  const t = use18n();

  const [showModal, setShowModal] = useState(false);
  const [showModalE, setShowModalE] = useState(false);
  const [showModalAddClass, setShowModalAddClass] = useState(false);

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-12/12 px-4 mb-6">
          <ListNoti />
        </div>
        <div className="w-full lg:w-12/12 px-4">LAYOUT</div>
      </div>
    </>
  );
}

StudentClass.layout = ClassLayout;
