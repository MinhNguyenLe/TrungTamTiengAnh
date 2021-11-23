import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ListNoti from "components/Noti/ListNoti";

import ClassLayout from "layouts/ClassLayout.js";

import use18n from "i18n/use18n";
import { useDispatch, useSelector } from "react-redux";
import { setTargetClass } from "redux/actions/class";

import axios from "axios";
import { useHostAPI } from "customHook/nonReact";
export default function Class() {
  const t = use18n();
  const host = useHostAPI();

  const router = useRouter();

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(router);
    Promise.all([axios.get(`${host}/api/classes/${router.query.code}`)])
      .then(([res]) => {
        dispatch(setTargetClass(res.data));
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-12/12 px-4 mb-6">
          <ListNoti />
        </div>
        <div className="w-full lg:w-12/12 px-4"></div>
      </div>
    </>
  );
}

Class.layout = ClassLayout;
