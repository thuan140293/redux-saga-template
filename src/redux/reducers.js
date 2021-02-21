import { combineReducers } from 'redux';
import { AuthReducer } from 'modules/auth';
import { OrderReducer } from 'modules/order';
import { DashboardReducer } from 'modules/dashboard';
import { MedicalProfileReducer } from 'modules/medical-profile';
import { WalletTransactionReducer } from 'modules/wallet-transaction';
import { MedicalReducer } from 'modules/medical';
import { CommissionsReducer } from 'modules/commissions';
import { MembershipPlanReducer } from 'modules/membership-plan';
import { ProfileReducer } from 'modules/profile';
import { GeographyReducer } from 'modules/geography';
import { ReferralReducer } from 'modules/referral';
import { TestGenReducer } from 'modules/test-gen';
import { CartReducer } from 'modules/cart';
import { MedicalFileReducer } from 'modules/medical-file';
import { PostReducer } from 'modules/post';
import { HealthProfileReducer } from 'modules/health-profile';
export default combineReducers({
  auth: AuthReducer,
  order: OrderReducer,
  dashboard: DashboardReducer,
  medicalProfile: MedicalProfileReducer,
  walletTransaction: WalletTransactionReducer,
  medical: MedicalReducer,
  commissions: CommissionsReducer,
  membershipPlan: MembershipPlanReducer,
  profile: ProfileReducer,
  geography: GeographyReducer,
  referral: ReferralReducer,
  testGen: TestGenReducer,
  post: PostReducer,
  cart: CartReducer,
  medicalFile: MedicalFileReducer,
  healthProfile: HealthProfileReducer
});

