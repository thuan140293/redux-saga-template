export const ROOT_API_URL = process.env.REACT_APP_API;
export const ROUTE_REPORT = "/report";
export const ROUTE = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  FORGOT_PASSWORD: "/forgot",
  ACTIVE_ACCOUNT: "/active",
  ORDER: "/order",
  MEDICAL_PROFILE: "/medical-profile",
  APPOINTMENT: "/appointment",
  PUBLIC: "/public",
  PUBLIC_PROFILE: "/public/medical-profile",
  WALLET_TRANSACTION: "/transactions",
  COMMISSIONS: "/commissions",
  PAYMENT_SUCCESS: "/payment-success",
  PAYMENT_ERROR: "/payment-cancel",
  MEMBERSHIP_PLAN: "/membership-plan",
  REFERRAL_NETWORK: "/your-referals",
  REFERRAL_BINARY_NETWORK: "/binary-network",
  REFERRAL: "/ref-user",
  TEST_GEN: "/test-gen",
  TEST_GEN_DETAIL: "/test-gen/:id",
  CART: "/cart",
  MEDICAL_FILE: "/medical-profile/file/:id",
  HEALTH_PROFILE: "/profile/health-profile",
  POST: "/post",
  POST_DETAIL: "/post/:id",
  ORDER_DETAIL: "/order/:id",
  SETTING: "/setting",
  RESET_PASSWORD: "/reset-password",

  PRODUCT_LIST: "/products",
  REPORT_WALLET: `${ROUTE_REPORT}/wallets`,
  REPORT_TRANSCATION: `${ROUTE_REPORT}/transactions`,
  REPORT_COMMISSION: `${ROUTE_REPORT}/commissions`,
  REPORT_REFERAL: `${ROUTE_REPORT}/referals`,
  REPORT_ORDER: `${ROUTE_REPORT}/orders`,
  CUSTOMER: "/customer",
  DASHBOARD: "/dashboard",
};

export const LANGUAGE_LIST = [
  { key: "en", name: "lang.en", url: "en-flag.png" },
  {
    key: "vi",
    name: "lang.vi",
    url: "vn-flag.jpg",
  },
];
export const LANGUAGE = "lang";
export const USER_INFO_KEY = "userInfo";
export const CART_DATA_KEY = "cartData";
export const CURRENT_STEP_CART_KEY = "cartCurrentStep";
export const VERSION = "1.0.20";
export const HOTLINE = "(+84) 19003051";
export const SUPPORTLINK = "https://go.icarebase.com/vn-support";
export const KNOWLEDGEBASELINK = "https://help.icarebase.com/";
export const REPORTBUG = "https://go.icarebase.com/bugs";

export const OPTION_HOURS = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
];
export const OPTION_MINUTES = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
  "32",
  "33",
  "34",
  "35",
  "36",
  "37",
  "38",
  "39",
  "40",
  "41",
  "42",
  "43",
  "44",
  "45",
  "46",
  "47",
  "48",
  "49",
  "50",
  "51",
  "52",
  "53",
  "54",
  "55",
  "56",
  "57",
  "58",
  "59",
];

export const OPTION_COMMISSIONS_TYPES = {
  all: "ALL",
  earn: "EARN",
  receive: "RECIEVE",
};

export const OPTION_TRANSACTIONS_TYPES = {
  USDTTRON: "USDTTRON",
  USDTJSB: "USDTJSB",
  JSB: "JSB",
};

export const MENU_HEADER = [
  {
    name: "header.dashboard",
    url: ROUTE.DASHBOARD,
    icon: "dashboard",
    permission: "",
  },
  {
    name: "header.report",
    icon: "report",
    permission: "",
    submenu: [
      {
        name: "header.wallets",
        url: ROUTE.REPORT_WALLET,
        icon: "",
        permission: "",
      },
      {
        name: "header.transactions",
        url: ROUTE.REPORT_TRANSCATION,
        icon: "",
        permission: "",
      },
      {
        name: "header.commissions",
        url: ROUTE.REPORT_COMMISSION,
        icon: "",
        permission: "",
      },
      {
        name: "header.referals",
        url: ROUTE.REPORT_REFERAL,
        icon: "",
        permission: "",
      },
      {
        name: "header.orders",
        url: ROUTE.REPORT_ORDER,
        icon: "",
        permission: "",
      },
    ],
  },
  {
    name: "header.product",
    url: ROUTE.PRODUCT_LIST,
    icon: "product",
    permission: "",
  },
  {
    name: "header.customer",
    url: ROUTE.CUSTOMER,
    icon: "customer",
    permission: "",
  },
  {
    name: "header.setting",
    url: ROUTE.SETTING,
    icon: "setting",
    permission: "",
  },
];
