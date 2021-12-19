import React, { useEffect, useState } from "react";

import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";

import ScheduleList from "components/Schedule/ScheduleList"
import { useHostAPI } from "customHook/nonReact";
import axios from "axios";
import use18n from "i18n/use18n";

import { useDispatch, useSelector } from "react-redux";
import Admin from "layouts/Admin";
import ProfileForm from "components/Dialog/ProfileForm";

export default function Profile() {
  const t = use18n();

  const host = useHostAPI();

  const dispatch = useDispatch();
  const account = useSelector((state) => state.user.account);

  const [changeModal, setChangeModal] = useState(false);

  return (
    <>
      <main className="profile-page">
      {changeModal ? (
        <ProfileForm
          showModal={changeModal}
          setShowModal={setChangeModal}
          page="edit"
        />
      ) : null}
        <section className="relative block h-300-px">
         
        </section>
        <section className="relative py-16 bg-blueGray-200">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative">
                      <img
                        alt="..."
                        src="/img/team-2-800x800.jpg"
                        className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6 px-3 mt-32 sm:mt-0">
                      <button
                      onClick={()=> setChangeModal(true)}
                        className="bg-blueGray-700 active:bg-blueGray-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                        type="button"
                      >
                        {t["182"]}
                      </button>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                  </div>
                </div>
                <div className="text-center mt-10">
                  <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                    {account.user.userName}
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
                  <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                  {account.user.dateBirth}- {account.user.placeBirth}
                </div>
                {account.user.permission === 2 ? (
                  <div className="mb-2 text-blueGray-600">
                  <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                  {t["184"]}: {account.certificate || "No information"}
                </div>
                ) : (
                  <div className="mb-2 text-blueGray-600">
                  <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                  {t["186"]}: {account.education || "No information"}
                </div>
                )
                }
                <div className="mb-2 text-blueGray-600">
                <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                  {t["185"]}: {account.level || "No information"}
                </div>
                </div>
                <div className="mt-10 py-10 border-t border-blueGray-200">
                <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                    {t["183"]}
              </span>
                    <ScheduleList setShowModal={()=> console.log()}/>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
Profile.layout = Admin;