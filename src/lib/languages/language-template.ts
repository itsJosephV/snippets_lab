import type {LanguageExtension} from "./language-extension";

const languageTemplate = {
  JavaScript: `// Title: {title}\n// Description: {description}\n// Language: {language}\n// -----------------------------\n// Add your snippet here 🚀`,
  TypeScript: `// Title: {title}\n// Description: {description}\n// Language: {language}\n// -----------------------------\n// Add your snippet here 🚀`,
  YAML: `# Title: {title}\n# Description: {description}\n# Language: {language}\n# -----------------------------\n# Add your snippet here 🚀`,
  Python: `# Title: {title}\n# Description: {description}\n# Language: {language}\n# -----------------------------\n# Add your snippet here 🚀`,
  Rust: `// Title: {title}\n// Description: {description}\n// Language: {language}\n// -----------------------------\n// Add your snippet here 🚀`,
  Go: `// Title: {title}\n// Description: {description}\n// Language: {language}\n// -----------------------------\n// Add your snippet here 🚀`,
  Java: `// Title: {title}\n// Description: {description}\n// Language: {language}\n// -----------------------------\n// Add your snippet here 🚀`,
  "C#": `// Title: {title}\n// Description: {description}\n// Language: {language}\n// -----------------------------\n// Add your snippet here 🚀`,
  PHP: `// Title: {title}\n// Description: {description}\n// Language: {language}\n// -----------------------------\n// Add your snippet here 🚀`,
  Angular: `<!-- Title: {title} -->\n<!-- Description: {description} -->\n<!-- Language: {language} -->\n<!-- ----------------------------- -->\n<!-- Add your snippet here 🚀 -->`,
  SQL: `-- Title: {title}\n-- Description: {description}\n-- Language: {language}\n-- -----------------------------\n-- Add your snippet here 🚀`,
  Vue: `<!-- Title: {title} -->\n<!-- Description: {description} -->\n<!-- Language: {language} -->\n<!-- ----------------------------- -->\n<!-- Add your snippet here 🚀 -->`,
  CSS: `/* Title: {title} */\n/* Description: {description} */\n/* Language: {language} */\n/* ----------------------------- */\n/* Add your snippet here 🚀 */`,
  HTML: `<!-- Title: {title} -->\n<!-- Description: {description} -->\n<!-- Language: {language} -->\n<!-- ----------------------------- -->\n<!-- Add your snippet here 🚀 -->`,
  Markdown: `<!-- Title: {title} -->\n<!-- Description: {description} -->\n<!-- Language: {language} -->\n<!-- ----------------------------- -->\n<!-- Add your snippet here 🚀 -->`,
  JSON: `{\n  "// Title": "{title}",\n  "// Description": "{description}",\n  "// Language": "{language}",\n  "// -----------------------------": "",\n  "// Add your snippet here 🚀": ""\n}`,
  XML: `<!-- Title: {title} -->\n<!-- Description: {description} -->\n<!-- Language: {language} -->\n<!-- ----------------------------- -->\n<!-- Add your snippet here 🚀 -->`,
  "C++": `// Title: {title}\n// Description: {description}\n// Language: {language}\n// -----------------------------\n// Add your snippet here 🚀`,
  Sass: `// Title: {title}\n// Description: {description}\n// Language: {language}\n// -----------------------------\n// Add your snippet here 🚀`,
  Svelte: `<!-- Title: {title} -->\n<!-- Description: {description} -->\n<!-- Language: {language} -->\n<!-- ----------------------------- -->\n<!-- Add your snippet here 🚀 -->`,
} satisfies Record<LanguageExtension, string>;

export default languageTemplate;
