import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button as NbButton } from "native-base";
import { NewItemField } from "GroceryLists/components/new-item-field";
import { COLORS } from "GroceryLists/constants/colors";

export const AddItemsContainer = ({
  numberOfInputs,
  newItemsList,
  onAddItems,
  storeName,
  additionalStyles
}) => {
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
    return `Add ${res} to ${storeName} list`;
  };

  return (
    <View
      style={
        additionalStyles
          ? [additionalStyles, styles.addItemsContainer]
          : styles.addItemsContainer
      }
    >
      {Array(numberOfInputs)
        .fill()
        .map((_, i) => (
          <NewItemField key={i} />
        ))}
      {!!newItemsList.length && onAddItems && (
        <NbButton
          rounded
          vertical
          style={styles.addItemsButtonContainer}
          onPress={onAddItems}
        >
          <Text style={styles.addItemsButtonText}>{getAddItemsText()}</Text>
        </NbButton>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  addItemsContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
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
