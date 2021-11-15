import React from "react";
import { useDispatch, useSelector } from "react-redux";
export default function HeaderClass() {
  const target = useSelector((state) => state.class.target);
  return (
    <>
      <div className="relative bg-blueGray-800 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div className="flex flex-wrap">
            <div className="w-full lg:w-12/12 xl:w-12/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                <div className="flex-auto p-4">
                  <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                    <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                      {target.code}
                    </h5>
                    <span className="font-semibold text-xl text-blueGray-700">
                      {target.name}
                    </span>
                    <div className="relative w-auto flex-initial">
                      GV : Nguyen Le Minh
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
