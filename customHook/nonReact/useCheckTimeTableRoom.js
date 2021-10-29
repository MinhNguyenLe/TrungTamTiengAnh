function compareTimeTable(a, b) {
  return a.begin - b.begin;
}

const checkValPushArr = (arr) => {
  /**
   * rule :  push begin != begin begin && push begin > begin begin && push end < after begin
   */
  const sortArr = [...arr].sort(compareTimeTable);

  let result = [];
  result.push(sortArr[0]);

  for (let i = 1; i < sortArr.length; i++) {
    /*
     *push begin != begin begin
     */
    if (sortArr[i]["begin"] !== result[result.length - 1]["begin"]) {
      /*
       *push end < after begin
       */
      if (sortArr[i]["begin"] >= result[result.length - 1]["end"]) {
        result.push(sortArr[i]);
      }
    }
  }

  return result;
};

const formatTimeTable = (arr) => {
  /*
   *arr : ["12.0013.00"]
   */
  let formatArr = [];

  [...arr].forEach((e) => {
    formatArr.push({
      begin: parseFloat(e.slice(0, 5)),
      end: parseFloat(e.slice(5, 10)),
    });
  });

  return formatArr;
};

const addZero = (str) => {
  /**
   * 2
   */
  if (str.length === 1) return "0" + str + ".00";

  /**
   * 2.5
   */
  if (str.length === 3) return "0" + str + "0";

  /**
   * 12.5
   */
  if (str.length === 4) return str + "0";

  /**
   *12
   */
  if (str.length === 2) return str + ".00";
};

const check = (befArr, aftArr) => {
  let fillArr = [],
    result = [];
  for (let value of aftArr) {
    if (value.length === 10) fillArr.push(value);
  }
  const acceptArr = checkValPushArr(formatTimeTable(fillArr));

  const formatBefArr = formatTimeTable(befArr);

  for (let value of acceptArr) {
    for (let [index, e] of formatBefArr.entries()) {
      /**
       * the last value of list array parent
       */
      if (index === formatBefArr.length - 1) {
        if (value["begin"] >= e["end"]) {
          const p =
            addZero(value.begin.toString()) + addZero(value.end.toString());
          result.push(p);
        }
      } else {
        /**
         * push begin > begin begin && push end < after begin
         */
        if (
          value.begin >= e.end &&
          value.end <= formatBefArr[index + 1]["begin"]
        ) {
          result.push(value);
        }
      }
    }
  }

  return result;
};

export const useCheckTimeTableRoom = () => {
  return { check };
};
