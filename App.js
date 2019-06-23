import React from "react";
import { Header, Container, Title, Body } from "native-base";
import { StateContext } from "GroceryLists/database-service/database-service";
import { useListReducer } from "GroceryLists/hooks/list-reducer";

import { ActiveListItems } from "GroceryLists/components/active-list-items";

const App = () => {
  return (
    <StateContext.Provider value={useListReducer()}>
      <Container>
        <Header>
          <Body>
            <Title>Ahmed Family Grocery Lists</Title>
          </Body>
        </Header>
        <ActiveListItems />
      </Container>
    </StateContext.Provider>
  );
};

export default App;
