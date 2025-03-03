// CODEMIRROR LANGUAGES
import {javascript} from "@codemirror/lang-javascript";
import {yaml} from "@codemirror/lang-yaml";
import {python} from "@codemirror/lang-python";
import {rust} from "@codemirror/lang-rust";
import {go} from "@codemirror/lang-go";
import {java} from "@codemirror/lang-java";
import {csharp} from "@replit/codemirror-lang-csharp";
import {php} from "@codemirror/lang-php";
import {sql} from "@codemirror/lang-sql";
import {vue} from "@codemirror/lang-vue";
import {css} from "@codemirror/lang-css";
import {html} from "@codemirror/lang-html";
import {markdown} from "@codemirror/lang-markdown";
import {json} from "@codemirror/lang-json";
import {xml} from "@codemirror/lang-xml";
import {cpp} from "@codemirror/lang-cpp";
import {sass} from "@codemirror/lang-sass";
import {svelte} from "@replit/codemirror-lang-svelte";

import {Language} from "@/types";

const languageExtensions = {
  javascript: javascript({jsx: true}),
  typescript: javascript({jsx: true, typescript: true}),
  yaml: yaml(),
  python: python(),
  rust: rust(),
  go: go(),
  java: java(),
  "c#": csharp(),
  php: php(),
  angular: javascript({typescript: true}),
  sql: sql(),
  vue: vue(),
  css: css(),
  html: html({
    autoCloseTags: true,
    matchClosingTags: true,
    selfClosingTags: true,
  }),
  markdown: markdown({
    completeHTMLTags: true,
  }),
  json: json(),
  xml: xml(),
  "c++": cpp(),
  sass: sass(),
  svelte: svelte(),
};

export const extensionFn = (language: Language) => {
  return languageExtensions[language] || languageExtensions.markdown;
};
