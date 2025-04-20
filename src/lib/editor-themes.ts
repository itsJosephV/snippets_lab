import {githubDark, githubLight} from "@uiw/codemirror-theme-github";
import {duotoneDark, duotoneLight} from "@uiw/codemirror-theme-duotone";
import {basicDark, basicLight} from "@uiw/codemirror-theme-basic";
import {whiteDark, whiteLight} from "@uiw/codemirror-theme-white";
import {xcodeDark, xcodeLight} from "@uiw/codemirror-theme-xcode";
import {vscodeDarkInit, vscodeLightInit} from "@uiw/codemirror-theme-vscode";
import {consoleDark, consoleLight} from "@uiw/codemirror-theme-console";

const fontSizeSettings = {
  settings: {
    fontSize: "13px",
  },
};

export const editorThemes = {
  "github-dark": githubDark,
  "github-light": githubLight,
  "duotone-dark": duotoneDark,
  "duotone-light": duotoneLight,
  "basic-dark": basicDark,
  "basic-light": basicLight,
  "white-dark": whiteDark,
  "white-light": whiteLight,
  "vscode-dark": vscodeDarkInit(fontSizeSettings),
  "vscode-light": vscodeLightInit(fontSizeSettings),
  "xcode-dark": xcodeDark,
  "xcode-light": xcodeLight,
  "console-dark": consoleDark,
  "console-light": consoleLight,
} as const;
