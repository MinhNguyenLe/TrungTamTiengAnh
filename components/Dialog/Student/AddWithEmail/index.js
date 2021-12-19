import React, { useEffect, useState } from "react";
import use18n from "i18n/use18n";
import debounce from "lodash.debounce";

import axios from "axios";
// components

import { useVali } from "customHook/useVali";
import { useHostAPI } from "customHook/nonReact";

import { useDispatch, useSelector } from "react-redux";
import { setListClass, setTargetClass } from "redux/actions/class";

import router, { useRouter } from "next/router";
export default function AddWithEmail({ page, role, setShowModal, showModal }) {
  const t = use18n();
  const router = useRouter();
  const dispatch = useDispatch();
  const target = useSelector((state) => state.class.target);

  const host = useHostAPI();

  const email = useVali({ require: [1] });
  const wage = useVali({ require: [1] });
  const bonus = useVali({ require: [1] });


  const addWithRole = () => {
    // check error for each field
    email.checkErr();
    console.log(email.success);
    if (email.success) {
      if (role === "student" && page === "one") {
        Promise.all([
          axios.post(`${host}/api/classes/create-student-class`, {
            content: {
              email: email.ref.current.value,
              code: target.code,
              isPaid: false,
            },
          }),
        ])
          .then(([res]) => {
            dispatch(setTargetClass(res.data));
            setShowModal(false);
            email.ref.current.value = "";
          })
          .catch((err) => {
            console.log(err);
          });
      }
      if (role === "student" && page === "all") {
        Promise.all([
          axios.post(`${host}/api/classes/create-student-class/all`, {
            content: {
              email: email.ref.current.value,
              code: target.code,
              isPaid: false,
            },
          }),
        ])
          .then(([res]) => {
            dispatch(setListClass(res.data));
            setShowModal(false);
            email.ref.current.value = "";
          })
          .catch((err) => {
            console.log(err);
          });
      }
      if (role === "teacher" && wage.success && bonus.success) {
        Promise.all([
          axios.post(`${host}/api/classes/create-teacher-class`, {
            content: {
              email: email.ref.current.value,
              code: target.code,
              isPaid: false,
              wage: parseFloat(wage.ref.current.value),
              bonus: parseFloat(bonus.ref.current.value),
            },
          }),
        ])
          .then(([res]) => {
            dispatch(setListClass(res.data));
            setShowModal(false);
            email.ref.current.value = "";
            wage.ref.current.value = "";
            bonus.ref.current.value = ""
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  // debounce when fill input
  const debEmail = debounce(() => {
    email.checkErr();
  }, 500);

  const debWage = debounce(() => {
    wage.checkErr();
  }, 500);

  const debBonus = debounce(() => {
    bonus.checkErr();
  }, 500);

  return (
    <div className="min-w-0">
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="max-w-580-px relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
              <h6 className="text-blueGray-700 text-xl font-bold">{role === "student" ? t["91"] : t["132"]}</h6>
              <div>
                <button
                  onClick={addWithRole}
                  className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  {t["93"]}
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
                {role === "student" ? t["92"] : t["133"]}
              </h6>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-12/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      {role === "student" ? t["95"] : t["134"]}
                    </label>
                    <input
                      onInput={() => debEmail()}
                      ref={email.ref}
                      type="email"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                    {email.error && (
                      <span className="text-red-500">{email.error}</span>
                    )}
                  </div>
                  {
                    role === "teacher" ?
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          {t["135"]}
                        </label>
                        <input
                          onInput={() => debWage()}
                          ref={wage.ref}
                          type="number"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        />
                        {wage.error && (
                          <span className="text-red-500">{wage.error}</span>
                        )}
                      </div>
                      : null
                  }
                  {
                    role === "teacher" ?
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          {t["136"]}
                        </label>
                        <input
                          onInput={() => debBonus()}
                          ref={bonus.ref}
                          type="number"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        />
                        {bonus.error && (
                          <span className="text-red-500">{bonus.error}</span>
                        )}
                      </div>
                      : null
                  }
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

AddWithEmail.defaultProps = {
  role: "student",
  page: "one"
};
