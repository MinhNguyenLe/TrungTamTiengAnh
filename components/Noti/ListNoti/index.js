import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import use18n from "i18n/use18n";

export default function ListNoti() {
  const target = useSelector((state) => state.class.target);
  console.log(target.noti);
  const router = useRouter();
  const t = use18n();

  return target.noti && target.noti.length ? (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
        <div className="flex-auto p-4">
          <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
            <div
              style={{ display: "flex", flexDirection: "column" }}
              className="relative w-auto flex-initial"
            >
              {target?.session
                ? target.session?.map((item, index) => (
                  <div>
                    <Link
                      key={`${item.id}session`}
                      href={`./${router.query.code}/session/${index + 1}`}
                    >
                      <a className="font-bold text-lightBlue-600 mt-8">* {t["236"]}{index + 1}</a>
                    </Link>
                    <hr className="my-4 md:min-w-full" />
                  </div>
                ))
                : null}
            </div>
          </div>
        </div>
      </div>

      <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg mt-10">
        <div className="flex-auto p-4">
          <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
            <div
              style={{ borderBottom: "1px solid #333", paddingBottom: "8px" }}
              className="font-semibold text-xl text-blueGray-700 mb-2"
            >
              {t["104"]}
            </div>
            <div
              style={{ display: "flex", flexDirection: "column" }}
              className="relative w-auto flex-initial"
            >
              {target.noti
                ? target.noti.map((item) => (
                  <div>
                    <Link
                      key={`${item.id}notilist`}
                      href={`${router.asPath}/${item.id}`}
                    >
                      <a className="font-bold text-indigo-600 mt-8">* {item.title} - {new Date(item.createdAt).toLocaleDateString()}</a>
                    </Link>
                    <hr className="my-4 md:min-w-full" />
                  </div>
                ))
                : null}
            </div>
          </div>
        </div>
      </div>
    </>
  ) : null;
}
