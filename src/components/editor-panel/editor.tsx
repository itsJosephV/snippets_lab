"use client";

import type {LanguageExtension} from "@/types";

import CodeMirror, {ViewUpdate} from "@uiw/react-codemirror";
import {useTheme} from "next-themes";
import {useQuery} from "@tanstack/react-query";

import {cn} from "@/lib/utils";
import {useSnippet} from "@/context/useSnippetContext";
import {extensionFn} from "@/lib/languages/language-helpers";
import {getUserSettings} from "@/lib/db/data/get_user_settings";
import {editorThemes} from "@/lib/editor-themes";

type EditorProps = {
  handleContentChange: (value: string) => void;
};

const defaultValue = `<- SELECT A SNIPPET TO START EDITING`;

function Editor({handleContentChange}: EditorProps) {
  const {theme, resolvedTheme} = useTheme();

  const {selectedSnippet, editorRef, updateCursorPosition} = useSnippet();

  const {data: settings} = useQuery({
    queryKey: ["settings"],
    queryFn: getUserSettings,
  });

  const appliedTheme = theme === "system" ? resolvedTheme : theme;
  const baseTheme = settings?.editorTheme ?? "github";
  const editorThemeKey = `${baseTheme}-${appliedTheme}` as keyof typeof editorThemes;
  const editorTheme = editorThemes[editorThemeKey];

  const handleEditorUpdate = (viewUpdate: ViewUpdate) => {
    if (!viewUpdate.selectionSet) return;

    const state = viewUpdate.state;
    const position = state.selection.main.head;
    const line = state.doc.lineAt(position);
    const lineNumber = line.number;
    const columnNumber = position - line.from;

    updateCursorPosition(lineNumber, columnNumber + 1);
  };

  return (
    <CodeMirror
      ref={editorRef}
      basicSetup
      className={cn(`overflow-y-scroll`, "h-[var(--editor-height)]")}
      extensions={[extensionFn(selectedSnippet?.language as LanguageExtension)]}
      height="100%"
      readOnly={selectedSnippet?.isLocked || !selectedSnippet}
      theme={editorTheme}
      value={selectedSnippet?.content || defaultValue}
      onChange={(value) => handleContentChange(value)}
      onUpdate={handleEditorUpdate}
    />
  );
}

export default Editor;
