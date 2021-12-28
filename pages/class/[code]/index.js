import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ListNoti from "components/Noti/ListNoti";

import ClassLayout from "layouts/ClassLayout.js";

import use18n from "i18n/use18n";
import { useDispatch, useSelector } from "react-redux";
import { setTargetClass } from "redux/actions/class";
import { setListNotiType } from "redux/actions/notiType";

import NotiForm from "components/Dialog/NotiForm";
import Quizzes from "components/Dialog/Quizzes";

import axios from "axios";
import { useHostAPI } from "customHook/nonReact";
export default function Class() {
  const t = use18n();
  const host = useHostAPI();

  const router = useRouter();

  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [showModalQ, setShowModalQ] = useState(false);
  const permission = useSelector((state) => state.user.account.user.permission);

  useEffect(() => {
    console.log(router);
    Promise.all([
      axios.get(`${host}/api/classes/${router.query.code}`),
      axios.get(`${host}/api/noti-type`),
    ])
      .then(([res, noti]) => {
        dispatch(setTargetClass(res.data));
        dispatch(setListNotiType(noti.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-12/12 px-4 mb-6">
        {permission === 2 ? <button
            className="relative bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => setShowModal(true)}
          >
            {t["97"]}
          </button> : null}
          
          {/* <button
            className="relative bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => setShowModalQ(true)}
          >
            {permission === 2 ? t["201"] : t["206"]}
          </button> */}
          {showModal ? (
            <NotiForm
              showModal={showModal}
              setShowModal={setShowModal}
              page="create"
            />
          ) : null}
          {showModalQ ? (
            permission === 2 ?
              <Quizzes
                showModal={showModalQ}
                setShowModal={setShowModalQ}
                type="teacher"
              /> : <Quizzes
                showModal={showModalQ}
                setShowModal={setShowModalQ}
                type="student"
              />
          ) : null}
        </div>
        <div className="w-full lg:w-12/12 px-4 mb-6">
          <ListNoti />
        </div>
      </div>
    </>
  );
}

Class.layout = ClassLayout;
