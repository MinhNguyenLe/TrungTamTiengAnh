import React, { useRef, useState } from "react";
import use18n from "i18n/use18n";
import debounce from "lodash.debounce";

import axios from "axios";
// components

import { useVali } from "customHook/useVali";

export default function AddClass() {
  const t = use18n();

  const name = useVali({ require: [1, 4], requireValue: 3 });
  const level = useVali({ require: [1, 4], requireValue: 3 });
  const docs = useVali({ require: [1, 4], requireValue: 3 });
  const mems = useVali({ require: [1, 3], requireValue: 30 });
  const tuition = useVali({ require: [1, 2], requireValue: 1 });
  const infor = useVali({ require: [1, 4], requireValue: 6 });
  const begin = useVali({ require: [1] });
  const end = useVali({ require: [1] });

  const createCourse = () => {
    deb();
    console.log(begin.ref.current?.value);
  };

  const deb = debounce(() => {
    name.checkErr();
    level.checkErr();
    docs.checkErr();
    mems.checkErr();
    tuition.checkErr();
    infor.checkErr();
    begin.checkErr();
    end.checkErr();
  }, 1000);

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">{t["1"]}</h6>
            <button
              onClick={() => {
                createCourse();
              }}
              className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
            >
              {t["2"]}
            </button>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              {t["3"]}
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    {t["7"]}
                  </label>
                  <input
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
                    {t["5"]}
                  </label>
                  <input
                    ref={level.ref}
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                  {level.error && (
                    <span className="text-red-500">{level.error}</span>
                  )}
                </div>
              </div>
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    {t["6"]}
                  </label>
                  <input
                    ref={docs.ref}
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                  {docs.error && (
                    <span className="text-red-500">{docs.error}</span>
                  )}
                </div>
              </div>
              <div className="w-full lg:w-3/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    {t["8"]}
                  </label>
                  <input
                    ref={begin.ref}
                    type="date"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                  {begin.error && (
                    <span className="text-red-500">{begin.error}</span>
                  )}
                </div>
              </div>
              <div className="w-full lg:w-3/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    {t["9"]}
                  </label>
                  <input
                    ref={end.ref}
                    type="date"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                  {end.error && (
                    <span className="text-red-500">{end.error}</span>
                  )}
                </div>
              </div>
              <div className="w-full lg:w-3/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    {t["10"]}
                  </label>
                  <input
                    ref={mems.ref}
                    type="number"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                  {mems.error && (
                    <span className="text-red-500">{mems.error}</span>
                  )}
                </div>
              </div>
              <div className="w-full lg:w-3/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    {t["11"]}
                  </label>
                  <input
                    ref={tuition.ref}
                    type="number"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                  {tuition.error && (
                    <span className="text-red-500">{tuition.error}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    {t["4"]}
                  </label>
                  <textarea
                    ref={infor.ref}
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    rows="4"
                  ></textarea>
                  {infor.error && (
                    <span className="text-red-500">{infor.error}</span>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
