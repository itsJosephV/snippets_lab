import type {LanguageExtension} from "@/types";

import {capitalize} from "../utils";

import languageTemplate from "./language-template";
import {languageExtension} from "./language-extension";

export const languageTemplateFn = (
  title: string,
  description: string,
  language: LanguageExtension,
): string => {
  const template = languageTemplate[language];

  return template
    .replace("{title}", capitalize(title))
    .replace("{description}", capitalize(description))
    .replace("{language}", language);
};

export const extensionFn = (language: LanguageExtension) => {
  return languageExtension[language] || languageExtension.Markdown;
};
