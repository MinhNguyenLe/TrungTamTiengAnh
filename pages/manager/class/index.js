import React, { useState, useEffect } from "react";

import use18n from "i18n/use18n";

import Admin from "layouts/Admin.js";
import axios from "axios";
import { useHostAPI } from "customHook/nonReact";

import { useDispatch, useSelector } from "react-redux";
import { setListClass } from "redux/actions/Class";
export default function Class() {
  const t = use18n();
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();

  const host = useHostAPI();
  // useEffect(() => {
  //   Promise.all([axios.get(`${host}/api/Classs`)])
  //     .then(([res]) => {
  //       dispatch(setListClass(res.data));
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-6/12 px-4">
          <button
            className="relative bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => setShowModal(true)}
          >
            {t["58"]}
          </button>
        </div>
        <div className="w-full lg:w-12/12 px-4"></div>
      </div>
    </>
  );
}

Class.layout = Admin;
