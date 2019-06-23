import React, { useContext } from "react";
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
import { StateContext } from "GroceryLists/database-service/database-service";
import { useListReducer } from "GroceryLists/hooks/list-reducer";
import { TABS } from "GroceryLists/constants/tabs";
import { ActiveListItems } from "GroceryLists/components/active-list-items";

const App = () => {
  return (
    <StateContext.Provider value={useListReducer()}>
      <AppContent />
    </StateContext.Provider>
  );
};

const AppContent = () => {
  const { state, selectTab } = useContext(StateContext);

  return (
    <Container style={{ backgroundColor: "#303032" }}>
      <Header>
        <Body>
          <Title>Ahmed Family Grocery Lists</Title>
        </Body>
      </Header>
      {state.currentTab === TABS.CURRENT_LIST && <ActiveListItems />}
      <Footer
        style={{
          marginBottom: 15,
          height: 35,
          backgroundColor: "#303032",
          borderTopWidth: 5,
          borderTopColor: "#985B45"
        }}
      >
        <FooterTab vertical>
          <Button
            active={state.currentTab === TABS.CURRENT_LIST}
            onPress={() => selectTab(TABS.CURRENT_LIST)}
          >
            <Icon name="list" />
            <Text>Current list</Text>
          </Button>
          <Button
            active={state.currentTab === TABS.ADD_NEW_STORE}
            onPress={() => selectTab(TABS.ADD_NEW_STORE)}
          >
            <Icon name="add" />
            <Text>Add a store</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
};

export default App;
