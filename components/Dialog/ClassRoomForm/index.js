import React, { useEffect, useState } from "react";
import use18n from "i18n/use18n";
import debounce from "lodash.debounce";

import axios from "axios";
// components

import { useVali } from "customHook/useVali";
import { useHostAPI } from "customHook/nonReact";

import { useDispatch, useSelector } from "react-redux";
import { setListCourse } from "redux/actions/course";
import { setListClassroom } from "redux/actions/classroom";

import router from "next/router";
export default function ClassRoomForm({ page, setShowModal, showModal }) {
  const t = use18n();

  const dispatch = useDispatch();
  const targetCourse = useSelector((state) => state.course.target);

  const host = useHostAPI();

  const address = useVali({ require: [1] });
  const name = useVali({ require: [1] });

  const createClassRoom = () => {
    // check error for each field
    name.checkErr();
    address.checkErr();
    if (name.success && address.success) {
      Promise.all([
        axios.post(`${host}/api/classrooms/create`, {
          content: {
            name: name.ref.current.value,
            address: address.ref.current.value,
          },
        }),
      ])
        .then(([res]) => {
          dispatch(setListClassroom(res.data));
          name.ref.current.value = "";
          address.ref.current.value = "";

          setShowModal(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const editCourse = () => {
    // check error for each field
    name.checkErr();
    address.checkErr();

    if (name.success && address.success) {
      Promise.all([
        axios.post(`${host}/api/courses/edit`, {
          content: {
            id: router.query.id,
            name: name.ref.current.value,
            address: address.ref.current.value,
          },
        }),
      ])
        .then(([res]) => {
          dispatch(setListCourse(res.data));
          name.ref.current.value = "";
          address.ref.current.value = "";
          setShowModal(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // debounce when fill input
  const debAddress = debounce(() => {
    address.checkErr();
  }, 500);
  const debName = debounce(() => {
    name.checkErr();
  }, 500);

  return (
    <div className="min-w-0">
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="max-w-1200 relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
              <h6 className="text-blueGray-700 text-xl font-bold">
                {page === "create" ? t["64"] : t["65"]}
              </h6>
              <div>
                <button
                  onClick={() => {
                    page === "create" ? createClassRoom() : editCourse();
                  }}
                  className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  {page === "create" ? t["67"] : t["65"]}
                </button>
                <button
                  onClick={() => {
                    setShowModal(false);
                  }}
                  className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  {page === "create" ? t["59"] : t["66"]}
                </button>
              </div>
            </div>
          </div>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <form>
              <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                {t["61"]}
              </h6>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      {t["62"]}
                    </label>
                    <input
                      onInput={() => debName()}
                      ref={name.ref}
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                    {name.error && (
                      <span className="text-red-500">{name.error}</span>
                    )}
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      {t["63"]}
                    </label>
                    <input
                      onInput={() => debAddress()}
                      ref={address.ref}
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                    {address.error && (
                      <span className="text-red-500">{address.error}</span>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
}

ClassRoomForm.defaultProps = {
  page: "create",
};
