import Link from "next/link";
import axios from "axios";
// layout for page
import React, { useRef } from "react";
import Auth from "layouts/Auth.js";
import { useRouter } from "next/router";

import Messenger from "components/Dialog/Messenger/Index";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAccount } from "redux/actions/user";
export default function Login() {
  const router = useRouter();
  const userName = useRef("");
  const password = useRef("");

  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
  }, []);
  const Login = () => {
    Promise.all([
      axios.post("http://localhost:8888/api/auth/login", {
        username: userName.current.value,
        password: password.current.value,
      }),
    ])
      .then(([res]) => {
        router.push("../admin/dashboard");
        console.log("Duong" + JSON.stringify(res.data.account.user));
        dispatch(setAccount(res.data.account));
      })
      .catch((err) => {
        setShowModalFalse(true);
        console.log(JSON.stringify(err));
      });
  };

  const [showModalFalse, setShowModalFalse] = useState(false);
  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Sign in with
                  </h6>
                </div>
                {/* <div className="btn-wrapper text-center">
                  <button
                    className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <img alt="..." className="w-5 mr-1" src="/img/github.svg" />
                    Github
                  </button>
                  <button
                    className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <img alt="..." className="w-5 mr-1" src="/img/google.svg" />
                    Google
                  </button>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" /> */}
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                {/* <div className="text-blueGray-400 text-center mb-3 font-bold">
                  <small>Or sign in with credentials</small>
                </div> */}
                <form>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      UserName
                    </label>
                    <input
                      ref={userName}
                      type="email"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                      ref={password}
                      type="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                    />
                  </div>
                  {/* <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        Remember me
                      </span>
                    </label>
                  </div> */}
                  <div className="flex flex-wrap mt-6 relative">
                    <div className="w-1/2">
                      <a
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        className="text-blueGray-600"
                      >
                        <small>Forgot password?</small>
                      </a>
                    </div>
                    {/* <div className="w-1/2 text-right">
                      <Link href="/auth/register">
                        <a href="#pablo" className="text-blueGray-600">
                          <small>Create new account</small>
                        </a>
                      </Link>
                    </div> */}
                  </div>
                  <div className="text-center mt-6">
                    <button
                      onClick={Login}
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"
                    >
                      Sign In
                    </button>
                  </div>
                  <div className="text-center mt-6">
                    <Link href="/auth/register">
                      <button
                        className="bg-blueGray-400 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="button"
                      >
                        Create New Account
                      </button>
                    </Link>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
      {showModalFalse ? (
        <Messenger
          showModal={showModalFalse}
          setShowModal={setShowModalFalse}
          string="Authentication False"
          page="create"
        />
      ) : null}
    </>
  );
}

Login.layout = Auth;
