// import {snippets, folders, snippetTags, tags, collections} from "./mock-data-colletionts";

// import {Collection, Folder, Snippet, Tag} from "@/types";

// const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// export async function getCollectionByUserId(userId: string): Promise<Collection[] | undefined> {
//   await sleep(2000);
//   const collection = collections.filter((collection) => collection.userId === userId);

//   return collection || undefined;
// }

// // 1. Getting all snippets for a specific folder
// export async function getSnippetsByFolderId(folderId: string): Promise<Snippet[]> {
//   await sleep(2000);

//   return snippets.filter((snippet) => snippet.folderId === folderId);
// }

// // 2. Getting all folders for a specific collection
// export function getFoldersByCollectionId(collectionId: string): Folder[] {
//   return folders.filter((folder) => folder.collectionId === collectionId);
// }

// export async function getFolderByFolderId(folderId: string): Promise<Folder | undefined> {
//   await sleep(2000);

//   return folders.find((folder) => folder.id === folderId);
// }

// // 3. Getting all tags for a specific snippet
// export function getTagsForSnippet(snippetId: string): Tag[] {
//   const tagIds = snippetTags.filter((st) => st.snippetId === snippetId).map((st) => st.tagId);

//   return tags.filter((tag) => tagIds.includes(tag.id));
// }

// // 4. Getting all snippets with a specific tag
// export function getSnippetsByTagId(tagId: string): Snippet[] {
//   const snippetIds = snippetTags.filter((st) => st.tagId === tagId).map((st) => st.snippetId);

//   return snippets.filter((snippet) => snippetIds.includes(snippet.id));
// }

// // Example usage:
// // console.log(
// //   "Folders in Web Development collection:",
// //   getFoldersByCollectionId("c01b2c3d-4e5f-6789-abcd-ef0123456789").map((f) => f.name),
// // );

// // console.log(
// //   "Snippets in JavaScript folder:",
// //   getSnippetsByFolderId("f12a3b4c-5d6e-7890-fghi-jk0123456789").map((s) => s.title),
// // );

// // console.log(
// //   "Tags for DataFrame Cleaning snippet:",
// //   getTagsForSnippet("s45678901-bcde-fghi-jklm-nopqrstuvwxy").map((t) => t.name),
// // );

// // console.log(
// //   "Snippets with 'utility' tag:",
// //   getSnippetsByTagId("t123e4567-e89b-12d3-a456-426614174000").map((s) => s.title),
// // );
