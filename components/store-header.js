import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Icon, Button as NbButton, SwipeRow } from "native-base";
import { StateContext } from "GroceryLists/database-service/database-service";
import useNewItemsListReducer, {
  NewItemsContext
} from "GroceryLists/hooks/new-items-reducer";
import { NewItemField } from "GroceryLists/components/new-item-field";
import { COLORS } from "../constants/colors";

export const StoreHeader = ({ store }) => {
  return (
    <NewItemsContext.Provider value={useNewItemsListReducer()}>
      <HeaderContent store={store} />
    </NewItemsContext.Provider>
  );
};

const HeaderContent = ({ store }) => {
  const { updateItems, state: stateContext, setCurrentStore } = useContext(
    StateContext
  );
  const [component, setComponent] = useState(null);

  const {
    state,
    clearList,
    setIsAddingNewItems,
    setNumberOfInputs
  } = useContext(NewItemsContext);

  const { newItemsList, numberOfInputs, isAddingNewItems } = state;

  const addNewInputField = () => {
    const isListEmpty = !newItemsList.length && numberOfInputs < 1;
    const needMoreInputs = newItemsList.length >= numberOfInputs;

    if (isListEmpty || needMoreInputs) {
      setNumberOfInputs(numberOfInputs + 1);
      if (!isAddingNewItems) {
        setIsAddingNewItems(true);
      }
    }
  };

  (function autoAddInputFields() {
    useEffect(() => {
      if (isAddingNewItems) {
        addNewInputField();
      }
    }, [newItemsList]);
  })();

  (function autoCloseStoreOnStoreChange() {
    useEffect(() => {
      if (stateContext.currentStore !== store.storeName && component) {
        clearStore();
      }
    }, [stateContext.currentStore]);
  })();

  const clearStore = () => {
    setNumberOfInputs(0);
    component._root.closeRow();
    clearList();
  };

  const getAddItemsText = () => {
    let res;
    let end = newItemsList.length - 1;

    if (newItemsList.length > 2) {
      res = `${newItemsList.slice(0, end).join(", ")}, & ${newItemsList[end]}`;
    } else if (newItemsList.length === 2) {
      res = `${newItemsList[0]} & ${newItemsList[1]}`;
    } else {
      res = newItemsList[0];
    }
    return `Add ${res} to ${store.storeName} list`;
  };

  return (
    <>
      <SwipeRow
        ref={c => setComponent(c)}
        style={styles.header}
        body={
          <View>
            <Text style={styles.storeName}>{store.storeName}</Text>
          </View>
        }
        leftOpenValue={75}
        rightOpenValue={-75}
        onRowOpen={() => setCurrentStore(store.storeName)}
        disableLeftSwipe={numberOfInputs === 0}
        right={
          <NbButton
            danger
            style={{ marginTop: 1, marginBottom: 1, marginRight: 5 }}
            onPress={clearStore}
          >
            <Icon name="ios-remove-circle-outline" />
          </NbButton>
        }
        left={
          <NbButton
            style={{
              marginTop: 1,
              marginBottom: 1,
              marginLeft: 5
            }}
            onPress={() => {
              addNewInputField();
              component._root.closeRow();
            }}
          >
            <Icon name="ios-add-circle" />
          </NbButton>
        }
      />
      <View style={styles.addItemsContainer}>
        {Array(numberOfInputs)
          .fill()
          .map((_, i) => (
            <NewItemField key={i} />
          ))}
        {!!newItemsList.length && (
          <NbButton
            rounded
            vertical
            style={styles.addItemsButtonContainer}
            onPress={() => {
              updateItems({ store, items: newItemsList });
              clearList();
            }}
          >
            <Text style={styles.addItemsButtonText}>{getAddItemsText()}</Text>
          </NbButton>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  addItemsContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 1,
    marginBottom: 1,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: COLORS.GRAY
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
  },
  addItemsButtonContainer: {
    alignSelf: "center",
    backgroundColor: COLORS.SHARP_BLUE,
    padding: 15,
    margin: 10,
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: COLORS.GRAY
  },
  addItemsButtonText: {
    color: COLORS.WHITE,
    fontSize: 20
  }
});
