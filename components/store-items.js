import React, { useEffect } from "react";
import { isEqual } from "lodash";
import { StyleSheet, Text, FlatList, TouchableOpacity } from "react-native";
import { SwipeRow, Icon } from "native-base";
import { COLORS } from "GroceryLists/constants/colors";
import { Fade } from "GroceryLists/animations/fade";

const StoreItems = ({
  store,
  items,
  currentRowState,
  colors,
  rightButton,
  itemsVisibility,
  setItemsVisibility
}) => {
  const { refs, currentRow, setCurrentRow } = currentRowState;

  // TODO: figure out item animation without annoying refresh;

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

  function getItemsVisibility(id) {
    const isItemListed = Object.keys(itemsVisibility).some(
      visibleItem => visibleItem === id
    );
    if (!isItemListed) {
      const newItemsVisibility = itemsVisibility;
      newItemsVisibility[id] = true;
      setItemsVisibility(newItemsVisibility);
    }
  }

  function handleRowOpen(id) {
    const thisRow = refs.current[id];
    const openingNewRow =
      currentRow && currentRow._root && !isEqual(currentRow.id, thisRow.id);
    if (openingNewRow) {
      currentRow._root.closeRow();
    }
    setCurrentRow(refs.current[id]);
  }

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
              onRowOpen={() => handleRowOpen(id)}
              key={item.name}
              style={{
                ...styles.itemContainer,
                backgroundColor: index % 2 ? colors.primary : colors.secondary
              }}
              rightOpenValue={rightButton && -50}
              right={rightButton && rightButton(store, item.name, id)}
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

export { StoreItems };

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
