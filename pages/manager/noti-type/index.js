import React, { useState, useEffect } from "react";

// components

import NotiTypeForm from "components/Dialog/NotiTypeForm";
import ListNotiType from "components/NotiType/ListNotiType";
import use18n from "i18n/use18n";

import Admin from "layouts/Admin.js";
import axios from "axios";
import { useHostAPI } from "customHook/nonReact";

import { useDispatch, useSelector } from "react-redux";
import { setListNotiType } from "redux/actions/notiType";
export default function NotiType() {
  const t = use18n();
  const [showModal, setShowModal] = useState(false);
  const [showModalE, setShowModalE] = useState(false);
  const dispatch = useDispatch();

  const host = useHostAPI();
  useEffect(() => {
    Promise.all([axios.get(`${host}/api/noti-type`)])
      .then(([res]) => {
        dispatch(setListNotiType(res.data));
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
            {t["106"]}
          </button>
          {showModal ? (
            <NotiTypeForm
              page="create"
              setShowModal={setShowModal}
              showModal={showModal}
            />
          ) : null}
          {showModalE ? (
            <NotiTypeForm
              page="edit"
              setShowModal={setShowModalE}
              showModal={showModalE}
            />
          ) : null}
        </div>
        <div className="w-full lg:w-12/12 px-4">
          <ListNotiType setShowModal={setShowModalE} />
        </div>
      </div>
    </>
  );
}

NotiType.layout = Admin;
