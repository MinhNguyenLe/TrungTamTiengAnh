import React from "react";
import { useDispatch, useSelector } from "react-redux";
// components

import Link from "next/link";
export default function CardProfile() {
  const account = useSelector((state) => state.user.account);
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
        <div className="px-6">
          <div className="flex flex-wrap justify-center">
            <div className="w-full px-4 flex justify-center">
              <div className="relative">
                <img
                  alt="..."
                  src="/img/team-2-800x800.jpg"
                  className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                />
              </div>
            </div>
            <div className="w-full px-4 text-center mt-20">
              {/* <div className="flex justify-center py-4 lg:pt-4 pt-8">
                <div className="mr-4 p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                    22
                  </span>
                  <span className="text-sm text-blueGray-400">Friends</span>
                </div>
                <div className="mr-4 p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                    10
                  </span>
                  <span className="text-sm text-blueGray-400">Photos</span>
                </div>
                <div className="lg:mr-4 p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                    89
                  </span>
                  <span className="text-sm text-blueGray-400">Comments</span>
                </div>
              </div> */}
            </div>
          </div>
          <div className="text-center mt-12">
            <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
            {account.user.firstName} {account.user.lastName}
            </h3>
            <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
              <i className="fas fa-birthday-cake mr-2 text-lg text-blueGray-400"></i>{" "}
              {account.user.dateBirth} - {account.user.placeBirth}
            </div>
            <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
              <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>{" "}
              {account.user.address}
            </div>
            <div className="mb-2 text-blueGray-600 mt-10">
              <i className="fas fa-venus-mars mr-2 text-lg text-blueGray-400"></i>
              {account.user.gender ? "Nam" : "Nu"}
            </div>
            <div className="mb-2 text-blueGray-600">
              <i className="fas fa-address-card mr-2 text-lg text-blueGray-400"></i>
              {account.user.nameRole}
            </div>
            <div className="mb-2 text-blueGray-600">
              <i className="fas fa-phone mr-2 text-lg text-blueGray-400"></i>
              {account.user.phoneNumber}
            </div>

            <div className="mb-2 text-blueGray-600">
            <Link href="/">
                  <button
                    className="bg-red-500 text-white active:bg-red-500 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                    type="button"
                   
                  >
                    Logout
                  </button>
            </Link>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
}
