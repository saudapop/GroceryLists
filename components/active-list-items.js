import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
  ActivityIndicator
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Swipeout from "react-native-swipeout";
import DatabaseService, {
  StateContext
} from "../database-service/database-service";
import { StoreHeader } from "./store-header";

const ActiveListItems = () => {
  const { state, initialFetch, fetchItems, setLoading } = useContext(
    StateContext
  );
  useEffect(() => {
    (async () => {
      initialFetch(await DatabaseService.getInitialState());
    })();

    return () => {
      state.client.auth
        .logout()
        .then(() => {
          console.log(`Successfully logged out`);
        })
        .catch(err => {
          console.log(`Failed to log out: ${err}`);
        });
    };
  }, []);
  const activeListItems = state.stores.map(store => {
    return (
      <React.Fragment key={store.storeName}>
        <StoreHeader store={store} />

        {store.items
          .filter(item => item.isActive === true)
          .map((item, i) => (
            <Swipeout
              key={item.name}
              style={styles.itemContainer}
              backgroundColor={i % 2 ? "#edf7ff" : "#c4def2"}
              buttonWidth={20}
              right={[
                {
                  text: "X",
                  type: "delete",
                  onPress: async () => {
                    await DatabaseService.updateItemsFromStore({
                      state,
                      storeName: store.storeName,
                      items: [item.name]
                    });
                    fetchItems(await DatabaseService.fetchStores(state));
                  }
                }
              ]}
              key={item.name}
              autoClose={true}
            >
              <Text style={styles.itemName}>{item.name}</Text>
            </Swipeout>
          ))}
      </React.Fragment>
    );
  });

  return !state.isLoading ? (
    <ScrollView
      keyboardShouldPersistTaps="never"
      refreshControl={
        <RefreshControl
          refreshing={state.isLoading}
          onRefresh={() => {
            setLoading();
            setTimeout(
              async () => fetchItems(await DatabaseService.fetchStores(state)),
              1500
            );
          }}
        />
      }
    >
      <KeyboardAwareScrollView style={styles.scrollContainer}>
        {state.stores.length && activeListItems}
      </KeyboardAwareScrollView>
    </ScrollView>
  ) : (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color="green" />
      <Text> Loading! Please wait! Jazzakallah Khair 😁</Text>
    </View>
  );
};

export { ActiveListItems };

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  scrollContainer: {
    flex: 1,
    marginTop: 75,
    backgroundColor: "#fff"
  },
  itemContainer: {
    marginTop: 5,
    paddingLeft: 30,
    borderTopWidth: 0.15,
    borderBottomWidth: 0.15
  },
  itemName: {
    fontSize: 20
  }
});
