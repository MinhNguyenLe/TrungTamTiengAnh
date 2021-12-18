import React from "react";

import use18n from "i18n/use18n";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

import axios from "axios";
import { useHostAPI } from "customHook/nonReact";

import { setListClassroom, setTargetClassRoom } from "redux/actions/classroom";
export default function ScheduleList({ setShowModal }) {
  const t = use18n();
  const dispatch = useDispatch();
  const account = useSelector((state) => state.user.account);

  const host = useHostAPI();

  const deleteClassroom = (id) => {
    Promise.all([axios.delete(`${host}/api/account/${id}`)])
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
  const deleteTimetable = (id) => {
    Promise.all([axios.delete(`${host}/api/account/delete-timetable/${id}`)])
      .then(([res]) => {
        dispatch(setListClassroom(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-blueGray-700">
                {t["147"]}
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  {t["146"]}
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  {t["137"]}
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  {t["138"]}
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  {t["139"]}
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  {t["142"]}
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  {t["143"]}
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  {t["144"]}
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  {t["148"]}
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  {t["145"]}
                </th>
              </tr>
            </thead>
            <tbody>
              {account?.studentClass
                ? account?.studentClass?.map((cls) => (
                    <tr>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                        {cls?.classes.course.name}
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {cls?.classes.name}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {cls?.classes.code}
                      </td>
                      <td
                        style={{ display: "flex", flexDirection: "column" }}
                        className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                      >
                        {cls?.classes?.timetable?.length
                          ? cls?.classes?.timetable?.map((i) => (
                            <div key={`${i.id}listtimetableclassroomProfile`} className="flex">
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
                            >
                              {i.begin}:{i.end}
                              <i
                                onClick={() => deleteTimetable(i.id)}
                                style={{ cursor: "pointer" }}
                                className="far fa-trash-alt text-sm"
                              ></i>
                            </button>
                            <div className="flex" style={{flexDirection:"column"}}>
                            <span>Classroom's name: {i.classroom.name}</span>
                            <span>ADdress: {i.classroom.address}</span>
                            </div>
                            </div>
                            ))
                          : null}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {new Date(cls.createdAt).toLocaleDateString()}
                      </td>
                      <td style={{display:"flex",flexDirection:"column"}} className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {cls?.classes.teacherClass.map((teacher,index)=>(
                        <div key={`listClassTeacherClassProile${index}`}>
                        <span>{teacher.teacher.user.userName}</span>
                        </div>
                      ))}
                    </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {cls.classes.course.tuition}
                    </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {new Date(cls?.classes.course.timeBegin).toLocaleDateString()}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {new Date(cls?.classes.course.timeEnd).toLocaleDateString()}
                      </td>
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
