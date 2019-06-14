import { useReducer } from "react";

const listReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.INITIAL_FETCH:
      let newState = action.newState;
      return { ...newState };
    case ACTIONS.FETCH_ITEMS:
      return { ...state, stores: action.stores, isLoading: false };
    default:
      return state;
  }
};

const useListReducer = initialState => {
  const [state, dispatch] = useReducer(listReducer, initialState);

  const initialFetch = newState =>
    dispatch({ type: ACTIONS.INITIAL_FETCH, newState });
  const fetchItems = stores => {
    dispatch({ type: ACTIONS.FETCH_ITEMS, stores });
  };

  return { state, initialFetch, fetchItems };
};

const ACTIONS = {
  INITIAL_FETCH: "INITIAL_FETCH",
  FETCH_ITEMS: "FETCH_ITEMS"
};

export { useListReducer, ACTIONS };
