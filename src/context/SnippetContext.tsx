"use client";
import type {Snippet} from "@prisma/client";

import {ReactCodeMirrorRef} from "@uiw/react-codemirror";
import {createContext, useState, ReactNode, useRef, RefObject, useCallback} from "react";

interface SnippetContextType {
  selectedSnippet: Snippet | null;
  setSelectedSnippet: (snippet: Snippet | null) => void;
  editorRef: RefObject<ReactCodeMirrorRef | null>;
  setCursorPosition: (state: {ln: number; col: number}) => void;
  cursorPosition: {ln: number; col: number};
  updateCursorPosition: (ln: number, col: number) => void;
}

export const SnippetContext = createContext<SnippetContextType | undefined>(undefined);

interface SnippetProviderProps {
  children: ReactNode;
}

export function SnippetProvider({children}: SnippetProviderProps) {
  const [selectedSnippet, setSelectedSnippet] = useState<Snippet | null>(null);
  const [cursorPosition, setCursorPosition] = useState({
    ln: 0,
    col: 0,
  });
  const editorRef = useRef<ReactCodeMirrorRef>(null);

  const updateCursorPosition = useCallback(
    (ln: number, col: number) => {
      if (cursorPosition.ln !== ln || cursorPosition.col !== col) {
        setCursorPosition({ln, col});
      }
    },
    [cursorPosition.ln, cursorPosition.col],
  );

  const value = {
    selectedSnippet,
    setSelectedSnippet,
    editorRef,
    cursorPosition,
    setCursorPosition,
    updateCursorPosition,
  };

  return <SnippetContext.Provider value={value}>{children}</SnippetContext.Provider>;
}
