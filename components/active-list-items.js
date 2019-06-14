import React, { useEffect, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { getInitialState, StateContext } from "../hooks/initial-state";
import Swipeout from "react-native-swipeout";

const ActiveListItems = () => {
  const { state, initialFetch, fetchItems } = useContext(StateContext);
  useEffect(() => {
    (async () => {
      initialFetch(await getInitialState());
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
        <Text style={styles.storeName}>{store.storeName}</Text>

        {store.items
          .filter(item => item.isActive === true)
          .map(item => (
            <Swipeout
              right={[
                {
                  text: "Remove",
                  color: "#ff0000",

                  onPress: async () => {
                    await updateItemsFromStore({
                      storeName: store.storeName,
                      items: [item.name]
                    });
                    fetchItems(await fetchStores());
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

  const fetchStores = async () => {
    const stores = await state.collection.find({}).asArray();
    return stores;
  };

  const updateItemsFromStore = async ({ storeName, items }) => {
    let store = state.stores.find(store => store.storeName === storeName);

    if (store) {
      items.forEach(newItem => {
        if (!store.items.find(existingItem => existingItem.name === newItem)) {
          store.items.push({
            name: newItem,
            isActive: true
          });
          console.log(`${newItem} added to ${storeName} list\n`);
        } else {
          let item = store.items.find(item => item.name === newItem);
          item.isActive = !item.isActive;
          console.log(
            `${item.name} ${
              !item.isActive ? "removed from " : "added to "
            }${storeName} list\n`
          );
        }
      });
    } else {
      store = {
        storeName,
        items: items.map(item => {
          return {
            name: item,
            isActive: true
          };
        })
      };
      console.log(`${items} added to ${storeName} list\n`);
    }

    await state.collection.updateOne(
      { storeName },
      { $set: store },
      { upsert: true }
    );
  };

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
  storeName: {
    fontWeight: "bold",
    fontSize: 25,
    marginTop: 10
  },
  itemContainer: {
    padding: 5
  }
});
