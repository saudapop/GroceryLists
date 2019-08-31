import React, { useContext, useState } from "react";
import { sortBy } from "lodash";
import { StyleSheet, View, RefreshControl, Text } from "react-native";
import { Content } from "native-base";
import { StateContext } from "Listables/database-service/database-service";
import { StoreHeader } from "Listables/components/store-header";
import { StoreItems } from "Listables/components/store-items";
import { LoadingSpinner } from "Listables/components/loading-spinner";
import { COLORS } from "Listables/constants/colors";
import { useCurrentRowState } from "Listables/hooks/current-row-state";
import {
  closeItemOnStoreSwipeHook,
  closeStoreOnItemSwipeHook
} from "Listables/hooks/auto-close-hooks";
import { Fade } from "Listables/animations/fade";

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
        {state.stores && state.stores.length ? (
          content
        ) : (
          <View style={styles.noItemsMessage}>
            <Text style={styles.noItemsText}>
              {`Click "Add New List" to get started! ${"\n\t\t\t\t..".repeat(
                15
              )}\n\t\t\t\tV`}
            </Text>
          </View>
        )}
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
  noItemsMessage: {
    display: "flex",
    marginTop: 250,
    flex: 1,
    justifyContent: "center",
    alignSelf: "center"
  },
  noItemsText: {
    color: COLORS.WHITE
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
