import {GET_REFERRAL, GET_REFERRAL_SUCCESS, GET_YOUR_NETWORK, GET_YOUR_NETWORK_SUCCESS} from './constants';


export const getReferral = () => {
  return {
    type: GET_REFERRAL,
  };
};
export const getReferralSuccess = (data) => {
  return {
    type: GET_REFERRAL_SUCCESS,
    payload: data,
  };
};

export const getYourNetwork = (data) => {
  return {
    type: GET_YOUR_NETWORK,
    payload: data
  };
}

export const getYourNetworkSuccess = (data) => {
  return {
    type: GET_YOUR_NETWORK_SUCCESS,
    payload: data
  };
}

