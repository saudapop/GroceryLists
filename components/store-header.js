import React, { useContext, useState } from "react";
import { StateContext } from "../database-service/database-service";
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Text
} from "react-native";

const StoreHeader = ({ store }) => {
  const { state } = useContext(StateContext);
  const [userInput, setInput] = useState("");
  const [isInputVisible, toggleInput] = useState(false);

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.storeName}>{store.storeName}</Text>
        <TouchableOpacity
          style={styles.toggleInputButton}
          onPress={() => {
            toggleInput(!isInputVisible);
            setInput("");
          }}
        >
          <View style={styles.buttonTextContainer}>
            <Text
              style={isInputVisible ? styles.buttonClose : styles.buttonOpen}
            >
              {isInputVisible ? "x" : "+"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      {isInputVisible && (
        <TextInput
          style={styles.input}
          value={userInput}
          onChangeText={text => setInput(text)}
          autoFocus={true}
          placeholder={"ex: Bananas, Cereal, Bread..."}
          placeholderTextColor={"gray"}
          onBlur={() => {
            toggleInput(!isInputVisible);
            setInput("");
          }}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10
  },
  input: {
    maxWidth: 100,
    padding: 1,
    position: "relative"
  },
  storeName: {
    fontWeight: "bold",
    fontSize: 25
  },
  toggleInputButton: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5,
    padding: 0.5,
    backgroundColor: "#DDDDDD",
    borderRadius: 50,
    borderWidth: 0.25,
    width: 20,
    height: 20
  },
  buttonTextContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    fontSize: 20
  },
  buttonOpen: {
    color: "green"
  },
  buttonClose: {
    color: "red"
  }
});

export { StoreHeader };
