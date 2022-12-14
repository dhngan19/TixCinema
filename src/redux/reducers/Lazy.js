import { LOADING_BACKTO_HOME, LOADING_BACKTO_HOME_COMPLETED } from "../actions/types/LoadingType";


const initialState = {
  isLazy: false,
  isLoadingBackToHome: false,
};

const lazyReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_BACKTO_HOME: {
      return {
        ...state,
        isLoadingBackToHome: true,
      };
    }
    case LOADING_BACKTO_HOME_COMPLETED: {
      return {
        ...state,
        isLoadingBackToHome: false,
      };
    }
    default:
      return state;
  }
};
export default lazyReducer;