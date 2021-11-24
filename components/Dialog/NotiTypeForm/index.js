import React, { useEffect, useState } from "react";
import use18n from "i18n/use18n";
import debounce from "lodash.debounce";

import axios from "axios";
// components

import { useVali } from "customHook/useVali";
import { useHostAPI } from "customHook/nonReact";

import { useDispatch, useSelector } from "react-redux";
import { setTargetNotiType, setListNotiType } from "redux/actions/notiType";

import router, { useRouter } from "next/router";
export default function NotiTypeForm({ page, setShowModal, showModal }) {
  const t = use18n();
  const router = useRouter();
  const dispatch = useDispatch();
  const target = useSelector((state) => state.notiType.target);

  const host = useHostAPI();

  const name = useVali({ require: [1] });

  useEffect(() => {
    if (page === "edit") {
      Promise.all([axios.get(`${host}/api/noti-type/${target}`)])
        .then(([res]) => {
          name.ref.current.value = res.data.name;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const addNotiType = () => {
    // check error for each field
    name.checkErr();
    console.log(name.success, router.query.code);
    if (name.success) {
      Promise.all([
        axios.post(`${host}/api/noti-type/create`, {
          content: {
            name: name.ref.current.value,
          },
        }),
      ])
        .then(([res]) => {
          dispatch(setListNotiType(res.data));
          name.ref.current.value = "";
          setShowModal(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const editNotiType = () => {
    name.checkErr();
    console.log(name.success, router.query.code);
    if (name.success) {
      Promise.all([
        axios.post(`${host}/api/noti-type/edit`, {
          content: {
            name: name.ref.current.value,
            id: target,
          },
        }),
      ])
        .then(([res]) => {
          dispatch(setListNotiType(res.data));
          name.ref.current.value = "";
          setShowModal(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // debounce when fill input
  const debName = debounce(() => {
    name.checkErr();
  }, 500);

  return (
    <div className="min-w-0">
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="max-w-580-px relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
              <h6 className="text-blueGray-700 text-xl font-bold">
                {page === "create" ? t["106"] : t["114"]}
              </h6>
              <div>
                <button
                  onClick={page === "create" ? addNotiType : editNotiType}
                  className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  {page === "create" ? t["93"] : t["113"]}
                </button>
                <button
                  onClick={() => {
                    setShowModal(false);
                  }}
                  className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  {t["94"]}
                </button>
              </div>
            </div>
          </div>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <form>
              <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                {t["107"]}
              </h6>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-12/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      {t["108"]}
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
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
}

NotiTypeForm.defaultProps = {
  page: "create",
};
