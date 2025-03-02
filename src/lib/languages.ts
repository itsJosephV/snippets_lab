// CODEMIRROR LANGUAGES
import {javascript} from "@codemirror/lang-javascript";
import {typescriptLanguage} from "@codemirror/lang-javascript";
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

// library not working
const angular = javascript;

export const languages = {
  javascript,
  typescript: javascript,
  yaml,
  python,
  rust,
  go,
  java,
  csharp,
  php,
  angular,
  sql,
  vue,
  svelte,
  css,
  html,
  markdown,
  json,
  xml,
  cpp,
  sass,
};
