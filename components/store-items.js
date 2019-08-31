import React, { useEffect, useState } from "react";
import { isEqual } from "lodash";
import { StyleSheet, Text, FlatList, TouchableOpacity } from "react-native";
import { Icon } from "native-base";
import { COLORS } from "Listables/constants/colors";
import { Fade } from "Listables/animations/fade";
import { SwipeRow } from "Listables/components/swipe-row.js";
const StoreItems = ({
  store,
  items,
  currentRowState,
  colors,
  rightButton,
  setIsScrollEnabled
}) => {
  const { refs, currentRow, setCurrentRow } = currentRowState;
  const [itemsVisibility, setItemsVisibility] = useState({});

  // TODO: repair remove item animation

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

  return (
    <FlatList
      data={items}
      keyExtractor={(item, index) => `${item.name}-${index}`}
      scrollEnabled={false}
      renderItem={({ item, index }) => {
        const id = `${store.storeName}-${item.name}`;
        getItemsVisibility(id);
        return (
          <Fade visible={itemsVisibility[id]}>
            <SwipeRow
              item={item}
              store={store}
              currentRow={currentRow}
              setIsScrollEnabled={setIsScrollEnabled}
              setCurrentRow={setCurrentRow}
              color={index % 2 ? colors.primary : colors.secondary}
              rightButton={{
                component: rightButton.component({ store, item: item.name }),
                color: rightButton.color,
                action: () => rightButton.action({ store, item: item.name })
              }}
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
