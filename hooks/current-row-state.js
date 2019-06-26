import { useState } from "react";

const useCurrentRowState = () => {
  const [refs, setRefs] = useState({});
  const [currentRow, setCurrentRow] = useState(null);

  return { refs, setRefs, currentRow, setCurrentRow };
};

export { useCurrentRowState };
