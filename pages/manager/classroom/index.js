import React, { useState, useEffect } from "react";

// components

import ClassRoomForm from "components/Dialog/ClassRoomForm";
import ClassRoomList from "components/ClassRoom/ClassRoomList.js";

import use18n from "i18n/use18n";

import Admin from "layouts/Admin.js";
import axios from "axios";
import { useHostAPI } from "customHook/nonReact";

import { useDispatch, useSelector } from "react-redux";
import { setListClassroom } from "redux/actions/classroom";
export default function ClassRoom() {
  const t = use18n();
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();

  const host = useHostAPI();
  useEffect(() => {
    Promise.all([axios.get(`${host}/api/classrooms`)])
      .then(([res]) => {
        dispatch(setListClassroom(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
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
          {showModal ? (
            <ClassRoomForm
              page="create"
              setShowModal={setShowModal}
              showModal={showModal}
            />
          ) : null}
        </div>
        <div className="w-full lg:w-12/12 px-4">
          <ClassRoomList />
        </div>
      </div>
    </>
  );
}

ClassRoom.layout = Admin;
