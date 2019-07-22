import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Icon, Button as NbButton, SwipeRow } from "native-base";
import { StateContext } from "GroceryLists/database-service/database-service";
import useNewItemsListReducer, {
  NewItemsContext
} from "GroceryLists/hooks/new-items-hooks";
import { AddItemsContainer } from "GroceryLists/components/add-items-container.js";
import { COLORS } from "../constants/colors";

export const StoreHeader = ({ store, toggleList, listType, headerButtons }) => {
  return (
    <NewItemsContext.Provider value={useNewItemsListReducer()}>
      <HeaderContent
        store={store}
        toggleList={toggleList}
        listType={listType}
        headerButtons={headerButtons}
      />
    </NewItemsContext.Provider>
  );
};

const HeaderContent = ({ store, toggleList, listType, headerButtons }) => {
  const { updateItems, state: stateContext, setCurrentStore } = useContext(
    StateContext
  );
  const [component, setComponent] = useState(null);

  const {
    state,
    clearList,
    setNumberOfInputs,
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

  function handleRowOpen() {
    const isLeft = component._root._translateX._value > 150;
    const isRight =
      component._root._translateX._value < -25 &&
      component._root._translateX._value < -150;
    if (isLeft) {
      onLeftAction();
    }
    if (isRight) {
      onRightAction();
    }
    setCurrentStore(store.storeName);
  }

  const onRightAction = headerButtons.rightAction({
    NewItemsContext,
    component
  });

  const onLeftAction = headerButtons.leftAction({
    NewItemsContext,
    component
  });

  return (
    <>
      <SwipeRow
        ref={c => setComponent(c)}
        style={styles.container}
        body={
          <View style={styles.body}>
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
        stopLeftSwipe={250}
        rightOpenValue={-75}
        stopRightSwipe={-250}
        onRowOpen={handleRowOpen}
        disableLeftSwipe={numberOfInputs === 0}
        disableRightSwipe={numberOfInputs > 0}
        right={<RightButton onPress={onRightAction} />}
        left={<LeftButton onPress={onLeftAction} />}
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

const RightButton = ({ onPress }) => (
  <NbButton
    danger
    style={{ ...styles.swipeButton, marginRight: 5 }}
    onPress={onPress}
  >
    <Icon name="ios-trash" />
  </NbButton>
);

const LeftButton = ({ onPress }) => (
  <NbButton style={{ ...styles.swipeButton, marginLeft: 5 }} onPress={onPress}>
    <Icon name="ios-add-circle" />
  </NbButton>
);

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 1,
    marginBottom: 1,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: COLORS.GRAY
  },
  body: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
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
