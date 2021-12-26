import React, { useEffect, useRef } from "react";
import use18n from "i18n/use18n";
import debounce from "lodash.debounce";

import axios from "axios";
// components

import { useVali } from "customHook/useVali";
import { useHostAPI } from "customHook/nonReact";

import { useDispatch, useSelector } from "react-redux";
import { setTargetClass } from "redux/actions/class";
import { setListNotiType } from "redux/actions/notiType";

import router, { useRouter } from "next/router";
export default function NotiForm({ page, setShowModal, showModal }) {
  const t = use18n();
  const router = useRouter();
  const dispatch = useDispatch();
  const target = useSelector((state) => state.class.target);
  const account = useSelector((state) => state.user.account);

  const listType = useSelector((state) => state.notiType.list);
  console.log(listType);
  const host = useHostAPI();

  const title = useVali({ require: [1] });
  const content = useVali({ require: [1] });
  const type = useRef();

  useEffect(() => {
    if (page === "edit") {
      Promise.all([axios.get(`${host}/api/noti-type`), axios.get(`${host}/api/noti/${router.query.id}`)])
        .then(([type, res]) => {
          console.log(res.data);
          title.ref.current.value = res.data.title;
          // type.ref.current.value = res.data.type.name;
          dispatch(setListNotiType(type.data));
          content.ref.current.value = res.data.content;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const addNoti = () => {
    title.checkErr();
    if (title.success) {
      if (account?.user?.nameRole === "student") {
        account.studentClass.forEach((item) => {
          console.log(item);
          if (router.query.code === item.classes.code) {
            addWithAPI(item.id, "student");
          }
        });
      } else if (account?.user?.nameRole === "teacher") {
        account.teacherClass.forEach((item) => {
          if (router.query.code === item.classes.code) {
            addWithAPI(item.id, "teacher");
          }
        });
      } else {
        console.log("this is adminnnn --------");
      }
    }
  };

  const addWithAPI = (id, role) => {
    console.log(parseInt(type.current.value), type.current.value, "............")
    Promise.all([
      axios.post(`${host}/api/noti/create`, {
        content: {
          title: title.ref.current.value,
          idClass: target.id,
          content: content.ref.current.value,
          idType: parseInt(type.ref.current.value),
          role: role,
          idUserClass: id,
        },
      }),
    ])
      .then(([res]) => {
        dispatch(setTargetClass(res.data));
        setShowModal(false);
        title.ref.current.value = "";
        content.ref.current.value = "";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // debounce when fill input
  const debTitle = debounce(() => {
    title.checkErr();
  }, 500);
  const debContent = debounce(() => {
    content.checkErr();
  }, 500);
  return (
    <div className="min-w-0">
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="max-w-580-px relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
              <h6 className="text-blueGray-700 text-xl font-bold">
                {page === "create" ? t["98"] : t["116"]}
              </h6>
              <div>
                <button
                  onClick={addNoti}
                  className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  {t["100"]}
                </button>
                <button
                  onClick={() => {
                    setShowModal(false);
                  }}
                  className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  {t["101"]}
                </button>
              </div>
            </div>
          </div>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <form>
              <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                {t["99"]}
              </h6>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-12/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      <span className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                        Select
                      </span>
                      <select
                        ref={type}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      >
                        {listType
                          ? listType?.map((item) => (
                            <option key={`abcd${item.id}`} value={item.id}>{item.name}</option>
                          ))
                          : null}
                      </select>
                    </label>
                  </div>
                </div>
                <div className="w-full lg:w-12/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      {t["102"]}
                    </label>
                    <input
                      onInput={() => debTitle()}
                      ref={title.ref}
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                    {title.error && (
                      <span className="text-red-500">{title.error}</span>
                    )}
                  </div>
                </div>
                <div className="w-full lg:w-12/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      {t["103"]}
                    </label>
                    <textarea
                      onInput={() => debContent()}
                      ref={content.ref}
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      rows="4"
                    ></textarea>
                    {content.error && (
                      <span className="text-red-500">{content.error}</span>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
}

NotiForm.defaultProps = {
  page: "create",
};
