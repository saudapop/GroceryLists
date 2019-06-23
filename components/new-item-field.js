import React, { useState, useContext } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Text
} from "react-native";
import { Icon, Button } from "native-base";
import { NewItemsContext } from "GroceryLists/hooks/new-items-reducer";

export const NewItemField = () => {
  const [userInput, setInput] = useState("");

  const { state, setList } = useContext(NewItemsContext);
  const { newItemsList } = state;

  const confirmItem = () => {
    const isDuplicate = newItemsList.indexOf(userInput) > -1;
    if (userInput) {
      if (!isDuplicate) {
        setList([...newItemsList, userInput]);
      }
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={userInput}
        onChangeText={text => setInput(text)}
        returnKeyType="done"
        enablesReturnKeyAutomatically
        onEndEditing={confirmItem}
        autoFocus={true}
        placeholder={"ex: Bananas..."}
        placeholderTextColor={"gray"}
      />
      <View style={styles.buttonContainer}>
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
        <Button success onPress={confirmItem} style={styles.actionButton}>
          <Icon name="md-checkmark" style={styles.icon} />
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row"
  },
  input: {
    minWidth: 100,
    padding: 1,
    position: "relative",
    color: "green"
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
    color: "white",
    fontWeight: "bold",
    marginLeft: 0,
    marginRight: 0,
    fontSize: 25
  }
});
