"use client";

import {Snippet} from "@prisma/client";
import {createContext, ReactNode, useOptimistic} from "react";

type OptimisticContext = {
  optimisticData: Snippet[];
  addOptimistic: (newItem: Snippet) => void;
};

export const OptimisticContext = createContext<OptimisticContext | undefined>(undefined);

export function OptimisticProvider({
  children,
  initialData,
}: {
  children: ReactNode;
  initialData: Snippet[];
}) {
  const [optimisticData, addOptimistic] = useOptimistic(initialData, (state, newItem) => [
    newItem as Snippet,
    ...state,
  ]);

  return (
    <OptimisticContext.Provider value={{optimisticData, addOptimistic}}>
      {children}
    </OptimisticContext.Provider>
  );
}
