"use client";

import CodeMirror, {ViewUpdate} from "@uiw/react-codemirror";
import {useTheme} from "next-themes";
import {githubDark, githubLight} from "@uiw/codemirror-theme-github";

import {cn} from "@/lib/utils";
import {useSnippet} from "@/context/useSnippetContext";
import {extensionFn} from "@/lib/languages";
import {Language} from "@/types";

type EditorProps = {
  handleContentChange: (value: string) => void;
};

function Editor({handleContentChange}: EditorProps) {
  const {theme} = useTheme();

  const codeMirrorTheme = theme === "dark" ? githubDark : githubLight;

  const {selectedSnippet, editorRef, updateCursorPosition} = useSnippet();

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
      extensions={[extensionFn(selectedSnippet?.language as Language)]}
      height="100%"
      theme={codeMirrorTheme}
      value={selectedSnippet?.content}
      onChange={(value) => handleContentChange(value)}
      onUpdate={handleEditorUpdate}
    />
  );
}

export default Editor;
