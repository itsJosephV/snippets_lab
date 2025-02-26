"use client";
import {createContext, useState, ReactNode} from "react";

import {Snippet} from "@/types";

interface SnippetContextType {
  selectedSnippet: Snippet | null;
  setSelectedSnippet: (snippet: Snippet | null) => void;
}

export const SnippetContext = createContext<SnippetContextType | undefined>(undefined);

interface SnippetProviderProps {
  children: ReactNode;
}

export function SnippetProvider({children}: SnippetProviderProps) {
  const [selectedSnippet, setSelectedSnippet] = useState<Snippet | null>(null);

  const value = {
    selectedSnippet,
    setSelectedSnippet,
  };

  return <SnippetContext.Provider value={value}>{children}</SnippetContext.Provider>;
}
