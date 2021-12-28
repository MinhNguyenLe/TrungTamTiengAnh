import { useEffect, useState } from "react";
import QuillForm from "components/Dialog/QuillForm";
import axios from "axios";
import { useHostAPI } from "customHook/nonReact";

import { useRouter } from "next/router";
import Link from "next/link";

import Admin from "layouts/Admin.js";
import { useDispatch, useSelector } from "react-redux";
import { setTargetClass, setTargetSession } from "redux/actions/class";

import use18n from "i18n/use18n";
import { Markup } from 'interweave';
import Quizzes from "components/Dialog/Quizzes";

export default function SessionChild() {
  const t = use18n();
  const host = useHostAPI();
  const router = useRouter();
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setTargetSession(router.query.index))
    Promise.all([
      axios.get(`${host}/api/classes/${router.query.code}`),
    ])
      .then(([res]) => {
        dispatch(setTargetClass(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const [showModalQ, setShowModalQ] = useState(false);
  const permission = useSelector((state) => state.user.account.user.permission);
  const account = useSelector((state) => state.user.account);
  const targetClass = useSelector((state) => state.class.target);
  console.log(targetClass);
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-12/12 px-4">
          {
            account.user.permission === 2 && targetClass?.session?.length ? (
              <button
                className="relative bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button">
                <Link href={`../../${router.query.code}/session/content`}>
                  {targetClass["session"][router.query.index - 1]?.length > 1 ? t["234"] : t["233"]}
                </Link>
              </button>
            ) : null
          }
        </div>
        <div className="w-full lg:w-12/12 px-4">
        <button
            className="relative bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => setShowModalQ(true)}
          >
            {permission === 2 ? t["201"] : t["206"]}
          </button>
        </div>
         
        <div className="w-full lg:w-12/12 px-4">
          <div className="relative bg-white active:bg-pink-600 px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
            <Markup content={targetClass?.session?.length && targetClass["session"][router.query.index - 1]?.length > 1 ? targetClass["session"][router.query.index - 1] : ""} />
          </div>
        </div>
      </div>
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
    </>
  );
}

SessionChild.layout = Admin;
