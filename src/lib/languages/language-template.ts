import {Language} from "@/types";

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

export default languageTemplate;
