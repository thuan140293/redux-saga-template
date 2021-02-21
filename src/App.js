import React, { useState, useEffect } from "react";
import fetchHelper from "helpers/FetchHelper";
import Cookies from "js-cookie";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  useHistory,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ROUTE, LANGUAGE } from "./commons/constants";
import { PrivateLayout, PublicLayout } from "commons/layouts";
import {
  SignInPage,
  SignUpPage,
  ResetPassword,
  ActivePage,
  RequestNewPassword,
} from "modules/auth";
import { DashboardPage } from "modules/dashboard";
import { MedicalProfile } from "modules/medical-profile";
import { ProfilePage } from "modules/profile";
import { PageList, PageOrderDetail } from "modules/order";
import { WalletTransactionPageList } from "modules/wallet-transaction";
import { CommissionsList } from "modules/commissions";
import ScanMedical from "./modules/medical/pages/ScanMedical";
import MedicalDetail from "./modules/medical/pages/MedicalDetail";
import { PaymentSuccessPage, PaymentErrorPage } from "modules/payment";
import { PageMembershipPlanList } from "modules/membership-plan";
import ReferralView from "./modules/referral/pages/ReferralView";
import { PageTestGenList, PageTestGenDetail } from "modules/test-gen";
import { CartPage } from "modules/cart";
import { MedicalFilePage } from "modules/medical-file";
import { HealthProfilePage } from "modules/health-profile";
import PostPage from "./modules/post/pages/PostPage";
import { useDispatch } from "react-redux";
import { getRate } from "modules/dashboard/redux/actions";
import { getListCountry } from "modules/test-gen/redux/actions";
import { AppointmentPage } from "modules/appointment";
import { IntlProvider } from "react-intl";
import messages_vi from "translations/vi.json";
import messages_en from "translations/en.json";
import { verifyEmail, getProfile } from "modules/profile/redux/actions";

const LANGUAGE_DEFAUL = "en";
const TOKEN = "token";
const CHANGE_EMAIL_ENDPOINT = "change-email";
const messages = {
  en: messages_en,
  vi: messages_vi,
};

const languageBrowser = navigator.language.split(/[-_]/)[0];
const languageLocal = localStorage.getItem(LANGUAGE);
const isToken = () => {
  const authToken = Cookies.get("token");
  return authToken;
};

export const isLogin = () => {
  const authToken = Cookies.get("token");
  if (authToken) {
    fetchHelper.addDefaultHeader("Authorization", `Bearer ${authToken}`);
  }
  return authToken;
};

// eslint-disable-next-line react/prop-types
const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin() && restricted ? (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        ) : (
          <PublicLayout>
            <Component {...props} />
          </PublicLayout>
        )
      }
    />
  );
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin() ? (
          <PrivateLayout>
            <Component {...props} />
          </PrivateLayout>
        ) : (
          <Redirect
            to={{
              pathname: ROUTE.LOGIN,
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

const getParamFromUrl = (value = TOKEN) => {
  return new URL(window.location.href).searchParams.get(value);
};

function App() {
  const dispatch = useDispatch();
  const [showLoading, setShowLoading] = useState(false);
  const language = languageLocal || languageBrowser;
  const history = useHistory();

  const verifyURL = () => {
    const pathname = new URL(window.location.href).pathname.replace("/", "");
    const urlRedirect = window.location.origin + "/login";
    if (pathname == CHANGE_EMAIL_ENDPOINT) {
      const tokenUrl = getParamFromUrl();
      if (!tokenUrl) return;

      dispatch(
        verifyEmail({ token: tokenUrl }, () => {
          window.location.href = urlRedirect;
        })
      );
    }
  };

  useEffect(() => {
    dispatch(
      getRate({ from_currency: "ICB", to_currency: "VND" }, "rateIcbToVnd")
    );
    dispatch(
      getRate({ from_currency: "ICB", to_currency: "USD" }, "rateIcbToUsd")
    );
    dispatch(getListCountry());
    verifyURL();
    if (isToken()) {
      dispatch(getProfile());
    }
  }, [dispatch, isToken]);

  fetchHelper.addBeforeRequestInterceptor(() => setShowLoading(true));
  fetchHelper.addAfterResponseInterceptor(() =>
    setTimeout(() => setShowLoading(false), 500)
  );

  return (
    <div className="App">
      {showLoading && (
        <div className="loader loading">
          <span>
            <img
              className="image-preloader"
              src={require("assets/images/loading/loader.svg")}
              alt="loading"
            />
          </span>
        </div>
      )}
      <ToastContainer />
      <IntlProvider locale={language} messages={messages[LANGUAGE_DEFAUL]}>
        <Router>
          <PrivateRoute path={ROUTE.CART} component={CartPage} exact />
          <PrivateRoute path={ROUTE.ORDER} component={PageList} exact />
          <PrivateRoute path={ROUTE.SETTING} component={ProfilePage} exact />
          <PrivateRoute path={ROUTE.HOME} component={DashboardPage} exact />
          <PrivateRoute
            path={ROUTE.WALLET_TRANSACTION}
            component={WalletTransactionPageList}
            exact
          />
          <PrivateRoute
            path={ROUTE.COMMISSIONS}
            component={CommissionsList}
            exact
          />
          <PrivateRoute
            path={ROUTE.MEMBERSHIP_PLAN}
            component={PageMembershipPlanList}
            exact
          />
          <PublicRoute
            path={ROUTE.LOGIN}
            component={SignInPage}
            restricted
            exact
          />
          <PublicRoute
            path={ROUTE.SIGNUP}
            component={SignUpPage}
            restricted
            exact
          />
          <PublicRoute
            path={ROUTE.FORGOT_PASSWORD}
            component={ResetPassword}
            restricted
            exact
          />
          <PublicRoute
            path={ROUTE.RESET_PASSWORD}
            component={RequestNewPassword}
            restricted
            exact
          />
          <PublicRoute
            path={ROUTE.ACTIVE_ACCOUNT}
            component={ActivePage}
            exact
          />
          <PublicRoute exact path={ROUTE.PUBLIC} component={ScanMedical} />
          <PublicRoute
            exact
            path={ROUTE.PUBLIC_PROFILE}
            component={MedicalDetail}
          />
          <PrivateRoute
            path={ROUTE.MEDICAL_PROFILE}
            component={MedicalProfile}
            exact
          />
          <PrivateRoute
            path={ROUTE.PAYMENT_SUCCESS}
            component={PaymentSuccessPage}
            exact
          />
          <PrivateRoute
            path={ROUTE.PAYMENT_ERROR}
            component={PaymentErrorPage}
            exact
          />
          <PrivateRoute path={ROUTE.REFERRAL} component={ReferralView} />
          <PrivateRoute
            path={ROUTE.TEST_GEN}
            component={PageTestGenList}
            exact
          />
          <PrivateRoute
            path={ROUTE.TEST_GEN_DETAIL}
            component={PageTestGenDetail}
            exact
          />
          <PublicRoute exact path={ROUTE.POST} component={PostPage} />
          <PublicRoute exact path={ROUTE.POST_DETAIL} component={PostPage} />
          <PrivateRoute
            path={ROUTE.MEDICAL_FILE}
            component={MedicalFilePage}
            exact
          />
          <PrivateRoute
            path={ROUTE.HEALTH_PROFILE}
            component={HealthProfilePage}
            exact
          />
          <PrivateRoute
            path={ROUTE.ORDER_DETAIL}
            component={PageOrderDetail}
            exact
          />

          <PrivateRoute
            path={ROUTE.APPOINTMENT}
            component={AppointmentPage}
            exact
          />
        </Router>
      </IntlProvider>
    </div>
  );
}

export default App;
