import React, { useContext } from "react";
import { StyleSheet, Text, FlatList, TouchableOpacity } from "react-native";
import { SwipeRow, Button, Icon } from "native-base";
import { StateContext } from "GroceryLists/database-service/database-service";
import { COLORS } from "GroceryLists/constants/colors";

const ActiveStoreItems = ({ store, items, currentRowState }) => {
  const { state, updateItems } = useContext(StateContext);
  const { refs, setRefs, currentRow, setCurrentRow } = currentRowState;
  return (
    <FlatList
      data={items}
      renderItem={({ item, index }) => {
        const id = `${store.storeName}-${item.name}`;
        return (
          <SwipeRow
            ref={c => {
              const newRefs = refs;
              newRefs[id] = c;
              setRefs(newRefs);
            }}
            onRowOpen={() => {
              const openingNewRow = currentRow && currentRow !== refs[id];
              if (openingNewRow) {
                currentRow._root.closeRow();
              }
              setCurrentRow(refs[id]);
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
                onPress={async () => {
                  updateItems({ store, items: [item.name], state });
                  setCurrentRow(null);
                }}
              >
                <Icon active name="ios-remove-circle-outline" />
              </Button>
            }
            body={
              <TouchableOpacity style={styles.itemNameContainer}>
                <Icon small name="ios-arrow-forward" style={styles.listIcon} />
                <Text style={styles.itemName}>{item.name}</Text>
              </TouchableOpacity>
            }
          />
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
