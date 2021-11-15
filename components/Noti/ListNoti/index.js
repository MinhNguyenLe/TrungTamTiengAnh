import React from "react";

export default function ListNoti() {
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
        <div className="flex-auto p-4">
          <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
            <span className="font-semibold text-xl text-blueGray-700">
              List notification
            </span>
            <div className="relative w-auto flex-initial">
              <div> Tài liệu lý thuyếtFolder Tài liệu thực hành</div>
              <div>[Lý thuyết] Bài tập lý thuyết 20/9/2021</div>
              <div>[Lý thuyết] Bài tập lý thuyết 20/9/2021</div>
              <div>[Lý thuyết] Bài tập buổi 27/9/2021</div>
              <div>Bài tập buổi 4/10/2021</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
