import React, { useContext, useEffect } from "react";
import {
  Root,
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
import { Fade } from "GroceryLists/animations/fade";
import { CurrentLists } from "GroceryLists/components/current-lists";
import { NewStoreModal } from "GroceryLists/components/new-store-modal";

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
        <Icon
          style={styles.toggleListIcon}
          type="MaterialCommunityIcons"
          name="arrow-collapse"
          onPress={() => toggleAllListsExpanded("isActiveListExpanded")}
        />
      </Header>
      {(state.currentTab === TABS.CURRENT_LISTS || TABS.ADD_NEW_STORE) && (
        <CurrentLists />
      )}
      <NewStoreModal
        show={state.currentTab === TABS.ADD_NEW_STORE}
        onCancel={() => selectTab(TABS.CURRENT_LISTS)}
        onStoreCreate={() => alert("it worked")}
      />
      <Footer style={styles.footer}>
        <FooterTab vertical>
          <Button
            active={state.currentTab === TABS.CURRENT_LISTS}
            onPress={() => selectTab(TABS.CURRENT_LISTS)}
          >
            <Icon type="FontAwesome5" name="clipboard-list" />
            <Text>Current list</Text>
          </Button>
          <Button
            active={state.currentTab === TABS.ADD_NEW_STORE}
            onPress={() => selectTab(TABS.ADD_NEW_STORE)}
          >
            <Icon type="FontAwesome5" name="store-alt" />
            <Text>Add new store</Text>
          </Button>
          <Button>
            <Icon type="FontAwesome5" name="book" />
            <Text>Prev. Items</Text>
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
