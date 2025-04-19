import type {Collection} from "@prisma/client";
import type {Folder, Snippet} from "@prisma/client";

export type CollectionWithFolders = Collection & {folders: Folder[]};

export type SnippetsWithCollectionName = Snippet & {folder: {collection: {name: string}}};

export type FolderAndSnippets = Folder & {
  collection: {name: string};
  snippets: SnippetsWithCollectionName[];
};

export interface UserSettings {
  theme: "light" | "dark";
  defaultLanguage: string;
  editorTheme: string;
}
