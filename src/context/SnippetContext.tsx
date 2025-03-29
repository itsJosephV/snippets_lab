"use client";
import type {Folder} from "@prisma/client";

import {ReactCodeMirrorRef} from "@uiw/react-codemirror";
import {usePathname, useSearchParams} from "next/navigation";
import {createContext, useState, ReactNode, useRef, RefObject, useCallback} from "react";

import {SnippetsWithCollectionName} from "@/types";

type folderCtx = Folder;
interface SnippetContextType {
  editorRef: RefObject<ReactCodeMirrorRef | null>;
  selectedSnippet: SnippetsWithCollectionName | null;
  cursorPosition: {ln: number; col: number};
  docLength: number;
  setSelectedSnippet: (snippet: SnippetsWithCollectionName | null) => void;
  setCursorPosition: (state: {ln: number; col: number}) => void;
  setDocLength: (length: number) => void;
  handleFolderClick: (folderCtx: folderCtx, ctxParam: string) => void;
  updateCursorPosition: (ln: number, col: number) => void;
  clearEditor: () => void;
}

export const SnippetContext = createContext<SnippetContextType | undefined>(undefined);

interface SnippetProviderProps {
  children: ReactNode;
}

export function SnippetProvider({children}: SnippetProviderProps) {
  const [selectedSnippet, setSelectedSnippet] = useState<SnippetsWithCollectionName | null>(null);
  const [cursorPosition, setCursorPosition] = useState({
    ln: 0,
    col: 0,
  });
  const [docLength, setDocLength] = useState(0);
  const editorRef = useRef<ReactCodeMirrorRef>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateCursorPosition = useCallback(
    (ln: number, col: number) => {
      if (cursorPosition.ln !== ln || cursorPosition.col !== col) {
        setCursorPosition({ln, col});
      }
    },
    [cursorPosition.ln, cursorPosition.col],
  );

  const clearEditor = () => {
    setSelectedSnippet(null);
    setCursorPosition({ln: 0, col: 0});
  };

  const handleFolderClick = (folder: Folder, param: string) => {
    const folderId = searchParams.get(param);

    if (folderId === folder.id) {
      return;
    }

    const newParams = new URLSearchParams();

    newParams.set(param, folder.id);
    const newUrl = `${pathname}?${newParams.toString()}`;

    history.pushState(null, "", newUrl);

    clearEditor();
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
    handleFolderClick,
  };

  return <SnippetContext.Provider value={value}>{children}</SnippetContext.Provider>;
}
