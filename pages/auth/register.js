import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
// layout for page
import axios from "axios";
import Messenger from "components/Dialog/Messenger/Index";
import Auth from "layouts/Auth.js";
import DatePicker from "react-datepicker";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
export default function Register() {
  const router = useRouter();
  const [startDate, setStartDate] = useState(new Date());
  const userName = useRef("");
  const email = useRef("");
  const firstName = useRef("");
  const lastName = useRef("");
  const password = useRef("");
  // const gender = useRef(false); // false : Nu, true : Nam
  const address = useRef("");
  const phone = useRef("");
  const ethetic = useRef("");
  const dateBirth = useRef("");
  const placeBirth = useRef("");
  const gender = [
    { value: 1, label: 'Male' },
  { value: 0, label: 'Female' },
  ];
  const defaultOption = gender[0];
  // const { user } = useSelector((state) => state.user);
  const createAccount = () => {
    Promise.all([
      axios.post("http://localhost:8888/api/users/register", {
        account: {
          userName: userName.current.value,
          password: password.current.value,
          email: email.current.value,
          lastName: lastName.current.value,
          firstName: firstName.current.value,
          placeBirth: placeBirth.current.value,
          dateBirth: startDate.toLocaleDateString(),
          phoneNumber: phone.current.value,
          gender: defaultOption.value,
          address: address.current.value,
          //cheat
          nameRole: "student",
          permission: 3,
        },
      }),
    ])
      .then(([res]) => {
        setShowModalSuccess(true);
       })
      .catch((err) => {
        setShowModalFalse(true);
        console.log(err);
      });
  };
  const [showModalFalse, setShowModalFalse] = useState(false);
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const inputAccount = () => {
    // console.log(111, user);
  };
  
  const pushRouter = () => {
    router.push("./login");
  };
  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full  px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Sign up with
                  </h6>
                </div>
                {/* <div className="btn-wrapper text-center">
                  <button
                    onClick={pushRouter}
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
                </div> */}
                {/* <hr className="mt-6 border-b-1 border-blueGray-300" /> */}
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                {/* <div className="text-blueGray-400 text-center mb-3 font-bold">
                  <small>Or sign up with credentials</small>
                </div> */}
                <form>
                  <div className=" flex flex-wrap">
                    <div className="md:w-4/12 ml-10rem">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        First Name
                      </label>
                      <input
                        ref={firstName}
                        type="First Name"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="First Name"
                      />
                    </div>
                    <div className="md:w-4/12 ml-4rem">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Last Name
                      </label>
                      <input
                        ref={lastName}
                        type="Last Name"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Last Name"
                      />
                    </div>
                  </div>
                  <div className=" flex flex-wrap mb-3 mt-4">
                    <div className="md:w-4/12 ml-10rem">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        UserName
                      </label>
                      <input
                        ref={userName}
                        onChange={() => inputAccount()}
                        type="UserName"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="UserName"
                      />
                    </div>
                    <div className="md:w-4/12 ml-4rem">
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
                        placeholder="password"
                      />
                    </div>
                  </div>

                  <div className=" flex flex-wrap mb-3 mt-4">
                    <div className="md:w-4/12 ml-10rem">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Email
                      </label>
                      <input
                        ref={email}
                        type="email"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Email"
                      />
                    </div>
                    <div className="md:w-4/12 ml-4rem">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Gender
                      </label>
                      <Dropdown options={gender} value={defaultOption} placeholder="Select an option" />
                      {/* <input
                        ref={gender}
                        type="Gender"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Gender"
                      /> */}
                    </div>
                  </div>
                  <div className=" flex flex-wrap mb-3 mt-4">
                    <div className="md:w-4/12 ml-10rem">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Phone
                      </label>
                      <input
                        ref={phone}
                        type="Phone"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Phone"
                      />
                    </div>
                    <div className="md:w-4/12 ml-4rem">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Ethenic Type
                      </label>
                      <input
                        ref={ethetic}
                        type="Ethenic Type"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Ethenic Type"
                      />
                    </div>
                  </div>
                  <div className=" flex flex-wrap mb-3 mt-4">
                    <div className="md:w-4/12 ml-10rem">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Date Of Birth
                      </label>
                      <DatePicker ref={dateBirth} selected={startDate} onChange={(date) => setStartDate(date)} className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"/>
                      {/* <input
                        ref={dateBirth}
                        type="Date Of Birth"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Date Of Birth"
                      /> */}
                    </div>
                    <div className="md:w-4/12 ml-4rem">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Place Of Birth
                      </label>
                      <input
                        ref={placeBirth}
                        type="Place Of Birth"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Place Of Birth"
                      />
                    </div>
                  </div>
                  <div className=" flex flex-wrap mb-3 mt-4">
                    <div className="w-72 ml-10rem">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Address
                      </label>
                      <input
                        ref={address}
                        type="Address"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Address"
                      />
                    </div>
                  </div>

                  <div className="text-center mt-6 ">
                    <label className="inline-flex items-center cursor-pointer ">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        I agree with the{" "}
                        <a
                          href="#pablo"
                          className="text-lightBlue-500"
                          onClick={() => setShowModal(true)}
                        >
                          Privacy Policy
                        </a>
                      </span>
                    </label>
                  </div>

                  <div className="text-center mt-6  ">
                    <button
                      onClick={createAccount}
                      className=" md:w-4/12 bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"
                    >
                      Create Account
                    </button>
                  </div>

                  <div className="text-center mt-4 ">
                    <Link href="/auth/login">
                      <button
                        className="md:w-4/12 bg-blueGray-400 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="button"
                      >
                        Login
                      </button>
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModalSuccess ? (
        <Messenger
          showModal={showModalSuccess}
          setShowModal={setShowModalSuccess}
          string="Success"
          page="create"
        />
      ) : null}
      {showModalFalse ? (
        <Messenger
          showModal={showModalFalse}
          setShowModal={setShowModalFalse}
          string="failure"
          page="create"
        />
      ) : null}
    </>
  );
}

Register.layout = Auth;
