import React from "react";
import { useDispatch, useSelector } from "react-redux";
import use18n from "i18n/use18n";
import Link from "next/link";
import { useRouter } from "next/router";

export default function HeaderClass() {
  const t = use18n();
  const router = useRouter();
  const target = useSelector((state) => state.class.target);
  return (
    <>
      <div className="relative bg-blueGray-800 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div className="flex flex-wrap">
            <div className="w-full lg:w-12/12 xl:w-12/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                <div className="flex-auto p-4">
                  <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                    <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                      {target.code}
                    </h5>
                    <span className="font-semibold text-xl text-blueGray-700">
                      {target.name}
                    </span>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <div>{t["77"]}</div>
                      {target.teacherClass
                        ? target?.teacherClass.map((i) => (
                          <div
                            key={`nameteacherclassbycode${i.teacher.id}`}
                            style={{ marginLeft: "4px" }}
                          >
                            <div className="relative w-auto flex-initial">
                              {i.teacher.user.firstName}{" "}
                              {i.teacher.user.lastName}
                            </div>
                          </div>
                        ))
                        : null}
                    </div>
                    <div className="flex">
                      <Link
                        className="relative bg-purple-500 text-white active:bg-purple-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"

                        href={`${router.asPath}/list-student`}
                        style={{
                          cursor: "none",
                          color: "blue !important",
                        }}
                      >
                        <a className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                        >
                          {t["96"]}
                        </a>

                      </Link>
                      <Link
                        className="relative bg-purple-500 text-white active:bg-purple-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"

                        href={`${router.asPath}/result`}
                        style={{
                          cursor: "none",
                          color: "blue !important",
                        }}
                      >
                        <a className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                        >
                          {t["207"]}
                        </a>

                      </Link>
                      <Link
                        className="relative bg-purple-500 text-white active:bg-purple-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"

                        href={`${router.asPath}/progress`}
                        style={{
                          cursor: "none",
                          color: "blue !important",
                        }}
                      >
                        <a className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                        >
                          {t["219"]}
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
