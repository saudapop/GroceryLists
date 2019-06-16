import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Text
} from "react-native";

export const NewItemField = ({ setList, newItemsList }) => {
  const [userInput, setInput] = useState("");

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={userInput}
        onChangeText={text => setInput(text)}
        returnKeyType="done"
        enablesReturnKeyAutomatically
        onEndEditing={() => setList([...newItemsList, userInput])}
        autoFocus={true}
        placeholder={"ex: Bananas..."}
        placeholderTextColor={"gray"}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            const listWithRemovedItem = newItemsList.filter(
              item => item !== userInput
            );
            setInput("");
            setList(listWithRemovedItem);
          }}
        >
          <Text>❌</Text>
        </TouchableOpacity>
        <TouchableOpacity>
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
