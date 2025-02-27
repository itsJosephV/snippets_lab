// PROVITIONAL TYPES FOR COMPONENT HYDRATION

export type Tag = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export type SnippetTag = {
  snippetId: string;
  tagId: string;
};

export type Snippet = {
  id: string;
  title: string;
  content: string;
  language: string;
  folderId: string;
  description?: string;
  isFavorite: boolean;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * model Folder {
  id           String    @id @default(uuid())
  name         String
  description  String?
  collectionId String
  collection   Collection @relation(fields: [collectionId], references: [id])
  snippets     Snippet[]
}
 */

export type Folder = {
  id: string;
  name: string;
  collectionId: string;
  description: string | null;
  // createdAt?: Date;
  // updatedAt?: Date;
};

export type Collection = {
  id: string;
  name: string;
  description?: string;
  isDefault: boolean;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

// GITHUB AUTH TYPES
export interface User {
  id: string;
  name?: string;
  email: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}
