"use client";
import CodeMirror from "@uiw/react-codemirror";
import {useTheme} from "next-themes";
import {githubDark, githubLight} from "@uiw/codemirror-theme-github";
import {javascript} from "@codemirror/lang-javascript";

import {cn} from "@/lib/utils";
import {useSnippet} from "@/context/useSnippetContext";

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
      extensions={[javascript({jsx: true})]}
      height="100%"
      theme={codeMirrorTheme}
      value={selectedSnippet?.content}
      onChange={(value) => handleContentChange(value)}
    />
  );
}

export default Editor;
