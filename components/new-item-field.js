import React, { useState, useContext } from "react";
import { StyleSheet, TextInput, View, Dimensions } from "react-native";
import { Icon, Button } from "native-base";
import { NewItemsContext } from "GroceryLists/hooks/new-items-hooks";
import { COLORS } from "GroceryLists/constants/colors";

export const NewItemField = () => {
  const [userInput, setInput] = useState("");
  const [component, setComponent] = useState(null);
  const { state, setList } = useContext(NewItemsContext);
  const { newItemsList } = state;

  const listContainsItem = newItemsList.indexOf(userInput) > -1;

  const confirmItem = () => {
    if (userInput && !listContainsItem) {
      setList([...newItemsList, userInput]);
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        ref={c => setComponent(c)}
        value={userInput}
        onChangeText={text => setInput(text)}
        returnKeyType="done"
        enablesReturnKeyAutomatically
        keyboardAppearance="dark"
        onSubmitEditing={confirmItem}
        autoFocus={true}
        editable={(component && component.isFocused()) || !listContainsItem}
        placeholder={"ex: Bananas..."}
        placeholderTextColor={"gray"}
      />
      {listContainsItem && (
        <Icon
          style={{ ...styles.icon, color: COLORS.SUCCESS }}
          name="md-checkmark"
        />
      )}
      <View style={styles.buttonContainer}>
        {!!userInput && (
          <Button
            danger
            onPress={() => {
              if (userInput) {
                const listWithRemovedItem = newItemsList.filter(
                  item => item !== userInput
                );
                setInput("");
                setList(listWithRemovedItem);
              }
            }}
            style={styles.actionButton}
          >
            <Icon name="md-close" style={styles.icon} />
          </Button>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: COLORS.WHITE,
    width: Dimensions.get("window").width,
    paddingTop: 5,
    paddingLeft: 5,
    height: 40
  },
  input: {
    display: "flex",
    flex: 1,
    padding: 1,
    fontSize: 20,
    position: "relative",
    color: COLORS.SHARP_BLUE
  },
  buttonContainer: {
    flexDirection: "row"
  },
  actionButton: {
    alignSelf: "flex-end",
    justifyContent: "center",
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 5,
    paddingTop: 0,
    paddingBottom: 0,
    height: 30,
    width: 50
  },
  icon: {
    color: COLORS.WHITE,
    fontWeight: "bold",
    marginLeft: 0,
    marginRight: 0,
    fontSize: 25
  }
});
