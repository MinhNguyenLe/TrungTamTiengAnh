import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import use18n from "i18n/use18n";
// components
import axios from "axios";
import { useHostAPI } from "customHook/nonReact";

import { useDispatch, useSelector } from "react-redux";
import { setTargetClass } from "redux/actions/class";
import ProgressForm from "components/Dialog/ProgressForm";
import { setTargetStudent } from "redux/actions/user";

export default function ProgressList({
  setShowModalEdit,
  setShowModalAddClass,
}) {
  const t = use18n();

  const host = useHostAPI();

  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const classTarget = useSelector((state) => state.class.target);

  useEffect(() => {
    console.log(router);
    Promise.all([axios.get(`${host}/api/classes/${router.query.code}`)])
      .then(([res]) => {
        dispatch(setTargetClass(res.data));
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        {showModal ? (
          <ProgressForm
            showModal={showModal}
            setShowModal={setShowModal}
            role="student"
          />
        ) : null}
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-blueGray-700">
                {t["220"]}
              </h3>
            </div>
            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  {t["221"]}
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  {t["222"]}
                </th>
                {Array.isArray(classTarget?.session) ? classTarget?.session.map((item, index) => (
                  <th key={`1234${index}`} className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    {`${t["223"]} ${index + 1}`}
                  </th>
                )) : null}
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  {t["229"]}
                </th>
              </tr>
            </thead>
            <tbody>
              {classTarget?.studentClass?.length ? classTarget?.studentClass?.map((item) => (
                <tr
                  className="cursor-pointer hover:bg-lightBlue-600"
                  key={`list-studentclass-${item.id}`}
                >
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                    {item.student.user.userName}
                  </th>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {item.student.user.email}
                  </td>
                  {Array.isArray(item?.scoreProgress) && item?.scoreProgress.length ? item?.scoreProgress?.map((i, _index) => (
                    <td key={`abcd${_index}`} className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {i}
                    </td>
                  )) :
                    classTarget?.session.map(i => (
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">

                      </td>
                    ))
                  }
                  <td onClick={() => {
                    dispatch(setTargetStudent(item))
                    setShowModal(true)
                  }} className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {t["230"]}
                  </td>
                </tr>
              )) : null}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
