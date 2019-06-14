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

const getInitialState = async () => {
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
};

const StateContext = React.createContext();

export { getInitialState, blankState, StateContext };
