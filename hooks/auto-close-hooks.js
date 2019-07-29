import { useEffect } from "react";

export function closeItemOnStoreSwipeHook({ currentRow, state }) {
  useEffect(() => {
    if (currentRow && currentRow.name && state.currentStore) {
      currentRow.reset();
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
