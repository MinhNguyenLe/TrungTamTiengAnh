import React from "react";

// components

import ContactClassRoom from "components/Forms/ContactClassRoom.js";
import ClassRoomList from "components/ClassRoom/ClassRoomList.js";

// layout for page

import Admin from "layouts/Admin.js";

export default function ClassRoom() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-6/12 px-4">
          <ContactClassRoom />
        </div>
        <div className="w-full lg:w-12/12 px-4">
          <ClassRoomList />
        </div>
      </div>
    </>
  );
}

ClassRoom.layout = Admin;
