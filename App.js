import React, { useContext, useEffect } from "react";
import { Root, Container } from "native-base";
import { StyleSheet } from "react-native";
import { StateContext } from "Listables/database-service/database-service";
import { useListReducer } from "Listables/hooks/list-reducer";
import { TABS } from "Listables/constants/tabs";
import { COLORS } from "Listables/constants/colors";
import { CurrentLists } from "Listables/components/current-lists";
import { PreviousLists } from "Listables/components/previous-lists";

import { NewStoreModal } from "Listables/components/new-store-modal";
import {
  AppHeader,
  AppFooter
} from "Listables/components/app-layout/app-layout";

const App = () => {
  return (
    <StateContext.Provider value={useListReducer()}>
      <Root>
        <AppContent />
      </Root>
    </StateContext.Provider>
  );
};

const AppContent = () => {
  const { state, selectTab, initialFetch, toggleAllListsExpanded } = useContext(
    StateContext
  );

  useEffect(() => {
    if (!state.stores.length) {
      initialFetch();
    }
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

  return (
    <Container style={styles.appContainer}>
      <AppHeader
        toggleAllListsExpanded={toggleAllListsExpanded}
        currentList={
          state.currentTab === TABS.CURRENT_LISTS
            ? "isActiveListExpanded"
            : "isPreviousListExpanded"
        }
        styles={styles}
      />
      {(state.currentTab === TABS.CURRENT_LISTS ||
        state.currentTab === TABS.ADD_NEW_STORE) && <CurrentLists />}
      <NewStoreModal
        show={state.currentTab === TABS.ADD_NEW_STORE}
        onCancel={() => selectTab(TABS.CURRENT_LISTS)}
      />
      {state.currentTab === TABS.PREVIOUS_LISTS && <PreviousLists />}
      <AppFooter
        selectTab={selectTab}
        currentTab={state.currentTab}
        styles={styles}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    backgroundColor: COLORS.DARK_GRAY
  },
  headerContainer: {
    backgroundColor: COLORS.DARK_GRAY,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  headerIcon: {
    color: COLORS.GRAY,
    marginRight: -20,
    marginLeft: 5
  },
  toggleListIcon: {
    color: COLORS.GRAY
  },
  headerText: {
    color: COLORS.GRAY,
    fontSize: 20,
    fontWeight: "normal"
  },
  footer: {
    marginBottom: 15,
    paddingTop: 10,
    height: 50,
    backgroundColor: "#303032",
    borderTopWidth: 1
  }
});

export default App;
