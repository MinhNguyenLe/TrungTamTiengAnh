import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import NotificationDropdown from "components/Dropdowns/NotificationDropdown.js";
import UserDropdown from "components/Dropdowns/UserDropdown.js";

import use18n from "i18n/use18n";

import { useDispatch, useSelector } from "react-redux";
import { setListCode } from "redux/actions/class";

import axios from "axios";
import { useHostAPI } from "customHook/nonReact";

export default function Sidebar() {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const router = useRouter();

  const dispatch = useDispatch();
  const account = useSelector((state) => state.user.account);
  const listCode = useSelector((state) => state.class.listCode);

  const t = use18n();
  const host = useHostAPI();

  useEffect(() => {
    if (account?.user.permission !== 1 && account?.user?.nameRole !== "admin") {
      Promise.all([
        axios.post(`${host}/api/users/code-class`, {
          role: account?.user?.nameRole,
          idUser: account?.user?.id,
        }),
      ])
        .then(([res]) => {
          dispatch(setListCode(res.data));
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <i className="fas fa-bars"></i>
          </button>
          {/* Brand */}
          <Link href="/">
            <a
              href="#pablo"
              className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
            >
              MR SMITH
            </a>
          </Link>
          {/* User */}
          <ul className="md:hidden items-center flex flex-wrap list-none">
            <li className="inline-block relative">
              <NotificationDropdown />
            </li>
            <li className="inline-block relative">
              <UserDropdown />
            </li>
          </ul>
          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link href="/">
                    <a
                      href="#pablo"
                      className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                    >
                      MR SMITH
                    </a>
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
            {/* Form */}
            <form className="mt-6 mb-4 md:hidden">
              <div className="mb-3 pt-0">
                <input
                  type="text"
                  placeholder="Search"
                  className="border-0 px-3 py-2 h-12 border border-solid  border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
                />
              </div>
            </form>

            {account.user.permission === 1 ? (
              <>
                <hr className="my-4 md:min-w-full" />

                <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
                  {t["27"]}
                </h6>
                <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                  <li className="items-center">
                    <Link href={`/manager/course`}>
                      <a
                        href="#pablo"
                        className={
                          "text-xs uppercase py-3 font-bold block " +
                          (router.pathname.indexOf(`/manager/course`) !== -1
                            ? "text-lightBlue-500 hover:text-lightBlue-600"
                            : "text-blueGray-700 hover:text-blueGray-500")
                        }
                      >
                        <i
                          className={
                            "fas fa-tools mr-2 text-sm " +
                            (router.pathname.indexOf(`/manager/course`) !== -1
                              ? "opacity-75"
                              : "text-blueGray-300")
                          }
                        ></i>{" "}
                        {t["28"]}
                      </a>
                    </Link>
                  </li>
                  <li className="items-center">
                    <Link href={`/manager/classroom`}>
                      <a
                        href="#pablo"
                        className={
                          "text-xs uppercase py-3 font-bold block " +
                          (router.pathname.indexOf(`/manager/classroom`) !== -1
                            ? "text-lightBlue-500 hover:text-lightBlue-600"
                            : "text-blueGray-700 hover:text-blueGray-500")
                        }
                      >
                        <i
                          className={
                            "fas fa-tools mr-2 text-sm " +
                            (router.pathname.indexOf(`/manager/classroom`) !==
                              -1
                              ? "opacity-75"
                              : "text-blueGray-300")
                          }
                        ></i>{" "}
                        {t["29"]}
                      </a>
                    </Link>
                  </li>
                  <li className="items-center">
                    <Link href={`/manager/class`}>
                      <a
                        href="#pablo"
                        className={
                          "text-xs uppercase py-3 font-bold block " +
                          (router.pathname.indexOf(`/manager/class`) !== -1
                            ? "text-lightBlue-500 hover:text-lightBlue-600"
                            : "text-blueGray-700 hover:text-blueGray-500")
                        }
                      >
                        <i
                          className={
                            "fas fa-tools mr-2 text-sm " +
                            (router.pathname.indexOf(`/manager/class`) !== -1
                              ? "opacity-75"
                              : "text-blueGray-300")
                          }
                        ></i>{" "}
                        {t["70"]}
                      </a>
                    </Link>
                  </li>
                  <li className="items-center">
                    <Link href={`/manager/noti-type`}>
                      <a
                        href="#pablo"
                        className={
                          "text-xs uppercase py-3 font-bold block " +
                          (router.pathname.indexOf(`/manager/noti-type`) !== -1
                            ? "text-lightBlue-500 hover:text-lightBlue-600"
                            : "text-blueGray-700 hover:text-blueGray-500")
                        }
                      >
                        <i
                          className={
                            "fas fa-tools mr-2 text-sm " +
                            (router.pathname.indexOf(`/manager/noti-type`) !==
                              -1
                              ? "opacity-75"
                              : "text-blueGray-300")
                          }
                        ></i>{" "}
                        {t["105"]}
                      </a>
                    </Link>
                  </li>
                </ul>
              </>
            ) : account.user.permission === 2 ? (
              <>
                <hr className="my-4 md:min-w-full" />

                <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
                  {t["56"]}
                </h6>
                <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                  <li className="items-center">
                    <Link href={`/${t["30"]}/${t["31"]}`}>
                      <a
                        href="#pablo"
                        className={
                          "text-xs uppercase py-3 font-bold block " +
                          (router.pathname.indexOf(`/${t["30"]}/${t["31"]}`) !==
                            -1
                            ? "text-lightBlue-500 hover:text-lightBlue-600"
                            : "text-blueGray-700 hover:text-blueGray-500")
                        }
                      >
                        <i
                          className={
                            "fas fa-tools mr-2 text-sm " +
                            (router.pathname.indexOf(
                              `/${t["30"]}/${t["31"]}`
                            ) !== -1
                              ? "opacity-75"
                              : "text-blueGray-300")
                          }
                        ></i>{" "}
                        {t["28"]}
                      </a>
                    </Link>
                  </li>
                </ul>
              </>
            ) : (
              <>
                <hr className="my-4 md:min-w-full" />
                <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
                  {t["57"]}
                </h6>
                {listCode.map((item) => (
                  <ul
                    key={`${item}listCode`}
                    className="md:flex-col md:min-w-full flex flex-col list-none"
                  >
                    <li className="items-center">
                      <Link href={`/class/${item}`}>
                        <a
                          href="#pablo"
                          className={
                            "text-xs uppercase py-3 font-bold block " +
                            (router.pathname.indexOf(`/class/${item}`) !== -1
                              ? "text-lightBlue-500 hover:text-lightBlue-600"
                              : "text-blueGray-700 hover:text-blueGray-500")
                          }
                        >
                          <i
                            className={
                              "fas fa-tools mr-2 text-sm " +
                              (router.pathname.indexOf(`/class/${item}`) !== -1
                                ? "opacity-75"
                                : "text-blueGray-300")
                            }
                          ></i>
                          {item}
                        </a>
                      </Link>
                    </li>
                  </ul>
                ))}
              </>
            )}

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
{account.user.permission !== 1?
<>
<h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
  For you!
</h6>
<ul className="md:flex-col md:min-w-full flex flex-col list-none">
  <li className="items-center">
    <Link href={`/profile/${account.user.id}`}>
      <a
        href="#pablo"
        className={
          "text-xs uppercase py-3 font-bold block " +
          (router.pathname.indexOf(`/profile/${account.user.id}`) !== -1
            ? "text-lightBlue-500 hover:text-lightBlue-600"
            : "text-blueGray-700 hover:text-blueGray-500")
        }
      >
        <i
          className={
            "fas fa-tv mr-2 text-sm " +
            (router.pathname.indexOf(`/profile/${account.user.id}`) !== -1
              ? "opacity-75"
              : "text-blueGray-300")
          }
        ></i>
        My Profile
      </a>
    </Link>
  </li>

</ul>
</>
:null}

            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              Information Page
            </h6>
            {/* Navigation */}

            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <li className="items-center">
                <Link href="/admin/courses">
                  <a
                    href="#pablo"
                    className={
                      "text-xs uppercase py-3 font-bold block " +
                      (router.pathname.indexOf("/admin/courses") !== -1
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }
                  >
                    <i
                      className={
                        "fas fa-tv mr-2 text-sm " +
                        (router.pathname.indexOf("/admin/courses") !== -1
                          ? "opacity-75"
                          : "text-blueGray-300")
                      }
                    ></i>{" "}
                    Course
                  </a>
                </Link>
              </li>

              <li className="items-center">
                <Link href="/admin/settings">
                  <a
                    href="#pablo"
                    className={
                      "text-xs uppercase py-3 font-bold block " +
                      (router.pathname.indexOf("/admin/settings") !== -1
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }
                  >
                    <i
                      className={
                        "fas fa-tools mr-2 text-sm " +
                        (router.pathname.indexOf("/admin/settings") !== -1
                          ? "opacity-75"
                          : "text-blueGray-300")
                      }
                    ></i>{" "}
                    Setting
                  </a>
                </Link>
              </li>

              <li className="items-center">
                <Link href="/admin/tables">
                  <a
                    href="#pablo"
                    className={
                      "text-xs uppercase py-3 font-bold block " +
                      (router.pathname.indexOf("/admin/tables") !== -1
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }
                  >
                    <i
                      className={
                        "fas fa-table mr-2 text-sm " +
                        (router.pathname.indexOf("/admin/tables") !== -1
                          ? "opacity-75"
                          : "text-blueGray-300")
                      }
                    ></i>{" "}
                    Tables
                  </a>
                </Link>
              </li>
            </ul>

          </div>
        </div>
      </nav>
    </>
  );
}
