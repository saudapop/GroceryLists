import React, { useContext } from "react";
import { Button, Icon } from "native-base";
import { StateContext } from "Listables/database-service/database-service";
import { COLORS } from "Listables/constants/colors";
import { useCurrentRowState } from "Listables/hooks/current-row-state";
import { StoresLists } from "Listables/components/stores-lists";

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
