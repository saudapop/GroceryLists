import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Text
} from "react-native";

const inputField = () => {
  const [userInput, setInput] = useState("");

  return (
    <TextInput
      style={styles.input}
      value={userInput}
      onChangeText={text => setInput(text)}
      autoFocus={true}
      placeholder={"ex: Bananas..."}
      placeholderTextColor={"gray"}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    maxWidth: 100,
    padding: 1,
    position: "relative"
  }
});
