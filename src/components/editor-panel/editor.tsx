"use client";

import type {EditorThemeId} from "@/lib/editor-themes";

import CodeMirror, {ViewUpdate} from "@uiw/react-codemirror";
import {useTheme} from "next-themes";
// import {duotoneDark, duotoneLight} from "@uiw/codemirror-theme-duotone";
// import {githubDark, githubLight} from "@uiw/codemirror-theme-github";
import {basicDark, basicLight} from "@uiw/codemirror-theme-basic";
import {useQuery} from "@tanstack/react-query";

import {cn} from "@/lib/utils";
import {useSnippet} from "@/context/useSnippetContext";
import {extensionFn} from "@/lib/languages/language-helpers";
import {getUserSettings} from "@/lib/db/data/get_user_settings";
import {editorThemes} from "@/lib/editor-themes";
import {LanguageExtension} from "@/lib/languages/language-extension";

type EditorProps = {
  handleContentChange: (value: string) => void;
};

const defaultValue = `<- SELECT A SNIPPET TO START EDITING`;

function Editor({handleContentChange}: EditorProps) {
  const {theme} = useTheme();

  const codeMirrorTheme = theme === "dark" ? basicDark : basicLight;

  const {selectedSnippet, editorRef, updateCursorPosition} = useSnippet();

  const {data: settings} = useQuery({
    queryKey: ["settings"],
    queryFn: getUserSettings,
  });

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
      theme={editorThemes[settings?.theme as EditorThemeId] || codeMirrorTheme}
      value={selectedSnippet?.content || defaultValue}
      onChange={(value) => handleContentChange(value)}
      onUpdate={handleEditorUpdate}
    />
  );
}

export default Editor;
