const AppReducer = (state, action) => {
  switch (action.type) {
    case "SET_ACTIVITIES":
      return {
        ...state,
        activities: Array.isArray(action.payload) ? action.payload : [],
        loading: false,
      };

    default:
      return state;
  }
};

export default AppReducer;