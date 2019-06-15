import React from "react";
import { StyleSheet, View } from "react-native";
import { blankState, StateContext } from "./database-service/database-service";
import { useListReducer } from "./hooks/list-reducer";
import { ActiveListItems } from "./components/active-list-items";
import { AddItems } from "./components/store-header";

const App = () => {
  return (
    <StateContext.Provider value={useListReducer(blankState)}>
      <View style={styles.container}>
        <ActiveListItems />
      </View>
    </StateContext.Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
