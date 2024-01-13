import { LAUNCHPAD_STATUS } from "./constants";

export const formatSmartNumber = (num: number | string): string => {
  if (typeof num === "string") {
    num = Number(num);
  }

  if (num >= 10) {
    return parseFloat(num.toFixed(1)).toString();
  } else if (num >= 1) {
    return parseFloat(num.toFixed(2)).toString();
  } else {
    let numberDecimalAfterZero = 3;

    // if (Number(num) >= 0.1) {
    // 	numberDecimalAfterZero = 4;
    // }

    const strNumber = num.toFixed(13).toString();
    const arr = strNumber.split(".");
    if (arr.length === 1) {
      return num.toString();
    }
    const decimal = arr[1];
    //find first non-zero number
    let index = 0;
    while (index < decimal.length && decimal[index] === "0") {
      index++;
    }
    if (index === decimal.length) {
      return parseFloat(num.toString()).toString();
    }

    let threeDecimal = decimal.slice(index, index + numberDecimalAfterZero);

    threeDecimal = Number(threeDecimal.split("").reverse().join(""))
      .toString()
      .split("")
      .reverse()
      .join("");

    return `${arr[0]}.${decimal.slice(0, index)}${threeDecimal}`;
  }
};

export function numberWithCommas(x: number | string | undefined) {
  // console.log(formatSmartNumber(x ?? ""));
  return !x
    ? ""
    : formatSmartNumber(x)
        .toString()
        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
        .replace(/\.0$/, "");
}

// time in milliseconds
export function timeDiff(current: number, start: number, end: number) {
  let status = LAUNCHPAD_STATUS.END;
  if (current < start) status = LAUNCHPAD_STATUS.UPCOMING;
  if (current < end) status = LAUNCHPAD_STATUS.INPROGRESS;

  const diff =
    status === LAUNCHPAD_STATUS.UPCOMING
      ? start - current
      : status === LAUNCHPAD_STATUS.INPROGRESS
      ? end - current
      : current - end;
  let msec = diff;
  const d = Math.floor(msec / 1000 / 24 / 60 / 60);
  msec -= d * 1000 * 24 * 60 * 60;
  const h = Math.floor(msec / 1000 / 60 / 60);
  msec -= h * 1000 * 60 * 60;
  const m = Math.floor(msec / 1000 / 60);
  msec -= m * 1000 * 60;
  const s = Math.floor(msec / 1000);

  return { d, h, m, s, status };
}

export const statusToText = (status: LAUNCHPAD_STATUS | undefined) => {
  switch (status) {
    case LAUNCHPAD_STATUS.UPCOMING:
      return "open in:";

    case LAUNCHPAD_STATUS.INPROGRESS:
      return "end after:";

    case LAUNCHPAD_STATUS.END:
      return "end from:";

    default:
      return "";
  }
};
