import React, { useEffect, useState } from "react";
import use18n from "i18n/use18n";
import debounce from "lodash.debounce";
import { useRouter } from "next/router";

import axios from "axios";
// components

import { useHostAPI } from "customHook/nonReact";

import { useDispatch, useSelector } from "react-redux";

import Field from "../../Quizzes/Field"
import { setListRef, resetRef } from "redux/actions/quizzes";

export default function Quizzes({ type, setShowModal, showModal }) {
  const t = use18n();
  const host = useHostAPI();
  const [list, setList] = useState([])
  const router = useRouter();

  const refs = useSelector((state) => state.quizzes.refs);

  const teacherClass = useSelector((state) => state.user.account.teacherClass);
  const studentClass = useSelector((state) => state.user.account.studentClass);
  const permission = useSelector((state) => state.user.account.user.permission);

  useEffect(() => {
    const result = []
    for (let i = 0; i < 20; i++) {
      result.push("0")
    }
    setList(result)
    dispatch(setListRef(result))
  }, [])

  const dispatch = useDispatch();

  const saveQuizzes = () => {
    if (permission === 2) {
      [...teacherClass].forEach((item, index, array) => {
        if (item.classes.code === router.query.code) {
          Promise.all([
            axios.post(`${host}/api/classes/create-multi-choice/teacher`, {
              content: {
                id: item.id,
                content: refs
              }
            }),
          ])
            .then(([res]) => {
              array.length = 0
              setShowModal(false);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
    }
    if (permission === 3) {
      [...studentClass].forEach((item, index, array) => {
        if (item.classes.code === router.query.code) {
          Promise.all([
            axios.post(`${host}/api/classes/create-multi-choice/student`, {
              content: {
                id: item.id,
                content: refs
              }
            }),
          ])
            .then(([res]) => {
              array.length = 0
              setShowModal(false);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
    }
    dispatch(setListRef())
  }
  return (
    <div className="min-w-0">
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="max-w-1200 relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
              <h6 className="text-blueGray-700 text-xl font-bold">
                {t["202"]}
              </h6>
              <div>
                <button
                  className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={saveQuizzes}
                >
                  {t["205"]}
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
                {type === "teacher" ? t["204"] : t["203"]}
              </h6>
              <div className="flex flex-wrap">
                {list.map((item, index) => (
                  <div className="w-full lg:w-4/12 px-4">
                    <div className="relative w-full mb-3 flex" style={{ alignItems: "center" }}>
                      <span style={{ marginRight: "12px" }}>{`${index}.`}</span>
                      <Field text="text" index={index} />
                    </div>
                  </div>
                ))}
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
}
