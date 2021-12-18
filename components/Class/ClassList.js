import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import use18n from "i18n/use18n";
// components
import axios from "axios";
import { useHostAPI } from "customHook/nonReact";

import { useDispatch, useSelector } from "react-redux";
import { setListClass ,setTargetClass} from "redux/actions/class";

import Link from "next/link";

export default function ClassList({ setShowModalEdit,setAddStudentModal,setAddTeacherModal }) {
  const t = use18n();

  const host = useHostAPI();

  const router = useRouter();

  const dispatch = useDispatch();
  const listClass = useSelector((state) => state.class.list);

  useEffect(() => {
    console.log(router);
    Promise.all([axios.get(`${host}/api/classes`)])
      .then(([res]) => {
        dispatch(setListClass(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteClass = (cls) => {
    Promise.all([axios.delete(`${host}/api/classes/${cls.id}`)])
      .then(([res]) => {
        dispatch(setListClass(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const gotoEdit = (cls) => {
    dispatch(setTargetClass(cls));
    setShowModalEdit(true);
  };

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-blueGray-700">
                {t["118"]}
              </h3>
            </div>
            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
              <button
                className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                {t["13"]}
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
                  {t["119"]}
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  {t["120"]}
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  {t["126"]}
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  {t["122"]}
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  {t["123"]}
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  {t["124"]}
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  {t["125"]}
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  {t["121"]}
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  {t["127"]}
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  {t["128"]}
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  {t["129"]}
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  {t["130"]}
                </th>
              </tr>
            </thead>
            <tbody>
              {listClass?.map((cls) => (
                <tr
                  className="cursor-pointer hover:bg-lightBlue-600"
                  key={`list-cls-${cls.id}`}
                >
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                    {cls.name}
                  </th>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {cls.code}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {cls.course.name}
                  </td>
                  <td style={{display:"flex",flexDirection:"column"}} className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {cls.teacherClass.map((teacher,index)=>(
                      <div key={`listClassTeacherClass${index}`}>
                      <span>{teacher.teacher.user.userName}</span>
                      </div>
                    ))}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {cls.studentClass.map((student,index)=>(
                      <div key={`listClassStudentClass${index}`}>
                      <span>{student.student.user.userName}</span>
                      </div>
                    ))}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {cls.noti.length}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {cls.timetable.length}
                </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {new Date(cls.createdAt).toLocaleDateString()}
                  </td>
                  <th
                  onClick={()=>gotoEdit(cls)}
                    className="text-lightBlue-500 border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                  >
                    {t["127"]}
                  </th>
                  <th
                  onClick={()=>{
                    dispatch(setTargetClass(cls))
                    setAddTeacherModal(true)
                  }}
                    className="text-teal-500 border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                  >
                    {t["131"]}
                  </th>
                  <th
                  onClick={()=> {
                    dispatch(setTargetClass(cls))
                    setAddStudentModal(true)}}
                    className="text-teal-500 border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                  >
                    {t["131"]}
                  </th>
                  <th
                  onClick={()=>deleteClass(cls)}
                    className="text-teal-500 border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                  >
                    {t["130"]}
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
