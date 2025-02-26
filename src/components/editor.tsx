import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import {useState} from "react";
import {useTheme} from "next-themes";
import {githubDark, githubLight} from "@uiw/codemirror-theme-github";
import {javascript} from "@codemirror/lang-javascript";

import MOCK_CODE_TEST from "@/lib/mock-data";

const headerHeight = 118;

function Editor() {
  const [mockData] = useState(MOCK_CODE_TEST);
  const {theme} = useTheme();
  const codeMirrorTheme = theme === "dark" ? githubDark : githubLight;

  return (
    <CodeMirror
      basicSetup
      className={`h-[calc(100vh-${headerHeight}px)] overflow-y-scroll`}
      extensions={[javascript({jsx: true})]}
      height="100%"
      theme={codeMirrorTheme}
      value={mockData}
    />
  );
}

export default Editor;
