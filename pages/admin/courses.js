import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import use18n from "i18n/use18n";
// components
import axios from "axios";
import { useHostAPI } from "customHook/nonReact";

import { useDispatch, useSelector } from "react-redux";
import { setListCourse, setTargetCourse } from "redux/actions/course";

import Link from "next/link";
import Admin from "layouts/Admin.js";
// components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";
export default function Courses({ setShowModalEdit, setShowModalAddClass }) {
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
      <main>
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
                      Thời gian: {new Date(course.timeBegin).toLocaleDateString()} đến {new Date(course.timeEnd).toLocaleDateString()}
                    </p>
                    <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-blueGray-600">
                      Học phí: {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }).format(course.tuition)}
                    </p>
                    <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-blueGray-600">
                      {course.information}
                    </p>
                    <Link key={`id${course.id}`} href={`/admin/detail/${course.id}`}>
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

    </>
  );
}
Courses.layout = Admin;