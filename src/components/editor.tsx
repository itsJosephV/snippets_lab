"use client";

import CodeMirror from "@uiw/react-codemirror";
import {useTheme} from "next-themes";
import {githubDark, githubLight} from "@uiw/codemirror-theme-github";

import {languages} from "@/lib/languages";
import {cn} from "@/lib/utils";
import {useSnippet} from "@/context/useSnippetContext";

type EditorProps = {
  handleContentChange: (value: string) => void;
};

type LanguageSupport = ReturnType<typeof languages.javascript>;

function Editor({handleContentChange}: EditorProps) {
  const {theme} = useTheme();

  const codeMirrorTheme = theme === "dark" ? githubDark : githubLight;

  const {selectedSnippet} = useSnippet();

  const languageExtensions: Record<string, LanguageSupport> = {
    javascript: languages.javascript({jsx: true}),
    typescript: languages.typescript({jsx: true, typescript: true}),
    yaml: languages.yaml(),
    python: languages.python(),
    rust: languages.rust(),
    go: languages.go(),
    java: languages.java(),
    csharp: languages.csharp(),
    php: languages.php(),
    angular: languages.angular({typescript: true}),
    sql: languages.sql(),
    vue: languages.vue(),
    css: languages.css(),
    html: languages.html({
      autoCloseTags: true,
      matchClosingTags: true,
      selfClosingTags: true,
    }),
    markdown: languages.markdown({
      completeHTMLTags: true,
    }),
    json: languages.json(),
    xml: languages.xml(),
    cpp: languages.cpp(),
    sass: languages.sass(),
    svelte: languages.svelte(),
  };

  return (
    <CodeMirror
      basicSetup
      className={cn(`overflow-y-scroll`, "h-[calc(100vh-var(--editor-header-height))]")}
      extensions={[languageExtensions[selectedSnippet?.language || "markdown"]]}
      height="100%"
      theme={codeMirrorTheme}
      value={selectedSnippet?.content}
      onChange={(value) => handleContentChange(value)}
    />
  );
}

export default Editor;
