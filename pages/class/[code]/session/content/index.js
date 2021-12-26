import { useEffect, useState } from "react";
import QuillForm from "components/Dialog/QuillForm";

import axios from "axios";
import { useHostAPI } from "customHook/nonReact";

import { useRouter } from "next/router";
import Link from "next/link";

import Admin from "layouts/Admin.js";
import { useDispatch, useSelector } from "react-redux";
import { setTargetClass } from "redux/actions/class";

import use18n from "i18n/use18n";
import { Markup } from 'interweave';

export default function SessionChild() {
  const t = use18n();
  const host = useHostAPI();
  const router = useRouter();
  const dispatch = useDispatch()

  const account = useSelector((state) => state.user.account);
  const targetClass = useSelector((state) => state.class.target);
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-12/12 px-4">
        </div>
        <div className="w-full lg:w-12/12 px-4">
          <QuillForm />
        </div>
      </div>
    </>
  );
}

SessionChild.layout = Admin;
