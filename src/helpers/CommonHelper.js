const moment = require("moment");
const countryTimezone = require("country-timezone");

let timer;
const DEFAULT_TIMEOUT = 500;

export function debounced(fn) {
  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(() => {
    fn();
    timer = null;
  }, DEFAULT_TIMEOUT);
}

export const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const formatDate = (date, format = "HH:mm DD/MM/YYYY") => {
  const country = JSON.parse(localStorage.getItem("userInfo"));
  let tz = countryTimezone.getTimezones(country.country);
  if (tz.length == 0) {
    tz = "Asia/Ho_Chi_Minh";
    const newDate = moment(date).tz(tz).format(format);
    return newDate;
  } else {
    const newDate = moment(date).tz(tz[0]).format(format);
    return newDate;
  }

  // const tz = new Date().getTimezoneOffset();
  // const newDate = moment(date).zone(tz).format(format);
  // const tz = "+7";
  // const newDate = moment(date).utc(tz).format(format);
  // const tz = "Asia/Ho_Chi_Minh";
  // const newDate = moment(date).tz(tz).format(format);
  // const mnths = {
  //   Jan: '01',
  //   Feb: '02',
  //   Mar: '03',
  //   Apr: '04',
  //   May: '05',
  //   Jun: '06',
  //   Jul: '07',
  //   Aug: '08',
  //   Sep: '09',
  //   Oct: '10',
  //   Nov: '11',
  //   Dec: '12',
  // };
  // const res = timeZone.split(' ');
  // return `${[res[3], mnths[res[1]], res[2]].join('-')} ${res[4]}`;
};

export const getBase64 = async (img) => {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result));
    reader.readAsDataURL(img);
  })
  
}

export const getParamFromURL = (value = "") => {
  return new URL(window.location.href).searchParams.get(value)
}
