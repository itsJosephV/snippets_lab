import type {Folder, Snippet} from "@prisma/client";

export type FolderWithSnippets = Folder & {snippets: Snippet[]};

export enum Language {
  JAVASCRIPT = "JavaScript",
  TYPESCRIPT = "TypeScript",
  YAML = "YAML",
  PYTHON = "Python",
  RUST = "Rust",
  GO = "Go",
  JAVA = "Java",
  CSHARP = "C#",
  PHP = "PHP",
  ANGULAR = "Angular",
  SQL = "SQL",
  VUE = "Vue",
  CSS = "CSS",
  HTML = "HTML",
  MARKDOWN = "Markdown",
  JSON = "JSON",
  XML = "XML",
  CPP = "C++",
  SASS = "Sass",
  SVELTE = "Svelte",
}
