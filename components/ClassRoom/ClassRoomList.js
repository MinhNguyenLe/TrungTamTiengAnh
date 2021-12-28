import React, { useState } from "react";

import use18n from "i18n/use18n";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

import axios from "axios";
import { useHostAPI } from "customHook/nonReact";

import { setListClassroom, setTargetClassRoom } from "redux/actions/classroom";
import TimeTableForm from "components/Dialog/TimeTableForm";
export default function ClassRoomList({ setShowModal }) {
  const t = use18n();
  const dispatch = useDispatch();
  const classrooms = useSelector((state) => state.classroom.list);

  const host = useHostAPI();

  const deleteClassroom = (id) => {
    Promise.all([axios.delete(`${host}/api/classrooms/${id}`)])
      .then(([res]) => {
        dispatch(setListClassroom(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const editClassroom = (id) => {
    dispatch(setTargetClassRoom(id));
    setShowModal(true);
  };
  const [showModalT, setShowModalT] = useState(false);
  const addTimeTable = (id) => {
    dispatch(setTargetClassRoom(id));
    setShowModalT(true);
  };
  
  const deleteTimetable = (id) => {
    Promise.all([axios.delete(`${host}/api/classrooms/delete-timetable/${id}`)])
      .then(([res]) => {
        dispatch(setListClassroom(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
    {showModalT ? (
            <TimeTableForm
              page="create"
              setShowModal={setShowModalT}
              showModal={showModalT}
            />
          ) : null}
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-blueGray-700">
                {t["40"]}
              </h3>
            </div>
            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
              <button
                className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                {t["41"]}
              </button>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  {t["42"]}
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  {t["43"]}
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  {t["69"]}
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  {t["48"]}
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  {t["46"]}
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  {t["45"]}
                </th>
              </tr>
            </thead>
            <tbody>
              {classrooms
                ? classrooms.map((item, index) => (
                  <tr key={`12345d${index}`}>
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                      {item.name}
                    </th>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {item.address}
                    </td>
                    <td
                      style={{ display: "flex", flexDirection: "column" }}
                      className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                    >
                      {item?.timetable?.length
                        ? item?.timetable?.map((i) => (
                          <button
                            style={{
                              cursor: "default",
                              display: "flex",
                              justifyContent: "space-between",
                              width: "66%",
                              alignItems: "center",
                            }}
                            className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            key={`${i.id}listtimetableclassroom`}
                          >
                            {i.begin}:{i.end}
                            <i
                              onClick={() => deleteTimetable(i.id)}
                              style={{ cursor: "pointer" }}
                              className="far fa-trash-alt text-sm"
                            ></i>
                          </button>
                        ))
                        : null}
                    </td>
                    {/* <th className="text-teal-500 border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                      <Link href="/">{t["24"]}</Link>
                    </th> */}
                    <th
                      onClick={() => addTimeTable(item.id)}
                      className="cursor-pointer text-teal-500 border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left"
                    >
                      {t["24"]}
                    </th>
                    <th
                      onClick={() => editClassroom(item.id)}
                      className="cursor-pointer text-teal-500 border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left"
                    >
                      {t["65"]}
                    </th>
                    <th
                      onClick={() => deleteClassroom(item.id)}
                      className="cursor-pointer text-red-500 border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left"
                    >
                      {t["45"]}
                    </th>
                  </tr>
                ))
                : null}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
