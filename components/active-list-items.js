import React, { useEffect, useContext } from "react";
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
import { StateContext } from "GroceryLists/database-service/database-service";
import { StoreHeader } from "GroceryLists/components/store-header";
const ActiveListItems = () => {
  const { state, initialFetch, updateItems, refresh } = useContext(
    StateContext
  );
  useEffect(() => {
    initialFetch();

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

  const activeListItems = state.stores
    .sort((a, b) => a.storeName > b.storeName)
    .map(store => {
      return (
        <React.Fragment key={store.storeName}>
          <StoreHeader store={store} />
          {store.items
            .filter(item => item.isActive === true)
            .map((item, i) => (
              <Swipeout
                key={item.name}
                style={{
                  ...styles.itemContainer,
                  backgroundColor: i % 2 ? "#edf7ff" : "#c4def2"
                }}
                buttonWidth={20}
                right={[
                  {
                    type: "delete",
                    component: (
                      <View style={styles.swipeButton}>
                        <Text style={styles.swipeButtonText}> X </Text>
                      </View>
                    ),
                    onPress: async () =>
                      updateItems({ store, items: [item.name], state })
                  }
                ]}
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
          onRefresh={() => refresh(state)}
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
    justifyContent: "center",
    marginTop: 3,
    paddingLeft: 30,
    height: 35,
    borderTopWidth: 0.15,
    borderBottomWidth: 0.15
  },
  swipeButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  swipeButtonText: {
    color: "white",
    fontSize: 15
  },
  itemName: {
    fontSize: 20
  }
});
