import { useState } from "react";

import ResultList from "components/Result/ResultList.js";
import axios from "axios";
import { useHostAPI } from "customHook/nonReact";

import Admin from "layouts/Admin.js";
import { useDispatch, useSelector } from "react-redux";
import { setTargetClass } from "redux/actions/class";

import use18n from "i18n/use18n";
import AddWithEmail from "components/Dialog/Student/AddWithEmail";

export default function ResultClass() {
  const t = use18n();
  const host = useHostAPI();

  const dispatch = useDispatch()

  const account = useSelector((state) => state.user.account);

  const autoCreateScoreQuizzes = () => {
    if (account.user.permission === 2) {
      Promise.all([
        axios.post(`${host}/api/classes/auto-quizzes-score`, {
          idSolution: account.teacherClass[0].id
        }),
      ])
        .then(([res]) => {
          console.log(res.data)
          dispatch(setTargetClass(res.data))
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-12/12 px-4">
          {
            account.user.permission === 2 ? (
              <button
                onClick={autoCreateScoreQuizzes}
                className="relative bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                {t["218"]}
              </button>
            ) : null
          }
        </div>
        <div className="w-full lg:w-12/12 px-4">
          <ResultList />
        </div>
      </div>
    </>
  );
}

ResultClass.layout = Admin;
