import { CONTEXT_ACTIONS } from "./types";

export const AppReducer = (state, { payload, type }) => {
  switch (type) {
    case CONTEXT_ACTIONS.SET_WALLET_CONNECTED:
      return {
        ...state,
        wallet: payload.wallet,
        walletAddress: payload.walletAddress,
        walletType: payload.walletType,
      };

    default:
      return state;
  }
};
