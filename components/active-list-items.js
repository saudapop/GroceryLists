import React, { useEffect, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import Swipeout from "react-native-swipeout";
import DatabaseService, {
  StateContext
} from "../database-service/database-service";
import { StoreHeader } from "./store-header";

const ActiveListItems = () => {
  const { state, initialFetch, fetchItems } = useContext(StateContext);
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
          .map(item => (
            <Swipeout
              right={[
                {
                  text: "Remove",
                  color: "#ff0000",

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
              <View style={styles.itemContainer}>
                <Text>{item.name}</Text>
              </View>
            </Swipeout>
          ))}
      </React.Fragment>
    );
  });

  return !state.isLoading ? (
    <>
      <Text>----ACTIVE ITEMS-----</Text>
      {state.stores.length && activeListItems}
    </>
  ) : (
    <Text>LOADING. WAIT PLEASE. JEEZE</Text>
  );
};

export { ActiveListItems };

const styles = StyleSheet.create({
  itemContainer: {
    padding: 5
  }
});
