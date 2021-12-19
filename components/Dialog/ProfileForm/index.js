import React, { useEffect, useState } from "react";
import use18n from "i18n/use18n";
import debounce from "lodash.debounce";

import axios from "axios";
// components

import { useVali } from "customHook/useVali";
import { useHostAPI } from "customHook/nonReact";

import { useDispatch, useSelector } from "react-redux";
import { setAccount } from "redux/actions/user";

export default function ProfileForm({ setShowModal, showModal }) {
  const t = use18n();

  const dispatch = useDispatch();

  const host = useHostAPI();

  const account = useSelector((state) => state.user.account);

  useEffect(() => {
    firstName.ref.current.value = account.user.firstName;
    lastName.ref.current.value = account.user.lastName;
    placeBirth.ref.current.value = account.user.placeBirth;
    dateBirth.ref.current.value = account.user.dateBirth;
    phone.ref.current.value = account.user.phoneNumber;
    address.ref.current.value = account.user.address;
    level.ref.current.value = account.level;
    if (account.user.permission === 2) certificate.ref.current.value = account.certificate;
    else education.ref.current.value = account.education;
  }, [])

  const firstName = useVali({ require: [1] });
  const lastName = useVali({ require: [1] });
  const placeBirth = useVali({ require: [1] });
  const dateBirth = useVali({ require: [1] });
  const phone = useVali({ require: [1] });
  const address = useVali({ require: [1] });
  const certificate = useVali({ require: [1] });
  const education = useVali({ require: [1] });
  const level = useVali({ require: [1] });

  const changeProfile = () => {
    firstName.checkErr();
    lastName.checkErr();
    placeBirth.checkErr();
    dateBirth.checkErr();
    phone.checkErr();
    address.checkErr();
    level.checkErr();

    if (firstName.success && lastName.success && placeBirth.success && dateBirth.success && phone.success && address.success && level.success) {
      if (account.user.permission === 2) {
        certificate.checkErr()
        if (certificate.success) {
          Promise.all([
            axios.post(`${host}/api/users/edit-teacher`, {
              account: {
                id: account.user.id,
                firstName: firstName.ref.current.value,
                lastName: lastName.ref.current.value,
                placeBirth: placeBirth.ref.current.value,
                dateBirth: dateBirth.ref.current.value,
                phoneNumber: phone.ref.current.value,
                address: address.ref.current.value,
                level: level.ref.current.value,
                certificate: certificate.ref.current.value,
              },
            }),
          ])
            .then(([res]) => {
              dispatch(setAccount(res.data));
              setShowModal(false);
              firstName.ref.current.value = "";
              lastName.ref.current.value = "";
              placeBirth.ref.current.value = "";
              dateBirth.ref.current.value = "";
              phone.ref.current.value = "";
              address.ref.current.value = "";
              level.ref.current.value = "";
              certificate.ref.current.value = "";
              education.ref.current.value = "";
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
      if (account.user.permission === 3) {
        education.checkErr()
        if (education.success) {
          Promise.all([
            axios.post(`${host}/api/users/edit-student`, {
              account: {
                id: account.user.id,
                firstName: firstName.ref.current.value,
                lastName: lastName.ref.current.value,
                placeBirth: placeBirth.ref.current.value,
                dateBirth: dateBirth.ref.current.value,
                phoneNumber: phone.ref.current.value,
                address: address.ref.current.value,
                level: level.ref.current.value,
                education: education.ref.current.value,
              },
            }),
          ])
            .then(([res]) => {
              dispatch(setAccount(res.data));
              setShowModal(false);

              firstName.ref.current.value = "";
              lastName.ref.current.value = "";
              placeBirth.ref.current.value = "";
              dateBirth.ref.current.value = "";
              phone.ref.current.value = "";
              address.ref.current.value = "";
              level.ref.current.value = "";
              certificate.ref.current.value = "";
              education.ref.current.value = "";
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    }
  };

  const debFirstName = debounce(() => {
    firstName.checkErr();
  }, 500);
  const debLastName = debounce(() => {
    lastName.checkErr();
  }, 500);
  const debPlaceBirth = debounce(() => {
    placeBirth.checkErr();
  }, 500);
  const debDateBirth = debounce(() => {
    dateBirth.checkErr();
  }, 500);
  const debPhone = debounce(() => {
    phone.checkErr();
  }, 500);
  const debAddress = debounce(() => {
    address.checkErr();
  }, 500);
  const debCertificate = debounce(() => {
    certificate.checkErr();
  }, 500);
  const debEducation = debounce(() => {
    education.checkErr();
  }, 500);
  const debLevel = debounce(() => {
    level.checkErr();
  }, 500);

  return (
    <div className="min-w-0">
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="max-w-1200 relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
              <h6 className="text-blueGray-700 text-xl font-bold">
                {t["199"]}
              </h6>
              <div>
                <button
                  onClick={changeProfile}
                  className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  {t["200"]}
                </button>
                <button
                  onClick={() => {
                    setShowModal(false);
                  }}
                  className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <form>
              <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                {t["177"]}
              </h6>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      {t["187"]}
                    </label>
                    <input
                      onInput={() => debFirstName()}
                      ref={firstName.ref}
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                    {firstName.error && (
                      <span className="text-red-500">{firstName.error}</span>
                    )}
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      {t["188"]}
                    </label>
                    <input
                      onInput={() => debLastName()}
                      ref={lastName.ref}
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                    {lastName.error && (
                      <span className="text-red-500">{lastName.error}</span>
                    )}
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      {t["190"]}
                    </label>
                    <input
                      onInput={() => debPlaceBirth()}
                      ref={placeBirth.ref}
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                    {placeBirth.error && (
                      <span className="text-red-500">{placeBirth.error}</span>
                    )}
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      {t["191"]}
                    </label>
                    <input
                      onInput={() => debDateBirth()}
                      ref={dateBirth.ref}
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                    {dateBirth.error && (
                      <span className="text-red-500">{dateBirth.error}</span>
                    )}
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      {t["192"]}
                    </label>
                    <input
                      onInput={() => debPhone()}
                      ref={phone.ref}
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                    {phone.error && (
                      <span className="text-red-500">{phone.error}</span>
                    )}
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      {t["193"]}
                    </label>
                    <input
                      onInput={() => debAddress()}
                      ref={address.ref}
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                    {address.error && (
                      <span className="text-red-500">{address.error}</span>
                    )}
                  </div>
                </div>
                {account.user.permission === 2 ? (
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        {t["195"]}
                      </label>
                      <input
                        onInput={() => debCertificate()}
                        ref={certificate.ref}
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      />
                      {certificate.error && (
                        <span className="text-red-500">{certificate.error}</span>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        {t["196"]}
                      </label>
                      <input
                        onInput={() => debEducation()}
                        ref={education.ref}
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      />
                      {education.error && (
                        <span className="text-red-500">{education.error}</span>
                      )}
                    </div>
                  </div>
                )}
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      {t["197"]}
                    </label>
                    <input
                      onInput={() => debLevel()}
                      ref={level.ref}
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                    {level.error && (
                      <span className="text-red-500">{level.error}</span>
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
