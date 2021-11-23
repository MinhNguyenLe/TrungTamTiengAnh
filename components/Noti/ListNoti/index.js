import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";

export default function ListNoti() {
  const target = useSelector((state) => state.class.target);
  const router = useRouter();

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
        <div className="flex-auto p-4">
          <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
            <div
              style={{ borderBottom: "1px solid #333", paddingBottom: "8px" }}
              className="font-semibold text-xl text-blueGray-700"
            >
              List notification
            </div>
            <div className="relative w-auto flex-initial">
              {target.noti
                ? target.noti.map((item) => (
                    <Link
                      key={`${item.id}notilist`}
                      href={`${router.asPath}/${item.id}`}
                    >
                      {item.content}
                    </Link>
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
