import { SHOW_MODAL_WALLET, SET_IS_EVM } from "./type";

const defaultProps = {
  showModalWallet: false,
  isEvm: false,
};

const appReducer = (state = defaultProps, action: any) => {
  switch (action.type) {
    case SHOW_MODAL_WALLET:
      return {
        ...state,
        showModalWallet: action.value,
      };

    case SET_IS_EVM:
      return {
        ...state,
        isEvm: action.value,
      };

    default:
      return state;
  }
};

export default appReducer;
