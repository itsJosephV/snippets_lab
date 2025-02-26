import {useContext} from "react";

import {SnippetContext} from "./SnippetContext";

// Custom hook to use the snippet context
export function useSnippet() {
  const context = useContext(SnippetContext);

  if (context === undefined) {
    throw new Error("useSnippet must be used within a SnippetProvider");
  }

  return context;
}
