import React, { useContext, useEffect } from "react";
import {
  Header,
  Container,
  Title,
  Body,
  Footer,
  FooterTab,
  Text,
  Icon,
  Button
} from "native-base";
import { StyleSheet } from "react-native";
import { StateContext } from "GroceryLists/database-service/database-service";
import { useListReducer } from "GroceryLists/hooks/list-reducer";
import { TABS } from "GroceryLists/constants/tabs";
import { COLORS } from "GroceryLists/constants/colors";
import { CurrentLists } from "GroceryLists/components/current-lists";

const App = () => {
  return (
    <StateContext.Provider value={useListReducer()}>
      <AppContent />
    </StateContext.Provider>
  );
};

const AppContent = () => {
  const { state, selectTab, initialFetch } = useContext(StateContext);

  useEffect(() => {
    if (!state.stores.length) initialFetch();

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
      <Header iosBarStyle="light-content" style={styles.headerContainer}>
        <Icon
          style={styles.headerIcon}
          name="local-grocery-store"
          type="MaterialIcons"
        />
        <Body>
          <Title style={styles.headerText}>Ahmed Family Grocery Lists</Title>
        </Body>
      </Header>
      {state.currentTab === TABS.CURRENT_LISTS && <CurrentLists />}
      <Footer style={styles.footer}>
        <FooterTab vertical>
          <Button
            active={state.currentTab === TABS.CURRENT_LISTS}
            onPress={() => selectTab(TABS.CURRENT_LISTS)}
          >
            <Icon name="list" />
            <Text>Current list</Text>
          </Button>
          <Button
            active={state.currentTab === TABS.ADD_NEW_STORE}
            onPress={() => selectTab(TABS.ADD_NEW_STORE)}
          >
            <Icon name="add" />
            <Text>Add new store</Text>
          </Button>
        </FooterTab>
      </Footer>
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
