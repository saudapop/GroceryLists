import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Text
} from "react-native";

export const NewItemField = ({ newItemsList, setList, addNewInputField }) => {
  const [userInput, setInput] = useState("");

  const confirmItem = () => {
    if (userInput) {
      setList([...newItemsList, userInput]);
      addNewInputField();
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
