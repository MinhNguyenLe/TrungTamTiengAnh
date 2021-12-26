import React, { useEffect, useState } from "react";
import use18n from "i18n/use18n";
import debounce from "lodash.debounce";
import { useRouter } from "next/router";
import Link from "next/link";

import axios from "axios";
import QuillEditor from "components/Editor/Quill";

import { useHostAPI } from "customHook/nonReact";

import { useDispatch, useSelector } from "react-redux";
import Field from "../../Quizzes/Field"
import { setTargetClass } from "redux/actions/class";

export default function QuillForm({ setShowModal }) {
  const t = use18n();
  const host = useHostAPI();
  const [value, setValue] = useState('')
  const router = useRouter();
  const session = useSelector((state) => state.class.session);
  const targetClass = useSelector((state) => state.class.target);

  const dispatch = useDispatch();

  const saveContent = () => {
    Promise.all([
      axios.post(`${host}/api/classes/add-progress-content`, {
        content: {
          id: targetClass.id,
          session: session,
          content: value
        }
      }),
    ])
      .then(([res]) => {
        dispatch(setTargetClass(res.data));
        router.push(`../../${router.query.code}/session/${session}`);
      })
      .catch((err) => {
        console.log(err);
      });

  }
  return (
    <div className="min-w-0">
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="max-w-1200 relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
              <h6 className="text-blueGray-700 text-xl font-bold">
                {t["235"]}
              </h6>
              <div>
                <button
                  onClick={saveContent}
                  className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  {t["205"]}
                </button>
                <button
                  className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  <Link href={`../../${router.query.code}/session/${session}`}>
                    {t["59"]}
                  </Link>
                </button>
              </div>
            </div>
          </div>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <div>
              <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                {t["231"]}
              </h6>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-12/12 px-4">
                  <QuillEditor value={value} setValue={setValue} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
}
