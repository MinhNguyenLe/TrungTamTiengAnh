import React, { useRef, useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setListRef } from "redux/actions/quizzes";

export default function Field({ text, index }) {
  const dispatch = useDispatch()
  const [isText, setIsText] = useState(false)

  const refs = useSelector((state) => state.quizzes.refs);

  const changeValue = (e) => {
    const result = [];
    [...refs].forEach((_item, _index) => {
      if (_index === index) result.push(e.target.value)
      else result.push(_item)
    })
    dispatch(setListRef(result))
  }

  const toggleText = () => {
    if (isText) {
      setIsText(false)
    } else {
      setIsText(true)
    }
  }
  return (
    <div className="flex" style={{ alignItems: "center" }}>
      {!isText ? (
        <>
          <div className="" style={{ marginRight: 12 }}>
            <label style={{ marginRight: 2 }} for={`Aidquizzes${index}`}>A.</label>
            <input onChange={(e) => changeValue(e)} type="radio" id={`Aidquizzes${index}`} name={`idquizzes${index}`} value={'a'} />
          </div >
          <div className="" style={{ marginRight: 12 }}>
            <label style={{ marginRight: 2 }} for={`Bidquizzes${index}`}>B.</label>
            <input onChange={(e) => changeValue(e)} type="radio" id={`Bidquizzes${index}`} name={`idquizzes${index}`} value={'b'} />
          </div>
          <div className="" style={{ marginRight: 12 }}>
            <label style={{ marginRight: 2 }} for={`Cidquizzes${index}`}>C.</label>
            <input onChange={(e) => changeValue(e)} type="radio" id={`Cidquizzes${index}`} name={`idquizzes${index}`} value={'c'} />
          </div>
          <div className="" style={{ marginRight: 12 }}>
            <label style={{ marginRight: 2 }} for={`Didquizzes${index}`}>D.</label>
            <input onChange={(e) => changeValue(e)} type="radio" id={`Didquizzes${index}`} name={`idquizzes${index}`} value={'d'} />
          </div>
        </>
      ) : (
        <div className="flex" style={{ marginRight: 12, alignItems: "center" }}>
          <label
            style={{ marginRight: 8 }}
            className="block uppercase text-blueGray-600 text-xs font-bold"
            htmlFor={`input${index}`}
          >
            Answer:
          </label>
          <input
            onChange={(e) => changeValue(e)}
            id={`input${index}`}
            type="text"
            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          />
        </div>
      )
      }
      <div className="">
        <button
          className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1ease-linear transition-all duration-150"
          type="button"
          onClick={toggleText}
        >
          {!isText ? "Text" : "Select"}
        </button>
      </div >
    </div >
  );
}
