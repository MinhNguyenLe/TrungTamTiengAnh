/**
 * input object -> value + require-> un null/ > 10 /length < 50
 * -> object value ,err : boolean, message : string -> success / error require
 * require -> empty / min / max / format
obj {value, require[],}
*/
import React, { useState, useRef } from "react";

const require = {
  1: "check null",
  2: "min",
  3: "max",
  4: "max length",
  5: "min length",
};

function validate(obj) {
  if (obj.require === 1 || obj.require === require["1"]) {
    if (!obj.value || !obj.value.length) {
      return {
        err: true,
        mess: "This field is required !",
      };
    }
  }
  if (obj.require === 2 || obj.require === require["2"]) {
    if (parseInt(obj.value) < parseInt(obj.requireValue)) {
      return {
        err: true,
        mess: `Min value is ${obj.requireValue}!`,
      };
    }
  }
  if (obj.require === 3 || obj.require === require["3"]) {
    if (parseInt(obj.value) > parseInt(obj.requireValue)) {
      return {
        err: true,
        mess: `Max value is ${obj.requireValue}!`,
      };
    }
  }
  if (obj.require === 4 || obj.require === require["4"]) {
    if (obj.value.length < obj.requireValue) {
      return {
        err: true,
        mess: `Min length is ${obj.requireValue}!`,
      };
    }
  }
  if (obj.require === 5 || obj.require === require["5"]) {
    if (obj.value.length > obj.requireValue) {
      return {
        err: true,
        mess: `Max length value is ${obj.requireValue}!`,
      };
    }
  }
  return { err: false };
}

export const useVali = (obj) => {
  const ref = useRef("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const checkErr = () => {
    if (obj.test === 1) console.log(ref.current.value);
    for (let i = 0; i < obj.require.length; i++) {
      const out = validate({
        value: ref.current.value,
        require: obj["require"][i],
        requireValue: obj?.requireValue,
      });
      if (out.err) {
        setError(out.mess);
        setSuccess(false);
        return;
      }
    }
    setError("");
    setSuccess(true);
  };

  return { checkErr, ref: ref, error, success };
};
