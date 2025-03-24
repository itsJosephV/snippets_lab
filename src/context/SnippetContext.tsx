"use client";
import type {Snippet} from "@prisma/client";

import {ReactCodeMirrorRef} from "@uiw/react-codemirror";
import {usePathname, useSearchParams} from "next/navigation";
import {createContext, useState, ReactNode, useRef, RefObject, useCallback} from "react";
interface SnippetContextType {
  selectedSnippet: Snippet | null;
  setSelectedSnippet: (snippet: Snippet | null) => void;
  editorRef: RefObject<ReactCodeMirrorRef | null>;
  setCursorPosition: (state: {ln: number; col: number}) => void;
  cursorPosition: {ln: number; col: number};
  updateCursorPosition: (ln: number, col: number) => void;
  docLength: number;
  setDocLength: (length: number) => void;
  clearEditor: () => void;
  // handleViewClick: (ctx: any, ctxParam: string) => void;
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
  const [docLength, setDocLength] = useState(0);
  const editorRef = useRef<ReactCodeMirrorRef>(null);
  // const pathname = usePathname();
  // const searchParams = useSearchParams();

  const updateCursorPosition = useCallback(
    (ln: number, col: number) => {
      if (cursorPosition.ln !== ln || cursorPosition.col !== col) {
        setCursorPosition({ln, col});
      }
    },
    [cursorPosition.ln, cursorPosition.col],
  );

  // const handleViewClick = (folderCtx: any, paramCtx: string) => {
  //   const viewDraft = searchParams.get(paramCtx);

  //   if (viewDraft === folderCtx.type) {
  //     return;
  //   }

  //   const newParams = new URLSearchParams();

  //   newParams.set(paramCtx, folderCtx.type);

  //   const newUrl = `${pathname}?${newParams.toString()}`;

  //   history.pushState(null, "", newUrl);

  //   clearEditor();
  // };

  const clearEditor = () => {
    setSelectedSnippet(null);
    setCursorPosition({ln: 0, col: 0});
  };

  const value = {
    editorRef,
    selectedSnippet,
    cursorPosition,
    docLength,
    setSelectedSnippet,
    setCursorPosition,
    updateCursorPosition,
    setDocLength,
    clearEditor,
    // handleViewClick,
  };

  return <SnippetContext.Provider value={value}>{children}</SnippetContext.Provider>;
}
