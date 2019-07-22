import React, { useContext, useState } from "react";
import { Button, Icon } from "native-base";
import { StateContext } from "GroceryLists/database-service/database-service";
import { COLORS } from "GroceryLists/constants/colors";
import { useCurrentRowState } from "GroceryLists/hooks/current-row-state";
import { StoresLists } from "GroceryLists/components/stores-lists";

const CurrentLists = () => {
  const { updateItems } = useContext(StateContext);
  const { setCurrentRow } = useCurrentRowState();
  const [itemsVisibility, setItemsVisibility] = useState({});

  function removeItemFromList({ store, item, id }) {
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
      isActiveItems={true}
      listType="isActiveItemsExpanded"
      itemsVisibility={itemsVisibility}
      setItemsVisibility={setItemsVisibility}
      colors={{ primary: COLORS.LIGHT_BLUE, secondary: COLORS.ACCENT_BLUE }}
      itemRightButton={(store, item, id) => (
        <Button danger onPress={() => removeItemFromList({ store, item, id })}>
          <Icon active name="ios-remove-circle-outline" />
        </Button>
      )}
      headerButtons={{
        rightAction: clearStoreInputList,
        leftAction: addNewItemInputField
      }}
    />
  );
};

export { CurrentLists };
