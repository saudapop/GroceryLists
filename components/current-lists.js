import React, { useContext } from "react";
import { Button, Icon } from "native-base";
import { StateContext } from "GroceryLists/database-service/database-service";
import { COLORS } from "GroceryLists/constants/colors";
import { useCurrentRowState } from "GroceryLists/hooks/current-row-state";
import { StoresLists } from "GroceryLists/components/stores-lists";

const CurrentLists = () => {
  const { updateItems } = useContext(StateContext);
  const { setCurrentRow } = useCurrentRowState();

  function removeItemFromList({ store, item }) {
    updateItems({ store, items: [item] });
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
      isActiveItems={true}
      listType="isActiveListExpanded"
      colors={{ primary: COLORS.LIGHT_BLUE, secondary: COLORS.ACCENT_BLUE }}
      itemRightButton={{
        component: ({ action }) => (
          <Button danger onPress={action}>
            <Icon active name="ios-remove-circle-outline" />
          </Button>
        ),
        action: removeItemFromList,
        color: COLORS.RED
      }}
      headerButtons={{
        rightAction: clearStoreInputList,
        leftAction: addNewItemInputField
      }}
    />
  );
};

export { CurrentLists };
