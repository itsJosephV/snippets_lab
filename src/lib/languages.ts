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

import {capitalize} from "./utils";

import {Language} from "@/types";

const languageExtension = {
  JavaScript: javascript({jsx: true}),
  TypeScript: javascript({jsx: true, typescript: true}),
  YAML: yaml(),
  Python: python(),
  Rust: rust(),
  Go: go(),
  Java: java(),
  "C#": csharp(),
  PHP: php(),
  Angular: javascript({typescript: true}),
  SQL: sql(),
  Vue: vue(),
  CSS: css(),
  HTML: html({
    autoCloseTags: true,
    matchClosingTags: true,
    selfClosingTags: true,
  }),
  Markdown: markdown({
    completeHTMLTags: true,
  }),
  JSON: json(),
  XML: xml(),
  "C++": cpp(),
  Sass: sass(),
  Svelte: svelte(),
};

const languageTemplate: Record<Language, string> = {
  [Language.JAVASCRIPT]: `// Title: {title}\n// Description: {description}\n// Language: {language}\n// -----------------------------\n// Add your snippet here 🚀`,
  [Language.TYPESCRIPT]: `// Title: {title}\n// Description: {description}\n// Language: {language}\n// -----------------------------\n// Add your snippet here 🚀`,
  [Language.YAML]: `# Title: {title}\n# Description: {description}\n# Language: {language}\n# -----------------------------\n# Add your snippet here 🚀`,
  [Language.PYTHON]: `# Title: {title}\n# Description: {description}\n# Language: {language}\n# -----------------------------\n# Add your snippet here 🚀`,
  [Language.RUST]: `// Title: {title}\n// Description: {description}\n// Language: {language}\n// -----------------------------\n// Add your snippet here 🚀`,
  [Language.GO]: `// Title: {title}\n// Description: {description}\n// Language: {language}\n// -----------------------------\n// Add your snippet here 🚀`,
  [Language.JAVA]: `// Title: {title}\n// Description: {description}\n// Language: {language}\n// -----------------------------\n// Add your snippet here 🚀`,
  [Language.CSHARP]: `// Title: {title}\n// Description: {description}\n// Language: {language}\n// -----------------------------\n// Add your snippet here 🚀`,
  [Language.PHP]: `// Title: {title}\n// Description: {description}\n// Language: {language}\n// -----------------------------\n// Add your snippet here 🚀`,
  [Language.ANGULAR]: `<!-- Title: {title} -->\n<!-- Description: {description} -->\n<!-- Language: {language} -->\n<!-- ----------------------------- -->\n<!-- Add your snippet here 🚀 -->`,
  [Language.SQL]: `-- Title: {title}\n-- Description: {description}\n-- Language: {language}\n-- -----------------------------\n-- Add your snippet here 🚀`,
  [Language.VUE]: `<!-- Title: {title} -->\n<!-- Description: {description} -->\n<!-- Language: {language} -->\n<!-- ----------------------------- -->\n<!-- Add your snippet here 🚀 -->`,
  [Language.CSS]: `/* Title: {title} */\n/* Description: {description} */\n/* Language: {language} */\n/* ----------------------------- */\n/* Add your snippet here 🚀 */`,
  [Language.HTML]: `<!-- Title: {title} -->\n<!-- Description: {description} -->\n<!-- Language: {language} -->\n<!-- ----------------------------- -->\n<!-- Add your snippet here 🚀 -->`,
  [Language.MARKDOWN]: `<!-- Title: {title} -->\n<!-- Description: {description} -->\n<!-- Language: {language} -->\n<!-- ----------------------------- -->\n<!-- Add your snippet here 🚀 -->`,
  [Language.JSON]: `{\n  "// Title": "{title}",\n  "// Description": "{description}",\n  "// Language": "{language}",\n  "// -----------------------------": "",\n  "// Add your snippet here 🚀": ""\n}`,
  [Language.XML]: `<!-- Title: {title} -->\n<!-- Description: {description} -->\n<!-- Language: {language} -->\n<!-- ----------------------------- -->\n<!-- Add your snippet here 🚀 -->`,
  [Language.CPP]: `// Title: {title}\n// Description: {description}\n// Language: {language}\n// -----------------------------\n// Add your snippet here 🚀`,
  [Language.SASS]: `// Title: {title}\n// Description: {description}\n// Language: {language}\n// -----------------------------\n// Add your snippet here 🚀`,
  [Language.SVELTE]: `<!-- Title: {title} -->\n<!-- Description: {description} -->\n<!-- Language: {language} -->\n<!-- ----------------------------- -->\n<!-- Add your snippet here 🚀 -->`,
};

export const languageTemplateFn = (
  title: string,
  description: string,
  language: Language,
): string => {
  const template = languageTemplate[language];

  return template
    .replace("{title}", capitalize(title))
    .replace("{description}", capitalize(description))
    .replace("{language}", language);
};

export const extensionFn = (language: Language) => {
  return languageExtension[language] || languageExtension.Markdown;
};
