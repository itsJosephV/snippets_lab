import {githubDark, githubLight} from "@uiw/codemirror-theme-github";
import {duotoneDark, duotoneLight} from "@uiw/codemirror-theme-duotone";
import {basicDark, basicLight} from "@uiw/codemirror-theme-basic";

export const editorThemes = {
  "github-dark": githubDark,
  "github-light": githubLight,
  "duotone-dark": duotoneDark,
  "duotone-light": duotoneLight,
  "basic-dark": basicDark,
  "basic-light": basicLight,
} as const;
