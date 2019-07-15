import { useState, useRef } from "react";

const useCurrentRowState = () => {
  const refs = useRef({});
  const [currentRow, setCurrentRow] = useState(null);

  return { refs, currentRow, setCurrentRow };
};

export { useCurrentRowState };
