import { useState } from "react";

import ProgressList from "components/Progress/ProgressList.js";
import axios from "axios";
import { useHostAPI } from "customHook/nonReact";

import Admin from "layouts/Admin.js";
import { useDispatch, useSelector } from "react-redux";
import { setTargetClass } from "redux/actions/class";

import use18n from "i18n/use18n";
import ProgressForm from "components/Dialog/ProgressForm";

export default function ProgressClass() {
  const t = use18n();
  const host = useHostAPI();

  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false);

  const account = useSelector((state) => state.user.account);

  const addProgressScore = () => {
    setShowModal(true)
    if (account.user.permission === 2) {
      // Promise.all([
      //   axios.post(`${host}/api/classes/add-progress-score`, {
      //     content: {
      //       id: 1,
      //       session: 1,
      //       score: 1
      //     }
      //   }),
      // ])
      //   .then(([res]) => {
      //     dispatch(setTargetClass(res.data))
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    }
  }
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-12/12 px-4">
          {
            account.user.permission === 2 ? (
              <button
                onClick={addProgressScore}
                className="relative bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                {t["224"]}
              </button>
            ) : null
          }
          {showModal ? (
            <ProgressForm
              showModal={showModal}
              setShowModal={setShowModal}
              role="student"
            />
          ) : null}
        </div>
        <div className="w-full lg:w-12/12 px-4">
          <ProgressList />
        </div>
      </div>
    </>
  );
}

ProgressClass.layout = Admin;
