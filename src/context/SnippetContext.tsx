"use client";
import type {Snippet} from "@prisma/client";

import {createContext, useState, ReactNode} from "react";

interface SnippetContextType {
  selectedSnippet: Snippet | null;
  isSaving: boolean;
  setIsSaving: (isSaving: boolean) => void;
  setSelectedSnippet: (snippet: Snippet | null) => void;
}

export const SnippetContext = createContext<SnippetContextType | undefined>(undefined);

interface SnippetProviderProps {
  children: ReactNode;
}

export function SnippetProvider({children}: SnippetProviderProps) {
  const [selectedSnippet, setSelectedSnippet] = useState<Snippet | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const value = {
    selectedSnippet,
    isSaving,
    setSelectedSnippet,
    setIsSaving,
  };

  return <SnippetContext.Provider value={value}>{children}</SnippetContext.Provider>;
}
