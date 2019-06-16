import React from "react";
import { blankState, StateContext } from "./database-service/database-service";
import { useListReducer } from "./hooks/list-reducer";
import { ActiveListItems } from "./components/active-list-items";

const App = () => {
  return (
    <StateContext.Provider value={useListReducer(blankState)}>
      <ActiveListItems />
    </StateContext.Provider>
  );
};

export default App;
