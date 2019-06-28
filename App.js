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
  Button,
  Content
} from "native-base";
import { StyleSheet, Modal, View, TextInput } from "react-native";
import { StateContext } from "GroceryLists/database-service/database-service";
import { useListReducer } from "GroceryLists/hooks/list-reducer";
import { TABS } from "GroceryLists/constants/tabs";
import { COLORS } from "GroceryLists/constants/colors";
import { CurrentLists } from "GroceryLists/components/current-lists";

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
      {(state.currentTab === TABS.CURRENT_LISTS || TABS.ADD_NEW_STORE) && (
        <CurrentLists />
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={state.currentTab === TABS.ADD_NEW_STORE}
      >
        <View
          style={{
            height: "100%",
            width: "100%",
            position: "absolute",
            backgroundColor: COLORS.DARK_GRAY,
            opacity: 0.9
          }}
        />
        <Content
          contentContainerStyle={{
            flex: 1,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
            borderWidth: 10
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              position: "absolute",
              justifyContent: "space-between",
              backgroundColor: COLORS.DARK_GRAY,
              borderColor: COLORS.GRAY,
              zIndex: 10,
              height: "70%",
              width: "90%",
              borderRadius: 10,
              borderWidth: 0.5
            }}
          >
            <View
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 10,
                borderWidth: 3
              }}
            >
              <TextInput
                returnKeyType="done"
                enablesReturnKeyAutomatically
                keyboardAppearance="dark"
                autoFocus={true}
                editable={true}
                placeholder={"ex: Bananas..."}
                placeholderTextColor={"gray"}
              />
            </View>
            <View
              style={{
                width: "90%",
                padding: 10,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignSelf: "center",
                alignItems: "center",
                padding: 10,
                borderWidth: 3
              }}
            >
              <Button onPress={() => console.log("buttonPressed")}>
                <Text style={{ color: COLORS.WHITE }}>Add New Store</Text>
              </Button>
              <Button danger onPress={() => selectTab(TABS.CURRENT_LISTS)}>
                <Text>Cancel</Text>
              </Button>
            </View>
          </View>
        </Content>
      </Modal>
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
