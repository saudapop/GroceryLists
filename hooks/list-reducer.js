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
    case ACTIONS.TOGGLE_LIST_EXPANDED:
      return { ...state, stores: action.stores };
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
    let newState = stores;
    if (state.stores) {
      newState = stores.map(store => {
        const oldStore = state.stores.filter(
          old => old.storeName === store.storeName
        )[0];
        const newStore = {
          ...store,
          isActiveListExpanded: oldStore.isActiveListExpanded,
          isPreviousListExpanded: oldStore.isPreviousListExpanded
        };
        return newStore;
      });
    }
    dispatch({ type: ACTIONS.FETCH_ITEMS, stores: newState });
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

  const setCurrentStore = currentStore =>
    dispatch({ type: ACTIONS.SET_CURRENT_STORE, currentStore });

  const toggleListExpanded = store => {
    let newStores = state.stores.filter(
      old => old.storeName !== store.storeName
    );
    newStores.push(store);
    dispatch({ type: ACTIONS.TOGGLE_LIST_EXPANDED, stores: newStores });
  };

  const toggleAllListsExpanded = list => {
    const isExpanded = !state.stores.find(store => store[list] === true);
    let newStores = state.stores.map(store => {
      store[list] = isExpanded;
      return store;
    });
    dispatch({ type: ACTIONS.TOGGLE_LIST_EXPANDED, stores: newStores });
  };

  const selectTab = tab => dispatch({ type: ACTIONS.SELECT_TAB, tab });

  return {
    state,
    initialFetch,
    setLoading,
    refresh,
    updateItems,
    setCurrentStore,
    toggleListExpanded,
    toggleAllListsExpanded,
    selectTab
  };
};

const ACTIONS = {
  INITIAL_FETCH: "INITIAL_FETCH",
  FETCH_ITEMS: "FETCH_ITEMS",
  SET_LOADING: "SET_LOADING",
  SET_CURRENT_STORE: "SET_CURRENT_STORE",
  TOGGLE_LIST_EXPANDED: "TOGGLE_LIST_EXPANDED",
  SELECT_TAB: "SELECT_TAB"
};

export { useListReducer, ACTIONS };
