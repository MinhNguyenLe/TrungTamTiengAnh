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
import { setTargetClass } from "redux/actions/class";

import router from "next/router";
export default function ProgressForm({ page, setShowModal, showModal }) {
  const t = use18n();

  const dispatch = useDispatch();
  const target = useSelector((state) => state.classroom.target);

  const host = useHostAPI();

  const score = useVali({ require: [1] });
  const session = useVali({ require: [1] });

  const account = useSelector((state) => state.user.account);
  const targetStudent = useSelector((state) => state.user.targetStudent);

  const addProgressScore = () => {
    if (account.user.permission === 2) {
      Promise.all([
        axios.post(`${host}/api/classes/add-progress-score`, {
          content: {
            id: targetStudent.id,
            session: session.ref.current.value,
            score: score.ref.current.value
          }
        }),
      ])
        .then(([res]) => {
          dispatch(setTargetClass(res.data))
          setShowModal(false)
          session.ref.current.value = ''
          score.ref.current.value = ''
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  const debScore = debounce(() => {
    score.checkErr();
  }, 500);
  const debSession = debounce(() => {
    session.checkErr();
  }, 500);

  return (
    <div className="min-w-0">
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="max-w-1200 relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
              <h6 className="text-blueGray-700 text-xl font-bold">
                {t["225"]}
              </h6>
              <div>
                <button
                  onClick={addProgressScore}
                  className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  {t["230"]}
                </button>
                <button
                  onClick={() => {
                    setShowModal(false);
                  }}
                  className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  {t["59"]}
                </button>
              </div>
            </div>
          </div>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <form>
              <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                {t["231"]}
              </h6>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      {t["227"]}
                    </label>
                    <input
                      onInput={() => debSession()}
                      ref={session.ref}
                      type="number"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                    {session.error && (
                      <span className="text-red-500">{session.error}</span>
                    )}
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      {t["226"]}
                    </label>
                    <input
                      onInput={() => debScore()}
                      ref={score.ref}
                      type="number"
                      className="bo
                      rder-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                    {score.error && (
                      <span className="text-red-500">{score.error}</span>
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

ProgressForm.defaultProps = {
  page: "create",
};
