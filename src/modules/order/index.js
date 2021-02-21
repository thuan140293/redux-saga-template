import PageList from './pages/PageList';
import PageOrderDetail from './pages/PageDetail';

import OrderReducer from './redux/reducer';
import OrderSaga from './redux/sagas';
// Export for component
export {
  PageList,
  PageOrderDetail,
};

// Export for redux
export {
  OrderReducer,
  OrderSaga,
};

