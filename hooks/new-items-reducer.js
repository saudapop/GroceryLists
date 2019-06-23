import React, { useReducer } from "react";

const ACTIONS = {
  CLEAR_LIST: "CLEAR_LIST",
  SET_NEW_ITEMS_LIST: "SET_NEW_ITEMS_LIST",
  SET_INPUT_FIELDS: "SET_INPUT_FIELDS",
  SET_IS_ADDING_NEW_ITEMS: "SET_IS_ADDING_NEW_ITEMS"
};

const initialNewItemsListState = {
  newItemsList: [],
  numberOfInputs: 0,
  isAddingNewItems: false
};

const newItemsReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.CLEAR_LIST:
      return { ...initialNewItemsListState };
    case ACTIONS.SET_IS_ADDING_NEW_ITEMS:
      return { ...state, isAddingNewItems: action.isAddingNewItems };
    case ACTIONS.SET_NEW_ITEMS_LIST:
      return { ...state, newItemsList: action.newItemsList };
    case ACTIONS.SET_INPUT_FIELDS:
      return { ...state, numberOfInputs: action.numberOfInputs };
    default:
      return { ...state };
  }
};

const useNewItemsListReducer = () => {
  const [state, dispatch] = useReducer(
    newItemsReducer,
    initialNewItemsListState
  );

  const clearList = () => dispatch({ type: ACTIONS.CLEAR_LIST });

  const setList = newItemsList =>
    dispatch({ type: ACTIONS.SET_NEW_ITEMS_LIST, newItemsList });

  const setIsAddingNewItems = isAddingNewItems =>
    dispatch({ type: ACTIONS.SET_IS_ADDING_NEW_ITEMS, isAddingNewItems });

  const setNumberOfInputs = numberOfInputs =>
    dispatch({ type: ACTIONS.SET_INPUT_FIELDS, numberOfInputs });

  return { state, clearList, setList, setIsAddingNewItems, setNumberOfInputs };
};

export default useNewItemsListReducer;

export const NewItemsContext = React.createContext();
