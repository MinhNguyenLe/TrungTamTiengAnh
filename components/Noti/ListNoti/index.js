import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import use18n from "i18n/use18n";

export default function ListNoti() {
  const target = useSelector((state) => state.class.target);
  const router = useRouter();
  const t = use18n();

  return target.noti && target.noti.length ? (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
        <div className="flex-auto p-4">
          <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
            <div
              style={{ borderBottom: "1px solid #333", paddingBottom: "8px" }}
              className="font-semibold text-xl text-blueGray-700"
            >
              {t["104"]}
            </div>
            <div
              style={{ display: "flex", flexDirection: "column" }}
              className="relative w-auto flex-initial"
            >
              {target.noti
                ? target.noti.map((item) => (
                    <Link
                      key={`${item.id}notilist`}
                      href={`${router.asPath}/${item.id}`}
                    >
                      {item.title}
                    </Link>
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>
    </>
  ) : null;
}
