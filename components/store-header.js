import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Button } from "react-native";
import { Icon, Button as NbButton, SwipeRow } from "native-base";
import { StateContext } from "GroceryLists/database-service/database-service";
import useNewItemsListReducer, {
  NewItemsContext
} from "GroceryLists/hooks/new-items-reducer";
import { NewItemField } from "GroceryLists/components/new-item-field";

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
      if (stateContext.currentStore !== store.storeName) {
        setNumberOfInputs(0);
        if (component) {
          component._root.closeRow();
        }
      }
    }, [stateContext.currentStore]);
  })();

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
            onPress={() => {
              setNumberOfInputs(0);
              component._root.closeRow();
            }}
          >
            <Icon name="ios-remove-circle-outline" />
          </NbButton>
        }
        left={
          <NbButton
            style={{ marginTop: 1, marginBottom: 1, marginLeft: 5 }}
            onPress={() => {
              addNewInputField();
              component._root.closeRow();
            }}
          >
            <Icon name="ios-add-circle" />
          </NbButton>
        }
      />
      {Array(numberOfInputs)
        .fill()
        .map((_, i) => (
          <NewItemField key={i} />
        ))}
      {!!newItemsList.length && (
        <Button
          title={`Add ${newItemsList.join(", ")} to ${store.storeName} list`}
          onPress={() => {
            updateItems({ store, items: newItemsList });
            clearList();
          }}
        />
      )}
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
    backgroundColor: "#DEDEDE",
    borderColor: "#DDDDDD",
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5
  },
  input: {
    maxWidth: 100,
    padding: 1,
    position: "relative"
  },
  storeName: {
    fontWeight: "bold",
    fontSize: 25
  },
  toggleInputButton: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5,
    padding: 0.5,
    backgroundColor: "#DDDDDD",
    borderRadius: 50,
    borderWidth: 0.25,
    width: 20,
    height: 20
  },
  buttonTextContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    fontSize: 20
  },
  buttonOpen: {
    color: "green"
  },
  buttonClose: {
    color: "red"
  }
});
