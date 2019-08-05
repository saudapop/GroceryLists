import React, { useContext } from "react";
import { Button, Icon } from "native-base";
import { StateContext } from "GroceryLists/database-service/database-service";
import { COLORS } from "GroceryLists/constants/colors";
import { useCurrentRowState } from "GroceryLists/hooks/current-row-state";
import { StoresLists } from "GroceryLists/components/stores-lists";

const PreviousLists = () => {
  const { updateItems, removeStore } = useContext(StateContext);
  const { setCurrentRow } = useCurrentRowState();

  function removeItemFromList({ store, item }) {
    updateItems({ store, items: [item] });
  }

  function handleRemoveStore({ storeName }) {
    return () => removeStore({ storeName });
  }

  return (
    <StoresLists
      isActiveItems={false}
      listType="isPreviousListExpanded"
      colors={{ primary: COLORS.LIGHT_PINK, secondary: COLORS.ACCENT_PINK }}
      itemRightButton={{
        component: ({ action }) => (
          <Button onPress={action}>
            <Icon active name="ios-add-circle" />
          </Button>
        ),
        action: removeItemFromList,
        color: COLORS.SHARP_BLUE
      }}
      headerButtons={{
        rightAction: handleRemoveStore
      }}
    />
  );
};

export { PreviousLists };
