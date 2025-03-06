import {useContext} from "react";

import {OptimisticContext} from "./OptimisticContext";

export function useOptimisticContext() {
  const context = useContext(OptimisticContext);

  if (!context) {
    throw new Error("useOptimisticContext must be used within an OptimisticProvider");
  }

  return context;
}
