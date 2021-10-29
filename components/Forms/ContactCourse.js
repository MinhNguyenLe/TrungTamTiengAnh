import React, { useEffect, useState } from "react";
import use18n from "i18n/use18n";
import debounce from "lodash.debounce";

import axios from "axios";
// components

import { useVali } from "customHook/useVali";
import { useHostAPI } from "customHook/useHostAPI";

import { useDispatch, useSelector } from "react-redux";
import { setListCourse } from "redux/actions/course";
import router from "next/router";

export default function ContactCourse({ page }) {
  const t = use18n();
  const host = useHostAPI();

  const dispatch = useDispatch();

  const level = useVali({ require: [1, 4], requireValue: 3 });
  const name = useVali({ require: [1, 4], requireValue: 3, test: 1 });
  const docs = useVali({ require: [1, 4], requireValue: 3 });
  const mems = useVali({ require: [1, 3], requireValue: 30 });
  const tuition = useVali({ require: [1, 2], requireValue: 1 });
  const infor = useVali({ require: [1, 4], requireValue: 6 });
  const begin = useVali({ require: [1], test: 1 });
  const end = useVali({ require: [1] });

  useEffect(() => {
    Promise.all([axios.get(`${host}/api/courses/${router.query.id}`)])
      .then(([res]) => {
        name.ref.current.value = res.data.name;
        level.ref.current.value = res.data.level;
        docs.ref.current.value = res.data.docs;
        infor.ref.current.value = res.data.information;
        mems.ref.current.value = res.data.members;
        tuition.ref.current.value = res.data.tuition;
        begin.ref.current.value = res.data.timeBegin.slice(0, 10);
        end.ref.current.value = res.data.timeEnd.slice(0, 10);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const createCourse = () => {
    // check error for each field
    name.checkErr();
    level.checkErr();
    docs.checkErr();
    mems.checkErr();
    tuition.checkErr();
    infor.checkErr();
    begin.checkErr();
    end.checkErr();
    if (
      name.success &&
      level.success &&
      docs.success &&
      mems.success &&
      tuition.success &&
      infor.success &&
      begin.success &&
      end.success
    ) {
      Promise.all([
        axios.post(`${host}/api/courses/create`, {
          content: {
            name: name.ref.current.value,
            information: infor.ref.current.value,
            level: level.ref.current.value,
            docs: docs.ref.current.value,
            tuition: parseInt(tuition.ref.current.value),
            members: parseInt(mems.ref.current.value),
            idClass: [],
            timeBegin: begin.ref.current.value,
            timeEnd: end.ref.current.value,
          },
        }),
      ])
        .then(([res]) => {
          dispatch(setListCourse(res.data));

          name.ref.current.value = "";
          infor.ref.current.value = "";
          level.ref.current.value = "";
          docs.ref.current.value = "";
          tuition.ref.current.value = "";
          mems.ref.current.value = "";
          begin.ref.current.value = "";
          end.ref.current.value = "";
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const editCourse = () => {
    // check error for each field
    name.checkErr();
    level.checkErr();
    docs.checkErr();
    mems.checkErr();
    tuition.checkErr();
    infor.checkErr();
    begin.checkErr();
    end.checkErr();
    if (
      name.success &&
      level.success &&
      docs.success &&
      mems.success &&
      tuition.success &&
      infor.success &&
      begin.success &&
      end.success
    ) {
      Promise.all([
        axios.post(`${host}/api/courses/edit`, {
          content: {
            id: router.query.id,
            name: name.ref.current.value,
            information: infor.ref.current.value,
            level: level.ref.current.value,
            docs: docs.ref.current.value,
            tuition: parseInt(tuition.ref.current.value),
            members: parseInt(mems.ref.current.value),
            timeBegin: begin.ref.current.value,
            timeEnd: end.ref.current.value,
          },
        }),
      ])
        .then(([res]) => {
          dispatch(setListCourse(res.data));

          name.ref.current.value = "";
          infor.ref.current.value = "";
          level.ref.current.value = "";
          docs.ref.current.value = "";
          tuition.ref.current.value = "";
          mems.ref.current.value = "";
          begin.ref.current.value = "";
          end.ref.current.value = "";
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // debounce when fill input
  const debLevel = debounce(() => {
    level.checkErr();
  }, 500);
  const debName = debounce(() => {
    name.checkErr();
  }, 500);
  const debInfor = debounce(() => {
    infor.checkErr();
  }, 500);
  const debDocs = debounce(() => {
    docs.checkErr();
  }, 500);
  const debMems = debounce(() => {
    mems.checkErr();
  }, 500);
  const debTuition = debounce(() => {
    tuition.checkErr();
  }, 500);
  const debBegin = debounce(() => {
    begin.checkErr();
  }, 500);
  const debEnd = debounce(() => {
    end.checkErr();
  }, 500);

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">
              {page === "create" ? t["1"] : t["25"]}
            </h6>
            <button
              onClick={() => {
                page === "create" ? createCourse() : editCourse();
              }}
              className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
            >
              {page === "create" ? t["2"] : t["26"]}
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
                    {t["5"]}
                  </label>
                  <input
                    onInput={() => debLevel()}
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
                    onInput={() => debDocs()}
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
                    onChange={(e) => {
                      console.log("changee date");
                      debBegin();
                    }}
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
                    onInput={() => debEnd()}
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
                    onInput={() => debMems()}
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
                    onInput={() => debTuition()}
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
                    onInput={() => debInfor()}
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
