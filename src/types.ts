import type {Collection} from "@prisma/client";
import type {Folder, Snippet} from "@prisma/client";

import {languageExtension} from "./lib/languages/language-extension";
import {editorThemes} from "./lib/editor-themes";

export type CollectionWithFolders = Collection & {folders: Folder[]};

export type SnippetsWithCollectionName = Snippet & {folder: {collection: {name: string}}};

export type FolderAndSnippets = Folder & {
  collection: {name: string};
  snippets: SnippetsWithCollectionName[];
};

export interface UserSettings {
  defaultLanguage: string;
  editorTheme: string;
}

export type LanguageExtension = keyof typeof languageExtension;

export type EditorTheme = keyof typeof editorThemes;
