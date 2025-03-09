import {capitalize} from "../utils";

import languageTemplate from "./language-template";
import {languageExtension} from "./language-extension";

import {Language} from "@/types";

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
