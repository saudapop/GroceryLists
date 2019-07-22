import { useEffect } from "react";

export function closeItemOnStoreSwipeHook({ currentRow, state }) {
  useEffect(() => {
    if (currentRow && currentRow._root && state.currentStore) {
      currentRow._root.closeRow();
    }
  }, [state.currentStore]);
}

export function closeStoreOnItemSwipeHook({
  state,
  currentRow,
  setCurrentStore
}) {
  useEffect(() => {
    if (state.currentStore) {
      setCurrentStore(null);
    }
  }, [currentRow]);
}
