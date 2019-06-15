import React from "react";
import {
  Stitch,
  AnonymousCredential,
  RemoteMongoClient
} from "mongodb-stitch-react-native-sdk";

import {
  STITCH_APP_NAME,
  DB_NAME,
  COLLECTION_NAME
} from "GroceryLists/constants/constants";

const blankState = {
  client: undefined,
  currentUserId: undefined,
  db: undefined,
  collection: undefined,
  stores: [],
  isLoading: true
};
let initialState = blankState;
const StateContext = React.createContext();

export { blankState, StateContext };

export default class DatabaseService {
  static async fetchStores(state) {
    const stores = await state.collection.find({}).asArray();
    return stores;
  }

  static async getInitialState() {
    try {
      initialState.client = await Stitch.initializeDefaultAppClient(
        STITCH_APP_NAME
      );
      const user = initialState.client.auth.loginWithCredential(
        new AnonymousCredential()
      );
      initialState.currentUserId = user.id;
      const mongoClient = initialState.client.getServiceClient(
        RemoteMongoClient.factory,
        "mongodb-atlas"
      );
      initialState.db = mongoClient.db(DB_NAME);
      initialState.collection = initialState.db.collection(COLLECTION_NAME);
      initialState.stores = await initialState.collection.find({}).asArray();
      initialState.isLoading = false;
      return initialState;
    } catch (err) {
      console.log(err);
    }
  }

  static async updateItemsFromStore({ state, storeName, items }) {
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
  }
}
