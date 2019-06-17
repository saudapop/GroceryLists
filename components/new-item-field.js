import React, { useState, useContext } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Text
} from "react-native";
import { NewItemsContext } from "../hooks/new-items-reducer";
export const NewItemField = () => {
  const [userInput, setInput] = useState("");

  const { state, setList } = useContext(NewItemsContext);
  const { newItemsList } = state;

  const confirmItem = () => {
    if (userInput) {
      if (!(newItemsList.indexOf(userInput) > -1)) {
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
        <TouchableOpacity
          onPress={() => {
            if (userInput) {
              const listWithRemovedItem = newItemsList.filter(
                item => item !== userInput
              );
              setInput("");
              setList(listWithRemovedItem);
            }
          }}
        >
          <Text>❌</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={confirmItem}>
          <Text>✅</Text>
        </TouchableOpacity>
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
  }
});
