import { useReducer } from "react";
import DatabaseService, {
  blankState
} from "GroceryLists/database-service/database-service";

const listReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.INITIAL_FETCH:
      return { ...action.newState };
    case ACTIONS.SET_LOADING:
      return { ...state, isLoading: !state.isLoading };
    case ACTIONS.FETCH_ITEMS:
      return { ...state, stores: action.stores, isLoading: false };
    case ACTIONS.SET_CURRENT_STORE:
      return { ...state, currentStore: action.currentStore };
    case ACTIONS.SELECT_TAB:
      return { ...state, currentTab: action.tab };
    default:
      return state;
  }
};

const useListReducer = () => {
  const [state, dispatch] = useReducer(listReducer, blankState);

  const initialFetch = async () => {
    dispatch({
      type: ACTIONS.INITIAL_FETCH,
      newState: await DatabaseService.getInitialState()
    });
  };
  const fetchItems = stores => {
    dispatch({ type: ACTIONS.FETCH_ITEMS, stores });
  };
  const setLoading = () => {
    dispatch({ type: ACTIONS.SET_LOADING });
  };
  const refresh = async () => {
    dispatch({ type: ACTIONS.SET_LOADING });
    setTimeout(
      async () => fetchItems(await DatabaseService.fetchStores(state)),
      1500
    );
  };
  const updateItems = async ({ store, items }) => {
    await DatabaseService.updateItemsFromStore({
      state,
      storeName: store.storeName,
      items
    });
    fetchItems(await DatabaseService.fetchStores(state));
  };

  const setRefs = refs => dispatch({ type: ACTIONS.SET_REFS, refs });

  const selectTab = tab => dispatch({ type: ACTIONS.SELECT_TAB, tab });

  return {
    state,
    initialFetch,
    setLoading,
    refresh,
    updateItems,
    setCurrentStore,
    setCurrentRow,
    setRefs,
    selectTab
  };
};

const ACTIONS = {
  INITIAL_FETCH: "INITIAL_FETCH",
  FETCH_ITEMS: "FETCH_ITEMS",
  SET_LOADING: "SET_LOADING",
  SET_CURRENT_STORE: "SET_CURRENT_STORE",
  SELECT_TAB: "SELECT_TAB",
 };

export { useListReducer, ACTIONS };
