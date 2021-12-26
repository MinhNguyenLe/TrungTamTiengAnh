import { useState } from "react";

import ProgressList from "components/Progress/ProgressList.js";

import Admin from "layouts/Admin.js";
import { useDispatch, useSelector } from "react-redux";

import use18n from "i18n/use18n";

export default function ProgressClass() {
  const t = use18n();
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-12/12 px-4">

        </div>
        <div className="w-full lg:w-12/12 px-4">
          <ProgressList />
        </div>
      </div>
    </>
  );
}

ProgressClass.layout = Admin;
