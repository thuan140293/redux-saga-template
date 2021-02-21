import { all } from 'redux-saga/effects';
import { AuthSaga } from 'modules/auth';
import { DashboardSaga } from 'modules/dashboard';
import { OrderSaga } from 'modules/order';
import { MedicalProfileSaga } from 'modules/medical-profile';
import { MedicalSaga } from 'modules/medical';
import { WalletTransactionSaga } from 'modules/wallet-transaction';
import { CommissionsSaga } from 'modules/commissions';
import { MembershipPlanSaga } from 'modules/membership-plan';
import { ProfileSaga } from 'modules/profile';
import { GeographySaga } from 'modules/geography';
import { ReferralSaga } from 'modules/referral';
import { TestGenSaga } from 'modules/test-gen';
import { CartSaga } from 'modules/cart';
import { MedicalFileSaga } from 'modules/medical-file';
import { PostSaga } from 'modules/post';
import { HealthProfileSaga } from 'modules/health-profile';
export default function* rootSaga() {
  yield all([
    AuthSaga(),
    DashboardSaga(),
    OrderSaga(),
    MedicalProfileSaga(),
    MedicalSaga(),
    WalletTransactionSaga(),
    CommissionsSaga(),
    MembershipPlanSaga(),
    ProfileSaga(),
    GeographySaga(),
    ReferralSaga(),
    TestGenSaga(),
    CartSaga(),
    MedicalFileSaga(),
    HealthProfileSaga(),
    PostSaga(),

  ]);
}
