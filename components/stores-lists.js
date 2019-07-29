import React, { useContext, useState } from "react";
import { sortBy } from "lodash";
import { StyleSheet, View, RefreshControl } from "react-native";
import { Content } from "native-base";
import { StateContext } from "GroceryLists/database-service/database-service";
import { StoreHeader } from "GroceryLists/components/store-header";
import { StoreItems } from "GroceryLists/components/store-items";
import { LoadingSpinner } from "GroceryLists/components/loading-spinner";
import { COLORS } from "GroceryLists/constants/colors";
import { useCurrentRowState } from "GroceryLists/hooks/current-row-state";
import {
  closeItemOnStoreSwipeHook,
  closeStoreOnItemSwipeHook
} from "GroceryLists/hooks/auto-close-hooks";
import { Fade } from "GroceryLists/animations/fade";

const StoresLists = ({
  isActiveItems,
  listType,
  colors,
  itemRightButton,
  headerButtons,
  itemsVisibility,
  setItemsVisibility
}) => {
  const { state, setCurrentStore, refresh, toggleListExpanded } = useContext(
    StateContext
  );
  const { refs, currentRow, setCurrentRow } = useCurrentRowState();
  const [isScrollEnabled, setIsScrollEnabled] = useState(true);

  closeItemOnStoreSwipeHook({ currentRow, state });

  closeStoreOnItemSwipeHook({ state, setCurrentStore, currentRow });

  const content = sortBy(state.stores, ["storeName"]).map(store => {
    const items = store.items.filter(item => item.isActive === isActiveItems);
    return (
      <React.Fragment key={store.storeName}>
        <StoreHeader
          store={store}
          toggleList={() => {
            store[listType] = !store[listType];
            toggleListExpanded(store);
          }}
          items={items}
          listType={listType}
          headerButtons={headerButtons}
          setCurrentRow={setCurrentRow}
        />
        <Fade visible={store[listType]}>
          <StoreItems
            store={store}
            items={items}
            currentRowState={{
              refs,
              setCurrentRow,
              currentRow
            }}
            colors={colors}
            setIsScrollEnabled={setIsScrollEnabled}
            itemsVisibility={itemsVisibility}
            setItemsVisibility={setItemsVisibility}
            rightButton={itemRightButton}
          />
        </Fade>
      </React.Fragment>
    );
  });

  return !state.isLoading ? (
    <Content
      style={styles.contentContainer}
      keyboardShouldPersistTaps="never"
      enableResetScrollToCoords={false}
      scrollEnabled={isScrollEnabled}
      refreshControl={
        <RefreshControl
          refreshing={state.isLoading}
          onRefresh={() => refresh()}
        />
      }
    >
      <View style={styles.storesListContainer}>
        {state.stores && state.stores.length && content}
      </View>
    </Content>
  ) : (
    <LoadingSpinner />
  );
};

export { StoresLists };

const styles = StyleSheet.create({
  contentContainer: {
    marginBottom: 1,
    marginTop: 1
  },
  storesListContainer: {
    flex: 1,
    backgroundColor: COLORS.DARK_GRAY
  },
  itemContainer: {
    display: "flex",
    borderTopWidth: 0.15,
    borderBottomWidth: 0.15
  },
  itemNameContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  itemName: {
    fontSize: 20
  },
  listIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 3,
    paddingRight: 10,
    paddingLeft: 35,
    fontSize: 15,
    color: COLORS.DARK_GRAY
  }
});
