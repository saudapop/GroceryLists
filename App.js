import React from "react";
import { StateContext } from "GroceryLists/database-service/database-service";
import { useListReducer } from "GroceryLists/hooks/list-reducer";

import { ActiveListItems } from "GroceryLists/components/active-list-items";

const App = () => {
  return (
    <StateContext.Provider value={useListReducer()}>
      <ActiveListItems />
    </StateContext.Provider>
  );
};

export default App;
