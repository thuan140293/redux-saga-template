import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import AuthReducer from './redux/reducer';
import AuthSaga from './redux/sagas';
import ResetPassword from './pages/ResetPassword';
import ActivePage from './pages/ActivePage'
import RequestNewPassword from './pages/ResetPassword/RequestNewPassword'

// Export for component 
export { 
  SignInPage,
  SignUpPage,
  ResetPassword,
  ActivePage,
  RequestNewPassword
};

// Export for redux
export {
  AuthReducer,
  AuthSaga
};