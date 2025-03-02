"use client";

import CodeMirror from "@uiw/react-codemirror";
import {useTheme} from "next-themes";
import {githubDark, githubLight} from "@uiw/codemirror-theme-github";

import {cn} from "@/lib/utils";
import {useSnippet} from "@/context/useSnippetContext";
import {extensionFn} from "@/lib/languages";

type EditorProps = {
  handleContentChange: (value: string) => void;
};

function Editor({handleContentChange}: EditorProps) {
  const {theme} = useTheme();

  const codeMirrorTheme = theme === "dark" ? githubDark : githubLight;

  const {selectedSnippet} = useSnippet();

  return (
    <CodeMirror
      basicSetup
      className={cn(`overflow-y-scroll`, "h-[calc(100vh-var(--editor-header-height))]")}
      extensions={[extensionFn(selectedSnippet?.language as string)]}
      height="100%"
      theme={codeMirrorTheme}
      value={selectedSnippet?.content}
      onChange={(value) => handleContentChange(value)}
    />
  );
}

export default Editor;
