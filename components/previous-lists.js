import React, { useContext } from "react";
import { Button, Icon } from "native-base";
import { StateContext } from "GroceryLists/database-service/database-service";
import { COLORS } from "GroceryLists/constants/colors";
import { useCurrentRowState } from "GroceryLists/hooks/current-row-state";
import { StoresLists } from "GroceryLists/components/stores-lists";

const PreviousLists = () => {
  const { updateItems } = useContext(StateContext);
  const { setCurrentRow } = useCurrentRowState();

  function removeItemFromList({
    store,
    item,
    id,
    itemsVisibility,
    setItemsVisibility
  }) {
    const newItemsVisibility = itemsVisibility;
    newItemsVisibility[id] = false;
    setItemsVisibility(newItemsVisibility);
    setCurrentRow(null);
    setTimeout(() => updateItems({ store, items: [item] }), 0);
  }

  function clearStoreInputList({ NewItemsContext, component }) {
    const { setNumberOfInputs, clearList } = useContext(NewItemsContext);

    return () => {
      setNumberOfInputs(0);
      component._root.closeRow();
      clearList();
    };
  }

  function addNewItemInputField({ NewItemsContext, component }) {
    const { addNewInputField } = useContext(NewItemsContext);

    return () => {
      addNewInputField();
      component._root.closeRow();
    };
  }

  return (
    <StoresLists
      isActiveItems={false}
      listType="isPreviousListExpanded"
      colors={{ primary: COLORS.LIGHT_PINK, secondary: COLORS.ACCENT_PINK }}
      itemRightButton={(
        store,
        item,
        id,
        itemsVisibility,
        setItemsVisibility
      ) => (
        <Button
          onPress={() =>
            removeItemFromList({
              store,
              item,
              id,
              itemsVisibility,
              setItemsVisibility
            })
          }
        >
          <Icon active name="ios-add-circle" />
        </Button>
      )}
      // headerButtons={{
      //   rightAction: clearStoreInputList,
      //   leftAction: addNewItemInputField
      // }}
    />
  );
};

export { PreviousLists };
