import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ListNoti from "components/Noti/ListNoti";

import NotiLayout from "layouts/NotiLayout.js";

import use18n from "i18n/use18n";
import { useDispatch, useSelector } from "react-redux";
import { setTargetNoti } from "redux/actions/noti";

import NotiForm from "components/Dialog/NotiForm";

import axios from "axios";
import { useHostAPI } from "customHook/nonReact";

import { setListNotiType } from "redux/actions/notiType";
import { setListComment } from "redux/actions/comment";

import debounce from "lodash.debounce";
import { useVali } from "customHook/useVali";
import { content } from "tailwindcss/defaulttheme";

export default function DetailNoti() {
  const t = use18n();
  const host = useHostAPI();

  const router = useRouter();

  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const noti = useSelector((state) => state.noti.target);
  const account = useSelector((state) => state.user.account);

  const comment = useVali({ require: [1] });

  useEffect(() => {
    Promise.all([
      axios.get(`${host}/api/noti/${router.query.id}`),
      axios.get(`${host}/api/noti-type`),
      axios.get(`${host}/api/comments/noti/${router.query.id}`),
    ])
      .then(([res, noti, comment]) => {
        dispatch(setTargetNoti(res.data));
        dispatch(setListNotiType(noti.data));
        dispatch(setListComment(comment.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const apiCreateCmt = (id, role) => {
    Promise.all([
      axios.post(`${host}/api/comments/create`, {
        content: {
          content: comment.ref.current.value,
          idNoti: router.query.id,
          role: role,
          idUserClass: id,
        },
      }),
    ])
      .then(([res]) => {
        comment.ref.current.value = "";
        dispatch(setTargetNoti(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const submitCmt = (e) => {
    if (e.key === "Enter") {
      if (account?.user?.nameRole === "student") {
        account.studentClass.forEach((item) => {
          console.log(item);
          if (router.query.code === item.classes.code) {
            apiCreateCmt(item.id, "student");
          }
        });
      } else if (account?.user?.nameRole === "teacher") {
        account.teacherClass.forEach((item) => {
          if (router.query.code === item.classes.id) {
            apiCreateCmt(item.id, "teacher");
          }
        });
      } else {
        console.log("this is adminnnn --------");
      }
    }
  };
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-12/12 px-4 mb-6">
          <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                  <div
                    style={{ display: "flex", flexDirection: "column" }}
                    className="relative w-auto flex-initial"
                  >
                    {noti && noti.studentClass
                      ? noti?.studentClass?.student?.user?.firstName
                      : noti?.teacherClass?.student?.user?.firstName}
                  </div>
                  <div
                    style={{ display: "flex", flexDirection: "column" }}
                    className="relative w-auto flex-initial"
                  >
                    {noti && noti.studentClass
                      ? new Date(
                          noti?.studentClass?.student?.user?.createdAt
                        ).toLocaleDateString()
                      : new Date(
                          noti?.teacherClass?.teacher?.user?.createdAt
                        ).toLocaleDateString()}
                  </div>
                  <div
                    style={{ display: "flex", flexDirection: "column" }}
                    className="relative w-auto flex-initial"
                  >
                    {noti?.type?.name}
                  </div>
                </div>
                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                  <button
                    onClick={() => setShowModal(true)}
                    className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    {t["115"]}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-12/12 px-4 mb-6">
          <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
            <div className="flex-auto p-4">
              <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                <div
                  style={{
                    borderBottom: "1px solid #333",
                    paddingBottom: "8px",
                  }}
                  className="font-semibold text-xl text-blueGray-700"
                >
                  {noti.title}
                </div>
                <div
                  style={{ display: "flex", flexDirection: "column" }}
                  className="relative w-auto flex-initial"
                >
                  {noti.content}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-12/12 px-4 mb-6">
          <div className="relative w-full mb-3">
            <label
              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              {t["117"]}
            </label>
            <input
              onKeyDown={(e) => submitCmt(e)}
              ref={comment.ref}
              type="text"
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            />
            {comment.error && (
              <span className="text-red-500">{comment.error}</span>
            )}
          </div>
          {showModal ? (
            <NotiForm
              showModal={showModal}
              setShowModal={setShowModal}
              page="edit"
            />
          ) : null}
        </div>
        <div className="w-full lg:w-12/12 px-4 mb-6">
          {noti?.comment?.map((item) => (
            <div key={`commentofnoti${item.id}`}>{item.content}</div>
          ))}
        </div>
      </div>
    </>
  );
}

DetailNoti.layout = NotiLayout;
