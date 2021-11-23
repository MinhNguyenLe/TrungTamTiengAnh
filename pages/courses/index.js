import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import use18n from "i18n/use18n";
// components
import axios from "axios";
import { useHostAPI } from "customHook/nonReact";

import { useDispatch, useSelector } from "react-redux";
import { setListCourse, setTargetCourse } from "redux/actions/course";

import Link from "next/link";

// components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";
export default function Course({ setShowModalEdit, setShowModalAddClass }) {
  const t = use18n();

  const host = useHostAPI();

  const router = useRouter();

  const dispatch = useDispatch();
  const listCourse = useSelector((state) => state.course.list);

  useEffect(() => {
    console.log(router);
    Promise.all([axios.get(`${host}/api/courses`)])
      .then(([res]) => {
        dispatch(setListCourse(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteCourse = (id) => {
    Promise.all([axios.delete(`${host}/api/courses/${id}`)])
      .then(([res]) => {
        dispatch(setListCourse(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const gotoEdit = (id) => {
    dispatch(setTargetCourse(id));
    setShowModalEdit(true);
  };

  const gotoAddClass = (id) => {
    setShowModalAddClass(true);
    dispatch(setTargetCourse(id));
  };

  return (
    <>
      <IndexNavbar transparent />
      {/* <Navbar transparent /> */}
      <main>
        <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.squarespace-cdn.com/content/v1/5a468e95d55b4166712c34e7/1516064162572-7E6MGRD983QFPWJK4170/conversation-1940x900_31263.jpg?format=1500w')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-75 bg-black"
            ></span>
          </div>
          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                <div className="pr-12">
                  <h1 className="text-white font-semibold text-5xl">
                    ENGLISH FOR SPECIFIC SKILLS
                  </h1>
                  <p className="mt-4 text-lg text-blueGray-200">
                    A wide range of specialized short courses, each focused on a particular business situation or skill. Participants learn specific vocabulary and essential skills to enable them to communicate confidently and effectively</p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-16"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </div>

        <section className="pb-20 bg-white -mt-24">
          <div className="container mx-auto px-4">




            {listCourse?.map((course) => (
              <tr
                className="cursor-pointer hover:bg-blueGray-200"
                key={`list-course-${course.id}`}
              >
                <div className="flex flex-wrap items-center mt-32">
                  <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
                    <h3 className="text-3xl mb-2 font-semibold leading-normal">
                      {course.name}
                    </h3>
                    <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-blueGray-600">
                      {course.members}
                    </p>
                    <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-blueGray-600">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }).format(course.tuition)}
                    </p>
                    <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-blueGray-600">
                      {new Date(course.timeBegin).toLocaleDateString()} đến {new Date(course.timeEnd).toLocaleDateString()}
                    </p>
                    <Link href="/auth/login">
                      <a href="#pablo" className="font-bold text-blueGray-700 mt-8">
                        Registration!
                      </a>
                    </Link>
                  </div>
                  <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-blueGray-700">
                      <img
                        alt="..."
                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80"
                        className="w-full align-middle rounded-t-lg"
                      />
                      <blockquote className="relative p-8 mb-4">
                        <svg
                          preserveAspectRatio="none"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 583 95"
                          className="absolute left-0 w-full block h-95-px -top-94-px"
                        >
                          <polygon
                            points="-30,95 583,95 583,65"
                            className="text-blueGray-700 fill-current"
                          ></polygon>
                        </svg>
                        <h4 className="text-xl font-bold text-white">
                          ENGLISH FOR SPECIFIC SKILLS
                        </h4>

                        <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-white">
                          {course.level}
                        </p>
                      </blockquote>
                    </div>
                  </div>
                </div>
              </tr>
            ))}




          </div>
        </section>
      </main>
      <Footer />

    </>
  );
}
