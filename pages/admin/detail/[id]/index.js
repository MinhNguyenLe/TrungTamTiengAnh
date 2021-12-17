import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import use18n from "i18n/use18n";
// components
import axios from "axios";
import { useHostAPI } from "customHook/nonReact";

import { useDispatch, useSelector } from "react-redux";
import { setListCourse, setTargetCourse } from "redux/actions/course";
import Admin from "layouts/Admin.js";
import Link from "next/link";

// components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";
export default function Detail({ setShowModalEdit, setShowModalAddClass }) {
  const t = use18n();

  const host = useHostAPI();

  const router = useRouter();

  const dispatch = useDispatch();
  const course = useSelector((state) => state.course.target);
  
  useEffect(() => {
    Promise.all([axios.get(`${host}/api/courses/${router.query.id}`)])
      .then(([res]) => {
        dispatch(setTargetCourse(res.data));
        console.log(course);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <IndexNavbar transparent />
      {/* <Navbar transparent /> */}
      <main>
        

        <section className="pb-20 bg-white -mt-24">
          <div className="container mx-auto px-4">
            
            <div className="flex flex-wrap  mt-32">
              <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
                <h3 className="text-3xl mb-2 font-semibold leading-normal">
                  Danh sách lớp
                </h3>
                {course.classes?.map((classes) => (
                  <tr
                    className="cursor-pointer w-full hover:bg-blueGray-200"
                    key={`list-course-${classes.id}`}
                  >
                    <div className="w-full h-12">
                      <p className="text-lg font-light mr-12 float-left leading-relaxed text-blueGray-600">
                        {classes.name}
                      </p>
                      <Link href={`/admin/courses`}>
                        <a href="#pablo" className="font-bold float-right text-blueGray-700 " >
                          Registration!
                        </a>
                      </Link>
                    </div>
                  </tr>
                ))}

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
                      {course.name}
                    </h4>

                    <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-white">
                      Level: {course.level}
                    </p>
                    <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-white">
                      Thời gian: {new Date(course.timeBegin).toLocaleDateString()} đến {new Date(course.timeEnd).toLocaleDateString()}
                    </p>
                    <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-white">
                      Học phí: {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }).format(course.tuition)}
                    </p>
                    <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-white">
                      {course.information}
                    </p>
                  </blockquote>
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
Detail.layout = Admin;