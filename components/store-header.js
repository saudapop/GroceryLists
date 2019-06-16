import React, { useContext, useState } from "react";
import DatabaseService, {
  StateContext
} from "../database-service/database-service";
import { StyleSheet, View, TouchableOpacity, Text, Button } from "react-native";
import { NewItemField } from "./new-item-field";

const StoreHeader = ({ store }) => {
  const { state } = useContext(StateContext);
  const [newItemsList, setList] = useState([]);
  const [inputFields, setInputFields] = useState([]);

  return (
    <>
      <View style={styles.header}>
        <View>
          <Text style={styles.storeName}>{store.storeName}</Text>
        </View>
        <TouchableOpacity
          style={styles.toggleInputButton}
          onPress={() => {
            let newInputFields = [...inputFields];
            newInputFields.push(
              <NewItemField setList={setList} newItemsList={newItemsList} />
            );
            setInputFields(newInputFields);
          }}
          accessible={true}
        >
          <View style={styles.buttonTextContainer}>
            <Text style={styles.buttonOpen}>{"+"}</Text>
          </View>
        </TouchableOpacity>
      </View>
      {inputFields && inputFields.map(input => input)}
      {newItemsList[0] && (
        <Button
          title={`Add ${newItemsList.join(", ")} to ${store.storeName} list`}
          onPress={() => {
            console.log(newItemsList);
          }}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: "#DEDEDE",
    borderColor: "#DDDDDD",
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5
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
