import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Icon, Button as NbButton, SwipeRow } from "native-base";
import { StateContext } from "GroceryLists/database-service/database-service";
import useNewItemsListReducer, {
  NewItemsContext
} from "GroceryLists/hooks/new-items-hooks";
import { AddItemsContainer } from "GroceryLists/components/add-items-container.js";
import { COLORS } from "../constants/colors";

export const StoreHeader = ({ store, toggleList, listType }) => {
  return (
    <NewItemsContext.Provider value={useNewItemsListReducer()}>
      <HeaderContent
        store={store}
        toggleList={toggleList}
        listType={listType}
      />
    </NewItemsContext.Provider>
  );
};

const HeaderContent = ({ store, toggleList, listType }) => {
  const { updateItems, state: stateContext, setCurrentStore } = useContext(
    StateContext
  );
  const [component, setComponent] = useState(null);

  const {
    state,
    clearList,
    setNumberOfInputs,
    addNewInputField,
    useAutoAddInputFieldEffect
  } = useContext(NewItemsContext);

  const { newItemsList, numberOfInputs } = state;

  useAutoAddInputFieldEffect();

  (function autoCloseStoreOnStoreChange() {
    useEffect(() => {
      if (component && stateContext.currentStore !== store.storeName) {
        clearStore();
      }
    }, [stateContext.currentStore]);
  })();

  const clearStore = () => {
    setNumberOfInputs(0);
    component._root.closeRow();
    clearList();
  };
  return (
    <>
      <SwipeRow
        ref={c => setComponent(c)}
        style={styles.header}
        body={
          <View
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <Text style={styles.storeName}>{store.storeName}</Text>
            <Icon
              type="FontAwesome5"
              name={store[listType] ? "chevron-down" : "chevron-up"}
              onPress={toggleList}
              style={{ fontSize: 15, paddingLeft: 25 }}
            />
          </View>
        }
        leftOpenValue={75}
        rightOpenValue={-75}
        onRowOpen={() => setCurrentStore(store.storeName)}
        disableLeftSwipe={numberOfInputs === 0}
        right={
          <NbButton
            danger
            style={{ ...styles.swipeButton, marginRight: 5 }}
            onPress={clearStore}
          >
            <Icon name="ios-remove-circle-outline" />
          </NbButton>
        }
        left={
          <NbButton
            style={{ ...styles.swipeButton, marginLeft: 5 }}
            onPress={() => {
              addNewInputField();
              component._root.closeRow();
            }}
          >
            <Icon name="ios-add-circle" />
          </NbButton>
        }
      />
      <AddItemsContainer
        numberOfInputs={numberOfInputs}
        newItemsList={newItemsList}
        onAddItems={() => {
          updateItems({ store, items: newItemsList });
          clearList();
        }}
        storeName={store.storeName}
      />
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 1,
    marginBottom: 1,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: COLORS.GRAY
  },
  swipeButton: {
    marginTop: 1,
    marginBottom: 1
  },
  input: {
    maxWidth: 100,
    padding: 1,
    position: "relative"
  },
  storeName: {
    fontWeight: "bold",
    color: COLORS.DARK_GRAY,
    fontSize: 25
  }
});
