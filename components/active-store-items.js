import React, { useState, useContext, useEffect } from "react";
import { isEqual } from "lodash";
import { StyleSheet, Text, FlatList, TouchableOpacity } from "react-native";
import { SwipeRow, Button, Icon } from "native-base";
import { StateContext } from "GroceryLists/database-service/database-service";
import { COLORS } from "GroceryLists/constants/colors";
import { Fade } from "GroceryLists/animations/fade";
const ActiveStoreItems = ({ store, items, currentRowState }) => {
  const { state, updateItems } = useContext(StateContext);
  const { refs, currentRow, setCurrentRow } = currentRowState;
  const [itemsVisibility, setItemsVisibility] = useState({});

  const getItemsVisibility = id => {
    const isItemListed = Object.keys(itemsVisibility).some(
      visibleItem => visibleItem === id
    );
    if (!isItemListed) {
      const newItemsVisibility = itemsVisibility;
      newItemsVisibility[id] = true;
      setItemsVisibility(newItemsVisibility);
    }
  };

  useEffect(() => {
    items.forEach(item => {
      const id = `${store.storeName}-${item.name}`;
      if (itemsVisibility[id] === false && item.isActive) {
        const newItemsVisibility = itemsVisibility;
        newItemsVisibility[id] = true;
        setItemsVisibility(newItemsVisibility);
      }
    });
  }, [items]);

  return (
    <FlatList
      data={items}
      renderItem={({ item, index }) => {
        const id = `${store.storeName}-${item.name}`;
        getItemsVisibility(id);
        return (
          <Fade visible={itemsVisibility[id]}>
            <SwipeRow
              ref={c => {
                const newRefs = refs.current;
                newRefs[id] = { ...c, id };
                refs.current = newRefs;
              }}
              onRowOpen={() => {
                const thisRow = refs.current[id];
                const openingNewRow =
                  currentRow &&
                  currentRow._root &&
                  !isEqual(currentRow.id, thisRow.id);
                if (openingNewRow) {
                  currentRow._root.closeRow();
                }
                setCurrentRow(refs.current[id]);
              }}
              key={item.name}
              style={{
                ...styles.itemContainer,
                backgroundColor:
                  index % 2 ? COLORS.LIGHT_BLUE : COLORS.ACCENT_BLUE
              }}
              rightOpenValue={-50}
              right={
                <Button
                  danger
                  onPress={() => {
                    const newItemsVisibility = itemsVisibility;
                    newItemsVisibility[id] = false;
                    setItemsVisibility(newItemsVisibility);
                    setCurrentRow(null);
                  }}
                >
                  <Icon active name="ios-remove-circle-outline" />
                </Button>
              }
              body={
                <TouchableOpacity
                  onPress={() => console.log(item.name)}
                  style={styles.itemNameContainer}
                >
                  <Icon
                    small
                    name="ios-arrow-forward"
                    style={styles.listIcon}
                  />
                  <Text style={styles.itemName}>{item.name}</Text>
                </TouchableOpacity>
              }
            />
          </Fade>
        );
      }}
    />
  );
};

export { ActiveStoreItems };

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
